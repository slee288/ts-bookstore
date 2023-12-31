import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/bookSlice";

export const store = configureStore({
    reducer: {
        book: bookReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;