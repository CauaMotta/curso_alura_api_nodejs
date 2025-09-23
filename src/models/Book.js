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
      required: [true, 'O campo `publisher` é obrigatório'],
      enum: {
        values: ['Casa do código', 'Alura'],
        message: 'A editora `{VALUE}` não é um valor permitido.'
      }
    },
    price: {
      type: Number,
      required: [true, 'O campo `price` é obrigatório'],
      validate: {
        validator: (value) => {
          return value >= 1 && value <= 10000
        },
        message:
          'O preço deve estar entre R$ 1,00 e R$ 10.000,00. Valor atual: {VALUE}'
      }
    },
    pages: {
      type: Number,
      min: [
        10,
        'O número de páginas deve ser entre 10 e 5000. Valor atual: {VALUE}'
      ],
      max: [
        5000,
        'O número de páginas deve ser entre 10 e 5000. Valor atual: {VALUE}'
      ]
    },
    author: {
      type: authorSchema,
      required: [true, 'O campo `author` é obrigatório']
    }
  },
  { versionKey: false }
)

const book = mongoose.model('books', bookSchema)

export default book
