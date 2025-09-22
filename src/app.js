import express from "express";

const app = express();
app.use(express.json());

const books = [
  {
    id: 1,
    title: "O Senhor dos Anéis",
  },
  {
    id: 2,
    title: "Crepusculo",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Nodejs");
});

app.get("/livros", (req, res) => {
  res.status(200).json(books);
});

app.get("/livros/:id", (req, res) => {
  const index = findById(req.params.id);
  res.status(200).json(books[index]);
});

app.post("/livros", (req, res) => {
  books.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const index = findById(req.params.id);
  books[index].title = req.body.title;
  res.status(200).json(books);
});

app.delete("/livros/:id", (req, res) => {
  const index = findById(req.params.id);
  books.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

function findById(id) {
  return books.findIndex((book) => book.id === Number(id));
}

export default app;
