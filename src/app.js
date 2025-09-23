import express from 'express'
import connect from './config/dbConnect.js'
import routes from './routes/index.js'
import errorHandler from './middlewares/ErrorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'

const connection = await connect()

connection.on('error', (err) => {
  console.error('Erro de conexão', err)
})

connection.once('open', () => {
  console.log('Conectado ao mongo!')
})

const app = express()
routes(app)

app.use(notFoundHandler)

app.use(errorHandler)

export default app
