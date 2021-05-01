import React, { useContext } from 'react';
import { userData } from '../../App';
import { LanguageContext } from '../context/Language';
import './Banner.css';

const AfterLoginBanner = () => {
    const { dataLang } = useContext(LanguageContext)
    const { text, button, textMain  } = dataLang[0].banner
    return (
        <div className="banner">
            <div className="text-center container text-dark p-5">
                    <h1>{textMain}</h1>
                    <p>{text}</p>
                    <a href={"/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}><button type="button" className="btn btn-success  ">{button}</button></a>
            </div>
        </div>
    );
};

export default AfterLoginBanner;