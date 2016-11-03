import { app } from 'app/cluck';
import { createStore } from 'redux';
// import { Component } from 'react';
import ReactDOM from 'react-dom';

const store = createStore(app);

let id = 0;

// class CluckApp extends Component {
//   render () {
//     return (
//       <div>
//         <button onClick={() => {
//           store.dispatch({
//             type: 'ADD_CLUCK',
//             id: id++,
//             message: 'Cluck cluck!'
//           });
//         }}>
//           Cluck
//         </button>
//         {this.props.clucks.map((c) =>
//           <li key={c.id}> {c.message}</li>
//         )}
//       </div>
//     );
//   }
// }

// const render = () => {
//   ReactDOM.render(
//     <CluckApp clucks={store.getState().clucks} />,
//     document.getElementById('root')
//   );
// };

const render = () => {
  document.getElementById('root').innerHTML = JSON.stringify(store.getState());
};

store.subscribe(render);
render();

console.log('Initial state would be', store.getState());
