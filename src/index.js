import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/root.reducer'
import { BrowserRouter } from 'react-router-dom'
import App from './root.cmp'
// import reportWebVitals from './reportWebVitals'
import '../src/assets/style/style.scss'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
