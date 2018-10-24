import React, { Component } from 'react';
import axios from 'axios';

export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            quantity: '',
            products: []
        }
    }
    componentDidMount(){
        axios.get('/api/shop').then(response => {
                    this.setState({
                        products: response.data
                    })
        }).catch(err => console.log('problem with uploading image file shop component', err))
    }

    addToCart = (item) => {
        axios.post(`/api/shop/item`, item)
        .then(res => console.log(res))
    }

    render() {
        let product = this.state.products.map(e => {
            return<div key={e.id}>
                <div>{e.item_name}</div>
                <img src={e.item_image}/>
                <div>${e.item_price}</div>
                <button onClick={() => this.addToCart(e)}>add to cart</button>
                <button>+</button>
                <button>-</button>
            </div>
        })
        return (
            <div>
                SHOP HERE PLZ!!!!!
                {product}
            </div>
        );
    }
}