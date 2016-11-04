import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import store from 'app/store';

const CluckCard = (props) => (
  <Card>
    <CardHeader
      title='Rankida'
      subtitle='seconds ago'
    />
    <CardText>
      {props.cluck.message}
    </CardText>
    <CardActions>
      <Badge badgeContent={props.cluck.likes || 0} secondary badgeStyle={{top: 12, right: 12}}>
        <FlatButton label='Cockadoodledoo' primary onClick={() => {
          store.dispatch({
            type: 'LIKE_CLUCK',
            id: props.cluck.id
          });
        }} />
      </Badge>
    </CardActions>
  </Card>
);

export default CluckCard;
