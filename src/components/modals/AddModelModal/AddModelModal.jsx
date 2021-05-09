import React, { useEffect, useRef, useState } from 'react'
import { fetchCarcaseTypes, fetchEngineTypes, fetchDriveTypes, fetchMarks, fetchTransmissionTypes, sendUpdateInf, AddModel } from '../../../api'
import './AddModelModal.scss'

const AddModelModal = ({ setRole, close, setId, type, setType, fullModelInfo }) => {
    const [updateInf, setUpdateInf] = useState({
        'Type': {type}
    })
    const [carcaseList, setCarcaseList] = useState([])
    const [markList, setMarkList] = useState([])
    const [engineTypesList, setEngineTypesList] = useState([])
    const [driveTypesList, setDriveTypesList] = useState([])
    const [transmissionTypesList, setTransmissionTypesList] = useState([])
    const [fullModelUpdateInfo, setFullModelUpdateInfo] = useState(fullModelInfo)

    const ref = useRef(null)

    useEffect(() => {
        const fetchCarcaseList = async () => {
            setCarcaseList(await fetchCarcaseTypes())
        }
        fetchCarcaseList()
        const fetchMarkList = async () => {
            setMarkList(await fetchMarks())
        }
        fetchMarkList()
        const fetchEngineList = async () => {
            setEngineTypesList(await fetchEngineTypes())
        }
        fetchEngineList()
        const fetchDriveList = async () => {
            setDriveTypesList(await fetchDriveTypes())
        }
        fetchDriveList()
        const fetchTransmissionList = async () => {
            setTransmissionTypesList(await fetchTransmissionTypes())
        }
        fetchTransmissionList()

        console.log(fullModelUpdateInfo)
        console.log(123)
        console.log(carcaseList)
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
            ...fullModelUpdateInfo,
            [option]:value
        };
        console.log(fullModelUpdateInfo)
        setFullModelUpdateInfo(newFieldValue);
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        await AddModel(fullModelUpdateInfo, setType, setId)
        close()
    }

    return (
        <div className="modals">
            <div ref={ref} className="modal__container_login">
                <div className="modal_registration_label">
                    table model {setType}
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="input_modal_string">
                        <div className="modal_input_data_container_element">

                            <input onChange={(event) => changeHandler("model", event.target.value)} 
                            className="modal_registration_input"
                            type="text"
                            required placeholder=" model"
                             />
                        </div>
                        <div className="modal_input_data_container_element">

                            <input onChange={(event) => changeHandler("year", event.target.value)} 
                            className="modal_registration_input"
                            type="text"
                            required placeholder=" year"
                             />
                        </div>
                    </div>
                    
                    <div className="input_modal_string">
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("horsePower", event.target.value)} 
                            className="modal_registration_input"
                            type="text"
                            required placeholder=" horse power"
                            />
                        </div>
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("price", event.target.value)} 
                            className="modal_registration_input"
                            type="text"
                            required placeholder=" price"
                            />
                        </div>
                    </div>
                    <div className="input_modal_string">
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("mileAge", event.target.value)} 
                            className="modal_registration_input"
                            type="text"
                            required placeholder=" mile age"
                            />
                        </div>
                        <div className="modal_input_data_container_element">
                            <input onChange={(event) => changeHandler("phoneNumber", event.target.value)} 
                            className="modal_registration_input"
                            type="text"
                            required placeholder=" your phone number"
                            />
                    </div>
                    </div>
                    <div className="modal_input_data_container_element">
                            <div>Описание авто</div>
                            <textarea onChange={(event) => changeHandler("description", event.target.value)} 
                            className="modal_description_input"
                            type="text"
                            required placeholder=" description"
                            />
                        </div>
                    
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("pathToPicture", event.target.value)} 
                        className="modal_registration_input"
                        type="text"
                        required placeholder=" path to picture"
                        />
                    </div>
                    

                    <div className="select_container">
                        <p className="select_label">Тип двигателя</p>
                        <div className="select_bar">
                            
                            <select className="select_element" onChange={e => changeHandler('engineType', e.target.value)}>
                            <option value=""></option>
                                {engineTypesList.map((type) => {
                                    return <option key={type.id} value={type.id}>{type.type}</option>
                                })}
                            </select>
                        </div>
                    </div> 
                    <div className="select_container">
                        <p className="select_label">Тип кузова</p>
                        <div className="select_bar">
                            <select className="select_element" onChange={e => changeHandler('carcaseType', e.target.value)}>
                            <option value=""></option>
                                {carcaseList.map((type) => {
                                    return <option key={type.id} value={type.id}>{type.type}</option>
                                })}
                            </select>
                        </div>
                    </div> 

                    <div className="select_container">
                        <p className="select_label">Привод</p>
                        <div className="select_bar">
                            <select className="select_element" onChange={e => changeHandler('driveType', e.target.value)}>
                            <option value=""></option>
                                {driveTypesList.map((type) => {
                                    return <option key={type.id} value={type.id}>{type.type}</option>
                                })}
                            </select>
                        </div>
                    </div> 

                    <div className="select_container">
                        <p className="select_label">Марка авто</p>
                        <div className="select_bar">
                            <select className="select_element" onChange={e => changeHandler('markName', e.target.value)}>
                            <option value=""></option>
                                {markList.map((country) => {
                                return <option key={country.id} value={country.id}>{country.markNum}</option>
                                })}
                            </select>    
                        </div>
                    </div>

                    <div className="select_container">
                        <p className="select_label">Трансмиссия</p>
                        <div className="select_bar">
                            <select className="select_element" onChange={e => changeHandler('transmissionType', e.target.value)}>
                            <option value=""></option>
                                {transmissionTypesList.map((type) => {
                                    return <option key={type.id} value={type.id}>{type.type}</option>
                                })}
                            </select>
                        </div>
                    </div> 

                    
                    
                    <div className="modal_button">
                        <button className="modal_registration_account_button">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddModelModal