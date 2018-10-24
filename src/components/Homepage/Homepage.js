import React, { Component } from 'react';
import './homepage.scss';
import { connect } from 'react-redux';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';
import { setUser, setFavorites } from '../../redux/userReducer';
import { Link } from 'react-router-dom'

class Homepage extends Component {
    componentDidMount() {
        this.props.setUser();
        setTimeout(() => {
            this.props.setFavorites(this.props.user.id || 0);
        }, 500)
    }
    handleSearch = () => {
        this.props.setRestaurantList(this.props.searchInput, this.props.cityId, this.props.history)
    }
    render() {
        let { setRestaurantList, setCityId, setSearchInput, searchInput, cityId } = this.props
        return (
            <div className="homepage">
                <h1>Schtuffed</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <span id="find">Find</span>
                    <input id="query" onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="italian, burgers, vegetarian..." />
                    <span id="near">Near</span>
                    <input id="city" onChange={(e) => setCityId(e.target.value)} type="text" placeholder="city name..." />
                    <button onClick={() => this.handleSearch()}><span role="img">&#x1F50E;</span></button>
                </form>

            </div>
         );
    }
}
 const mapStateToProps = state => {
     let { restaurantList, searchInput, cityId } = state.restaurants;
     let { user } = state.users;
     return {
         restaurantList,
         searchInput,
         cityId,
         user
     }
 }
const mapDispatchToProps = {
    setRestaurantList,
    setCityId,
    setSearchInput,
    setUser,
    setFavorites
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
