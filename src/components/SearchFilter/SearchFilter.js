import React from 'react';
import './SearchFilter.css'
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
        <div className="searchfilter-container">
            <div className="searchfilter-header">
              Search Results - include search and city searched.
            </div>
            <div className="searchfilter-main">
              <div className="searchfilter-sortby">
                <h1>Sort By</h1>
                <button onClick={sortHighest}>Highest Rated</button>
                <button onClick={sortLowest}>Lowest Rated</button>
              </div>
              <div className="searchfilter-distance">
                <h1>Distance</h1>
                <h2>Driving (5 mi.)</h2>
                <h2>Biking (2 mi.)</h2>
                <h2>Walking (1 mi)</h2>
              </div>
              <div className="searchfilter-price">
                <h1>Price</h1>
                <button onClick={sortPriceOne}>$</button>
                <button onClick={sortPriceTwo}>$$</button>
                <button onClick={sortPriceThree}>$$$</button>
                <button onClick={sortPriceFour}>$$$$</button>
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
