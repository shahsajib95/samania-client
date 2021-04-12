import React from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PayMentSubmit = (props) => {
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const { method, orgFee, sadaqah, savings, total, tranFee, tranID } = props.allInfo[0]

    const { color, text } = useSelector(state => state.modeData)

    const senData = () => {
        fetch(`https://thawing-mountain-56993.herokuapp.com/payment/paymentdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ ...props.allInfo[0], id: userData.id, name: userData.name, date: new Date() })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    error(data.message)
                } else {
                    window.location = `/${userData.id}/${userData.name.replace(/\s/g, '-')}`
                }
            })
    }

    return (
        <>
            <table className="table table-striped p-5 mb-5">

                <thead style={{ color: text, backgroundColor: color }}>
                    <tr>
                        <th style={{ color: text, backgroundColor: color }} scope="col">No</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Month</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Method</td>
                        <td style={{ color: text, backgroundColor: color }}>{method}</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Transaction ID</td>
                        <td style={{ color: text, backgroundColor: color }}>{tranID}</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Total</td>
                        <td style={{ color: text, backgroundColor: color }}>{total} Tk</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Net Savings</td>
                        <td style={{ color: text, backgroundColor: color }}>{savings} Tk</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Sadaqah</td>
                        <td style={{ color: text, backgroundColor: color }}>{sadaqah} Tk</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Traction Fee</td>
                        <td style={{ color: text, backgroundColor: color }}>{tranFee} Tk</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Organization Cost</td>
                        <td style={{ color: text, backgroundColor: color }}>{orgFee} Tk</td>
                    </tr>

                </tbody>
            </table>

            <button type="submit" onClick={senData} className="btn btn-secondary">Submit</button>
        </>

    );
};

export default PayMentSubmit;