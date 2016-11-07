'use strict';

const Hapi = require('hapi');
const BasicAuth = require('hapi-auth-basic');
const goodConfig = require('./server/good-config.js');
const staticRoutes = require('./server/static-routes.js');
const apiRoutes = require('./server/api.js');
const UserStore = require('./server/user-store.js');

const server = new Hapi.Server();
const userStore = new UserStore({
  users: [{ id: 1, username: 'rankida', name: 'David Rankin', password: 'password' }]
});

server.connection({ port: 3000 });

server.register(goodConfig, (err) => {
  if (err) {
    throw err;
  }

  server.register(BasicAuth, (err) => {
    if (err) {
      throw err;
    }

    server.auth.strategy('simple', 'basic', {
      validateFunc: (req, u, p, callback) => {
        userStore.validate(u, p).then((user) => {
          const creds = user && { id: user.id, username: user.username, name: user.name };
          callback(null, !!user, creds);
        });
      }
    });

    staticRoutes.register(server);
    apiRoutes.register(server);

    server.start((err) => {
      if (err) {
        throw err;
      }

      console.log(`Server is running on port: ${server.info.uri}`);
    });
  });
});
