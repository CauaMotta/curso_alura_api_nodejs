import ErrorBase from './errorBase.js'

class BadRequestError extends ErrorBase {
  constructor() {
    super('Um ou mais dados fornecidos estão incorretos.', 400)
  }
}

export default BadRequestError
