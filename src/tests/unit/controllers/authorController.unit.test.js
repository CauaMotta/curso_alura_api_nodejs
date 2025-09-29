import { expect, it, describe, vi, beforeEach } from 'vitest'

import AuthorController from '../../../controllers/authorController'
import { author } from '../../../models/index'
import NotFoundError from '../../../errors/NotFoundError'

vi.mock('../../../models/index.js', () => ({
  author: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn()
  }
}))

const mockResponse = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  res.send = vi.fn().mockReturnValue(res)
  return res
}

const mockNext = vi.fn()

describe('AuthorController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Should call author.find and set result in req', async () => {
    const req = {}
    const res = mockResponse()

    author.find.mockReturnValue(['author1', 'author2'])

    await AuthorController.findAuthors(req, res, mockNext)

    expect(author.find).toHaveBeenCalledTimes(1)
    expect(req.result).toEqual(['author1', 'author2'])
    expect(mockNext).toHaveBeenCalled()
  })

  it('Should return author by id', async () => {
    const req = { params: { id: '123' } }
    const res = mockResponse()

    author.findById.mockResolvedValue({ _id: '123', name: 'Teste' })

    await AuthorController.findAuthorById(req, res, mockNext)

    expect(author.findById).toHaveBeenCalledWith('123')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ _id: '123', name: 'Teste' })
  })

  it('Should throw NotFoundError when author not found', async () => {
    const req = { params: { id: 'not-found' } }
    const res = mockResponse()

    author.findById.mockResolvedValue(null)

    await AuthorController.findAuthorById(req, res, mockNext)

    expect(mockNext).toHaveBeenCalledWith(
      new NotFoundError('Autor não encontrado com ID - not-found')
    )
  })

  it('Should create a new author', async () => {
    const req = { body: { name: 'Novo Autor' } }
    const res = mockResponse()

    author.create.mockResolvedValue({ _id: '123', name: 'Novo Autor' })

    await AuthorController.addAuthor(req, res, mockNext)

    expect(author.create).toHaveBeenCalledWith({ name: 'Novo Autor' })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Autor criado com sucesso.',
      autor: { _id: '123', name: 'Novo Autor' }
    })
  })

  it('Should update an author', async () => {
    const req = { params: { id: '123' }, body: { name: 'Atualizado' } }
    const res = mockResponse()

    author.findByIdAndUpdate.mockResolvedValue()

    await AuthorController.updateAuthor(req, res, mockNext)

    expect(author.findByIdAndUpdate).toHaveBeenCalledWith('123', {
      name: 'Atualizado'
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Autor atualizado com sucesso.'
    })
  })

  it('Should delete an author by id', async () => {
    const req = { params: { id: '123' } }
    const res = mockResponse()

    author.findByIdAndDelete.mockResolvedValue()

    await AuthorController.deleteById(req, res, mockNext)

    expect(author.findByIdAndDelete).toHaveBeenCalledWith('123')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Autor removido com sucesso.'
    })
  })
})
