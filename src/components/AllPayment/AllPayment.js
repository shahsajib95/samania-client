import React from 'react';
import { useSelector } from 'react-redux';
import UseFetch from '../Hooks/UseFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPayment = () => {

    const { data: pay, loading, error } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/getAllPaymentDetails/`)

    const allPayment = pay.length !== 0 && pay.fund.map(t1 => ({ ...t1, ...pay.save.find(t2 => t2.date === t1.date) }))
    console.log(allPayment)

    const errorData = () => toast.error(error, { position: toast.POSITION.TOP_RIGHT })
    error && errorData()

    const { color, text } = useSelector(state => state.modeData)

    const netSavingsFund = pay.length !== 0 && allPayment.length !== 0 ? allPayment.reduce((a, b) => a + parseInt(b.savings ? b.savings : 0), 0) : 0
    const netSavingsSelf = pay.length !== 0 && allPayment.length !== 0 ? allPayment.reduce((a, b) => a + parseInt(b.savingsSelf ? b.savingsSelf : 0), 0) : 0
    const netSadaqah = pay.length !== 0 && allPayment.length !== 0 ? allPayment.reduce((a, b) => a + parseInt(b.sadaqah ? b.sadaqah : 0), 0) : 0
    return (
        <div className="container text-center">
            <h1 className="p-3">Fund Total Account</h1>
            <table className="table table-striped mt-5">

                <thead style={{ color: text, backgroundColor: color }} className="text-center">
                    <tr>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Name</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">20%</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">80%</th>
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
                        <tbody className="text-center">

                            {allPayment.length !== 0 && allPayment.map((item, index) =>
                                <tr key={index}>
                                    <td style={{ color: text, backgroundColor: color }}>{item.date}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.name.split(' ')[0]}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.savings}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.savingsSelf}</td>
                                    <td style={{ color: text, backgroundColor: color }}>{item.sadaqah}</td>
                                </tr>)}

                        </tbody>

                        <thead style={{ color: text, backgroundColor: color }} className="text-center">
                            <tr>
                                <th style={{ color: text, backgroundColor: color }} scope="col">Total</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col"></th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsFund}</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsSelf}</th>
                                <th style={{ color: text, backgroundColor: color }} scope="col">{netSadaqah}</th>
                            </tr>
                        </thead>


                    </>}

            </table>
        </div>
    );
};

export default AllPayment;