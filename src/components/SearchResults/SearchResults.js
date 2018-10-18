import React from 'react';
import { Link } from 'react-router-dom';
const SearchResults = (props) => {
    //Persist data on refresh: LocalStorage || IndexDB
    let listToMap;
    if (localStorage.getItem('results')) {
        //var doesnt create an if statement scope
        var storedData = JSON.parse(localStorage.getItem('results'));
        console.log(storedData);
        console.log(props);
        listToMap = storedData
    } else {
        listToMap = props.data.restaurantList
    }
    console.log('SearchResults ====>',props);
    // let { restaurantList } = props.data;
    let mappedRestaurants = listToMap.map(restaurantObj => {
        let { restaurant } = restaurantObj;
        return <div key={restaurant.id}>
            <img src={restaurant.thumb} alt={restaurant.name} />
            <Link to={`/restaurant-profile/${restaurant.id}`}>{restaurant.name}</Link>
            <span>Rating: {restaurant.user_rating.aggregate_rating}</span>
            <span> ({restaurant.user_rating.votes}) votes</span>
            <h5>{restaurant.price_range} - {restaurant.cuisines}</h5>
            <p>{restaurant.location.address}</p>
        </div>
    })
    return ( 
        <React.Fragment>
            <p>SearchResults</p>
            {mappedRestaurants}
        </React.Fragment>
     );
}
 
export default SearchResults;