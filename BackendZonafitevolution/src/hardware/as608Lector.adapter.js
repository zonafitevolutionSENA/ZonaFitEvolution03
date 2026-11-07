const crypto = require('crypto');
const LectorBiometrico = require('./lectorBiometrico.interface');
const ErrorDominio = require('../utils/errores');

// Comandos del protocolo serial del AS608 (mismo protocolo que R307/FPM10A)
const CMD = {
  GEN_IMG: 0x01,
  IMG_2_TZ: 0x02,
  SEARCH: 0x04,
  REG_MODEL: 0x05,
  STORE: 0x06,
  READ_SYS_PARA: 0x0f,
  READ_INDEX_TABLE: 0x1f
};

const SIN_DEDO = 0x02;
const NO_ENCONTRADA = 0x09;
const TIEMPO_ESPERA_DEDO_MS = 15000;
const TIEMPO_RESPUESTA_MS = 3000;

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Adaptador del sensor físico AS608 conectado por USB con un conversor CP2102.
// Las huellas se guardan dentro del sensor (una posición por huella); en la base de datos
// solo queda un hash irreversible de esa posición, igual que con el simulador.
class As608Lector extends LectorBiometrico {
  constructor({ puerto, baudios = 57600 } = {}) {
    super();
    if (!puerto) {
      throw new Error('PUERTO_LECTOR no está configurado (por ejemplo, COM3)');
    }
    this.puerto = puerto;
    this.baudios = baudios;
    this.serial = null;
    this.capacidad = null;
    this.buffer = Buffer.alloc(0);
    this.esperandoRespuesta = null;
    // Cola: el sensor atiende una operación a la vez
    this.cola = Promise.resolve();
  }

  get requiereIdentificador() {
    return false;
  }

  get tipo() {
    return 'as608';
  }

  async capturar() {
    return this.enCola(async () => {
      await this.conectar();
      await this.leerHuellaEnBuffer(1, 'Coloca el dedo en el lector');
      const pagina = await this.buscar(1);
      return pagina === null ? null : this.templateDePagina(pagina);
    });
  }

  async registrar() {
    return this.enCola(async () => {
      await this.conectar();

      await this.leerHuellaEnBuffer(1, 'Coloca el dedo en el lector');

      // Si la huella ya está en el sensor, se devuelve su template y el servicio decide
      const existente = await this.buscar(1);
      if (existente !== null) {
        return this.templateDePagina(existente);
      }

      await this.esperarSinDedo();
      await this.leerHuellaEnBuffer(2, 'Vuelve a colocar el mismo dedo');

      const combinacion = await this.enviar(CMD.REG_MODEL);
      if (combinacion[0] !== 0x00) {
        throw new ErrorDominio('Las dos lecturas no coinciden. Usa el mismo dedo e inténtalo de nuevo.');
      }

      const pagina = await this.buscarPaginaLibre();
      const guardado = await this.enviar(CMD.STORE, [0x01, pagina >> 8, pagina & 0xff]);
      if (guardado[0] !== 0x00) {
        throw new ErrorDominio(`El lector no pudo guardar la huella (código 0x${guardado[0].toString(16)})`);
      }

      return this.templateDePagina(pagina);
    });
  }

  async comparar(templateA, templateB) {
    if (typeof templateA !== 'string' || typeof templateB !== 'string') {
      return false;
    }
    const a = Buffer.from(templateA);
    const b = Buffer.from(templateB);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  templateDePagina(pagina) {
    if (!process.env.BIOMETRIA_SALT) {
      throw new Error('BIOMETRIA_SALT no está configurado');
    }
    return crypto
      .createHash('sha256')
      .update(`as608:${pagina}` + process.env.BIOMETRIA_SALT)
      .digest('hex');
  }

  enCola(tarea) {
    const resultado = this.cola.then(tarea, tarea);
    this.cola = resultado.catch(() => {});
    return resultado;
  }

  async conectar() {
    if (this.serial && this.serial.isOpen) return;

    // Se carga aquí para que el modo simulador no necesite la librería
    const { SerialPort } = require('serialport');

    this.serial = new SerialPort({ path: this.puerto, baudRate: this.baudios, autoOpen: false });
    this.serial.on('data', datos => this.recibir(datos));
    this.serial.on('close', () => {
      this.serial = null;
      this.capacidad = null;
    });

    await new Promise((resolve, reject) => {
      this.serial.open(error => {
        if (error) {
          this.serial = null;
          reject(new ErrorDominio(`No se pudo abrir el lector en ${this.puerto}. Revisa que esté conectado.`));
        } else {
          resolve();
        }
      });
    });

    const parametros = await this.enviar(CMD.READ_SYS_PARA);
    if (parametros[0] !== 0x00) {
      throw new ErrorDominio('El lector no respondió correctamente al conectarse');
    }
    this.capacidad = parametros.readUInt16BE(5);
  }

  recibir(datos) {
    this.buffer = Buffer.concat([this.buffer, datos]);

    const inicio = this.buffer.indexOf(Buffer.from([0xef, 0x01]));
    if (inicio === -1) {
      this.buffer = Buffer.alloc(0);
      return;
    }
    if (inicio > 0) this.buffer = this.buffer.subarray(inicio);
    if (this.buffer.length < 9) return;

    const largo = this.buffer.readUInt16BE(7);
    const total = 9 + largo;
    if (this.buffer.length < total) return;

    // Contenido sin cabecera ni checksum: [confirmación, ...datos]
    const contenido = this.buffer.subarray(9, total - 2);
    this.buffer = this.buffer.subarray(total);

    if (this.esperandoRespuesta) {
      const { resolve } = this.esperandoRespuesta;
      this.esperandoRespuesta = null;
      resolve(Buffer.from(contenido));
    }
  }

  enviar(comando, parametros = []) {
    const contenido = [comando, ...parametros];
    const largo = contenido.length + 2;
    const suma = [0x01, largo >> 8, largo & 0xff, ...contenido].reduce((a, b) => a + b, 0) & 0xffff;
    const paquete = Buffer.from([
      0xef, 0x01, 0xff, 0xff, 0xff, 0xff,
      0x01, largo >> 8, largo & 0xff,
      ...contenido,
      suma >> 8, suma & 0xff
    ]);

    return new Promise((resolve, reject) => {
      const temporizador = setTimeout(() => {
        this.esperandoRespuesta = null;
        reject(new ErrorDominio('El lector no respondió a tiempo'));
      }, TIEMPO_RESPUESTA_MS);

      this.esperandoRespuesta = {
        resolve: respuesta => {
          clearTimeout(temporizador);
          resolve(respuesta);
        }
      };

      this.serial.write(paquete, error => {
        if (error) {
          clearTimeout(temporizador);
          this.esperandoRespuesta = null;
          reject(new ErrorDominio('No se pudo enviar el comando al lector'));
        }
      });
    });
  }

  async leerHuellaEnBuffer(bufferId, mensaje) {
    const limite = Date.now() + TIEMPO_ESPERA_DEDO_MS;

    while (Date.now() < limite) {
      const imagen = await this.enviar(CMD.GEN_IMG);
      if (imagen[0] === 0x00) {
        const conversion = await this.enviar(CMD.IMG_2_TZ, [bufferId]);
        if (conversion[0] !== 0x00) {
          throw new ErrorDominio('La huella no se leyó bien. Limpia el dedo y el lector e inténtalo de nuevo.');
        }
        return;
      }
      if (imagen[0] !== SIN_DEDO) {
        throw new ErrorDominio(`Error del lector al capturar la imagen (código 0x${imagen[0].toString(16)})`);
      }
      await esperar(200);
    }

    throw new ErrorDominio(`${mensaje}: no se detectó ningún dedo en 15 segundos`, 408);
  }

  async esperarSinDedo() {
    const limite = Date.now() + TIEMPO_ESPERA_DEDO_MS;
    while (Date.now() < limite) {
      const imagen = await this.enviar(CMD.GEN_IMG);
      if (imagen[0] === SIN_DEDO) return;
      await esperar(200);
    }
    throw new ErrorDominio('Retira el dedo del lector para la segunda lectura', 408);
  }

  async buscar(bufferId) {
    const capacidad = this.capacidad || 300;
    const respuesta = await this.enviar(CMD.SEARCH, [bufferId, 0x00, 0x00, capacidad >> 8, capacidad & 0xff]);
    if (respuesta[0] === 0x00) return respuesta.readUInt16BE(1);
    if (respuesta[0] === NO_ENCONTRADA) return null;
    throw new ErrorDominio(`Error del lector al buscar la huella (código 0x${respuesta[0].toString(16)})`);
  }

  async buscarPaginaLibre() {
    const capacidad = this.capacidad || 300;

    // Cada página del índice cubre 256 posiciones (32 bytes, un bit por posición)
    for (let pagina = 0; pagina * 256 < capacidad; pagina++) {
      const respuesta = await this.enviar(CMD.READ_INDEX_TABLE, [pagina]);
      if (respuesta[0] !== 0x00) break;

      for (let i = 0; i < 256; i++) {
        const posicion = pagina * 256 + i;
        if (posicion >= capacidad) break;
        const ocupada = respuesta[1 + Math.floor(i / 8)] & (1 << (i % 8));
        if (!ocupada) return posicion;
      }
    }

    throw new ErrorDominio(`El lector está lleno (${capacidad} huellas). Elimina huellas que ya no se usen.`, 409);
  }
}

module.exports = As608Lector;
