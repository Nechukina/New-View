import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import SvgHiddenWrapper from './components/svg-hidden-wrapper/svg-hidden-wrapper';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './utils/browser-history';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <SvgHiddenWrapper />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
