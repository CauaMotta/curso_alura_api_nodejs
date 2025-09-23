import { author } from '../models/Author.js'

class AuthorController {
  static async findAuthors(req, res) {
    try {
      const authors = await author.find({})
      res.status(200).json(authors)
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha na requisição` })
    }
  }

  static async findAuthorById(req, res) {
    try {
      const id = req.params.id
      const foundAuthor = await author.findById(id)
      res.status(200).json(foundAuthor)
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha na requisição` })
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body)
      res.status(201).json({
        message: 'criado com sucesso',
        autor: newAuthor
      })
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao fazer o cadastro` })
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id
      await author.findByIdAndUpdate(id, req.body)
      res.status(200).json({
        message: 'autor atualizado com sucesso'
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
      await author.findByIdAndDelete(id)
      res.status(200).json({
        message: 'autor removido com sucesso'
      })
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - falha ao fazer a remoção`
      })
    }
  }
}

export default AuthorController
