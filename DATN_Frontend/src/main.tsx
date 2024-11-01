import './index.css'
// import "./assets/css/sb-admin-2.min.css"
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import persistor, { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

import "./assets/vendor/jquery/jquery.min.js"
// import "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
// import "./assets/vendor/jquery-easing/jquery.easing.min.js"
import "./assets/js/sb-admin-2.min.js"
import React from 'react'
