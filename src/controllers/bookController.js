import { author } from '../models/Author.js'
import book from '../models/Book.js'

class BookController {
  static async findBooks(req, res) {
    try {
      const books = await book.find({})
      res.status(200).json(books)
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha na requisição` })
    }
  }

  static async findBookById(req, res) {
    try {
      const id = req.params.id
      const foundBook = await book.findById(id)
      res.status(200).json(foundBook)
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha na requisição` })
    }
  }

  static async addBook(req, res) {
    const body = req.body
    try {
      const foundAuthor = await author.findById(body.author)
      const newBook = { ...body, author: { ...foundAuthor._doc } }
      const createBook = await book.create(newBook)
      res.status(201).json({
        message: 'criado com sucesso',
        book: createBook
      })
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao fazer o cadastro` })
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id
      const foundAuthor = await author.findById(req.body.author)
      const updatedBook = { ...req.body, author: { ...foundAuthor._doc } }
      await book.findByIdAndUpdate(id, updatedBook)
      res.status(200).json({
        message: 'livro atualizado com sucesso'
      })
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - falha na atualização`
      })
    }
  }

  static async deleteById(req, res) {
    try {
      const id = req.params.id
      await book.findByIdAndDelete(id)
      res.status(200).json({
        message: 'livro removido com sucesso'
      })
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - falha ao fazer a remoção`
      })
    }
  }

  static async findByPublisher(req, res) {
    try {
      const publisher = req.query.publisher
      const foundBook = await book.find({ publisher: publisher })
      res.status(200).json(foundBook)
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - falha ao fazer a busca`
      })
    }
  }
}

export default BookController
