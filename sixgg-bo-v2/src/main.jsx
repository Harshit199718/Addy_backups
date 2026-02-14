import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// RTK Query
import { store } from './data/store.jsx'
import { Provider } from 'react-redux'

// React Route
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './features/localeLanguage/localeLanguage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
)
