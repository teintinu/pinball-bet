import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'jotai'
import App from './App.tsx'
import './index.css'
import { gameStore } from './state/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={gameStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
