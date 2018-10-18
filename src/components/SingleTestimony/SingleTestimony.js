import React from 'react';
import axios from 'axios'

const SingleTestimony = (props) => {

    console.log(props)
    let { title, ratings, description, date_posted } = props;
    return (
        <React.Fragment>
            <h4>{title}</h4>
            <h4>{date_posted}</h4>
            <h4>{ratings}</h4>
            <p>{description}</p>
            <button onClick={() => props.deleteTestimony(props.id)}>Delete Button</button>
            <button onClick={() => props.editTestimony(props.id)}>Save Changes</button>
        </React.Fragment>
     );
}

export default SingleTestimony;
