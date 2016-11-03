import { app } from 'app/cluck';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const store = createStore(app);

let id = 0;

class CluckApp extends React.Component {
  render () {
    return (
      <div>
        <input ref={(el) => (this.input = el)} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_CLUCK',
            id: id++,
            message: this.input.value
          });
          this.input.value = '';
        }}>
          Cluck
        </button>
        {this.props.clucks.map((c) =>
          <li key={c.id}> {c.message}</li>
        )}
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <CluckApp clucks={store.getState().clucks} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

console.log('Initial state would be', store.getState());
