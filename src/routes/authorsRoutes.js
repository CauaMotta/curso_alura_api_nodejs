import express from 'express'
import AuthorController from '../controllers/authorController.js'

const routes = express.Router()

routes.get('/autores', AuthorController.findAuthors)
routes.get('/autores/:id', AuthorController.findAuthorById)
routes.post('/autores', AuthorController.addAuthor)
routes.put('/autores/:id', AuthorController.updateAuthor)
routes.delete('/autores/:id', AuthorController.deleteById)

export default routes
