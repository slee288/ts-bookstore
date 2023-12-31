import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Book {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
}

export interface BookListState {
    bookList: Book[];
}

const initialState: BookListState = {
    bookList: [
        { id: "13354", name: "Book 1", price: 13.3, category: "Fantasy" },
        { id: "13355", name: "Book 2", price: 15.3, category: "Drama" },
        { id: "13356", name: "Book 3", price: 10.3, category: "Documentary" },
    ]
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Book>) => {
            state.bookList.push(action.payload);
        },
        remove: (state, action: PayloadAction<string>) => {
            state.bookList = state.bookList.filter(({ id }: Book) => id !== action.payload);
        },
        edit: (state, action: PayloadAction<Book>) => {
            const bookIndex = state.bookList.findIndex(({ id }: Book) => id === action.payload.id);
            state.bookList[bookIndex] = action.payload;
        },
    }
});

export const { add, remove, edit } = bookSlice.actions;
export default bookSlice.reducer;