import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { footer } = useSelector(state => state.modeData)
    console.log(footer)
    return (
        <div className="p-5" style={{ backgroundColor: footer.color }}>
            <div className="row">
                <div className="col-md-5">
                    <img src="/img/AsHabusSamaniyyah.png" alt="logo" width="100px" height="100px" />
                    <h1>As Habus Samaniyyah</h1>
                    <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
                </div>
                <div className="col-md-2">
                    <h4>Links</h4>
                    <p className="mt-4">Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>Youtube</p>
                </div>
                <div className="col-md-4">
                    <h4>Boyan</h4>
                    <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-5">
                <small className="align-self-center d-flex align-items-center">© {moment(new Date()).format('YYYY')} Copyright Protected By</small> <span className="ml-2"><a target="_blank" rel="noreferrer" href="http://shahsajib.me/"> <b>Shahsajib</b> </a></span>
            </div>
        </div>
    );
};

export default Footer;