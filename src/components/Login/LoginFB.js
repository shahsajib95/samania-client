import React, { useState } from 'react';
import './LoginFb.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

toast.configure()

const LoginFB = () => {

    // const { text } = useSelector(state => state.modeData)
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })
    const [load, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = (data) => {

        setLoading(true)
        fetch(`http://localhost:5000/user/login/${data.email}`, {
            method: 'GET',
            headers: { authorization: data.password }
        }).then(res => res.json())
            .then(data => {
                if (data.message) {
                    error(data.message)
                    setLoading(false)
                } else if (data.pending) {
                    setData(data.pending)
                    setLoading(false)
                }
                else {
                    localStorage.setItem('user', JSON.stringify(data))
                    window.location = "/"
                    setLoading(false)
                }
            })


    }
    return (

        <div className="login container  p-5">

            <div className="login container">
                <h1 className="mt-5 text-center">Login</h1>
                <div className="login-box">
                    <div className="login-box p-5">

        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {data &&
                                <div className="alert alert-warning text-center" role="alert">
                                    {data}
                                </div>
                            }
                            <div className="mb-3">
                                <label className="form-label">Mobile Number</label>
                                <input type="number" className="form-control"  {...register("email", { required: true })} placeholder="Mobile Number" />
                                {errors.email && <small className="error">*This field is required</small>}

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control"  {...register("password", { required: true })} placeholder="Password" />
                                {errors.password && <small className="error">*This field is required</small>}
                            </div>


                            {load ?
                                <div className="spinner-border text-primary  mt-3" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                                :
                                <button type="submit" className="btn btn-primary mt-3">Submit</button>}

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginFB;