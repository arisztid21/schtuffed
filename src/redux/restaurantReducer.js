import axios from 'axios';

const initialState = {
    restaurantList: null
};


//Action Types
const SET_RESTAURANT_LIST = "SET_RESTAURANT_LIST";

//Reducer Function
export default function restaurantReducer(state = initialState, action) {
    switch(action.type) {
        case SET_RESTAURANT_LIST:
            return {...state, restaurantList: action.payload}
        default:
            return {...state}
    }
}

//Action Creators
export function setRestaurantList() {
    return {
        type: SET_RESTAURANT_LIST,
        payload: axios.get('https://developers.zomato.com/api/v2.1/search?entity_type=city&count=10&sort=rating', {
            headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
        }).then(res => console.log(res.data)).catch(err => console.log('Err in SET_RESTAURANT_LIST'))
    }
}