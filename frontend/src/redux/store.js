import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import userReducer from './userRedux';
import hospitalsReducer from './hospitalsRedux';
import patientsReducer from './patientsRedux';
import attributionsReducer from './attributionsRedux';
import branchsReducer from './branchsRedux';


const subreducers = {
  user: userReducer,
  patients: patientsReducer,
  attributions: attributionsReducer,
  branchs: branchsReducer,
  hospitals: hospitalsReducer
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;