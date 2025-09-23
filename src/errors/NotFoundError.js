import ErrorBase from './errorBase.js'

class NotFoundError extends ErrorBase {
  constructor(message = 'Página não encontrada.') {
    super(message, 404)
  }
}

export default NotFoundError
