const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
      '/users',
      '/auth/callback',
      '/api/user-data'
    ],{ target: 'http://localhost:4000/' }));
};