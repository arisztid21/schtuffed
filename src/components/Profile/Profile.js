import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userProfile: null
         }
    }
    render() { 
        return ( 
            <div>
                Profile
            </div>
         );
    }
}
 
export default Profile;