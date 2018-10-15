import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import restaurantReducer from './restaurantReducer';

const reducer = combineReducers({
    restaurants: restaurantReducer
});

const store = createStore(
    reducer, applyMiddleware(reduxPromiseMiddleware())
)

export default store;