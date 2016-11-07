/* eslint-env mocha */
/*
const assert = require('chai').assert;
const {app, clucks} = require('../public/cluck.js');
const deepFreeze = require('deep-freeze');

describe('Cluck', function () {
  it('Initially there are no clucks', () => {
    assert.deepEqual(clucks(), []);
  });
  it('Can add a cluck', () => {
    const before = [];
    const action = {
      type: 'ADD_CLUCK',
      message: 'cluck cluck',
      id: 0
    };
    const after = [{
      id: 0,
      message: 'cluck cluck'
    }];
    deepFreeze(before);
    deepFreeze(action);
    assert.deepEqual(clucks(before, action), after);
  });
  it('can like a cluck', () => {
    const before = [{id: 0, message: 'cluck', likes: 0}];
    const action = {
      type: 'LIKE_CLUCK',
      id: 0
    };
    const after = [{
      id: 0,
      message: 'cluck',
      likes: 1
    }];
    deepFreeze(before);
    deepFreeze(action);
    assert.deepEqual(clucks(before, action), after);
  });
});

describe('View', () => {
  it('is initially set to ALL', () => {
    const before = void 0;
    const action = { type: 'START' };
    const after = {clucks: [], view: 'ALL'};
    assert.deepEqual(app(before, action), after);
  });
  it('can be set to LIKED', () => {
    const before = { clucks: [], view: 'ALL' };
    const action = { type: 'CHANGE_VIEW', view: 'LIKED' };
    const after = { clucks: [], view: 'LIKED' };
    deepFreeze(before);
    deepFreeze(action);
    assert.deepEqual(app(before, action), after);
  });
});
*/
