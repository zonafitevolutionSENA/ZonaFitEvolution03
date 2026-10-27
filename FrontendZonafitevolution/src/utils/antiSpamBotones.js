// Evita el spam de peticiones: cuando se presiona un botón, los clics siguientes sobre ese mismo botón
// se ignoran durante unos segundos. Se registra una sola vez para todos los botones de la aplicación.
export const SEGUNDOS_BLOQUEO = 2;

const SELECTOR_BOTON = 'button, input[type="button"], input[type="submit"]';

let activo = false;

export function activarBloqueoDeBotones(segundos = SEGUNDOS_BLOQUEO) {
  if (activo || typeof document === "undefined") return;
  activo = true;

  const bloqueados = new WeakSet();

  // Fase de captura: se ejecuta antes que los manejadores de React
  document.addEventListener(
    "click",
    (evento) => {
      const boton = evento.target instanceof Element ? evento.target.closest(SELECTOR_BOTON) : null;
      if (!boton || boton.disabled) return;

      if (bloqueados.has(boton)) {
        evento.preventDefault();
        evento.stopPropagation();
        return;
      }

      bloqueados.add(boton);
      boton.setAttribute("aria-disabled", "true");
      boton.style.opacity = "0.6";
      boton.style.cursor = "not-allowed";

      setTimeout(() => {
        bloqueados.delete(boton);
        boton.removeAttribute("aria-disabled");
        boton.style.opacity = "";
        boton.style.cursor = "";
      }, segundos * 1000);
    },
    true,
  );
}
