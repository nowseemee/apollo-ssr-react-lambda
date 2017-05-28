import 'isomorphic-fetch';
import React from 'react';
import { match } from 'react-router';
import ReactDOM from 'react-dom/server';

import { getDataFromTree, ApolloProvider } from 'react-apollo';
import { RouterContext } from 'react-router';
import { renderStatic } from 'glamor/server';

import routes from '../routes';

import getNetworkInterface from '../transport';
import createApolloClient from '../helpers/create-apollo-client';

import Html from '../components/Html';

const serverRender = (req, res, renderProps) => {
  const client = createApolloClient({
    ssrMode: true,
    networkInterface: getNetworkInterface({}),
  });

  const component = (
    <ApolloProvider client={client}>
      <RouterContext {...renderProps} />
    </ApolloProvider>
  );

  return getDataFromTree(component)
    .then(() => {
      const data = client.store.getState().apollo.data;
      const { html: content, css } = renderStatic(() => ReactDOM.renderToString(component));
      const html = <Html content={content} css={css} state={{ apollo: { data } }} />;
      return `<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`;
    })
    .catch(e => {
      console.error('RENDERING ERROR:', e); // eslint-disable-line no-console
      console.log(e.queryErrors[0].networkError);
      res.send(500);
      res.end(
        `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${e.stack}`
      );
    });
};

const dance = location =>
  new Promise((resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
        reject(500);
      } else if (renderProps) {
        resolve(serverRender({}, {}, renderProps));
      } else {
        reject(404);
        // res.status(404).send('Not found');
      }
    });
  });

export default dance;
