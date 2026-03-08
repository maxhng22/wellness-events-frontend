
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from "./auth/authProvider.tsx";

createRoot(document.getElementById('root')!).render(
// Wrap the entire app with AuthProvider to provide authentication context
    <AuthProvider>
      <App />
    </AuthProvider>
)
