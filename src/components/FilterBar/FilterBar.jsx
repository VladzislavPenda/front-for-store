import React, { useEffect, useState } from 'react'
import { fetchCarcaseTypes, fetchCarsListWithParam } from '../../api'
import { fetchMarks, fetchEngineTypes, fetchDriveTypes  } from '../../api'
import './FilterBar.scss'

const Filter = ({ setCarsList }) => {
    const [params, setParams] = useState({})
    const [carcaseTypesList, setCaseTypesList] = useState([])
    const [markList, setMarkList] = useState([])
    const [engineTypesList, setEngineTypesList] = useState([])
    const [driveTypesList, setDriveTypesList] = useState([])

    useEffect(() => {
        
        const fetchCarcaseList = async () => {
            setCaseTypesList(await fetchCarcaseTypes())
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
    }, [])

    const setParam = (param, value) => {
        const newParams = params;
        newParams[param] = value
        setParams(newParams)
    }


    const useParams = () => {
        const fetchData = async () => {
            setCarsList(await fetchCarsListWithParam(params))
        }
        fetchData()
    }

    return (
        <div className="filters_container">
            <div className="filters_bar">
                Стоимость
                <div className="price_filter">
                    <input onChange={e => setParam('minPrice', e.target.value)} className="input_filters" type="text" placeholder=" От" />
                    <input onChange={e => setParam('maxPrice', e.target.value)} className="input_filters" type="text" placeholder=" До" />
                </div>
                Лошадиные силы
                <div className="price_filter">
                    <input onChange={e => setParam('minHorsePower', e.target.value)} className="input_filters" type="text" placeholder=" От" />
                    <input onChange={e => setParam('maxHorsePower', e.target.value)} className="input_filters" type="text" placeholder=" До" />
                </div>
                Пробег
                <div className="price_filter"> 
                    <input onChange={e => setParam('minMileAge', e.target.value)} className="input_filters" type="text" placeholder=" От" />
                    <input onChange={e => setParam('maxMileAge', e.target.value)} className="input_filters" type="text" placeholder=" До" />
                </div>

                <div className="select_container">
                    <p className="select_label">Тип кузова</p>
                    <div className="select_bar">
                        <select className="select_element" onChange={e => setParam('carcasetype', e.target.value)}>
                        <option value="">Все</option>
                            {carcaseTypesList.map((type) => {
                                return <option key={type.id} value={type.type}>{type.type}</option>
                            })}
                        </select>
                    </div>
                    
                </div>
                
                <div className="select_container">
                    <p className="select_label">Марка авто</p>
                    <div className="select_bar">
                        <select className="select_element" onChange={e => setParam('markName', e.target.value)}>
                            <option value="">Все</option>
                            {markList.map((country) => {
                            return <option key={country.id} value={country.markNum}>{country.markNum}</option>
                            })}
                        </select>    
                    </div>
                </div>

                <div className="select_container">
                    <p className="select_label">Двигатель</p>
                    <div className="select_bar">
                        <select className="select_element" onChange={e => setParam('enginetype', e.target.value)}>
                        <option value="">Все</option>
                            {engineTypesList.map((type) => {
                                return <option key={type.id} value={type.type}>{type.type}</option>
                            })}
                        </select>
                    </div>
                    
                </div>

                <div className="select_container">
                    <p className="select_label">Привод</p>
                    <div className="select_bar">
                        <select className="select_element" onChange={e => setParam('drivetype', e.target.value)}>
                        <option value="">Все</option>
                            {driveTypesList.map((type) => {
                                return <option key={type.id} value={type.type}>{type.type}</option>
                            })}
                        </select>
                    </div>
                    
                </div>
                
            </div>          
            <div className="test">
                <button onClick={useParams} className="search_button">Поиск</button>
            </div>
        </div>
    )
}

export default Filter