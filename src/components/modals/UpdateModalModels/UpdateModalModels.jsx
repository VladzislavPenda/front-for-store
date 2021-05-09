import React, { useEffect, useRef, useState } from 'react'
import {sendUpdateInf } from '../../../api'
import './UpdateModalModels.scss'

const UpdateModalModels = ({ setRole, close, setId, type, setType, fullModelInfo }) => {
    const [updateInf, setUpdateInf] = useState({
        'Type': {type}
    })
    
    
    const [fullModelUpdateInfo, setFullModelUpdateInfo] = useState(fullModelInfo)
    const [update, setUpdate] = useState({
        "model" : fullModelUpdateInfo['model'],
        "year" : fullModelUpdateInfo['year'],
        "horsePower" : fullModelUpdateInfo['horsePower'],
        "price" : fullModelUpdateInfo['price'],
        "mileAge" : fullModelUpdateInfo['mileAge']
    })
    const ref = useRef(null)

    useEffect(() => {
        
        console.log(fullModelUpdateInfo)
        console.log(123)
        console.log(setId)
        console.log(update)
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
    }, [ref, close, update])

    const changeHandler = (option, value) => {
        const newFieldValue = {
            ...update,
            [option]:value
        };
        console.log(fullModelUpdateInfo)
        setUpdate(newFieldValue);
        console.log(update)
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        await sendUpdateInf(update, setType, setId)
        close()
    }

    return (
        <div className="modal">
            <div ref={ref} className="modal__container_logs">
                <div className="modal_registration_label">
                    table model {setType}
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_input_data_container_element">
                        <span>Модель</span>
                        <input onChange={(event) => changeHandler("model", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required 
                        value={update['model']} />
                    </div>
                    <div className="modal_input_data_container_element">
                        <span>Стоимость</span>
                        <input onChange={(event) => changeHandler("price", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required 
                        value={update['price']} />
                    </div>
                    <div className="modal_input_data_container_element">
                        <span>Год производства</span>
                        <input onChange={(event) => changeHandler("year", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required
                        value={update['year']} />
                    </div>
                    <div className="modal_input_data_container_element">
                        <span>Лошадиные силы</span>
                        <input onChange={(event) => changeHandler("horsePower", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required 
                        value={update['horsePower']} />
                    </div>
                    <div className="modal_input_data_container_element">
                        <span>Пробег</span>
                        <input onChange={(event) => changeHandler("mileAge", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required
                        value={update['mileAge']} />
                    </div>
                    
                    

                    

                    
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateModalModels