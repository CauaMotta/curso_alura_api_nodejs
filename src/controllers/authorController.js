import NotFoundError from '../errors/NotFoundError.js'
import { author } from '../models/Author.js'

class AuthorController {
  static async findAuthors(req, res, next) {
    try {
      const authors = await author.find({})
      res.status(200).json(authors)
    } catch (err) {
      next(err)
    }
  }

  static async findAuthorById(req, res, next) {
    try {
      const id = req.params.id
      const foundAuthor = await author.findById(id)

      if (foundAuthor !== null) {
        res.status(200).json(foundAuthor)
      } else {
        throw new NotFoundError(`Autor não encontrado com ID - ${id}`)
      }
    } catch (err) {
      next(err)
    }
  }

  static async addAuthor(req, res, next) {
    try {
      const newAuthor = await author.create(req.body)
      res.status(201).json({
        message: 'Autor criado com sucesso.',
        autor: newAuthor
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id
      await author.findByIdAndUpdate(id, req.body)
      res.status(200).send({
        message: 'Autor atualizado com sucesso.'
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteById(req, res, next) {
    try {
      const id = req.params.id
      await author.findByIdAndDelete(id)
      res.status(200).send({
        message: 'Autor removido com sucesso.'
      })
    } catch (err) {
      next(err)
    }
  }
}

export default AuthorController
