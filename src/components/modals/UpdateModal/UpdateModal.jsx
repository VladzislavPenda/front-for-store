import React, { useEffect, useRef, useState } from 'react'
import jwt_decode from "jwt-decode"
import { sendLogInf } from '../../../api'
import './UpdateModal.scss'

const UpdateModal = ({ setRole, close, setId, setTypeValue, setType }) => {
    const [updateInf, setUpdateInf] = useState({
        'Type': {setTypeValue}
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
    }, [ref, close, updateInf])

    const changeHandler = (option, value) => {
        console.log(option)
        console.log(value)
        console.log(updateInf[option]['setTypeValue'])
        const newInf = updateInf
        newInf[option]['setTypeValue'] = value
        console.log(newInf)
        setUpdateInf(newInf)
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        const data = await sendLogInf(updateInf)
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
                    Update form {setType}
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("Type", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required placeholder=" Password"
                        value={updateInf['Type']['setTypeValue']} />
                    </div>
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateModal