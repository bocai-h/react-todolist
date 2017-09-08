import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as todoReducer } from './todos';
import { reducer as filterReducer } from './filter';
import Perf from 'react-addons-perf';
import Risi from 'redux-immutable-state-invariant'

const win = window;
win.Perf = Perf;

const reducer = combineReducers({
   todos: todoReducer,
   filter: filterReducer
});

const middlewares = [];

if(process.env.NODE_ENV !== 'production'){
	middlewares.push(Risi());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f
);

export default createStore(reducer, {}, storeEnhancers);