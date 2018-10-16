import React from 'react';
const FavoriteButton = (props) => {
    console.log(props);
    let { restaurant, setFavorites, user } = props;
    // const handleFavorite = () => {
    // Method from Redux
    // }
    return ( 
        <React.Fragment>
        <button onClick={() => setFavorites(user.id, restaurant.restaurant)}>Save Restaurant</button>
        </React.Fragment>
     );
}
 
export default FavoriteButton;