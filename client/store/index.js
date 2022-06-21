import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import animals from './animals';
import user from './user';
import users from './users';
import animal from './animal';
import cart from './cart';
import orders from './orders';

const reducer = combineReducers({
  auth,
  animals,
  animal,
  user,
  users,
  cart,
  orders,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
