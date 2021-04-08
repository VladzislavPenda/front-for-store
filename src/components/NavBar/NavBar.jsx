import React from 'react'
import './NavBar.scss'

const NavBar = ({ reg, login }) => {
    return (
        <div className="navbar">
            <div className="navbar__wrapper">
                <div className="navbar__links">
                    <b className="navbar__button">Home</b>
                </div>
                <div className="navbar__login">
                    <b onClick={() => login()} className="navbar__button">Login</b>
                    <b onClick={() => reg()} className="navbar__button">Register</b>
                </div>
            </div>
        </div>
    )
}

export default NavBar
