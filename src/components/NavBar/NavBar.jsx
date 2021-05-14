import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

const NavBar = ({ setRole, role, reg, login, add}) => {

    const exit = () => {
        setRole('')
        localStorage.setItem("role", '')
    }

    return (
        <div className="navbar">
            <div className="navbar__wrapper">
                <Link to={"/"} className="navbar__links">
                    <b className="navbar__button">Home</b>
                </Link>
                {
                    !role
                        ?
                        <div className="navbar__login">
                            <b onClick={() => login()} className="navbar__button">Login</b>
                            <b onClick={() => reg()} className="navbar__button">Register</b>
                        </div>
                        :
                        role === "User"
                            ?
                            <div className="navbar__login">
                                <b onClick={() => add("shopModels")} className="navbar__button">Create new</b>
                                <b onClick={exit} className="navbar__button">Exit</b>
                            </div>
                            :
                            <div className="navbar__login">
                                <Link to={"/admin"}className="navbar__button">Admin Panel</Link>
                                <b onClick={exit} className="navbar__button">Exit</b>
                            </div>
                }

            </div>
        </div>
    )
}

export default NavBar
