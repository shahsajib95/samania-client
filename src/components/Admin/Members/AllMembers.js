import moment from 'moment';
import React, { useState } from 'react';
import UseFetch from '../../Hooks/UseFetch';
import './AllMembers.css'
import { FaSearchengin } from "react-icons/fa";
import Preloader from '../../Preloader/Preloader';

const AllMembers = () => {
    const { data, loading } = UseFetch('https://thawing-mountain-56993.herokuapp.com/admin/allUsers')

    const [user, setUser] = useState([])

    console.log(user)

    const handleSearch = (value) => {
        setUser(data.filter(user => user.name.toLowerCase().includes(value.toLowerCase())))
    }


    return (
        <div className="p-5 userPending">
            <h2 className="p-2 text-center"><b>All Users</b></h2>

            <div className="input-group mb-3 p-5">
                <span className="input-group-text"><FaSearchengin /></span>
                <input className="form-control p-3" onChange={(e) => handleSearch(e.target.value)} type="search" placeholder="Search" />
            </div>

            {loading ?
                <Preloader />
                :
                <div className="row">

                    {user.length === 0 ?
                        <>
                            {data.map(user =>
                                <div key={user.id} className="col-md-4 p-2">
                                    <div className="bg-success text-white">
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
                                            <p><b>Adress</b>
                                                <span className="text-des">{user.adress}</span>
                                            </p>
                                            <p><b>Join Date:</b>
                                                <span className="text-des">{moment(user.createdAt).format("MMM Do YY")}</span>
                                            </p>


                                        </div>
                                        <a href={"/paid/" +user.id+ "/" +user.name.replace(/\s/g, '-')}>
                                            <div className="card-footer text-center text-white">
                                                <p>Payment Data</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>)}
                        </>
                        :
                        <>
                            {user.map(user =>
                                <div key={user.id} className="col-md-4">
                                    <div className="bg-success text-white">
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
                                            <p><b>Join Date:</b>
                                                <span className="text-des">{moment(user.createdAt).format("MMM Do YY")}</span>
                                            </p>


                                        </div>
                                        <a href={"/paid/" +user.id+ "/" +user.name.replace(/\s/g, '-')}>
                                            <div className="card-footer text-center text-white">
                                                <p>Payment Data</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>)}
                        </>
                    }


                </div>}
        </div>
    );
};

export default AllMembers;