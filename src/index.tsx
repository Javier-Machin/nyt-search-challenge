import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import GlobalStyle from './styles/globalStyles';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
