import axios from 'axios';

const initialState = {
    user: null,
    favoriteRestaurants: null,
    followers: null
}

const SET_USER          = "SET_USER",
      ADD_FAVORITES     = "ADD_FAVORITES",
      SET_FAVORITES     = "SET_FAVORITES",
      ADD_FOLLOWER      = "ADD_FOLLOWER",
      SET_FOLLOWERS     = 'SET_FOLLOWERS';

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case `${SET_USER}_FULFILLED`:
        console.log(action.payload);
            return {...state, user: action.payload}
        case `${ADD_FAVORITES}_FULFILLED`:
        console.log(action.payload);
            return {...state, favoriteRestaurants: action.payload}
        case `${SET_FAVORITES}_FULFILLED`:
        console.log('SET_FAVORITES ============>', action.payload);
            return {...state, favoriteRestaurants: action.payload}
        case `${ADD_FOLLOWER}_FULFILLED`:
        console.log(action.payload);
            return {...state }
        case `${SET_FOLLOWERS}_FULFILLED`:
            return {...state, followers: action.payload}
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
export function addFavorites(user_id, restaurant) {
    console.log('ADD_FAVORITES',user_id, restaurant);
    return {
        type: ADD_FAVORITES,
        payload: axios.post(`/users/${user_id}/favorites`, restaurant).then(res => res.data).catch(err => console.log('Err in SET_FAVORITES', err))
    }
}
export function setFavorites(id) {
    return {
        type: SET_FAVORITES,
        payload: axios.get(`/users/favorites/${id}`)
        .then(res => {
          console.log(res.data)
          return res.data
        })
    }
}
export function addFollower(user_id, follower_id) {
    console.log('ADD_FOLLOWER',follower_id);
    return {
        type: ADD_FOLLOWER,
        payload: axios.post(`/users/${user_id}/followers`, {follower_id}).then(res => console.log(res)).catch(err => console.log('Err in ADD_FOLLOWER', err))
    }
}
export function setFollowers(user_id) {
    console.log(user_id);
    
    return {
        type: SET_FOLLOWERS,
        payload: axios.get(`/users/followers/${user_id}`).then(res => res.data).catch(err => console.log('Err in getFollowers', err))
    }
}