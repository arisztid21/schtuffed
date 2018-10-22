import React, { Component } from 'react';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'schtuffed';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/arisztid21/image/upload'

export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            quantity: '',
            products: []
        }
    }

    componentDidMount(file){
        axios.get('/api/upload').then(response => {
            let formData = new FormData();
            formData.append('signature', response.data.signature)
            formData.append('api_key', '774296625574526')
            formData.append('timestamp', response.data.timestamp)
            formData.append('file', file[0]);
            console.log(response.data)
            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
                console.log('cloud response----',response)
                    this.setState({
                        products: response.data.secure_url
                    })
        })
        }).catch(err => console.log('problem with uploading image file shop component', err))
    }
    render() {
        let product = this.state.products.map(e => {
            return<div>
                <img src={e.item_image}/>
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