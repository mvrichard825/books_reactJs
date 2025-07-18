import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [form, setForm] = useState({ title: '', author: '', genre: '', year: '' })
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books')
    setBooks(res.data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/books', form)
    setForm({ title: '', author: '', genre: '', year: '' })
    fetchBooks()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /><br/>
        <input type="text" placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required /><br/>
        <input type="text" placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} required /><br/>
        <input type="number" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required /><br/>
        <button type="submit">Submit</button>
      </form>

      <h3>Book List</h3>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} - {book.author} ({book.genre}, {book.year})</li>
        ))}
      </ul>
    </div>
  )
}

export default App
