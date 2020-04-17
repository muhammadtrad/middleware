import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';


const addLoggingToDispatch = store => next => action => {
      console.log(store.getState());
      console.log(action);
      next(action);
      console.log(store.getState());
    }

const anotherMiddleware = store => next => action => {
  console.log('second middleware');
  next(action);
  console.log(action);
}

const configureStore = (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(addLoggingToDispatch, anotherMiddleware));
  
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });
  return store;
}

export default configureStore;
