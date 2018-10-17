import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRestaurantList, setCityId, setSearchInput } from '../../redux/restaurantReducer';
import { setUser } from '../../redux/userReducer';
import { Link } from 'react-router-dom'

class Homepage extends Component {
    componentDidMount() {
        this.props.setUser();
    //     let timestamp = Math.round((new Date()).getMonth());
    // console.log(timestamp);
    // const date = new Date();
    //     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    //     const dateString = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    //     console.log('DATE',dateString)
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

                <Link to={'/testimonies'}><h3>What are people saying about Schtuffed?</h3></Link>

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
