import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import restaurantReducer from './restaurantReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    restaurants: restaurantReducer,
    users: userReducer
});

const store = createStore(
    reducer, applyMiddleware(reduxPromiseMiddleware())
)

export default store;