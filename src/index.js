import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.scss'
import App from './App/App'
import store from './Redux/store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
