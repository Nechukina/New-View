import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import SvgHiddenWrapper from './components/svg-hidden-wrapper/svg-hidden-wrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <SvgHiddenWrapper />
    <App />
  </React.StrictMode>,
);
