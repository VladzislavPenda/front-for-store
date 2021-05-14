import React, { useEffect, useState } from 'react'
import { fetchParams } from '../../api'
import { deleteInf, getFile } from '../../api'
import './AdminPanel.scss'

const AdminPanel = ({setRole, role, update, add}) => {
    const [type, setType] = useState('shopCarcaseType')
    // const [id, setId] = useState(1)
    const [paramList, setParamList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setParamList(await fetchParams(type))
        }
        fetchData()
        
    }, [type])

    const types = [
        {
            title: 'Carcase Types',
            path: 'shopCarcaseType'
        },
        {
            title: 'Engine Type',
            path: 'shopEngineType'
        },
        {
            title: 'Marks',
            path: 'shopMark'
        },
        {
            title: 'Transmission',
            path: 'shopTransmissionType'
        },
        {
            title: 'Drive types',
            path: 'shopDriveType'
        },
        {
            title: 'Models',
            path: 'shopModels'
        }
    ]

    const renderTypes = () => {
        
    }

    const renderModels = () => {
        
    }

    return (
        <div className="ap__body">
            <div className="ap__content">
                <div className="ap__types">

                    {types.map(el => {
                        return <div className="ap__type_element" onClick={() => setType(el.path)}><div className="ap_type_text">{el.title}</div></div>
                    })}
                    <div className="ap__type_element" onClick={() => getFile()}><div className="ap_type_text">Download file</div></div>
                </div>
                <div className="ap__var">
                    <div className="label_for_records">
                        <div className="label_text">Add new record</div>
                        <div className="manage_image_container op">
                            <img onClick={() => add(type)} className="manage_image" src="/Pictures/add.png" alt="" />
                        </div>
                    </div>
                    {/* {type === "shopModels"
                        ? <div>models</div>
                        :   [
                            (this.state.type === "shopMark"
                            ? <div>mark</div>
                            : <div>type</div>),
                            ]
                    } */}
                    {type === "shopModels"
                        ? paramList.map(el => {
                            return <div className="record-models">
                                <div className="record_info_models_container">

                                
                                {Object.keys(el).map((field) => {
                                    return <div className="record_info_models">
                                        <div className="field-name">
                                            {field}:
                                        </div>
                                        <div>
                                            {el[field]}
                                        </div>
                                    </div>
                                })
    
                                }
                                </div>
                                <div className="record_manager_buttons">
                                    <div className="manage_image_container">
                                       <img onClick={() => update(el.id, el.type, type, "", "", el)} className="manage_image" src="/Pictures/Edit.png" alt="" />
                                    </div>
    
                                    <div className="manage_image_container">
                                        <img onClick={() => deleteInf(type, el.modelId)} className="manage_image" src="/Pictures/delete.png" alt="" />
                                    </div>
                                </div>
                            </div>
    
                        })
                        : paramList.map(el => {
                            return <div className="record">
                                {Object.keys(el).map((field) => {
                                    return <div className="record_info">
                                        {el[field]}
                                    </div>
                                })
    
                                }
    
                                <div className="record_manager_buttons">
                                    <div className="manage_image_container">
                                        <img onClick={() => update(el.id, el.type, type, el.markNum, el.country, el)} className="manage_image" src="/Pictures/Edit.png" alt="" />
                                    </div>
    
                                    <div className="manage_image_container">
                                        <img onClick={() => deleteInf(type, el.id)} className="manage_image" src="/Pictures/delete.png" alt="" />
                                    </div>
                                </div>
                            </div>
    
                        })
                         
                    }
                    
                    
                   
                </div>
            </div>
        </div >
    )
}

export default AdminPanel
