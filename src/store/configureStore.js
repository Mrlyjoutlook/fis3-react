import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers/index';

export default function configureStore(history, initialState) {
  let createStoreWithMiddleware;
  
  createStoreWithMiddleware=compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )(createStore)

  const rootReducer = combineReducers(Object.assign({}, reducers));
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
