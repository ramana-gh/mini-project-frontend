import React from 'react';
import axios from 'axios';

function Home(props) {

    const message = () => {
        axios.post('https://department-library.herokuapp.com/admin/test').then(response => {
            alert(response.data.test);
            props.history.push('/about');
        }).catch(error => {
            if (error) alert("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            <button onClick={message}>Click me!</button>
            <h1 className='info'>An interface for RGUKT Basar library.</h1>
            <h2 className='info'>Students: Search, Favorite and Order Books at your fingertips. No more hassle.</h2>
            <h2 className='info'>Faculty: Search, Tag and Rate Books to help students.</h2>
            <h2 className='info'>Admin: Manage Books and Orders</h2>
        </div>
    );
}

export default Home;