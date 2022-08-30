import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import '../build/app/output.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RematchProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RematchProvider>,
);
