import React from 'react';
import { FaUserFriends, FaRegAddressCard, FaDollarSign } from 'react-icons/fa';
import UseFetch from '../../Hooks/UseFetch';

const Dashboard = () => {
    const logOut = () => {
        localStorage.removeItem('user')
        window.location = "/admin"
    }
    const { data } = UseFetch('http://localhost:5000/admin/pendingUserCount')

    return (
        <div className="p-5">
            <div className="d-flex justify-content-center">
                <h3>Welcome,</h3>
                <button onClick={logOut} type="button" className="btn btn-danger ml-3" style={{ float: 'right' }}>Log Out</button>
            </div>

            <div className="p-5">

                <div className="text-center">

                    <a href="/all-Members">
                        <button type="button" className="btn btn-primary "><FaUserFriends className="mb-1" /> All Members</button>
                    </a>

                    <a href="/">
                        <button type="button" className="btn btn-success ml-2"><FaRegAddressCard className="mb-1" /> Add Events</button>
                    </a>

                    <a href="/">
                        <button type="button" className="btn btn-info ml-2"><FaDollarSign className="mb-1" /> Payments </button>
                    </a>

                    <a href="/pending-users">
                        <button type="button" className="btn btn-warning text-white ml-2">
                            <span className="badge bg-secondary mr-2">{data}</span>
                        Pending Requests
                        </button>
                    </a>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;