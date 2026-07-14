import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// HashRouter dipakai (bukan BrowserRouter) karena GitHub Pages adalah
// static hosting tanpa server-side routing. Dengan HashRouter, refresh
// di /#/fsa tetap jalan tanpa perlu konfigurasi rewrite tambahan.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
