import React from 'react';
import { connect } from 'react-redux';
import { addFavorites, setFavorites } from '../../redux/userReducer';
import { setHighestRating, setLowestRating, setPriceOne, setPriceTwo, setPriceThree, setPriceFour } from '../../redux/restaurantReducer';
import SearchResults from '../SearchResults/SearchResults';
import SearchFilter from '../SearchFilter/SearchFilter';
import RestaurantProfile from '../RestaurantProfile/RestaurantProfile';


const SearchResultsContainer = (props) => {
    console.log('SearchResultsContainer ====>',props);
    const searchFilter = withRestaurantData(SearchFilter, {...props});
    const searchResults = withRestaurantData(SearchResults, {...props});
    const restaurantProfile = withRestaurantData(RestaurantProfile, {...props});

    return (
        <React.Fragment>
            {props.match.path == '/search/results' ? props.isLoading ? <h1>Loading</h1> : <>{searchFilter}{searchResults}</> : null}
            {props.match.path == '/restaurant-profile/:id' && restaurantProfile}
        </React.Fragment>
     );
}

const mapStateToProps = state => {
    let { restaurantList, isLoading } = state.restaurants;
    let { user, favoriteRestaurants } = state.users;
    return {
        restaurantList,
        user,
        isLoading,
        favoriteRestaurants
    }
}

const mapDispatchToProps = {
    addFavorites,
    setFavorites,
    setHighestRating,
    setLowestRating,
    setPriceOne,
    setPriceTwo,
    setPriceThree,
    setPriceFour
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);

function withRestaurantData(WrappedComponent, data) {
    return <WrappedComponent data={data} />
}
