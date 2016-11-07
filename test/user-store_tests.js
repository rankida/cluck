/* eslint-env mocha */
const assert = require('chai').assert;
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const deepFreeze = require('deep-freeze');
const UserStore = require('../server/user-store.js');

describe('UserStore', () => {
  let store, rankida;

  beforeEach(() => {
    rankida = {
      username: 'rankida',
      name: 'David Rankin',
      password: '1234'
    };
    store = new UserStore({
      bcrypt: {
        cost: 1
      }
    });
  });
  afterEach(() => {
    bcrypt.hash.restore && bcrypt.hash.restore();
  });

  describe('construction', () => {
    it('can set bcrypt cost', (done) => {
      store = new UserStore({ bcrypt: { cost: 99 } });
      sinon.stub(bcrypt, 'hash', (pass, salt, callback) => {
        callback(undefined, '$hashed@');
      });
      store.add(rankida).then(() => {
        assert.equal(bcrypt.hash.args[0][1], 99, 'Bcrypt cost');
        done();
      }).catch(done);
    });
  });

  it('can add a user', (done) => {
    assert.ok(store, 'Store should be ok');
    assert.equal(0, store.count, 'Count before add');
    store.add(rankida).then((err) => {
      assert.isUndefined(err, 'Error');
      assert.equal(1, store.count, 'Count after');
      done();
    }).catch(done);
  });
  it('can retrieve user with username', (done) => {
    store.add(rankida)
    .then(() =>
      store.get('rankida')
    ).then((user) => {
      assert.ok(user);
      assert.equal(user.name, 'David Rankin');
      done();
    }).catch(done);
  });
  it('hashes password', (done) => {
    const u = Object.assign(rankida, { password: 'secret' });
    sinon.stub(bcrypt, 'hash', (pass, salt, callback) => {
      callback(undefined, '$hashed@');
    });
    store.add(deepFreeze(u))
    .then(() =>
      store.get('rankida')
    ).then((user) => {
      assert.isUndefined(user.password, 'Password');
      assert.isTrue(bcrypt.hash.called, 'Bcrypt.hash was called');
      assert.equal('$hashed@', user.hash);
      done();
    }).catch(done);
  });
  it('validate with wrong password', (done) => {
    store.add(Object.assign(rankida, { password: 'pwd' }))
    .then(() =>
      store.validate('rankida', 'wrong password')
    )
    .then((result) => {
      assert.isFalse(result);
      done();
    }).catch(done);
  });
  it('validate with correct password', (done) => {
    store.add(Object.assign(rankida, { password: 'pwd' }))
    .then(() =>
      store.validate('rankida', 'pwd')
    )
    .then((result) => {
      assert.isTrue(result);
      done();
    }).catch(done);
  });
});
