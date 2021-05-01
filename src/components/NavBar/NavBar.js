import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { userData } from '../../App';
import Mode from '../Mode/Mode';
import './Navbar.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/Language';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const { nav } = useSelector(state => state.modeData)
    const { dataLang } = useContext(LanguageContext)
    const { home, members, about, contact, hello, login, register } = dataLang[0].navbar
    return (

        <Navbar expand="md" style={{ color: nav.text, backgroundColor: nav.color }} >
            <NavbarBrand href="/"><img src={require('../../img/samania-logo.png').default} width="80px" alt="logo" /></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink style={{ color: nav.text, marginLeft: '20px' }} href="/">{home}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: nav.text, marginLeft: '20px' }} href="/members">{members}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: nav.text, marginLeft: '20px' }} href="/about">{about}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: nav.text, marginLeft: '20px' }} href="/contact">{contact}</NavLink>
                    </NavItem>


                    {userData &&
                        <NavItem>
                            <NavLink style={{ color: nav.text, marginLeft: '20px', }} href={"/" + userData.id + "/" + userData.name.replace(/\s/g, '-')}> {hello}, {userData.name.split(' ')[0]}</NavLink>
                        </NavItem>}

                    {!userData &&
                        <NavItem>
                            <NavLink style={{ color: nav.text, marginLeft: '20px' }} href="register">{register}</NavLink>
                        </NavItem>}
                </Nav>

                {!userData && <Link to='/login'><Button color="success" style={{ color: nav.text, marginLeft: '20px' }}>{login}</Button></Link>}


                {/* <span style={{ color: nav.text, marginLeft: '20px', marginBottom: '10px' }}>
                    <select name="status" className="p-2 mt-2" onChange={(e) => setlanguage(e.target.value)}>
                        <option className="text-success" value="bn">BN</option>
                        <option className="text-danger" value="en">EN</option>
                    </select>
                </span> */}

                <span style={{ color: nav.text, marginLeft: '20px', marginBottom: '10px' }}><Mode /></span>

            </Collapse>
        </Navbar>
    );
};

export default NavBar;