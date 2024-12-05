const postPredictHandler = require('../server/handler');
const getHistoriesHandler = require('../server/getHistoriesHandler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000,
        output: 'data'
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoriesHandler
  }
];

module.exports = routes;