import React from 'react';

export default function CluckList (props) {
  return (
    <ul>
    {props.clucks.map((c) =>
      <li key={c.id}> {c.message}</li>
    )}
    </ul>);
}
