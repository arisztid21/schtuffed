import React from 'react';
const FavoriteButton = (props) => {
    console.log(props);
    let { restaurant, addFavorites, setFavorites, favoriteRestaurants, user } = props;
    console.log(props);
    let didFavorite = favoriteRestaurants.findIndex(favRestaurant => {
        console.log(favRestaurant.restaurant.id, restaurant.restaurant.id);
        
        return favRestaurant.restaurant.id == restaurant.restaurant.id
    });
    console.log(didFavorite);
    
    return ( 
        <React.Fragment>
        {didFavorite == -1 ? <button onClick={() => addFavorites(user.id, restaurant.restaurant)}>Save Restaurant</button> :  <button>Saved</button> }
        </React.Fragment>
     );
}
 
export default FavoriteButton;