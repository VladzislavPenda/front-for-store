import React, { useEffect, useRef, useState } from 'react'
import { sendUpdateInf } from '../../../api'
import './UpdateMarkModal.scss'

const UpdateMarkModels = ({ setRole, close, setId, type, setType, markName, country }) => {
    const [updateInf, setUpdateInf] = useState({
        'MarkNum': {markName},
        'Country':  {country}
    })
    // const [updateInf2, setUpdateInf2] = useState({
    //     markName,
    //     country
    // })
    const [updateInfNorm, setUpdateInfNorm] = useState({
        'MarkNum': updateInf['MarkNum']['markName'],
        'Country': updateInf['Country']['country']
    })

    const ref = useRef(null)

    useEffect(() => {
        console.log(country)
        console.log(updateInf)
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
    }, [ref, close, updateInf, updateInfNorm])

    const changeHandler = (option, value) => {
        const newFieldValue = {
            ...updateInf,
            [option]:value
        };
        const newFieldNormValue = {
            ...updateInfNorm,
            [option]:value
        };
        
        console.log(newFieldValue)
        console.log(updateInfNorm)
        setUpdateInf(newFieldValue)
        setUpdateInfNorm(newFieldNormValue)
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        console.log(setId)
        console.log(setType)
        await sendUpdateInf(updateInfNorm, setType, setId)
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
                        <input onChange={(event) => changeHandler("MarkNum", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required placeholder=" type"
                        value={updateInf['MarkNum']['markName']} />
                    </div>
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("Country", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required placeholder=" type"
                        value={updateInf['Country']['country']} />
                    </div>
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateMarkModels