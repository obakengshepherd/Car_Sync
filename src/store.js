import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
const initialState = { telemetry: { speed: 0, rpm: 0 } };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TELEMETRY':
      return { ...state, telemetry: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer, applyMiddleware(thunk));
export default store;