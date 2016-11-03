const cluck = (state, action) => {
  switch (action && action.type) {
    case 'ADD_CLUCK' :
      return {id: action.id, message: action.message};
    case 'LIKE_CLUCK':
      return Object.assign({}, state, {likes: state.likes + 1});
    default:
      return state;
  }
};

const clucks = (state = [], action) => {
  switch (action && action.type) {
    case 'ADD_CLUCK':
      return [...state, cluck(undefined, action)];
    case 'LIKE_CLUCK':
      return state.map((s) => (s.id === action.id) ? cluck(s, action) : s);
    default:
      return state;
  }
};

if (module) {
  module.exports = { clucks };
}
