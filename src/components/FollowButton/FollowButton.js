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
    let { id, addFollower, user } = props;
    return ( 
        <>
            <button onClick={() => addFollower(user.id, id)}>Follow</button>
        </>
     );
}

const mapStateToProps = state => {
    let { user } = state.users
    return {
        user
    }
}
const mapDispatchToProps = {
    addFollower
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);