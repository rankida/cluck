import React from 'react';
import ReactDOM from 'react-dom';
import CluckApp from 'app/components/cluck-app';
import store from 'app/store';

let id = 0;
const newId = () => id++;

const render = () => {
  ReactDOM.render(
    <CluckApp clucks={store.getState().clucks} newId={newId} />,
    document.getElementById('root')
  );
  console.log('State:', store.getState());
};

store.subscribe(render);
render();
