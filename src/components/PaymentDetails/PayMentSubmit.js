import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PayMentSubmit = (props) => {
    console.log(props)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const { method, orgFee, sadaqah, savings, total, tranFee, tranID, date } = props.allInfo[0]

    const { color, text } = useSelector(state => state.modeData)

    const [load, setLoad] = useState(false)
    const senData = () => {
        setLoad(true)
        fetch(`https://thawing-mountain-56993.herokuapp.com/payment/paymentdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: userData.token
            },
            body: JSON.stringify({ ...props.allInfo[0], id: userData.id, name: userData.name })
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
        <>
            <table className="table table-striped p-5 mb-5">

                <thead style={{ color: text, backgroundColor: color }}>
                    <tr>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Details</th>
                        <th style={{ color: text, backgroundColor: color }} scope="col">Info</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Method</td>
                        <td style={{ color: text, backgroundColor: color }}>{method}</td>
                    </tr>
                    <tr>
                        <td style={{ color: text, backgroundColor: color }}>Date</td>
                        <td style={{ color: text, backgroundColor: color }}>{date}</td>
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

            <div className="text-center">
                {load ?
                    <div className="spinner-border text-success  mt-3" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    :
                    <button type="submit" onClick={senData} className="btn btn-success ">Submit</button>}
            </div>
        </>

    );
};

export default PayMentSubmit;