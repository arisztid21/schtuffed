import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class ProfileReview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            restaurant: null
         }
    }
    componentDidMount() {
        axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.restaurant_id}`, {
            headers: {"user-key": "6ce2f2b32321de9306bcc12a5832bceb"}
        }).then(res => {
            this.setState({
                restaurant: res.data
            })
        })
        .catch(err => console.log('Err in get ProfileReview', err));
    }
    render() { 
        console.log(this.props);
        console.log('STATE', this.state);
        
        return ( 
            <div className="reviews-module">
                <div className="reviews-restaurant-thumb">
                <h2>{this.state.restaurant ? <Link to={`/restaurant-profile/${this.props.restaurant_id}`}>{this.state.restaurant.name}</Link> : 'Loading...'}</h2>
                </div>
                <div className="reviews-description">
                <h3>{this.props.ratings}</h3>
                <h2>{this.props.description}</h2>
                <img src={this.props.review_photos}/>
                </div>
            </div>
         );
    }
}
 
export default ProfileReview;