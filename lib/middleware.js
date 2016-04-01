function middleware(connect, options, middlewares) {
  if (!Array.isArray(options.base)) {
    options.base = [options.base];
  }
  options.base.forEach(function(base) {
    middlewares.push(connect.static(base));
  });
  
  var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
  middlewares.push(proxy);

  var directory = options.directory || options.base[options.base.length - 1];
  middlewares.push(connect.directory(directory));

  return middlewares;
};
module.exports = middleware;