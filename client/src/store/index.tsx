import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// root reducer
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const middleware = [thunk];

const store = createStore(rootReducer, {}, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store;