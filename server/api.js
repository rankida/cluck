function register (server) {
  server.route({
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request, reply) => {
      const name = encodeURIComponent(request.params.name || 'mystery person');
      reply('Hello ' + name);
    }
  });
}

exports.register = register;
