import axios from 'axios';

const initialState = {
    user: null
}

const SET_USER = "SET_USER";

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case `${SET_USER}_FULFILLED`:
        console.log(action.payload);
            return {...state, user: action.payload}
        default:
            return {...state}
    }
}

export function setUser() {
    return {
        type: SET_USER,
        payload: axios.get('/api/user-data').then(res => res.data).catch(err => console.log('Err in SET_USER', err))
    }
}