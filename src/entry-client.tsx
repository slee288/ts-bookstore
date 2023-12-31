import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {store} from "./app/store";
import { Provider } from "react-redux";

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
