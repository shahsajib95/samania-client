import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMoneyBillWave, FaSave, FaDonate, FaCcMastercard } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import PayMentSubmit from './PayMentSubmit';
import './PaymentDetails.css';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    input: {
        color: 'black',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'white'
    }
}));


const PaymentFund = () => {
    const classes = useStyles();
    // const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const { register, handleSubmit, reset } = useForm();

    // Date
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('MM/DD/YYYY'));

    const { color, text } = useSelector(state => state.modeData)
    const [next, setNext] = useState(false)
    const [show, setShow] = useState(false)

    const [donateValue, setDonateValue] = useState(null)
    const [savings, setSavings] = useState(null)
    const [tran, setTran] = useState(0)
    const [allInfo, setAllInfo] = useState([])

    const onSubmit = async (data) => {
  
            const fee = Math.floor(data.total * 0.020)
            const afterDeductFee = (data.total - fee)
            const feeDeductValue = afterDeductFee - 10
            const donateValue  = feeDeductValue * 20 / 100
            const netForSavings  = feeDeductValue -  Math.floor(donateValue)
            setDonateValue((feeDeductValue * 20 / 100))
            setSavings( Math.floor(netForSavings))
            setTran((fee))
            setAllInfo([{ date: selectedDate, method: data.method, tranID: data.tranID, total: data.total, savings:  Math.floor(netForSavings), sadaqah:  Math.floor(netForSavings * 20 / 100), tranFee:  Math.floor(fee), orgFee: 10 }])
            setShow(true)

    }

    const resetForm = () => {
        setShow(false)
        setDonateValue(null)
        setTran(0)
        setSavings(0)
        reset()
    }



    return (
        <div className="p-2 mt-5 container payment mb-5">

            {!next &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex justify-content-center align-items-center calender">
                        <h3 className="text-center">Select Date: </h3>
                        <TextField
                            type="date"
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={classes.textField}
                            defaultValue={selectedDate}
                            inputProps={{
                                style: {
                                    color: text,
                                    padding: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: color
                                }
                            }}
                        />

                    </div>
                    <br></br>
                    <br></br>
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


                    <label htmlFor="basic-url" className="form-label">Amount Paid</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FaMoneyBillWave /></span>
                        <input type="number" id="total" {...register("total", { required: true })} className="form-control" placeholder='Enter Amount' aria-label="Username" aria-describedby="basic-addon1" />
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

                    {!show && <button type="submit" className="btn btn-success">Calculate</button>}
                    {donateValue && <button onClick={resetForm} type="submit" className="btn btn-secondary">Re Calculate</button>}
                    {donateValue && <button type="submit" onClick={() => setNext(true)} className="btn btn-primary ml-2">Next</button>}

                </form>}

            {next && <PayMentSubmit allInfo={allInfo} />}

        </div >
    );
};

export default PaymentFund;