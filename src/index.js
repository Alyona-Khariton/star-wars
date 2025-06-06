import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import reportWebVitals from './reportWebVitals';
import AppGlobalContextProvider from './modules/Common/context/appGlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppGlobalContextProvider>
    <App />
  </AppGlobalContextProvider>
);

reportWebVitals();
