import React from 'react';
import { getUser } from '../../Utils/Common';

function Home() {
    return (
        <div>
            <h1 style={{color: 'yellow', textAlign: 'center'}} >Welcome {getUser().name}!</h1>
            {/* <h1 className='info'>Search, Favorite, Order Books at your fingertips. No more hassle.</h1> */}
        </div>
    );
}

export default Home;