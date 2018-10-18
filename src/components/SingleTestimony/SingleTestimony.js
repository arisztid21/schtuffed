import React from 'react';
import axios from 'axios'

const SingleTestimony = (props) => {



    console.log(props);
    return (
        <React.Fragment>
            Single Testi
            <button onClick={() => props.deleteTestimony(props.id)}>Delete Button</button>
        </React.Fragment>
     );
}

export default SingleTestimony;
