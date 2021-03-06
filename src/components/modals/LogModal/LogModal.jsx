import React, { useEffect, useRef, useState } from 'react'
import jwt_decode from "jwt-decode"
import { sendLogInf } from '../../../api'
import './LogModal.scss'

const LogModal = ({ setRole, close }) => {
    const [logInf, setLogInf] = useState({
        'Username': "",
        'password': ""
    })
    const ref = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                close()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, close])

    const changeHandler = (option, value) => {
        const newInf = logInf
        newInf[option] = value
        setLogInf(newInf)
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        const data = await sendLogInf(logInf)
        const token = data.data.token
        const userInf = jwt_decode(token)
        localStorage.setItem("role", userInf[Object.keys(userInf)[1]])
        setRole(userInf[Object.keys(userInf)[1]])
        close()
    }

    return (
        <div className="modal">
            <div ref={ref} className="modal__container_log">
                <div className="modal_registration_label">
                    Login
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("Username", event.target.value)} className="modal_registration_input" type="text" required placeholder=" Username" />
                    </div>
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("password", event.target.value)} className="modal_registration_input" type="password" required placeholder=" Password" />
                    </div>
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Log into</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LogModal