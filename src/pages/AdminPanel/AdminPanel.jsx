import React, { useEffect, useState } from 'react'
import { fetchParams } from '../../api'
import './AdminPanel.scss'

const AdminPanel = ({setRole, role, update}) => {
    const [type, setType] = useState('shopCarcaseType')
    // const [id, setId] = useState(1)
    const [paramList, setParamList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setParamList(await fetchParams(type))
        }
        fetchData()
        
    }, [type])

    const updateHandler = (id, typeValue) => {
        // setId(param)
        update(id, typeValue, type)
      }

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
        }
    ]

    return (
        <div className="ap__body">
            <div className="ap__content">
                <div className="ap__types">

                    {types.map(el => {
                        return <div className="ap__type_element" onClick={() => setType(el.path)}><div className="ap_type_text">{el.title}</div></div>
                    })}
                </div>
                <div className="ap__var">
                    <div className="label_for_records">
                        <div className="label_text">Add new record</div>
                        <div className="manage_image_container op">
                            <img className="manage_image" src="/Pictures/add.png" alt="" />
                        </div>
                    </div>
                    {paramList.map(el => {
                        return <div className="record">
                            {Object.keys(el).map((field) => {
                                return <div className="record_info">
                                    {el[field]}
                                </div>
                            })

                            }




                            <div className="record_manager_buttons">
                                <div className="manage_image_container">
                                    <img onClick={() => updateHandler(el.id, el.type)} className="manage_image" src="/Pictures/Edit.png" alt="" />
                                </div>

                                <div className="manage_image_container">
                                    <img className="manage_image" src="/Pictures/delete.png" alt="" />
                                </div>
                            </div>
                        </div>

                    })}
                </div>
            </div>
        </div >
    )
}

export default AdminPanel
