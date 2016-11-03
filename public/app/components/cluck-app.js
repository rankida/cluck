import React from 'react';
import store from 'app/store';
import CluckList from 'app/components/cluck-list';

export default class CluckApp extends React.Component {
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
            id: this.props.newId(),
            message: message
          });
          this.state.message = '';
        }}>
          Cluck
        </button>
        <CluckList clucks={this.props.clucks} />
      </div>
    );
  }
}
