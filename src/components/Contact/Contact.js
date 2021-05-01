import React from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
    }
    return (
        <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control"  {...register("name", { required: true })} placeholder="Full Name" />
                    {errors.name && <small className="error">*This field is required</small>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email/Phone</label>
                    <input type="text" className="form-control"  {...register("infoContact", { required: true })} placeholder="Email / Phone" />
                    {errors.infoContact && <small className="error">*This field is required</small>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea type="text" className="form-control"  {...register("message", { required: true })} placeholder="Your Message" />
                    {errors.message && <small className="error">*This field is required</small>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};

export default Contact;