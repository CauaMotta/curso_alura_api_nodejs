import express from 'express'
import BookController from '../controllers/bookController.js'
import pagination from '../middlewares/pagination.js'

const routes = express.Router()

routes.get('/livros', BookController.findBooks, pagination)
routes.get('/livros/buscar', BookController.findByFilter, pagination)
routes.get('/livros/:id', BookController.findBookById)
routes.post('/livros', BookController.addBook)
routes.put('/livros/:id', BookController.updateBook)
routes.delete('/livros/:id', BookController.deleteById)

export default routes
