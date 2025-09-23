import NotFoundError from '../errors/NotFoundError.js'

function notFoundHandler(req, res, next) {
  next(new NotFoundError())
}

export default notFoundHandler
