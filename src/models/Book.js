import mongoose from 'mongoose'
import { authorSchema } from './Author.js'

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: {
      type: String,
      required: [true, 'O campo `title` é obrigatório']
    },
    publisher: {
      type: String,
      required: [true, 'O campo `publisher` é obrigatório']
    },
    price: { type: Number, required: [true, 'O campo `price` é obrigatório'] },
    pages: { type: Number },
    author: {
      type: authorSchema,
      required: [true, 'O campo `author` é obrigatório']
    }
  },
  { versionKey: false }
)

const book = mongoose.model('books', bookSchema)

export default book
