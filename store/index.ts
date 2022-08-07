import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { applyInterceptors } from './axios';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);
const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

applyInterceptors(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
