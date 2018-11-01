import React, { Component } from 'react';
import axios from 'axios';
// import PayPalCheckout from './PayPalButton';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const CLIENT = {
    sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    // production: 'xxxXXX',
  };

//   const ENV = process.env.NODE_ENV === 'production'
//   ? 'production'
//   : 'sandbox';

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
        const onSuccess = (payment) =>
        console.log('Successful payment!', payment);

        const onError = (error) =>
        console.log('Erroneous payment OR failed to load script!', error);

        const onCancel = (data) =>
        console.log('Cancelled payment!', data);

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
                <button onClick={() => this.checkOut()}>checkout</button>
                <PaypalExpressBtn client={CLIENT} currency={'USD'} total = {this.state.user && this.state.user.total}/>
                Cart is being tested to render here. does it work or not?!?!?!??!?!?!?!?!?!?!?!?!
            </div>
        );
    }
}