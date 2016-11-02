'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();

server.connection({ port: 3000 });

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

server.route({
  method: 'GET',
  path: '/hello/{name?}',
  handler: (request, reply) => {
    const name = encodeURIComponent(request.params.name || 'mystery person');
    reply('Hello ' + name);
  }
});

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) {
    throw err;
  }

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log(`Server is running on port: ${server.info.uri}`);
  });
});
