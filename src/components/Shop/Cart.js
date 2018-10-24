import React, { Component } from 'react';
import axios from 'axios';

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }
    // componentDidMount() {
    //     ax
    // }
    checkOut = () => {
        axios.post('/api/shop/checkout').then(res => 
            console.log('res', res)
        )
    }

    render() {
        return (
            <div>
                <button onClick={() => this.checkOut()}>checkout bitch</button>
                Cart is being tested to render here. does it work or not?!?!?!??!?!?!?!?!?!?!?!?!
            </div>
        );
    }
}