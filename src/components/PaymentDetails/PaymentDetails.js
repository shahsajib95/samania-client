import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMoneyBillWave, FaSave, FaDonate, FaCcMastercard } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PayMentSubmit from './PayMentSubmit';
import './PaymentDetails.css';

const PaymentDetails = () => {

    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const { register, handleSubmit, watch, reset } = useForm();


    const total = watch('total')

    const [next, setNext] = useState(false)

    const [donateValue, setDonateValue] = useState(null)
    const [tran, setTran] = useState(0)
    const [allInfo, setAllInfo] = useState([])

    const onSubmit = async (data) => {
        if (data.total <= 520) {
            if (data.savings > 400) {
                error(`Savings can not be less than 400`)
            } else {
                const fee = data.total * 0.015
                const net = data.total - data.savings - fee - 10
                setTran(Math.ceil(fee))
                console.log(net)
                setDonateValue(Math.ceil(net))
                setAllInfo([{ method: data.method, tranID: data.tranID, total: data.total, savings: data.savings, sadaqah: Math.ceil(net), tranFee: Math.ceil(fee), orgFee: 10 }])
            }
        } else if (data.total >= 520) {
            if (data.savings > data.total - 100) {
                error(`Savings can not be greater than ${data.total - 100}`)
            } else {
                const fee = data.total *  0.015
                const net = data.total - data.savings - fee - 10
                setTran(Math.ceil(fee))
                console.log(net)
                setDonateValue(Math.ceil(net))
                setAllInfo([{ method: data.method, tranID: data.tranID, total: data.total, savings: data.savings, sadaqah: Math.ceil(net), tranFee: Math.ceil(fee), orgFee: 10 }])
            }
        }
    }

    const resetForm = () => {
        setDonateValue(null)
        setTran(0)
        reset()
    }


    return (
        <div className="p-2 mt-5 container payment mb-5">

            <h1 className="text-center">{moment(new Date()).format('MMMM Do YYYY')}</h1>

            {!next &&
                <form onSubmit={handleSubmit(onSubmit)}>


                    <label htmlFor="basic-url" className="form-label">Payment Method</label>
                    <select className="form-select form-select-lg mb-3 form-control" {...register("method", { required: true })} aria-label=".form-select-lg example">
                        <option defaultValue>Select Payment</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Rocket">Rocket</option>
                        <option value="Bank">Bank</option>
                    </select>

                    <label htmlFor="basic-url" className="form-label">Transaction ID</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaCcMastercard /></span>
                        <input type="text" id="tranID" {...register("tranID", { required: true })} className="form-control" placeholder='Enter Transaction ID' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>


                    <label htmlFor="basic-url" className="form-label">Amount Paid</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaMoneyBillWave /></span>
                        <input type="number" id="total" {...register("total", { required: true })} className="form-control" placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>



                    {total &&
                        <>
                            <label htmlFor="basic-url" className="form-label">Enter Savings Amount</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaSave /></span>
                                <input type="number" className="form-control" id="savings" {...register("savings")} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </>}

                    {donateValue &&
                        <><label htmlFor="basic-url" className="form-label">Sadaqah</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaDonate /></span>
                                <input type="number" className="form-control" defaultValue={donateValue} disabled id="sadaqah" {...register("sadaqah")} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </>}

                    {donateValue &&
                        <>
                            <label htmlFor="basic-url" className="form-label">Transaction free</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaDonate /></span>
                                <input type="number" className="form-control" defaultValue={tran} disabled id="tranFee" {...register("tranFee")} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </>}

                    <label htmlFor="basic-url" className="form-label">Organization Cost</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaDonate /></span>
                        <input type="number" className="form-control" disabled id="orgFee" {...register("orgFee")} defaultValue={10} placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    {!donateValue && <button type="submit" className="btn btn-success">Calculate</button>}
                    {donateValue && <button onClick={resetForm} type="submit" className="btn btn-secondary">Re Calculate</button>}
                    {donateValue && <button type="submit" onClick={() => setNext(true)} className="btn btn-primary ml-2">Next</button>}

                </form>}

            {next && <PayMentSubmit allInfo={allInfo} />}

        </div >
    );
};

export default PaymentDetails;