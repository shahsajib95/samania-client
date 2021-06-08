import React, { useState } from 'react';
import { useParams } from 'react-router';
import { userData } from '../../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

const EventPaymentForm = () => {
    const { evID, evName } = useParams()
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const [load, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        setLoading(true)
        fetch(`http://localhost:5000/event/eventPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ ...data, eventID: evID })
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
        <div className="p-5">
            <h3 className="text-center p-5">{evName}</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control"  {...register("date", { required: true })} placeholder="Date" />
                    {errors.date && <small className="error">*This field is required</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="basic-url" className="form-label">Payment Method</label>
                    <div className="input-group">
                        <select className="form-select form-select-lg form-control" {...register("method", { required: true })} aria-label=".form-select-lg example">
                            <option defaultValue>Select Payment</option>
                            <option value="Bkash">BKASH</option>
                            <option value="Rocket">ROCKET</option>
                            <option value="Bank">BANK</option>
                        </select>
                    </div>
                </div>
                {errors.method && <small className="error">*This field is required</small>}


                <div className="mb-3">
                    <label className="form-label">Transaction ID</label>
                    <input type="text" className="form-control"  {...register("tranID", { required: true })} placeholder='Enter Transaction ID' />
                    {errors.tranID && <small className="error">*This field is required</small>}
                </div>


                <div className="mb-3">
                    <label className="form-label">Amount Paid</label>
                    <input type="text" className="form-control"  {...register("amount", { required: true })} placeholder="Paid" />
                    {errors.amount && <small className="error">*This field is required</small>}
                </div>


                {load ?
                    <div className="spinner-border text-primary  mt-3 mb-3" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    :
                    <button type="submit" className="btn btn-primary mt-3 mb-3">Submit</button>}

            </form>

        </div>
    );
};

export default EventPaymentForm;