import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import SvgHiddenWrapper from './components/svg-hidden-wrapper/svg-hidden-wrapper';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './utils/browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <SvgHiddenWrapper />
      <App />
    </HistoryRouter>
  </React.StrictMode>,
);
