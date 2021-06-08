import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { userData } from '../../../App';

const AdminEvent = () => {

    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const [load, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        setLoading(true)
        fetch(`http://localhost:5000/admin/addEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ ...data, status: 'active' })
        }).then(res => res.json())
            .then(data => {
                if (data.message) {
                    error(data.message)
                    setLoading(false)
                } else {
                    setLoading(false)
                    window.location = "/allEvents"
                }
            })


    }
    return (

        <div className="login container">

            <div className="login container">
                <h1 className="mt-5 text-center">Add Event</h1>
                <a href="/showEvents"><p className="text-center">Show Events</p></a>
                <div className="login-box">
                    <div className="login-box">

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label className="form-label">Event Name</label>
                                <input type="text" className="form-control"  {...register("name", { required: true })} placeholder="Event Name" />
                                {errors.name && <small className="error">*This field is required</small>}

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control"  {...register("date", { required: true })} placeholder="Date" />
                                {errors.date && <small className="error">*This field is required</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Place</label>
                                <input type="text" className="form-control"  {...register("place", { required: true })} placeholder="Place" />
                                {errors.place && <small className="error">*This field is required</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Number of People</label>
                                <input type="number" className="form-control"  {...register("people", { required: true })} placeholder="People" />
                                {errors.people && <small className="error">*This field is required</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Amount</label>
                                <input type="number" className="form-control"  {...register("amount", { required: true })} placeholder="Amount" />
                                {errors.amount && <small className="error">*This field is required</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control"  {...register("description", { required: true })} placeholder="Description" />
                                {errors.description && <small className="error">*This field is required</small>}
                            </div>



                            {load ?
                                <div className="spinner-border text-primary  mt-3 mb-3" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                                :
                                <button type="submit" className="btn btn-primary mt-3 mb-3">Submit</button>}

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};


export default AdminEvent;