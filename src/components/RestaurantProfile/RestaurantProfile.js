import React from 'react';


const RestaurantProfile = (props) => {
    console.log(props.data);
    let { restaurantList } = props.data
    let restaurant = restaurantList.find(place => place.restaurant.id == props.data.match.params.id);
    console.log(restaurant);
    let { thumb, name } = restaurant.restaurant;
    return ( 
        <React.Fragment>
            <img src={thumb} alt={name} />
            <h3>{name}</h3>
        </React.Fragment>
     );
}
 
export default RestaurantProfile;