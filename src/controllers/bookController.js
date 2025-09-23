import NotFoundError from '../errors/NotFoundError.js'
import { author } from '../models/Author.js'
import book from '../models/Book.js'

class BookController {
  static async findBooks(req, res, next) {
    try {
      const books = await book.find({})
      res.status(200).json(books)
    } catch (err) {
      next(err)
    }
  }

  static async findBookById(req, res, next) {
    try {
      const id = req.params.id
      const foundBook = await book.findById(id)

      if (foundBook !== null) {
        res.status(200).json(foundBook)
      } else {
        throw new NotFoundError(`Livro não encontrado com ID - ${id}`)
      }
    } catch (err) {
      next(err)
    }
  }

  static async addBook(req, res, next) {
    const body = req.body
    try {
      const foundAuthor = await author.findById(body.author)
      const newBook = { ...body, author: { ...foundAuthor._doc } }
      const createBook = await book.create(newBook)
      res.status(201).json({
        message: 'Livro criado com sucesso.',
        book: createBook
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id
      const foundAuthor = await author.findById(req.body.author)
      const updatedBook = { ...req.body, author: { ...foundAuthor._doc } }
      await book.findByIdAndUpdate(id, updatedBook)
      res.status(200).send({
        message: 'Livro atualizado com sucesso.'
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteById(req, res, next) {
    try {
      const id = req.params.id
      await book.findByIdAndDelete(id)
      res.status(200).send({
        message: 'Livro removido com sucesso.'
      })
    } catch (err) {
      next(err)
    }
  }

  static async findByPublisher(req, res, next) {
    try {
      const publisher = req.query.publisher
      const foundBook = await book.find({ publisher: publisher })
      if (foundBook !== null) {
        res.status(200).json(foundBook)
      } else {
        throw new NotFoundError(
          `Livro não encontrado com EDITORA - ${publisher}`
        )
      }
    } catch (err) {
      next(err)
    }
  }
}

export default BookController
