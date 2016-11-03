import { combineReducers } from 'redux';

const cluck = (state, action) => {
  switch (action && action.type) {
    case 'ADD_CLUCK':
      return {id: action.id, message: action.message};
    case 'LIKE_CLUCK':
      return Object.assign({}, state, {likes: state.likes + 1});
    default:
      return state;
  }
};

export const clucks = (state = [], action) => {
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

export const app = combineReducers({
  clucks,
  view
});

export default { clucks, app };
