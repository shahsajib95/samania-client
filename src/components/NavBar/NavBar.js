import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { userData } from '../../App';
import Mode from '../Mode/Mode';
import './Navbar.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const NavBar = () => {
    const { nav } = useSelector(state => state.modeData)
    return (

        <nav className="navbar navbar-expand-lg" style={{ color: nav.text, backgroundColor: nav.color }}>
            <ul className="justify-content-center nav p-2">

                {userData &&
                    <>
                        <li className="nav-item">
                            <LazyLoadImage effect="blur" src={userData.photo} />
                        </li>
                        <li className="nav-item">
                            <a style={{ color: nav.text }} className="nav-link mt-2" href={"/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}>{userData.name.split(' ')[0]}</a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color: nav.text }} className="nav-link mt-2" href="/allPayments">All Payments</a>
                        </li>
                    </>}

                {!userData &&
                    <li className="nav-item">
                        <a href="/"><LazyLoadImage effect="blur" src={"/img/AsHabusSamaniyyah.png"} height="50px" width="50px"/></a>
                    </li>}

                <li className="nav-item">
                    <a style={{ color: nav.text }} className="nav-link mt-2 ml-2" href="/">Home</a>
                </li>

                {!userData &&
                    <li className="nav-item">
                        <a style={{ color: nav.text }} className="nav-link mt-2" href="/login">Login</a>
                    </li>}


                <span className="ml-2"><Mode /></span>
            </ul>
        </nav>
    );
};

export default NavBar;