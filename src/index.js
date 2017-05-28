import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import 'isomorphic-fetch';

import routes from './routes';
import createApolloClient from './helpers/create-apollo-client';
import getNetworkInterface from './transport';

import registerServiceWorker from './registerServiceWorker';

const client = createApolloClient({
  networkInterface: getNetworkInterface(),
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
