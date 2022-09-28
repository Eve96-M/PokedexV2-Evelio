import React from 'react';
import '../NavBar.css';
import Logo from '../assets/Logo.png';
const NavBar = () => {
    return (
        <header>
            <nav className='navBar'>
                <div className='navAccent'>
                    <img src={Logo} alt="" className='logo' />
                </div>
                <div className='btn-Wrapper'>
                    <button className='nav-Btn'></button>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;