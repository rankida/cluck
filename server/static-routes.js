function register (server) {
  server.register(require('inert'), (err) => {
    if (err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.file('./public/index.html');
      }
    });

    server.route({
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          path: 'public',
          listing: true
        }
      }
    });
  });
}

exports.register = register;
