import React from 'react';
import { Link } from 'react-router-dom';
const SearchResults = (props) => {
    //Persist data on refresh: LocalStorage || IndexDB
    console.log('SearchResults ====>',props);
    let { restaurantList } = props.data;
    let mappedRestaurants = restaurantList.map(restaurantObj => {
        let { restaurant } = restaurantObj;
        return <div key={restaurant.id}>
            <img src={restaurant.thumb} alt={restaurant.name} />
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
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