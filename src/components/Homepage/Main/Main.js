import React, { Component } from 'react';
import './Main.scss';
import { connect } from 'react-redux';
import { setRestaurantList, setCityId, setSearchInput } from '../../../redux/restaurantReducer';
import { setUser, setFavorites } from '../../../redux/userReducer';
import { Link } from 'react-router-dom'

class Main extends Component {
  componentDidMount() {
      this.props.setUser();
      setTimeout(() => {
          if(this.props.user) {
              this.props.setFavorites(this.props.user.id || 0);
          }
      }, 500)
  }
    handleSearch = () => {
        this.props.setRestaurantList(this.props.searchInput, this.props.cityId, this.props.history)
    }
    render() {
        let { setRestaurantList, setCityId, setSearchInput, searchInput, cityId } = this.props
        return (
            <div className="homepage">
              <div className="homepageoverlay">
                <h1>Schtuffed</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <span id="find">Find</span>
                    <input id="query" onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="italian, burgers, vegetarian..." />
                    <span id="near">Near</span>
                    <input id="city" onChange={(e) => setCityId(e.target.value)} type="text" placeholder="city name..." />
                    <button onClick={() => this.handleSearch()}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Antu_dialog-icon-preview.svg/512px-Antu_dialog-icon-preview.svg.png" /></button>
                </form>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Main);
