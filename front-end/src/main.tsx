import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'
import store from './store'
import './styles/index.css'

const rootDiv = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootDiv)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
