import React from 'react';
import Fetch from '../Hooks/fetch';
import './Members.css';

const Members = () => {
    const { data, error, loading } = Fetch(`https://thawing-mountain-56993.herokuapp.com/user/list`)
    console.log(data, error, loading)
    return (
        <>
            <div className="members my-5">
                <h1 className="text-center">Honarable Members</h1>
                {loading ?
                    <div className="d-flex align-items-center justify-content-center p-5">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                    :
                    <div className="mem-list p-5">
                        <div className="row d-flex align-items-center justify-content-center">
                            {data.map(user =>
                                <div className="text-center">
                                    <div key={user._id} className="memDetails">
                                        <img className="m-2" src={user.avatar} alt="" width="150px" />
                                        <p>{user.name.toUpperCase()}</p>
                                    </div>
                                </div>)}
                        </div>
                    </div>}
            </div>
        </>
    );
};

export default Members;