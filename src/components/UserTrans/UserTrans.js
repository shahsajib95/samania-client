import React from 'react';
import { userData } from '../../App';
import UseFetch from '../Hooks/UseFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserFunds from './UserFunds';
import UserSavings from './UserSavings';

const UserTrans = () => {

    const { data: fund, loading, error } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/getPaymentDetails/${userData.id}`)
    const { data: save } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/getPaymentDetailsSelf/${userData.id}`)

    // const allPayment = fund.map(t1 => ({ ...t1, ...save.find(t2 => t2.date === t1.date) }))

    const errorData = () => toast.error(error, { position: toast.POSITION.TOP_RIGHT })
    error && errorData()


    const netSavingsFund = save.length !== 0 ? fund.reduce((a, b) => a + parseInt(b.savings ? b.savings : 0), 0) : 0
    const netSavingsSelf = save.length !== 0 ? save.reduce((a, b) => a + parseInt(b.savingsSelf ? b.savingsSelf : 0), 0) : 0
    const netSadaqah = fund.length !== 0 ? fund.reduce((a, b) => a + parseInt(b.sadaqah ? b.sadaqah : 0), 0) : 0

    return (

        <>
            <h1 className="text-center p-5">Total Savings: <b>{netSavingsSelf + netSavingsFund} tk</b></h1>
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-warning">Fund</h3>
                    <UserFunds loading={loading} fund={fund} netSavingsSelf={netSavingsSelf} netSadaqah={netSadaqah} netSavingsFund={netSavingsFund} />
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-warning">Save</h3>
                    <UserSavings loading={loading} netSavingsSelf={netSavingsSelf} save={save} />
                </div>
            </div>



        </>
    );
};

export default UserTrans;