/* eslint-env mocha */
const assert = require('chai').assert;
const cluck = require('../public/cluck.js').clucks;
const deepFreeze = require('deep-freeze');

describe('Cluck', function () {
  it('Initially there are no clucks', () => {
    assert.deepEqual(cluck(), []);
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
    assert.deepEqual(cluck(before, action), after);
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
    assert.deepEqual(cluck(before, action), after);
  });
});
