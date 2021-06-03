import React from 'react';
import { getUser } from '../../Utils/Common';

function Home() {
    return (
        <div>
            <h1 style={{color: 'yellow', textAlign: 'center'}} >Welcome {getUser().name}!</h1>
            {/* <h1 className='info'>Search, Tag and Rate Books to help students.</h1> */}
        </div>
    );
}

export default Home;