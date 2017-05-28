/* eslint-disable react/no-danger */

import React, { PropTypes } from 'react';
import foo from '../../build/asset-manifest.json';

const Html = ({ content, state }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="hotpink" />

      <link rel="manifest" href="manifest.json" />
      <link rel="shortcut icon" href="static/favicon.ico" />

      <title>React App</title>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};` }}
        charSet="UTF-8"
      />
      <script type="text/javascript" src={`${foo['main.js']}`} />
    </body>
  </html>
);

Html.propTypes = {
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Html;
