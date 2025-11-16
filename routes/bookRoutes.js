const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger');
const validate = require('../middleware/validator');

let books = [
  { id: 1, title: "Book A", author: "Author A" },
  { id: 2, title: "Book B", author: "Author B" }
];

router.use(logger);

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: "Buku tidak ditemukan" });
  res.json(book);
});

router.post('/', validate, (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: "Buku tidak ditemukan" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: "Buku berhasil dihapus" });
});

module.exports = router;
