import { PersistedQueryNetworkInterface } from 'persistgraphql';
const queryMap = {};

export default (headers = {}) => {
  return new PersistedQueryNetworkInterface({
    queryMap,
    uri: `https://api.graph.cool/simple/v1/ciuh4rz0p274o01741f4k8sx6`,
    opts: {
      credentials: 'same-origin',
      headers,
      rejectUnauthorized: false,
    },
    enablePersistedQueries: false,
  });
};
