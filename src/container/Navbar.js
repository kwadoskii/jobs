import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    return(
        <nav className={props.class} style={props.stylex}>
            <Link className="navbar-brand" to={props.url} style={props.afontsize}>
                <img src={logo} width={props.imgSize} height={props.imgSize} className="d-inline-block align-top" alt="logo" />
                Smart Recruiters
            </Link>
            {props.children}
        </nav>
    );
}

export default Navbar;