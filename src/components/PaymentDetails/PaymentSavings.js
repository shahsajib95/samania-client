import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCcMastercard } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import './PaymentDetails.css';
import { userData } from '../../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const PaymentSavings = (props) => {
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const { register, handleSubmit, } = useForm();


    const [load, setLoad] = useState(false)

    const onSubmit = async (data) => {
        setLoad(true)
        fetch(`https://thawing-mountain-56993.herokuapp.com/payment/paymentDetailsSelf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ ...data, id: userData.id, name: userData.name })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    error(data.message)
                } else {
                    setLoad(false)
                    window.location = `/${userData.id}/${userData.name.replace(/\s/g, '-')}`
                }
            })
    }



    return (
        <div className="p-2 mt-5 container payment mb-5">


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-group mb-3">
                    <input type="date" id="date" {...register("date", { required: true })} className="form-control" placeholder='Enter Date' aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <label htmlFor="basic-url" className="form-label">Payment Method</label>
                <select className="form-select form-select-lg mb-3 form-control" {...register("method", { required: true })} aria-label=".form-select-lg example">
                    <option defaultValue>Select Payment</option>
                    <option value="Bkash">BKASH</option>
                    <option value="Rocket">ROCKET</option>
                    <option value="Bank">BANK</option>
                </select>

                <label htmlFor="basic-url" className="form-label">Transaction ID</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><FaCcMastercard /></span>
                    <input type="text" id="tranID" {...register("tranID", { required: true })} className="form-control" placeholder='Enter Transaction ID' aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <label htmlFor="basic-url" className="form-label">Savings Amount</label>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><FaCcMastercard /></span>
                    <input type="text" id="savingsSelf" {...register("savingsSelf", { required: true })} className="form-control" placeholder='Enter Savings Amount' aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="text-center">
                    {load ?
                        <div className="spinner-border text-success  mt-3" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                        :
                        <button type="submit" className="btn btn-success ">Submit</button>}
                </div>

            </form>


        </div >
    );
};

export default PaymentSavings;