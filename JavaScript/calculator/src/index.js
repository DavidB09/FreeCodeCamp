import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import Calculator from './Calculator';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Calculator />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
