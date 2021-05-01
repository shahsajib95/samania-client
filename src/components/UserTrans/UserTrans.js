import React from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../App';
import UseFetch from '../Hooks/UseFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTrans = () => {

    const { data: fund, loading, error } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/getPaymentDetails/${userData.id}`)
    const { data: save } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/getPaymentDetailsSelf/${userData.id}`)

    const allPayment = fund.map(t1 => ({ ...t1, ...save.find(t2 => t2.date === t1.date) }))
    console.log(allPayment)

    const errorData = () => toast.error(error, { position: toast.POSITION.TOP_RIGHT })
    error && errorData()

    const { color, text } = useSelector(state => state.modeData)

    const netSavingsFund = allPayment.length !== 0 ? allPayment.reduce((a, b) => a + parseInt(b.savings ? b.savings : 0), 0) : 0
    const netSavingsSelf = allPayment.length !== 0 ? allPayment.reduce((a, b) => a + parseInt(b.savingsSelf ? b.savingsSelf : 0), 0) : 0
    const netSadaqah = allPayment.length !== 0 ? allPayment.reduce((a, b) => a + parseInt(b.sadaqah ? b.sadaqah : 0), 0) : 0

    return (

        <table className="table table-striped mt-5">

            <thead style={{ color: text, backgroundColor: color }} className="text-center">
                <tr>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Self Deposit (80%)</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Donate (20%)</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Self Deposit (100%)</th>
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

                        {allPayment.map((item, index) =>
                            <tr key={index}>
                                <td style={{ color: text, backgroundColor: color }}>{item.date}</td>
                                <td style={{ color: text, backgroundColor: color }}>{item.savings}</td>
                                <td style={{ color: text, backgroundColor: color }}>{item.sadaqah}</td>
                                <td style={{ color: text, backgroundColor: color }}>{item.savingsSelf}</td>
                            </tr>)}

                    </tbody>

                    <thead style={{ color: text, backgroundColor: color }} className="text-center">
                        <tr>
                            <th style={{ color: text, backgroundColor: color }} scope="col">Total</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsFund}</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSadaqah}</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsSelf}</th>
                        </tr>
                    </thead>

                    <thead style={{ color: text, backgroundColor: color }} className="text-center">
                        <tr>
                            <th style={{ color: text, backgroundColor: color }} scope="col">Savings:</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSavingsFund + netSavingsSelf}</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col"></th>
                            <th style={{ color: text, backgroundColor: color }} scope="col"></th>
                        </tr>
                    </thead>

                </>}

        </table>
    );
};

export default UserTrans;