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

const view = (state = 'ALL', action) => {
  switch (action && action.type) {
    case 'CHANGE_VIEW':
      return action.view;
    default:
      return state;
  }
};

// TODO: Need to import Redux and use combine reducers
const app = (state = {}, action) => {
  return {
    clucks: clucks(state.clucks, action),
    view: view(state.view, action)
  };
};

exports = { clucks, app };
