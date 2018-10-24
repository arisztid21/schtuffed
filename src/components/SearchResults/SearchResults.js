import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.scss'

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
        return <div className="MappedResults" key={restaurant.id}>

          <div className="MappedPhoto">
            <img src={restaurant.thumb} alt={restaurant.name} />
          </div>

          <div className="MappedDetails">
            <div className="MappedInformation">
              <Link to={`/restaurant-profile/${restaurant.id}`}>{restaurant.name}</Link>
              <div className="MappedRatings">
                <h5>Rating: {restaurant.user_rating.aggregate_rating}</h5>
                <h5> ({restaurant.user_rating.votes}) votes</h5>
              </div>
              <div className="MappedPrice">
                <h5>{restaurant.price_range} - {restaurant.cuisines}</h5>
              </div>
            </div>
            <div className="MappedLocation">
              <h5>{restaurant.location.address}</h5>
            </div>
          </div>
        </div>
    })
    return (
        <div className="SearchResults">
          <div className="SearchResultsSecondary">
            {mappedRestaurants}
          </div>
        </div>
     );
}

export default SearchResults;
