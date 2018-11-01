import React from 'react';
import RestaurantReviews from '../RestaurantReviews/RestaurantReviews'
import Favoritebutton from '../FavoriteButton/FavoriteButton';
import './RestaurantProfile.scss'

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
    console.log(restaurant.restaurant.user_rating);
    let { thumb, name, cuisines, price_range, user_rating} = restaurant.restaurant;

    return (
        <div className="RestaurantProfile">
          <div className="RestaurantProfileSecondary">
            <div className="RestaurantProfileMain">
              <h1>{name}</h1>

                <div className="RestaurantProfileDirectory">
                  <div className="RestaurantProfileRatings">
                    <h2>Ratings: {user_rating.aggregate_rating}</h2>
                    <h2>{price_range == 1 ? '$' : price_range == 2 ? '$$' : price_range >= 3 ? '$$$$' : ''} - {cuisines}</h2>
                  </div>
                    {user
                       &&
                      <div className="RestaurantProfileLinks">
                        <Favoritebutton restaurant={restaurant} setFavorites={setFavorites} favoriteRestaurants={favoriteRestaurants} user={user}/>
                      </div>
                    }
              </div>

              <div className="RestaurantProfileHeader">
                <div className="RestaurantProfilePhoto">
                  <img src={thumb} alt={name} />
                </div>
                <div className="RestaurantProfileMap">
                  <h2>Insert Map Here</h2>
                </div>
              </div>
            </div>
          </div>



          <div className="RestaurantProfileReviews">
            <div className="RestaurantProfileReviewsSecondary">
              <div className="RestaurantProfileReviewsDirectory">
                <h1>Reviews</h1>
                <div className="RestaurantProfileReviewButton">
                  <button>Write a Review</button>
                </div>
              </div>

              <div className="RestaurantProfileReviewsDisplayed">
                <RestaurantReviews match={props.data.match}/>
              </div>

              </div>
            </div>
          </div>
    );
}

export default RestaurantProfile;
