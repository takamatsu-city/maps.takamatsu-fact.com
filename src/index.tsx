import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Backward compatility for #/z/lat/lon URLs:
// When map is initialized with hash: true, it will add the map state
// to the hash directly. However, we need to add other parameters to the
// hash, so if we have an old-style hash, we put that in the map= parameter
// and then redirect to the new hash.
if (window.location.hash.match(/^#([\d.]+\/?)+$/)) {
  const oldHash = window.location.hash.slice(1);
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}#map=${oldHash}`,
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
