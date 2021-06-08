import React from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import UseFetch from '../../Hooks/UseFetch';

const Dashboard = () => {
    const logOut = () => {
        localStorage.removeItem('user')
        window.location = "/admin"
    }
    const { data: pending } = UseFetch('https://thawing-mountain-56993.herokuapp.com/admin/pendingUserCount')
    const { data: active } = UseFetch('http://localhost:5000/admin/allUsersCount')

    return (
        <div className="p-5">
            <div className="d-flex justify-content-center">
                <h3>Welcome,</h3>
                <button onClick={logOut} type="button" className="btn btn-danger ml-3" style={{ float: 'right' }}>Log Out</button>
            </div>

            <div className="p-5">

                <div className="text-center">

                    <a href="/all-Members">
                        <button type="button" className="btn btn-primary ">
                            <span className="badge bg-secondary mr-2">{active}</span>
                        All Members
                        </button>
                    </a>

                    <a href="/addEvent">
                        <button type="button" className="btn btn-success ml-2"><FaRegAddressCard className="mb-1" /> Add Events</button>
                    </a>

                    <a href="/pending-users">
                        <button type="button" className="btn btn-warning text-white ml-2">
                            <span className="badge bg-secondary mr-2">{pending}</span>
                        Pending Requests
                        </button>
                    </a>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;