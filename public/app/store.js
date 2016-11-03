import { app } from 'app/reducers';
import { createStore } from 'redux';

export const store = createStore(app);
export default store;
