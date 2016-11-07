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
      path: '/login',
      config: {
        auth: 'simple',
        handler: (request, reply) => {
          reply.file('./public/index.html');
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/logout',
      config: {
        handler: (request, reply) => {
          reply('You are logged out now').code(401);
        }
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
