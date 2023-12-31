import { useState, MouseEvent, useEffect } from 'react'
import { css } from "@emotion/react";
import ModalForm from "./components/ModalForm";
import Card from "./components/Card";
import { Book } from "./interfaces";
import './App.css'


function App() {
  const [bookList, setBookList] = useState<Book[]>([
    { id: "13354", name: "Book 1", price: 13.3, category: "Fantasy" },
    { id: "13355", name: "Book 2", price: 15.3, category: "Drama" },
    { id: "13356", name: "Book 3", price: 10.3, category: "Documentary" },
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
    <div css={css`
      width: 100%;
      padding: 100px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <button onClick={() => openAddBookForm()} css={css`
        width: 100%;
        max-width: 500px;
        border: 3px dashed #333;
        margin-bottom: 48px;
        font-size: 20px;
        color: #333;
        &:hover {
          border: 3px dashed #aaa;
          color: #888;
        }
      `}>Add a Book</button>
      <div css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 20px;
        row-gap: 20px;
      `}>
        {bookList.map((book: Book) => (
          <Card book={book} editAction={openEditBookForm} deleteAction={deleteBook} />
        ))}
      </div>
      <ModalForm 
        opened={modalOpened}
        setOpened={setModalOpened}
        formFields={formFields}
        setFormFields={setFormFields}
        submitAction={formState === "add" ? addBook : editBook}
      />
    </div>
  )
}

export default App
