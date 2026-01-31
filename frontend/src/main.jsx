import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <HashRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </HashRouter>
  </GoogleOAuthProvider>
);
