const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    if (!title || !author || !genre || !year) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const newBook = new Book({ title, author, genre, year });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save book.' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the book' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, year },
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;
