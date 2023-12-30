import { useState, MouseEvent, useEffect } from 'react'
import { css } from "@emotion/react";
import ModalForm from "./components/ModalForm";
import { Book } from "./interfaces";
import './App.css'


function App() {
  const [bookList, setBookList] = useState<Book[]>([
    { id: "13354", name: "Book 1", price: 13.3, category: "Fantasy" },
    { id: "13355", name: "Book 2", price: 15.3, category: "Drama" },
    { id: "13356", name: "Book 3", price: 10.3, category: "Documentary" }
  ]);
  const [formFields, setFormFields] = useState<Book>({
    id: "", name: "", price: 0, category: "", description: ""
  });
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [formState, setFormState] = useState<string>("add");

  useEffect(() => {
    console.log(bookList);
  }, [bookList])

  function deleteBook(bookId: string) {
    setBookList(bookList.filter(({ id }: Book) => id !== bookId));
  } 

  function openAddBookForm() {
    setFormState("add");
    setFormFields({ id: "", name: "", price: 0, category: "", description: "" });
    setModalOpened(!modalOpened);
  }


  function openEditBookForm(bookId: string) {
    setFormState("edit");
    setFormFields(bookList.find(({id}:Book) => id === bookId) || {...formFields});
    setModalOpened(!modalOpened);
  }

  function addBook(event: MouseEvent) {
    event.preventDefault();
    setBookList([
      ...bookList,
      { ...formFields, id: Date.now().toString() }
    ]);
    setModalOpened(false);
  }

  function editBook(event: MouseEvent) {
    event.preventDefault();
    const bookIndex = bookList.findIndex(({ id }: Book) => id === formFields.id);
    bookList[bookIndex] = formFields;
    setBookList([...bookList]);
    setModalOpened(false);
  }

  return (
    <>
      {bookList.map(({id, name, price, category}: Book) => (
        <div key={id} css={css`
          display: flex;
          column-gap: 10px;
        `}>
          <p>name: {name}</p>
          <p>price: ${price}</p>
          <p>category: {category}</p>
          <button onClick={() => openEditBookForm(id)}>Edit</button>
          <button onClick={() => deleteBook(id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => openAddBookForm()}>Add a Book</button>
      <ModalForm 
        opened={modalOpened}
        setOpened={setModalOpened}
        formFields={formFields}
        setFormFields={setFormFields}
        submitAction={formState === "add" ? addBook : editBook}
      />
    </>
  )
}

export default App
