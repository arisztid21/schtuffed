import React, { Component } from 'react';
import Dropzone from "react-dropzone";
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'schtuffed';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/arisztid21/image/upload'

export default class CreateReview extends Component {
    constructor(){
        super();
        this.state={
            review_photos: ''
        }
    }

    handleImageUpload = (file) => {
        axios.get('/api/upload').then(response => {
            let formData = new FormData();
            formData.append('signature', response.data.signature)
            formData.append('api_key', '774296625574526')
            formData.append('timestamp', response.data.timestamp)
            formData.append('file', file[0]);
            console.log(response.data)
            for(var pair of formData.entries()) {
                     console.log(pair); 
                  }
            axios.post(CLOUDINARY_UPLOAD_URL, formData, response.data.secure_url).then(response => {
                console.log(response)
                this.setState({
                    review_photos: response.data.secure_url
                })
        })
        }).catch(err => console.log('problem with uploading image file', err))
    }

    render() {
        return (
            <div>
                {
                this.state.review_photos
                ?
                <div>
                    <img src={this.state.review_photos} alt='cloudinary image'/>
                    <Dropzone
                            multiple={false}
                            accept='image/*'
                            onDrop={this.handleImageUpload}>
                        <p>Again</p>
                    </Dropzone>
                </div>
                :
                <div>
                    <Dropzone
                            multiple={false}
                            accept='image/*'
                            onDrop={this.handleImageUpload}>
                        <p>Upload</p>
                    </Dropzone>
                </div>
                }
            </div>
        );
    }
}