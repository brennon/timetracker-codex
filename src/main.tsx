import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DialogProvider } from './components/DialogProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>
);
