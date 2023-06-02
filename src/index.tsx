import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import SvgHiddenWrapper from './components/svg-hidden-wrapper/svg-hidden-wrapper';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './utils/browser-history';
import { store } from './store/store';
import NotificationCard from './components/notification-card/notification-card';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <NotificationCard />
        <SvgHiddenWrapper />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
