import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './Router/Router';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);