import axios from 'axios';

const initialState = {
    restaurantList: null || JSON.parse(localStorage.getItem('results')),
    cityId: null,
    searchInput: null,
    isLoading: false,
    restaurantReviews: null,
    testimonies: null
};

//Action Types
const SET_RESTAURANT_LIST    = "SET_RESTAURANT_LIST",
      SET_CITY_ID            = "SET_CITY_ID",
      SET_SEARCH_INPUT       = "SET_SEARCH_INPUT",
      SET_RESTAURANT_REVIEWS = "SET_RESTAURANT_REVIEWS",
      SET_TESTIMONIES        = "SET_TESTIMONIES";

//Reducer Function
export default function restaurantReducer(state = initialState, action) {
    switch(action.type) {
        case `${SET_RESTAURANT_LIST}_REJECTED`:
            return {...state}
        case `${SET_RESTAURANT_LIST}_PENDING`:
            return {...state, isLoading: true}
        case `${SET_RESTAURANT_LIST}_FULFILLED`:
        console.log(action.payload);
            return {...state, restaurantList: action.payload, isLoading: false}
        case `${SET_CITY_ID}_FULFILLED`:
            return {...state, cityId: action.payload}
        case SET_SEARCH_INPUT:
            return {...state, searchInput: action.payload}
        case SET_RESTAURANT_REVIEWS:
            return {...state, restaurantReviews: action.payload}
        case SET_TESTIMONIES:
            return {...state, testimonies: action.payload}
        default:
            return {...state}
    }
}

//Action Creators

//Set Restaurant List
export function setRestaurantList(searchInput, cityId, history) {
    //SET &count to 10
    return {
        type: SET_RESTAURANT_LIST,
        payload: axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&q=${searchInput}&count=3&sort=rating`, {
            headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
        }).then(res => {
            localStorage.setItem('results', JSON.stringify(res.data.restaurants ))
            console.log(localStorage.setItem('results', JSON.stringify(res.data.restaurants )));

            history.push('/search/results')
            return res.data.restaurants
        }).catch(err => console.log('Err in SET_RESTAURANT_LIST', err))
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
    type: SET_RESTAURANT_REVIEWS,
    payload: restaurantReviews
  }
}

// Set Testimonies
export function setTestimonies(testimonies) {
  return {
    type: SET_TESTIMONIES,
    payload: testimonies
  }
}
