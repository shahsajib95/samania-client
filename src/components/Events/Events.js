import moment from 'moment';
import React, { useState } from 'react';
import { FaDollarSign, FaLocationArrow, FaUserNinja } from 'react-icons/fa';
import Fetch from '../Hooks/fetch';
import Preloader from '../Preloader/Preloader';

const Events = () => {


    const [show, setShow] = useState('active')
    const { data, loading } = Fetch(`http://localhost:5000/admin/getEvent/${show}`)

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
                            <div className="col-md-3 p-3">
                                <img src={require("../../img/sadaqah.jpg").default} alt="sadaqah" className="img-fluid" />
                            </div>
                            <div key={ev._id} className="col-md-8 p-3">

                                <h1>{ev.name} </h1>
                                <p><FaLocationArrow className="mr-2" />{ev.place}
                                    {ev.status === "active" && <span className="badge rounded-pill bg-success ml-3">{ev.status}</span>}
                                    {ev.status === "finished" && <span className="badge rounded-pill bg-secondary ml-3">{ev.status}</span>}
                                </p>
                                <p>Target: {ev.people}</p>
                                <h4>{ev.amount} tk</h4>
                                <p>{ev.description}</p>
                                <p>Deadline: {moment(ev.date).format("MMM Do YY")} <span className="badge rounded-pill bg-warning ml-3"> {moment(ev.date).diff(moment(new Date()), 'days')} days</span></p>
                                {ev.status === "active" &&
                                    < a href={"/eventDetails/" + ev._id + "/" + ev.name.replace(/\s/g, '-')}>
                                        <button  className="btn btn-success"><FaDollarSign className="mb-1" /> Details </button>
                                    </a>}

                            </div>
                        </>)}
                </div>}

        </div >
    );
};

export default Events;