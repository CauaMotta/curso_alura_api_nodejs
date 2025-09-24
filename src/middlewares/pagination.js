import BadRequestError from '../errors/BadRequestError.js'

async function pagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenacao = '_id:-1' } = req.query

    let [campo, ordem] = ordenacao.split(':')

    limit = parseInt(limit)
    page = parseInt(page)
    ordem = parseInt(ordem)

    const result = req.result

    if (limit > 0 && page > 0) {
      const resultPageable = await result
        .find()
        .sort({ [campo]: ordem })
        .skip((page - 1) * limit)
        .limit(limit)
      res.status(200).json(resultPageable)
    } else {
      throw new BadRequestError()
    }
  } catch (err) {
    next(err)
  }
}

export default pagination
