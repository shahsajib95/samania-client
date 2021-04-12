import React from 'react';
import { userData } from '../../App';
import UserTrans from '../UserTrans/UserTrans';
import './User.css'
const User = () => {
    const logOut = () => {
        localStorage.removeItem('user')
        window.location = "/"
    }
    return (
        <div className="container user p-3">
            <button onClick={logOut} type="button" className="btn btn-danger" style={{ float: 'right' }}>Log Out</button>
            <a href={"/payment/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}><button type="button" className="btn btn-success">Submit Payment Details</button></a>

            <UserTrans />

        </div>
    );
};

export default User;