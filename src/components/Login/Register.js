import React, { useState } from 'react';
import './LoginFb.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Consignment from './Consignment';

toast.configure()

const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // const { text } = useSelector(state => state.modeData)
    const error = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT })

    const [show, setShow] = useState(false)
    const [allInfo, setAllInfo] = useState([])

    const pass = watch('password')
    const cf_pass = watch('cf_password')
    const passError = pass !== cf_pass

    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [result, setResult] = useState(null)

    const handleImage = async (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))

    }
    const [crop, setCrop] = useState({ aspect: 1 / 1 });

    function getCroppedImg(image, crop) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,

        );
        const base64Image = canvas.toDataURL('image/jpeg');
        setResult(base64Image)

    }


    const onSubmit = async (data) => {
        !file && error('Please upload a profile picture')
        if (file) {
            function makeid(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz-0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            setAllInfo({...data, avatar: result, id: makeid(10) })
            setShow(true)
        }
    }

    console.log(allInfo)

    return (
        <div className="login container">
            {!show &&
                <>
                    <h1 className="mt-5 text-center">Register</h1>
                    <div className="login-box p-5">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="name" className="form-control"  {...register("name", { required: true })} placeholder="Full Name" />
                                {errors.name && <small className="error">*This field is required</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Father/Husband</label>
                                <input type="name" className="form-control"  {...register("fatherOrHusband", { required: true })} placeholder="Father/Husband's Name" />
                                {errors.name && <small className="error">*This field is required</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mother/Wife</label>
                                <input type="name" className="form-control"  {...register("motherOrWife", { required: true })} placeholder="Mother/Wife's Name" />
                                {errors.name && <small className="error">*This field is required</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Profession</label>
                                <input type="name" className="form-control"  {...register("profession", { required: true })} placeholder="Profession" />
                                {errors.name && <small className="error">*This field is required</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input type="number" className="form-control"  {...register("age", { required: true })} placeholder="Age" />
                                {errors.name && <small className="error">*This field is required</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Adress</label>
                                <input type="name" className="form-control"  {...register("adress", { required: true })} placeholder="Adress" />
                                {errors.name && <small className="error">*This field is required</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mobile Number</label>
                                <br></br>
                                <small className="text-white">*Start with 0</small>
                                <input type="number" className="form-control"  {...register("email", { required: true, maxLength: 11, minLength: 11 })} placeholder="Mobile Number" />
                                {errors.email?.type === "required" && <small className="error">*This field is required</small>}
                                {errors.email?.type === "maxLength" && <small className="error">*GIve a valid Mobile number</small>}
                                {errors.email?.type === "minLength" && <small className="error">*GIve a valid Mobile number</small>}

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control"  {...register("password", { required: true })} placeholder="Password" />
                                {errors.password && <small className="error">*This field is required</small>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control"  {...register("cf_password", { required: true, minLength: 6 })} placeholder="Confirm password" />
                                {errors.cf_password?.type === "required" && <small className="error">*This field is required</small>}
                                {errors.cf_password?.type === "minLength" && <small className="error">*Password must be at least 6 characters long</small>}
                                {passError && <small className="error">*Password not matched</small>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Upload Profile Picture</label><br></br>
                                <input type="file" onChange={handleImage} name="avatar" />
                                {errors.avatar && <small className="error">*This field is required</small>}
                            </div>

                            {file && !result &&
                                <>
                                    <ReactCrop src={file} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                                    <br></br>
                                    <p className="btn btn-primary mt-3" onClick={() => getCroppedImg(image, crop)}>Upload</p>
                                    <br></br>
                                </>}

                            {result && <img src={result} alt="" width="100px"/>}
                            <br></br>

                            <button  type="submit" className="btn btn-primary mt-3">Next</button>

                        </form>
                    </div>
                </>}
            {show && <Consignment allInfo={allInfo}/>}
        </div>
    );
};

export default Register;