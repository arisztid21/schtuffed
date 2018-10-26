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
        if(this.state.restaurant) {
            var { name, thumb, location, price_range} = this.state.restaurant;
        }
        return ( 
            <div className="reviews-module">
                <div className="reviews-restaurant-thumb">
                {this.state.restaurant ?
                    <>
                        <img src={thumb} alt={name} />
                        <div>
                            <h2><Link to={`/restaurant-profile/${this.props.restaurant_id}`}>{name}</Link></h2>
                            <p>{price_range == 1 ? '$' : price_range == 2 ? '$$' : price_range >= 3 ? '$$$$' : ''}</p>
                            <p>{location.address}</p>
                        </div>
                    </> : 'Loading...'}
                </div>
                <div className="reviews-description">
                    <h2>Rating: {this.props.ratings}.0 <span>{this.props.date_posted}</span></h2>
                    <p>{this.props.description}</p>
                    <img src={this.props.review_photos}/>
                </div>
            </div>
         );
    }
}
 
export default ProfileReview;