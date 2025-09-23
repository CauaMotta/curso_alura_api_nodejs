import ErrorBase from './errorBase.js'

class ValidationError extends ErrorBase {
  constructor(err) {
    const errorMessage = Object.values(err.errors)
      .map((err) => err.message)
      .join('; ')

    super(`Foram encontrados os seguintes erros: ${errorMessage}`, 400)
  }
}

export default ValidationError
