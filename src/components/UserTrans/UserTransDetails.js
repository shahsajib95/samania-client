import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../App';
import UseFetch from '../Hooks/UseFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegTrashAlt } from "react-icons/fa";

const UserTransDetails = () => {

    const { fund: data, loading, error } = UseFetch(`https://thawing-mountain-56993.herokuapp.com/payment/paymentDetails/${userData.id}`)
    console.log(data.filter((ele, ind) => ind === data.findIndex(elem => elem.date === ele.date)))

    const errorData = () => toast.error(error, { position: toast.POSITION.TOP_RIGHT })
    error && errorData()

    const { color, text } = useSelector(state => state.modeData)

    const netSavings = data.length !== 0 ? data.reduce((a, b) => a + parseInt(b.savings), 0) : 0
    const netSadaqah = data.length !== 0 ? data.reduce((a, b) => a + parseInt(b.sadaqah), 0) : 0

    return (

        <table className="table table-striped mt-5">

            <thead style={{ color: text, backgroundColor: color }} className="text-center">
                <tr>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">20%</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">80%</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Sadaqah</th>
                    <th style={{ color: text, backgroundColor: color }} scope="col">Delete</th>
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

                        {data.map((item, index) =>
                            <tr key={index}>
                                <td style={{ color: text, backgroundColor: color }}>{moment(item.createdAt).format('MM-DD-YY')}</td>
                                <td style={{ color: text, backgroundColor: color }}>{item.savings}</td>
                                <td style={{ color: text, backgroundColor: color }}>{item.savings}</td>
                                <td style={{ color: text, backgroundColor: color }}>{item.sadaqah}</td>
                                <td style={{ color: text, backgroundColor: color }}><FaRegTrashAlt /></td>
                            </tr>)}

                    </tbody>

                    <thead style={{ color: text, backgroundColor: color }} className="text-center">
                        <tr>
                            <th style={{ color: text, backgroundColor: color }} scope="col">Total</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">80% + 20%</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSavings}</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSavings}</th>
                            <th style={{ color: text, backgroundColor: color }} scope="col">{netSadaqah}</th>
                        </tr>
                    </thead>
                </>}

        </table>
    );
};

export default UserTransDetails;