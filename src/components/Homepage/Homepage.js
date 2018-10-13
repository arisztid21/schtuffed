import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRestaurantList} from '../../redux/restaurantReducer';

class Homepage extends Component {
    componentDidMount() {
        this.props.setRestaurantList();
    }
    render() { 
        // let { setRestaurants } = this.props
        return ( 
            <React.Fragment>
                <h1>Welcome to SCHTUFFED.COM this is APP.js</h1>
            </React.Fragment>
         );
    }
}
 const mapStateToProps = state => {
     let { restaurantList } = state.restaurants;
     return {
         restaurantList
     }
 }

export default connect(mapStateToProps, {setRestaurantList})(Homepage);