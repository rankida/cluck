'use strict';

const Hapi = require('hapi');
const Good = require('good');
const staticRoutes = require('./server/static-routes.js');
const apiRoutes = require('./server/api.js');

const server = new Hapi.Server();

server.connection({ port: 3000 });

staticRoutes.register(server);
apiRoutes.register(server);

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
