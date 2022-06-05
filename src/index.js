import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';


import './assets/boxicons-2.0.7/css/boxicons.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './sass/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


