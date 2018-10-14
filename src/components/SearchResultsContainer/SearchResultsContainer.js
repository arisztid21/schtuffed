import React from 'react';
import { connect } from 'react-redux';
import SearchResults from '../SearchResults/SearchResults';
import SearchFilter from '../SearchFilter/SearchFilter';

const SearchResultsContainer = (props) => {
    console.log('SearchResultsContainer ====>',props);
    const searchFilter = withRestaurantData(SearchFilter, {...props});
    const searchResults = withRestaurantData(SearchResults, {...props});
    return ( 
        <React.Fragment>
            {searchFilter}
            {searchResults}
        </React.Fragment>
     );
}

const mapStateToProps = state => {
    let { restaurantList } = state.restaurants;
    return {
        restaurantList
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);

function withRestaurantData(WrappedComponent, data) {
    return <WrappedComponent data={data} />
}