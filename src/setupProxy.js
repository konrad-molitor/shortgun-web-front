const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/a',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
  app.use(
    '/s',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
  app.use(
    '/images',
    proxy({
      target: 'http://localhost:5003/',
      changeOrigin: true,
      pathRewrite: {
        '^/images/': '/'
      }
    })
  );
};