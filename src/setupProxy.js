const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
    '/auth/callback',
    '/api/user-data'
    ],{ target: 'http://localhost:4000/' }));
};

// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(proxy( '/auth/callback',{ target: 'http://localhost:4000/' }));
// };
// /api/user-data