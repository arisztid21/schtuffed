const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
      '/users',
      '/auth/callback',
      '/restaurants',
      '/api'
    ],{ target: 'http://localhost:4000/' }));
};
