import moment from 'moment';
import React from 'react';
import { FaDollarSign, FaLocationArrow,  } from 'react-icons/fa';
import { useParams } from 'react-router';
import UseFetch from '../Hooks/UseFetch';
import Preloader from '../Preloader/Preloader';

const EventsDetails = () => {
    const {evID} = useParams();
    const { data, loading } = UseFetch(`http://localhost:5000/event/getParticularevent/${evID}`)
    return (
        <div className="dataents p-5">

        {loading ? <Preloader />
            :
            <div className="row mt-5">

                    <>
                        <div className="col-md-3">
                            <img src={require("../../img/sadaqah.jpg").default} alt="sadaqah" className="img-fluid" />
                        </div>
                        <div key={data._id} className="col-md-9">

                            <h1>{data.name} </h1>
                            <p><FaLocationArrow className="mr-2" />{data.place}
                                {data.status === "active" && <span className="badge rounded-pill bg-success ml-3">{data.status}</span>}
                                {data.status === "finished" && <span className="badge rounded-pill bg-secondary ml-3">{data.status}</span>}
                            </p>
                            <h3>Target: {data.people} people</h3>
                            <h4>Amount: {data.amount} tk</h4>
                            <p>{data.description}</p>
                            <p>Deadline: {moment(data.date).format("MMM Do YY")} <span className="badge rounded-pill bg-warning ml-3"> {moment(data.date).diff(moment(new Date()), 'days')} days</span></p>
                            {data.status === "active" && <button  className="btn btn-success"><FaDollarSign className="mb-1" /> Pay </button>}

                        </div>
                    </>
            </div>}

    </div >
    );
};

export default EventsDetails;