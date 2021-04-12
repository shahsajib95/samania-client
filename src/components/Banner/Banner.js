import React from 'react';

const Banner = () => {
    return (
        <div className="text-center container p-5" style={{height: '300px'}}>
            <h1>Welcome to As Habus Samaniyyah</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
            <a href="/register"><button type="button" className="btn btn-success  btn-lg">Register</button></a>
        </div>
    );
};

export default Banner;