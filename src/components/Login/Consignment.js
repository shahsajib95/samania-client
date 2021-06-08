import React, { useState } from 'react';
import './LoginFb.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-crop/dist/ReactCrop.css';
import './Consignment.css';

toast.configure()

const Consignment = (props) => {
    const { name, fatherOrHusband, adress, age, motherOrWife, profession } = props.allInfo
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const [load, setLoading] = useState(false)

    const submit = () => {
        setLoading(true)
        fetch(`https://thawing-mountain-56993.herokuapp.com/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...props.allInfo, status: 'pending'})
        }).then(res => res.json())
            .then(data => {
                if (data.message) {
                    error(data.message)
                    setLoading(false)
                } else {
                    window.location = "/login"
                    setLoading(false)
                }
            })
    }

    return (
        <div className="agree m-5">
            <h1 className="text-center">Agreement</h1>
            <div className="mb-3 mt-5">
                <p>I <span>{name}</span> Father / Husband: <span>{fatherOrHusband}</span> Mother / Wife: <span>{motherOrWife}</span> profession: <span>{profession}</span> Age: <span>{age}</span>
                Address: <span>{adress}</span> I promise that I will read and understand the above objectives and policies and accept them consciously. I will accept whatever action is taken against me for any unconditional action, In-Sha-Allah.</p>
            </div>
            <div className="text-center">
                {load ?
                    <div className="spinner-border text-success  mt-3" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    :
                    <button type="submit" onClick={submit} className="btn btn-success form-control">Submit</button>}
            </div>
        </div>
    );
};

export default Consignment;