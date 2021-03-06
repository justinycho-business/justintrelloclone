import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import boardReducer from './boards';
import listReducer from './lists_store';
import cardReducer from './cards_store';
import checklistReducer from './checklists_store';

const rootReducer = combineReducers({
  session,
  boards: boardReducer,
  lists: listReducer,
  cards: cardReducer,
  checklists: checklistReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
