import React from 'react';
import './SearchFilter.scss'
import {connect} from 'react-redux'
import axios from 'axios'
import { setPriceOne, setPriceTwo, setPriceThree, setPriceFour } from '../../redux/restaurantReducer'

const SearchFilter = (props) => {
    console.log(props);

    const sortHighest = () => {
      axios.get('https://developers.zomato.com/api/v2.1/search?q=Italian&count=3&sort=rating&order=desc', {
          headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
      }).then(res => {
        props.data.setHighestRating(res.data.restaurants)
        console.log(res.data.restaurants)
      })
    }

    const sortLowest = () => {
      axios.get('https://developers.zomato.com/api/v2.1/search?q=Italian&count=3&sort=rating&order=asc', {
          headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
      }).then(res => {
        props.data.setLowestRating(res.data.restaurants)
        console.log(res.data.restaurants)
      })
    }

    const sortPriceOne = () => {
      axios.get('https://developers.zomato.com/api/v2.1/search?q=Italian&count=3&sort=rating&order=desc', {
          headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
      }).then(res => {
        props.data.setPriceOne(res.data.restaurants)
        console.log(res.data.restaurants)
      })
    }

    const sortPriceTwo = () => {
      axios.get('https://developers.zomato.com/api/v2.1/search?q=Italian&count=3&sort=rating&order=desc', {
          headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
      }).then(res => {
        props.data.setPriceTwo(res.data.restaurants)
        console.log(res.data.restaurants)
      })
    }

    const sortPriceThree = () => {
      axios.get('https://developers.zomato.com/api/v2.1/search?q=Italian&count=3&sort=rating&order=desc', {
          headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
      }).then(res => {
        props.data.setPriceThree(res.data.restaurants)
        console.log(res.data.restaurants)
      })
    }

    const sortPriceFour = () => {
      axios.get('https://developers.zomato.com/api/v2.1/search?q=Italian&count=3&sort=rating&order=desc', {
          headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
      }).then(res => {
        props.data.setPriceFour(res.data.restaurants)
        console.log(res.data.restaurants)
      })
    }


    return (
        <div className="SearchFilter">
          <div className="SearchFilterSecondary">
            <div className="SearchFilterHeader">
              <h1>Best Restaurants in {props.restaurantList[0].restaurant.location.city}</h1>
            </div>
            <div className="SearchFilterMain">
              <div className="SearchFilterSortBy">
                <h1>Sort By</h1>
                <button id="leftborder" onClick={sortHighest}>Highest Rated</button>
                <button id="rightborder" onClick={sortLowest}>Lowest Rated</button>
              </div>
              <div className="SearchFilterPrice">
                <h1>Price</h1>
                <button id="leftborder" onClick={sortPriceOne}>$</button>
                <button onClick={sortPriceTwo}>$$</button>
                <button onClick={sortPriceThree}>$$$</button>
                <button id="rightborder" onClick={sortPriceFour}>$$$$</button>
              </div>
            </div>
          </div>
        </div>
     );
}

const mapStateToProps = state => {
  let {restaurantList} = state.restaurants
  return {
    restaurantList
  }
}

const mapDispatchToProps = {
  setPriceOne,
  setPriceTwo,
  setPriceThree,
  setPriceFour
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)
