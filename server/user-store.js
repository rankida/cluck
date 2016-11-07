const bcrypt = require('bcrypt');
const Promise = require('bluebird');
class UserStore {
  constructor (opts) {
    const options = opts || {};
    this.bcryptCost = options.bcrypt && options.bcrypt.cost || 10;
    this.store = [];
    if (options.users && options.users.length) {
      this.usersAdded = Promise.all(options.users.map(this.add.bind(this)));
    }
  }
  get count () {
    return this.store.length;
  }
  add (user) {
    return new Promise((resolve) => {
      let clone = Object.assign({}, user);
      bcrypt.hash(clone.password, this.bcryptCost, (err, hash) => {
        if (err) {
          throw err;
        }
        clone.hash = hash;
        delete clone.password;
        this.store.push(clone);
        resolve();
      });
    });
  }
  get (username) {
    return new Promise((resolve) => {
      const user = this.store.find((u) => u.username === username);
      resolve(Object.assign({}, user));
    });
  }
  validate (username, password) {
    return this.get(username)
      .then((user) => new Promise((resolve, reject) => {
        bcrypt.compare(password, user.hash, (err, res) => {
          err ? reject(err) : resolve(res ? user : null);
        });
      }));
  }
}

module.exports = UserStore;
