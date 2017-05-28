import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Player from './components/Player';
import Feed from './components/Feed';

import Layout from './components/Layout';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Player} />
    <Route path="feed" component={Feed} />
  </Route>
);
