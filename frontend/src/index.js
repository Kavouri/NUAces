import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from './redux/reducers/reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { fetchPartners } from './redux/actions/partnerActions';

const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(fetchPartners());

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
