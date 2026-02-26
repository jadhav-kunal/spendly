import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1C1C24',
          color: '#fff',
          border: '1px solid #2A2A36',
          borderRadius: '12px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          padding: '12px 16px',
        },
        success: { iconTheme: { primary: '#22C55E', secondary: '#1C1C24' } },
        error:   { iconTheme: { primary: '#EF4444', secondary: '#1C1C24' } },
      }}
    />
  </React.StrictMode>
);