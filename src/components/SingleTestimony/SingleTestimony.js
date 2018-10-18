import React from 'react';
import axios from 'axios'

const SingleTestimony = (props) => {



    console.log(props);
<<<<<<< HEAD
    return (
        <React.Fragment>
            Single Testi
            <button onClick={() => props.deleteTestimony(props.id)}>Delete Button</button>
=======
    let { title, ratings, description, date_posted } = props;
    return ( 
        <React.Fragment>
            <h4>{title}</h4>
            <h4>{date_posted}</h4>
            <h4>{ratings}</h4>
            <p>{description}</p>
>>>>>>> b075b1cf06e8bb494daf3302496ae33d551a991a
        </React.Fragment>
     );
}

export default SingleTestimony;
