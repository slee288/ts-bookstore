import { useState, MouseEvent, useEffect } from 'react'
import styled from "@emotion/styled";
import ModalForm from "./components/ModalForm";
import Card from "./components/Card";
import { Book } from "./interfaces";
import type { RootState } from "./app/store";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, edit } from "./features/book/bookSlice";
import './App.css'


function App() {
  const bookList = useSelector((state: RootState) => state.book.bookList);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<Book>({
    id: "", name: "", price: 0, category: "", description: ""
  });
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [formState, setFormState] = useState<string>("add");

  // DEBUG MESSAGING
  useEffect(() => {
    console.log(bookList);
  }, [bookList])

  function deleteBook(event: MouseEvent, bookId: string) {
    event.stopPropagation();
    dispatch(remove(bookId))
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
    dispatch(add({ ...formFields, id: Date.now().toString() }));
    setModalOpened(false);
  }

  function editBook(event: MouseEvent) {
    event.preventDefault();
    dispatch(edit({ ...formFields }));
    setModalOpened(false);
  }

  return (
    <MainPage>
      <AddButton onClick={() => openAddBookForm()}>Add a Book</AddButton>
      <ItemList>
        {bookList.map((book: Book) => (
          <Card key={book.id} book={book} editAction={openEditBookForm} deleteAction={deleteBook} />
        ))}
      </ItemList>
      <ModalForm 
        opened={modalOpened}
        setOpened={setModalOpened}
        formState={formState}
        formFields={formFields}
        setFormFields={setFormFields}
        submitAction={formState === "add" ? addBook : editBook}
      />
    </MainPage>
  )
}

const MainPage = styled.div`
  width: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AddButton = styled.button`
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
`;
const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
`;

export default App
