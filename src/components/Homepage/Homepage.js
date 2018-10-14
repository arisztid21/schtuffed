import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';

class Homepage extends Component {
    componentDidMount() {
        // this.props.setRestaurantList();
    }
    render() { 
        let { setRestaurantList, setCityId, setSearchInput, searchInput, cityId } = this.props
        return ( 
            <React.Fragment>
                <h1>Welcome to SCHTUFFED.COM this is APP.js</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="italian, burgers, vegetarian..." />
                    <input onChange={(e) => setCityId(e.target.value)} type="text" placeholder="city or zip..." />
                    <button onClick={() => setRestaurantList(searchInput, cityId)}>&#x1F50E;</button>
                </form>
            </React.Fragment>
         );
    }
}
 const mapStateToProps = state => {
     let { restaurantList, searchInput, cityId } = state.restaurants;
     return {
         restaurantList,
         searchInput,
         cityId
     }
 }
const mapDispatchToProps = {
    setRestaurantList,
    setCityId,
    setSearchInput
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);