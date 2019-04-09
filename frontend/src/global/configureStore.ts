import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import homeReducers from '../pages/home/flow/reducers';
import pinReducers from '../pages/pin/flow/reducers';

const composeEnhancers = (window as any) && (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const reducer = combineReducers({
  home: homeReducers,
  pin: pinReducers,
});

export const configureStore = () => createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
