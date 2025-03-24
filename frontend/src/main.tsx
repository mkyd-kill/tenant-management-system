import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import { store } from './redux/store'; // Import the Redux store
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);