import { app } from 'app/cluck';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const store = createStore(app);

let id = 0;

class CluckApp extends React.Component {
  constructor (props) {
    super(props);
    this.handelChange = this.handelChange.bind(this);
    this.state = { message: '' };
  }

  handelChange (e) {
    this.setState({message: e.target.value});
  }

  render () {
    const message = this.state.message;
    return (
      <div>
        <input value={message} onChange={this.handelChange} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_CLUCK',
            id: id++,
            message: message
          });
          this.state.message = '';
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
