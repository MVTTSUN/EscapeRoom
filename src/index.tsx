import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { HistoryRouter } from './components/history-router/history-router';
import { browserHistory } from './utils/browser-history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HistoryRouter history={browserHistory}>
          <ToastContainer />
          <App />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
