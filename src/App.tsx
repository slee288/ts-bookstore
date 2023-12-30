import { useState, MouseEvent } from 'react'
import './App.css'

interface Book {
  id: string,
  name: string,
  price: number,
  category: string
}

function App() {
  const [bookList, setBookList] = useState<Book[]>([
    { id: "13354", name: "Book 1", price: 13.3, category: "Fantasy" },
    { id: "13355", name: "Book 2", price: 15.3, category: "Drama" },
    { id: "13356", name: "Book 3", price: 10.3, category: "Documentary" }
  ])

  function deleteBook(bookId: string) {
    setBookList(bookList.filter(({ id }: Book) => id !== bookId));
  } 

  return (
    <>
      {bookList.map(({id, name, price, category}: Book, index: number) => (
        <div key={id} className="book" style={{ display: "flex", columnGap: "10px" }}>
          <p>name: {name}</p>
          <p>price: ${price}</p>
          <p>category: {category}</p>
          <button onClick={() => deleteBook(id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default App
