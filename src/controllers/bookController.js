import book from "../models/Book.js";

class BookController {
  static async findBooks(req, res) {
    try {
      const books = await book.find({});
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha na requisição` });
    }
  }

  static async findBookById(req, res) {
    try {
      const id = req.params.id;
      const foundBook = await book.findById(id);
      res.status(200).json(foundBook);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha na requisição do livro` });
    }
  }

  static async addBook(req, res) {
    try {
      const newBook = await book.create(req.body);
      res.status(201).json({
        message: "criado com sucesso",
        livro: newBook,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao cadastrar livro` });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "livro atualizado com sucesso",
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - falha na atualização`,
      });
    }
  }

  static async deleteById(req, res) {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.status(200).json({
        message: "livro removido com sucesso",
      });
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - falha ao tentar remover o livro`,
      });
    }
  }
}

export default BookController;
