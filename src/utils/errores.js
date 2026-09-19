class ErrorDominio extends Error {
  constructor(mensaje, status = 400) {
    super(mensaje);
    this.name = 'ErrorDominio';
    this.status = status;
  }
}

module.exports = ErrorDominio;
