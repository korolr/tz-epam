import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App';
import { store, persistor } from "./store/configureStore"


ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  document.querySelector('#root')
)