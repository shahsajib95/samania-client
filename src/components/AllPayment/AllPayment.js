import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import UseFetch from '../Hooks/UseFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPayment = () => {
 
    const { data, loading, error } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/getAllPaymentDetails`)

    
    const errorData = () => toast.error(error, { position: toast.POSITION.TOP_RIGHT })
    error && errorData()

    const { color, text } = useSelector(state => state.modeData)

    const netSavings = data.reduce((a, b) => a + b.savings, 0)
    const netSadaqah = data.reduce((a, b) => a + b.sadaqah, 0)

    return (
        <div className="container text-center">
            <h1 className="p-3">All Payment</h1>
            <table className="table table-striped mt-5 mb-5">

                <thead style={{ color: text, backgroundColor: color }}>
                    <tr>
                        <th style={{ color: text, backgroundColor: color }} scope="col">No</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Savings</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Sadaqah</th>
                    </tr>
                </thead>

                {loading ?
                    <div className="d-flex align-items-center justify-content-center p-5">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                    :
                    <>
                        <tbody>

                            {data.map((item, index) =>
                                <tr key={index}>
                                    <th style={{ color: text, backgroundColor: color }}>{index}</th>
                                    <td style={{ color: text, backgroundColor: color }}>{moment(item.createdAt).format('MMMM Do YYYY')}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.savings} Tk</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.sadaqah} Tk</td>
                                </tr>)}

                        </tbody>

                        <thead style={{ color: text, backgroundColor: color }}>
                            <tr>
                                <th style={{ color: text, backgroundColor: color }} scope="col">Total</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col"></th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSavings.substring(1, 50)} Tk</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSadaqah.substring(1, 50)} Tk</th>
                            </tr>
                        </thead>
                    </>}

            </table>
        </div>
    );
};

export default AllPayment;