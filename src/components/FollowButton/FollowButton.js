import React from 'react';
import { connect } from 'react-redux';
import { addFollower } from '../../redux/userReducer';
const FollowButton = (props) => {
    //Render a button per profile in the review component
    //Each button has an onClick method taking in that profile's id
    //Each id is a reference to the profile id?
    // const addFollower = (id) => {
    //     console.log(id);
        
    //     //Filler - method will come from redux via props
    // }
    let { id, addFollower, user, followers } = props;
    console.log(id, user, followers);
    let didNotFollow;
    if (followers) {
        didNotFollow = followers.findIndex(follower => follower.id == id);
        console.log(didNotFollow);
    }
    
    return ( 
        <>
        {didNotFollow == -1 && user.id !== id ? <button onClick={() => addFollower(user.id, id)}>Follow</button> : user.id !== id ? <button>Unfollow</button> : null  }
        </>
     );
}

const mapStateToProps = state => {
    let { user, followers } = state.users
    return {
        user,
        followers
    }
}
const mapDispatchToProps = {
    addFollower
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);