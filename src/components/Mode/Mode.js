import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activeDarkmode, deactiveDarkmode } from '../redux/actions/DarkModeActions';
import './Mode.css';

const Mode = () => {

    const [value, setValue] = useState(false)
    const dispatch = useDispatch();
    const data = localStorage.getItem('mode')

    useEffect(() => {
        data === 'active' && setValue(true)
        data === 'deactive' && setValue(false) 
    }, [data])

    const handleMode = (e) => {
        if (e.target.checked) {
            dispatch(deactiveDarkmode(false))
            localStorage.setItem('mode', 'active')
            setValue(true)
        } else {
            dispatch(activeDarkmode(true))
            localStorage.setItem('mode', 'deactive')
            setValue(false)
        }
    }

    return (
        <div className="d-flex justify-content-center justify-align-center pt-3">
            <label className="switch">
                <input type="checkbox" checked={value} onChange={handleMode} className="mt-2" />
                <span className="slider round"></span>
            </label>
        </div >
    );
};

export default Mode;