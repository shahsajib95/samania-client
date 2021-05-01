import moment from 'moment';
import React from 'react';
import UseFetch from '../../Hooks/UseFetch';
// import { FaChild } from "react-icons/fa";
import './PendingUsers.css'

const PendingUsers = () => {
    const { data, loading, error } = UseFetch('http://localhost:5000/admin/pendingUser')
    console.log(data, loading, error)
    return (
        <div className="p-5 userPending">
            <h2 className="p-2 text-center"><b>Pending Users</b></h2>
            {loading ?
                <div className="spinner-border text-primary  mt-3" role="status">
                    <span className="visually-hidden"></span>
                </div>
                :
                <div className="row">
                    {data.map(user =>
                        <div key={user.id} className="col-md-4">
                            <div className="bg-warning text-white">
                                <div className="card-header ">
                                    Status: <span>{user.status}</span>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img src={user.avatar} alt="user" className="img-fluid p-3" width="150px" />
                                </div>
                                <div className="card-body">
                                    <p><b>Name:</b>
                                        <span className="text-des">{user.name}</span>
                                    </p>

                                    <p><b>Email:</b>
                                        <span className="text-des">{user.email}</span>
                                    </p>

                                    <p><b>Profession:</b>
                                        <span className="text-des">{user.profession}</span>
                                    </p>

                                    <p><b>Age:</b>
                                        <span className="text-des">{user.age}</span>
                                    </p>

                                    <p><b>Father/Husband:</b>
                                        <span className="text-des">{user.fatherOrHusband}</span>
                                    </p>

                                    <p><b>Mother/Wife:</b>
                                        <span className="text-des">{user.motherOrWife}</span>
                                    </p>

                                </div>
                                <div className="card-footer text-center text-white">
                                    {moment(user.createdAt).fromNow()}
                                </div>
                            </div>
                        </div>)}
                </div>}
        </div>
    );
};

export default PendingUsers;