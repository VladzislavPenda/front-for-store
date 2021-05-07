import React, { useEffect, useRef, useState } from 'react'
import { sendUpdateInf } from '../../../api'
import './UpdateModalModels.scss'

const UpdateModalModels = ({ setRole, close, setId, type, setType }) => {
    const [updateInf, setUpdateInf] = useState({
        'Type': {type}
    })

    const ref = useRef(null)

    useEffect(() => {
        console.log(123)
    }, [])

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
        await sendUpdateInf(updateInf, setType, setId)
        close()
    }

    return (
        <div className="modal">
            <div ref={ref} className="modal__container_log">
                <div className="modal_registration_label">
                    table model {setType}
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("Type", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required placeholder=" type"
                        value={updateInf['Type']['type']} />
                    </div>
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Update2</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateModalModels