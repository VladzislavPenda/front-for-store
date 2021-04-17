import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useState } from 'react';
import { fetchCar, fetchSameCars } from '../../api'
import { Link } from 'react-router-dom'
import './Car.scss'

const Car = () => {

    const [carsList, setCarsList] = useState([])
    const [sameCarsList, setSameCarsList] = useState([])
    const history = useHistory()
    const id = history.location.pathname.slice(5)
    useEffect(() => {
        const fetchData = async () => {
            setCarsList(await fetchCar(id))
            console.log('hi')
        }
        fetchData()
    }, [])

    useEffect(() => {
        const findSameCars = async () => {

            const data = await fetchSameCars(carsList.carcaseType)
            setSameCarsList(data.filter((el) => {
                return el.modelId !== +id
            }))

        }
        findSameCars()
    }, [carsList])

    console.log('09090')

    return (
        <div className="car_container_main">
            <div className="car_info_container">
                <div className="car_info_label">
                    <p className="label_text">Продажа {carsList.model}, {carsList.year}г.</p>
                </div>
                <div className="car_info">
                    <img className="auto_image" src={"/Pictures/" + carsList.pathToPicture} alt="" />
                    <div className="full_technical_info">
                        <p className="params_object">{carsList.price}$</p>
                        <p>Трансмиссия: {carsList.transmission}</p>
                        <p>Привод: {carsList.driveType}</p>
                        <p>Двигатель: {carsList.engineType}</p>
                        <p>Пробег: {carsList.mileAge} км</p>
                        <p>Тип кузова: {carsList.carcaseType}</p>
                    </div>

                </div>
                <div className="car_description">
                    <h1>Описание автомобиля</h1>
                    {carsList.description}
                </div>
            </div>
            <div className="same_results">
                <div className="same_results_label">
                    <p>Похожие результаты</p>
                </div>
                <div className="same_cars_container">
                    {
                        
                        sameCarsList.length && 
                        sameCarsList.map((el) => {
                            return (
                                <Link to={'/car/' + el.modelId}  className="car_container" key={el.modelId}>
                                    <div className="car_image">
                                        <img className="image" src={"/Pictures/" + el.pathToPicture} alt=""/>
                                    </div>
                                    <div className="same_car_info">
                                        <p className="model">{el.model}</p>
                                        <p>{el.price}$</p>
                                    </div>
                                </Link>
                            )
                        })
                        
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Car
