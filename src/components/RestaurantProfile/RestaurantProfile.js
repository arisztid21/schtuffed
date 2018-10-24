import React from 'react';
import RestaurantReviews from '../RestaurantReviews/RestaurantReviews'
import Favoritebutton from '../FavoriteButton/FavoriteButton';

const RestaurantProfile = (props) => {
    console.log(props.data);
    let { restaurantList, addFavorites, setFavorites, favoriteRestaurants, user } = props.data
    var restaurant;
    if (restaurantList) {
        restaurant = restaurantList.find(place => place.restaurant.id == props.data.match.params.id);
        localStorage.setItem('restaurant', JSON.stringify(restaurant))
    } else {
        restaurant = JSON.parse(localStorage.getItem('restaurant'));
        console.log(restaurant);
    }
    console.log(restaurant);
    let { thumb, name } = restaurant.restaurant;
    return (
        <div className="RestaurantProfile">
          {user && <Favoritebutton restaurant={restaurant} setFavorites={setFavorites} user={user} />}
           <img src={thumb} alt={name} />
           <h3>{name}</h3>
           <RestaurantReviews match={props.data.match}/>
        </div>

     );
}

export default RestaurantProfile;
