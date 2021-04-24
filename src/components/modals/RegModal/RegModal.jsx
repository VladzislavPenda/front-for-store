import React, { useEffect, useRef, useState } from 'react'
import { sendRegInf } from '../../../api'
import './RegModal.scss'

const RegModal = ({ setRole, close }) => {
    const [regInf, setRegInf] = useState({
        'firstname': "",
        'lastname': "",
        'Username': "",
        'password': "",
        'email': "",
        'phonenumber': "",
        'roles': [
            "User"
        ]
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
        const newInf = regInf
        newInf[option] = value
        setRegInf(newInf)
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        await sendRegInf(regInf)
    }

    return (
        <div className="modal">
            <div ref={ref} className="modal__container">
                <div className="modal_registration_label">
                    Registration
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_tab">
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("firstname", event.target.value)} className="modal_registration_input" type="text" required placeholder=" Your firstname" />
                        </div>
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("lastname", event.target.value)} className="modal_registration_input" type="text" required placeholder=" Your lastname" />
                        </div>
                    </div>

                    <div className="modal_tab">
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("Username", event.target.value)} className="modal_registration_input" type="text" required placeholder=" Username" />
                        </div>
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("email", event.target.value)} className="modal_registration_input" type="email" required placeholder=" Email address" />
                        </div>
                    </div>

                    <div className="modal_tab">
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("phonenumber", event.target.value)} className="modal_registration_input" type="tel" required placeholder=" Phone number" />
                        </div>
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("password", event.target.value)} className="modal_registration_input" type="password" required placeholder=" Password" />
                        </div>"
                    </div>

                    <div className="modal_button">
                        <button className="modal_registration_account_button">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegModal
