import moment from 'moment';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../context/Language';

const Footer = () => {
    const { footer } = useSelector(state => state.modeData)
    const { dataLang } = useContext(LanguageContext)
    const { name, tag, link, topDes } = dataLang[0].footer
    return (
        <div className="p-5" style={{ backgroundColor: footer.color }}>
            <div className="row">
                <div className="col-md-5">
                    <img src="/img/AsHabusSamaniyyah.png" alt="logo" width="150px" />
                    <h1 className="mt-2">{name}</h1>
                    <p className="mt-1">{tag}</p>
                </div>
                <div className="col-md-2">
                    <h4>{link.head}</h4>
                    <p className="mt-4">Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>Youtube</p>
                </div>
                <div className="col-md-4">
                    <h4>{topDes.head}</h4>
                    <p className="mt-4">{topDes.des}</p>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-5">
                <small className="align-self-center d-flex align-items-center">© {moment(new Date()).format('YYYY')} Copyright Protected By</small> <span className="ml-2"><a target="_blank" rel="noreferrer" href="http://shahsajib.me/"> <b>Shahsajib</b> </a></span>
            </div>
        </div>
    );
};

export default Footer;