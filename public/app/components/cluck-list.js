import React from 'react';
import CluckCard from 'app/components/cluck-card';

export default function CluckList (props) {
  return (
    <div className='cluck-list'>
      {props.clucks.map((c) =>
        <CluckCard key={c.id} cluck={c} />
      )}
    </div>
  );
}
