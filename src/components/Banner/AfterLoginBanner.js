import React from 'react';
import { userData } from '../../App';

const AfterLoginBanner = () => {
    return (
        <div className="text-center container p-5" style={{height: '300px'}}>
            <h5>Thanks for joining,</h5>
            <h1>You are with one of the the best team...</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
            <a href={"/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}><button type="button" className="btn btn-primary  btn-lg">Show Transactions</button></a>
        </div>
    );
};

export default AfterLoginBanner;