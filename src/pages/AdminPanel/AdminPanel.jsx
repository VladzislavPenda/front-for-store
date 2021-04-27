import React, { useEffect, useState } from 'react'
import { fetchParams } from '../../api'
import './AdminPanel.scss'

const AdminPanel = () => {
    const [type, setType] = useState('shopCarcaseType')
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
        }

    ]

    return (
        <div className="ap__body">
            <div className="ap__content">
                <div className="ap__types">
                    {types.map(el => {
                        return <div onClick={() => setType(el.path)}>{el.title}</div>
                    })}
                </div>
                <div className="ap__var">
                    {paramList.map(el => {
                        return <div style={{
                            
                        }}>
                            <div>
                                {el.type}
                            </div>
                            <div>
                                <div>!</div> 

                                <div>X</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
