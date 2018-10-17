import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';
import { setUser } from '../../redux/userReducer';

class Homepage extends Component {
    componentDidMount() {
        this.props.setUser();
    //     let timestamp = Math.round((new Date()).getMonth());
    // console.log(timestamp);
    }
    handleSearch = () => {
        this.props.setRestaurantList(this.props.searchInput, this.props.cityId, this.props.history)
    }
    render() {
        let { setRestaurantList, setCityId, setSearchInput, searchInput, cityId } = this.props
        return (
            <React.Fragment>
                <h1>Welcome to SCHTUFFED.COM </h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="italian, burgers, vegetarian..." />
                    <input onChange={(e) => setCityId(e.target.value)} type="text" placeholder="city or zip..." />
                    <button onClick={() => this.handleSearch()}><span role="img">&#x1F50E;</span></button>
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
    setSearchInput, setUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
