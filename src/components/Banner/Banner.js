import React, { useContext } from 'react';
import { LanguageContext } from '../context/Language';
import './Banner.css';

const Banner = () => {
    const { dataLang } = useContext(LanguageContext)
    const { text, loginTextMain, loginButton  } = dataLang[0].banner
    return (
        <div className="banner">
            <div className="text-center container text-dark p-5">
                <h1>{loginTextMain}</h1>
                <p>{text}</p>
                <a href="/register"><button type="button" className="btn btn-success  ">{loginButton}</button></a>
            </div>
        </div>
    );
};

export default Banner;