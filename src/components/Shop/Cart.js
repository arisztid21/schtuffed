import React, { Component } from 'react';
import axios from 'axios';

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        axios.get('/api/shop/cart').then(res => {
            console.log('data', res.data)
            this.setState({
                user: res.data
            })
        })
    }
    checkOut = () => {
        axios.post('/api/shop/checkout').then(res => 
            console.log('res', res)
        )
    }

    render() {
        console.log('user', this.state.user)
        if(this.state.user)
            {var userCart = this.state.user.cart.map(e => {
            return <div key={e.id}>
                <div>{e.item_name}</div>
                <div>${e.item_price}</div>
                <div>QTY: {e.quantity}</div>
            </div>
        })}
        return (
            <div>
                {userCart}
                <div>total: {this.state.user && this.state.user.total}</div>
                <button onClick={() => this.checkOut()}>checkout bitch</button>
                Cart is being tested to render here. does it work or not?!?!?!??!?!?!?!?!?!?!?!?!
            </div>
        );
    }
}