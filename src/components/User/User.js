import React from 'react';
import { userData } from '../../App';
import UserTrans from '../UserTrans/UserTrans';
import './User.css'
import { FaDatabase,FaFunnelDollar } from "react-icons/fa";

const User = () => {
    const logOut = () => {
        localStorage.removeItem('user')
        window.location = "/"
    }
    return (
        <div className="container my-5">
            <div className="user">
                <button onClick={logOut} type="button" className="btn btn-danger" style={{ float: 'right' }}>Log Out</button>

                <div className="d-flex justify-content-center align-items-center">
                    <a href={"/payment/fund/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}>
                        <button type="button" className="btn btn-success "><FaFunnelDollar  className="mb-1"/> Add Fund</button>
                    </a>
                    <a href={"/payment/savings/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}>
                        <button type="button" className="btn btn-primary  ml-5"><FaDatabase  className="mb-1"/> Add Saving</button>
                    </a>
                </div>
                <UserTrans />
            </div>
        </div>
    );
};

export default User;