import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(13,13,40,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(108,99,255,0.3)',
            color: '#e8e8f0',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(108,99,255,0.15)',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#00E5A0', secondary: 'transparent' },
            style: { borderColor: 'rgba(0,229,160,0.3)' },
          },
          error: {
            iconTheme: { primary: '#FF4D6D', secondary: 'transparent' },
            style: { borderColor: 'rgba(255,77,109,0.3)' },
          },
        }}
      />
    </Provider>
  </StrictMode>,
)
