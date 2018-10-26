import React from 'react';
import axios from 'axios'

const SingleTestimony = (props) => {

    console.log(props)
    let { title, ratings, description, date_posted, stateTitle, stateRating, stateDescription, toggleEdit, editedTestimony } = props;
    return (
        <div>


            <input name="title" type="text" value={toggleEdit && props.id == editedTestimony ? stateTitle : title} onChange={(e) => props.handleChange(e)} />
            <span>{date_posted}</span>
            <input name="rating" type="text" value={toggleEdit && props.id == editedTestimony ? stateRating : ratings} onChange={(e) => props.handleChange(e)}/>
            <input name="description" type="text" value={toggleEdit && props.id == editedTestimony ? stateDescription : description} onChange={(e) => props.handleChange(e)}/>

            {props.user && props.user_id == props.user.id ? <div className="SingleTestimonyLoggedIn">

              <button onClick={() => props.deleteTestimony(props.id)}>Delete Button</button>
              <button onClick={() => props.editTestimony(props.id, stateTitle, stateRating, stateDescription, props.user_id)}>Save Changes</button>
              <button onClick={() => props.handleToggleEdit(title, ratings, description, props.id)}>Edit</button>
              </div>
              : null
            }
            
        </div>
     );
}

export default SingleTestimony;
