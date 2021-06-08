import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMoneyBillWave, FaSave, FaDonate, FaCcMastercard } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import PayMentSubmit from './PayMentSubmit';
import './PaymentDetails.css';
import { toast } from 'react-toastify';


const PaymentFund = () => {
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // Date

    const [next, setNext] = useState(false)
    const [show, setShow] = useState(false)

    const [donateValue, setDonateValue] = useState(null)
    const [savings, setSavings] = useState(null)
    const [allInfo, setAllInfo] = useState([])

    const onSubmit = async (data) => {
        const amount = data.total % 500
        if (amount === 0) {
            const donate = ((data.total * 20) / 100)
            setSavings(data.total - donate)
            setDonateValue(donate)
            setAllInfo([{ date: data.date, method: data.method, tranID: data.tranID, total: data.total, savings: data.total - donate, sadaqah: ((data.total * 20) / 100), tranFee: data.tranFee, orgFee: 10 }])
            setShow(true)
        } else {
            error('Amount must be 500, 1000 and So on')
        }

    }

    const resetForm = () => {
        setShow(false)
        setDonateValue(null)
        setSavings(0)
        reset()
    }



    return (
        <div className="p-2 mt-5 container payment mb-5">
            <h3 className="text-center mb-5">Add Funds</h3>
            {!next &&
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-group mb-3">
                        <input type="date" id="date" {...register("date", { required: true })} className="form-control" placeholder='Enter Date' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    {errors.date && <p className="error">*This field is required</p>}


                    <label htmlFor="basic-url" className="form-label">Payment Method</label>
                    <select className="form-select form-select-lg mb-3 form-control" {...register("method", { required: true })} aria-label=".form-select-lg example">
                        <option defaultValue>Select Payment</option>
                        <option value="Bkash">BKASH</option>
                        <option value="Rocket">ROCKET</option>
                        <option value="Bank">BANK</option>
                    </select>
                    {errors.method && <p className="error">*This field is required</p>}



                    <label htmlFor="basic-url" className="form-label">Transaction ID</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaCcMastercard /></span>
                        <input type="text" id="tranID" {...register("tranID", { required: true })} className="form-control" placeholder='Enter Transaction ID' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    {errors.tranID && <p className="error">*This field is required</p>}



                    <label htmlFor="basic-url" className="form-label">Amount Paid</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaMoneyBillWave /></span>
                        <input type="number" id="total" {...register("total", { required: true })} className="form-control" placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    {errors.total && <p className="error">*This field is required</p>}



                    <label htmlFor="basic-url" className="form-label">Transaction free</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaDonate /></span>
                        <input type="number" className="form-control" id="tranFee" {...register("tranFee")} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                        {errors.tranFee && <p className="error">*This field is required</p>}
                    </div>

                    {show &&
                        <>
                            <label htmlFor="basic-url" className="form-label">Enter Savings Amount</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaSave /></span>
                                <input type="number" className="form-control" defaultValue={savings} disabled id="savings" {...register("savings")} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                            </div>

                            <label htmlFor="basic-url" className="form-label">Sadaqah</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaDonate /></span>
                                <input type="number" className="form-control" defaultValue={donateValue} disabled id="sadaqah" {...register("sadaqah")} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                            </div>

                        </>}

                    <label htmlFor="basic-url" className="form-label">Organization Cost</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaDonate /></span>
                        <input type="number" className="form-control" disabled id="orgFee" {...register("orgFee")} defaultValue={10} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    {!show && <button type="submit" className="btn btn-success">Calculate</button>}
                    {donateValue && <button onClick={resetForm} type="submit" className="btn btn-secondary">Re Calculate</button>}
                    {donateValue && <button type="submit" onClick={() => setNext(true)} className="btn btn-primary ml-2">Next</button>}

                </form>}

            {next && <PayMentSubmit allInfo={allInfo} />}

        </div >
    );
};

export default PaymentFund;