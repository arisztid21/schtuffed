import React from 'react';
<<<<<<< HEAD
import RestaurantReviews from '../RestaurantReviews/RestaurantReviews'
=======
import Favoritebutton from '../FavoriteButton/FavoriteButton';
>>>>>>> 57f57d6c3894a6c432c21c977abfb165caa1f9b6


const RestaurantProfile = (props) => {
    console.log(props.data);
    let { restaurantList, setFavorites, user } = props.data
    let restaurant = restaurantList.find(place => place.restaurant.id == props.data.match.params.id);
    console.log(restaurant);
    let { thumb, name } = restaurant.restaurant;
    return (
        <React.Fragment>
            <Favoritebutton restaurant={restaurant} setFavorites={setFavorites} user={user} />
            <img src={thumb} alt={name} />
            <h3>{name}</h3>
            <RestaurantReviews />
        </React.Fragment>
     );
}

export default RestaurantProfile;
