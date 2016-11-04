import React from 'react';
import ReactDOM from 'react-dom';
import CluckApp from 'app/components/cluck-app';
import store from 'app/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap, which is needed by Material-UI
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let id = 0;
const newId = () => id++;

const render = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <CluckApp clucks={store.getState().clucks} newId={newId} />
    </MuiThemeProvider>,
    document.getElementById('root')
  );
  console.log('State:', store.getState());
};

store.subscribe(render);
//render();
store.dispatch({
  type: 'ADD_CLUCK',
  message: 'Welcome to cluck',
  id: newId()
});
