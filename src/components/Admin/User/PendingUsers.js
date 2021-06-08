import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { userData } from '../../../App';
import { FaUserNinja } from "react-icons/fa";
import './PendingUsers.css'
import Preloader from '../../Preloader/Preloader';

const PendingUsers = () => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState([])

    const getPendingUser = useCallback(() => {
        setLoading(true)
        fetch('https://thawing-mountain-56993.herokuapp.com/admin/pendingUser', {
            method: 'GET',
            headers: {
                authorization: userData.token
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        getPendingUser()
    }, [getPendingUser])

    const [status, setStatus] = useState(null)

    const handleActive = (id) => {
        fetch(`http://localhost:5000/admin/activeUser/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ status: status })
        })
            .then(res => res.json())
            .then(data => {
                getPendingUser()
            })
    }

    return (
        <div className="p-5 userPending">
            <h2 className="p-2 text-center"><b>Pending Users</b></h2>
            {loading ? '' : user.length === 0 && <p className="text-center mt-5 text-warning"><FaUserNinja style={{ fontSize: '2rem' }} />No User Found</p>}
            {loading ?
                <Preloader />
                :
                <div className="row">
                    {user.map(user =>
                        <div key={user.id} className="col-md-4 p-2">
                            <div className="bg-secondary text-white">

                                <div className="card-header">
                                    <span className="ml-2">
                                        <select name="status " className="pl-3 pr-3 pt-2 pb-1 mt-1 bg-info text-white" onClick={(e) => setStatus(e.target.value)} onChange={() => handleActive(user.id)}>
                                            <option defaultValue={user.status === 'pending'} className="text-white" value="pending">Pending</option>
                                            <option defaultValue={user.status === 'active'} className="text-white" value="active">Active</option>
                                        </select>
                                    </span>
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

                                    <p><b>Adress</b>
                                        <span className="text-des">{user.adress}</span>
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