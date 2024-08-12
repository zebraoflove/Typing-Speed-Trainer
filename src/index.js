import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import MainApp from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = "Typing Speed Trainer"
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
)
reportWebVitals();
