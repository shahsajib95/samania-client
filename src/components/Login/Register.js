import React, { useState } from 'react';
import './LoginFb.css'
import { FacebookProvider, Login } from 'react-facebook';
import { FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

toast.configure()

const Register = () => {

    const {  text } = useSelector(state => state.modeData)
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const [load, setLoading] = useState(false)

    const faceBookLogin = (res) => {
        if (res.profile) {
            setLoading(true)
            fetch(`https://thawing-mountain-56993.herokuapp.com/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res.profile)
            }).then(res => res.json())
                .then(data => {
                    if (data.message) {
                        error(data.message)
                        setLoading(false)
                    } else {
                        localStorage.setItem('user', JSON.stringify(data))
                        window.location = "/allPayments"
                        setLoading(false)
                    }
                })

        }
    }
    return (
        <div className="login container text-center">
            <h1 className="m-5">Register</h1>
            <div className="d-flex align-items-center justify-content-center p-5">
                <div className="login-box">
                    {load ? '..Loding..'
                        :
                        <FacebookProvider appId="360186812075686">
                            <Login
                                scope="email"
                                onCompleted={faceBookLogin}
                            >
                                {({ handleClick, error }) => (
                                    <span onClick={handleClick} className="p-4" style={{ cursor: 'pointer', border: `1px solid ${text}` }}><FaFacebook size={50} /> <span className="ml-3">Register with Facebook</span></span>
                                )}
                            </Login>
                        </FacebookProvider>}
                </div>
            </div>
        </div>
    );
};

export default Register;