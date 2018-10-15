import React from 'react';
import { connect } from 'react-redux';
import SearchResults from '../SearchResults/SearchResults';
import SearchFilter from '../SearchFilter/SearchFilter';
import RestaurantProfile from '../RestaurantProfile/RestaurantProfile';

const SearchResultsContainer = (props) => {
    console.log('SearchResultsContainer ====>',props);
    const searchFilter = withRestaurantData(SearchFilter, {...props});
    const searchResults = withRestaurantData(SearchResults, {...props});
    const restaurantProfile = withRestaurantData(RestaurantProfile, {...props});
    console.log(restaurantProfile);
    
    return ( 
        <React.Fragment>
            {props.match.path == '/search/results' && <>{searchFilter}{searchResults}</>}
            {props.match.path == '/restaurants/:id' && restaurantProfile}
        </React.Fragment>
     );
}

const mapStateToProps = state => {
    let { restaurantList } = state.restaurants;
    return {
        restaurantList
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);

function withRestaurantData(WrappedComponent, data) {
    return <WrappedComponent data={data} />
}