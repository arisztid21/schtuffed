import React from 'react';
import { Link } from 'react-router-dom';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import './SearchResults.scss'
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});


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
    //MAPBOX FEATURES
    let mapboxFeatures = listToMap.map(restaurantObj => {
      let { restaurant } = restaurantObj;
      return  <Feature coordinates={[restaurant.location.longitude, restaurant.location.latitude]} />
    })
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
                <h5>{restaurant.price_range == 1 ? '$' : restaurant.price_range == 2 ? '$$' : restaurant.price_range >= 3 ? '$$$$' : ''} - {restaurant.cuisines}</h5>
              </div>
            </div>
            <div className="MappedLocation">
              <h5>{restaurant.location.address}</h5>
            </div>
          </div>
        </div>
    })
    console.log('LISTOMAP ==========>', listToMap[0].restaurant.location.latitude, listToMap[0].restaurant.location.longitude);
    
    return (
        <div className="SearchResults">
          <div className="SearchResultsSecondary">
            {mappedRestaurants}
          </div>
          <div className="SearchResultsMapBox">
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              center={[listToMap[0].restaurant.location.longitude, listToMap[0].restaurant.location.latitude]}
              containerStyle={{
                height: "50vh",
                width: "30vw"
              }}
              zoom={[13]}
              >
              <Layer
                type="circle"
                id="marker"
                paint={{
                  "circle-color": "#ff5200",
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff",
                  "circle-stroke-opacity": 1
                }}
                >
                {/* <Feature coordinates={[listToMap[0].restaurant.location.longitude, listToMap[0].restaurant.location.latitude]} /> */}
                {mapboxFeatures}
              </Layer>
            </Map>
          </div>
        </div>
     );
}

export default SearchResults;

{/* <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: "calc(100vh - 130px)",
                width: "50vw"
              }}
              center={[listToMap[0].restaurant.location.longitude, listToMap[0].restaurant.location.latitude]}
              zoom={[13]}
             >
              <Layer
                type="circle"
                id="marker"
                paint={{
                  "circle-color": "#ff5200",
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff",
                  "circle-stroke-opacity": 1
                }}
              >
              {mapboxFeatures}
                {/* <Feature coordinates={[listToMap[0].restaurant.location.longitude, listToMap[0].restaurant.location.latitude]} /> */}
                {/* <Feature coordinates={[`${listToMap[1].restaurant.location.longitude}, ${listToMap[2].restaurant.location.latitude}`]} /> */}
            //   </Layer>
            // </Map> */}
