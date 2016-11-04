import React from 'react';
import store from 'app/store';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
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
        <form style={({ paddingBottom: 15 })}>
          <TextField
            value={message} onChange={this.handelChange}
            hintText='What are you clucking about?'
            floatingLabelText='Cluck text'
          />
          <RaisedButton label='Cluck' primary onClick={() => {
            store.dispatch({
              type: 'ADD_CLUCK',
              id: this.props.newId(),
              message: message
            });
            this.state.message = '';
          }} />
        </form>
        <Divider />
        <CluckList clucks={this.props.clucks} />
      </div>
    );
  }
}
