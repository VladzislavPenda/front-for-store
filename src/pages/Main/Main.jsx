import React, { useEffect, useState } from 'react'

import { fetchCarsList } from '../../api'
import AutoCard from '../../components/AutoCard/AutoCard'
import './Main.scss'
import Filter from '../../components/FilterBar/FilterBar'

const Main = ({ carsList, setCarsList }) => {
    

    return (
        <div className="main">
            <div className="cards-container">
                {carsList.map(el => {
                    return <AutoCard key={el.modelId} inf={el} />
                            
                })}
            </div>
            <Filter setCarsList={setCarsList}/>
        </div>
    )
}

export default Main
