import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import store from './redux/store.js'
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <Provider store={store}>         {/* ✅ Add this */}
      <BrowserRouter>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
