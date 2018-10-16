import axios from 'axios';

const initialState = {
    restaurantList: null,
    cityId: null,
    searchInput: null,
    restaurantReviews: ['stuff', 'morestuff']
};

//Action Types
const SET_RESTAURANT_LIST = "SET_RESTAURANT_LIST",
      SET_CITY_ID         = "SET_CITY_ID",
      SET_SEARCH_INPUT    = "SET_SEARCH_INPUT",
      SET_RESTAURANT_REVIEWS = "SET_RESTAURANT_REVIEWS";

//Reducer Function
export default function restaurantReducer(state = initialState, action) {
    switch(action.type) {
        case `${SET_RESTAURANT_LIST}_REJECTED`:
            return {...state}
        case `${SET_RESTAURANT_LIST}_PENDING`:
            return {...state}
        case `${SET_RESTAURANT_LIST}_FULFILLED`:
        console.log(action.payload);
            return {...state, restaurantList: action.payload}
        case `${SET_CITY_ID}_FULFILLED`:
            return {...state, cityId: action.payload}
        case SET_SEARCH_INPUT:
            return {...state, searchInput: action.payload}
        case SET_RESTAURANT_REVIEWS:
            return {...state, restaurantReviews: action.payload}
        default:
            return {...state}
    }
}

//Action Creators

//Set Restaurant List
export function setRestaurantList(searchInput, cityId) {
    //SET &count to 10
    return {
        type: SET_RESTAURANT_LIST,
        payload: axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&q=${searchInput}&count=3&sort=rating`, {
            headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
        }).then(res => res.data.restaurants).catch(err => console.log('Err in SET_RESTAURANT_LIST', err))
    }
}

//Set City Id
export function setCityId(cityInput) {
    return {
        type: SET_CITY_ID,
        payload: axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${cityInput}`, {
            headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
        }).then(res => res.data.location_suggestions[0].city_id).catch(err => console.log('Err in SET_CITY_ID'))
    }
}

//Set Search Input
export function setSearchInput(val) {
    return {
        type: SET_SEARCH_INPUT,
        payload: val
    }
}

//Set Restaurant Reviews
export function setRestaurantReviews(restaurantReviews) {
  return {
    set: SET_RESTAURANT_REVIEWS,
    payload: restaurantReviews
  }
}
