import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/livros", BookController.findBooks);
routes.get("/livros/:id", BookController.findBookById);
routes.post("/livros", BookController.addBook);
routes.put("/livros/:id", BookController.updateBook);
routes.delete("/livros/:id", BookController.deleteById);

export default routes;
