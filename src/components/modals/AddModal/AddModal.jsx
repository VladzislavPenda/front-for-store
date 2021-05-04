import React, { useEffect, useRef, useState } from 'react'
import { addInf } from '../../../api'
import './AddModal.scss'

const AddModal = ({ setRole, close, setId, type, setType }) => {
    const [updateInf, setUpdateInf] = useState({
        'Type': {type}
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

        const newFieldValue = {
            ...updateInf,
            [option]:value
        };
        setUpdateInf(newFieldValue);
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        await addInf(updateInf, setType)
        close()
    }

    return (
        <div className="modal">
            <div ref={ref} className="modal__container_log">
                <div className="modal_registration_label">
                    Add new record {setType}
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("Type", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required placeholder=" type"/>
                    </div>
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddModal