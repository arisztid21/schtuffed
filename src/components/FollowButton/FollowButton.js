import React from 'react';

const FollowButton = (props) => {
    //Render a button per profile in the review component
    //Each button has an onClick method taking in that profile's id
    //Each id is a reference to the profile id?
    const addFollower = (id) => {
        //Filler - method will come from redux via props
    }
    
    return ( 
        <>
            <button onClick={() => addFollower(id)}>Follow</button>
        </>
     );
}
 
export default FollowButton;