import React, { useEffect, useState } from 'react'

import { fetchCarsList } from '../../api'
import AutoCard from '../../components/AutoCard/AutoCard'
import './Main.scss'

const Main = () => {
    const [carsList, setCarsList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setCarsList(await fetchCarsList())

        }
        fetchData()
    }, [])

    return (
        <div className="main">
            <div className="cards-container">
                {carsList.map(el => {
                    return <AutoCard key={el.modelId} inf={el} />
                })}
            </div>
            <div className="filters_container">
                
            </div>
        </div>
    )
}

export default Main
