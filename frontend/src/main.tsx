import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx'

import { AuthProvider } from './AuthContext.tsx'
import { CartProvider } from './CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <CartProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CartProvider>
  </AuthProvider>
)
