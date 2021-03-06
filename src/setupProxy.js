const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
      '/users',
      '/testimonies',
      '/auth/callback',
      '/restaurants',
      '/api',
    ],{ target: 'http://localhost:4001/' }));
};
