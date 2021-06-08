import moment from 'moment';
import React, { useState } from 'react';
import { FaDollarSign, FaUserNinja } from 'react-icons/fa';
import Fetch from '../../Hooks/fetch';
import Preloader from '../../Preloader/Preloader';
import { userData } from '../../../App';

const ShowEvents = () => {
    const [show, setShow] = useState('active')
    const { data, loading } = Fetch(`http://localhost:5000/admin/getEvent/${show}`)
    console.log(data)
    const [status, setStatus] = useState(null)
    const handleActive = (id) => {
        fetch(`http://localhost:5000/event/actionEvent/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ status: status })
        })
            .then(res => res.json())
            .then(data => {
            })
    }
    return (
        <div className="events p-5">
            <h3 className="text-center"><b>All Events</b></h3>



         Show Events:
            <span className="ml-2">
                <select name="status" className="pl-3 pr-3 pt-2 pb-1 mt-1 bg-info text-white" onChange={(e) => setShow(e.target.value)} >
                    <option className="text-white" value="active">Active</option>
                    <option className="text-white" value="finished">Finished</option>
                </select>
            </span>

            {loading ? '' : data.length === 0 && <div className="text-center"><p className="mt-5"><FaUserNinja style={{ fontSize: '2rem' }} />No {show} Events Found</p></div>}
            {loading ? <Preloader />
                :
                <div className="row mt-5">
                    {data.map(ev =>
                        <>
                            <div className="col-md-3 p-3" key={ev._id}>
                                <img src={require("../../../img/sadaqah.jpg").default} alt="sadaqah" className="img-fluid" />
                            </div>
                            <div className="col-md-8 p-3">

                                <h1>{ev.name} </h1>
                                <p>Deadline: {moment(ev.date).format("MMM Do YY")} <span className="badge rounded-pill bg-warning ml-3"> {moment(ev.date).diff(moment(new Date()), 'days')} days</span></p>
 
                                <span>
                                    <select name="status" className="pl-3 pr-3 pt-2 pb-1 mt-1 mb-2 bg-info text-white" onClick={(e) => setStatus(e.target.value)} onChange={() => handleActive(ev._id)} >
                                        <option className="text-white" value="active">Active</option>
                                        <option className="text-white" value="finished">Finished</option>
                                    </select>
                                </span>
                                <br></br>
                                <a href={"/eventDetails/" + ev._id + "/" + ev.name.replace(/\s/g, '-')}>
                                    <button className="btn btn-success"><FaDollarSign className="mb-1" /> Details </button>
                                </a>

                            </div>
                        </>)}
                </div>}

        </div >
    );
};

export default ShowEvents;