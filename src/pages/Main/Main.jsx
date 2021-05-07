import React, { useEffect, useState } from 'react'

import { fetchCarsList } from '../../api'
import AutoCard from '../../components/AutoCard/AutoCard'
import './Main.scss'
import Filter from '../../components/FilterBar/FilterBar'

const Main = ({currentPage, setCurrentPage, carsList, setCarsList, params, setParams, pagination, setPagination }) => {

    const pageHandler = (page) =>  {
        const newParams = params;
        newParams['pagenumber'] = page
        setParams(newParams)
        setCurrentPage(page)
    }
    
    const pageButtons = () => {
        let content = []
        for(var i = 1; i <= pagination["TotalPages"]; i++)
        {
            if (i === pagination["CurrentPage"]) {
                content.push(
                    <button 
                        id="pageButton" 
                        value={i} 
                        onClick={(e) => setCurrentPage(e.target.value)}
                        style={{
                            background: 'blue'
                        }}
                    >{i}</button>
                )
            } else {
                content.push(<button id="pageButton" value={i} onClick={(e) => pageHandler(e.target.value)}>{i}</button>)
            }
            
        }
        return content
    }

    return (
        <div className="main">
            <div className="cards-container">
                {carsList.map(el => {
                    return <AutoCard key={el.modelId} inf={el} />

                })}
                <div className="buttons-page-container">
                    {pageButtons()}
                </div>
                <div>{pagination["CurrentPage"]} {pagination["TotalPages"]}</div>
            </div>
            <Filter pageHandler={pageHandler} setCurrentPage={setCurrentPage} params={params} setParams={setParams} setCarsList={setCarsList} pagination={pagination} setPagination={setPagination} />
        </div>
    )
}

export default Main
