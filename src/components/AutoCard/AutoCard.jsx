import React from 'react'
import { Link } from 'react-router-dom'
import './AutoCard.scss'
// import 'D:/Study/C#/Tutorials/app/src/Pictures'

const AutoCard = ({ inf }) => {
    
    return (
        <Link to={'/car/' + inf.modelId}  className="card">
            <div className="card_picture">
                <img className="card_image" src={"/Pictures/" + inf.pathToPicture} alt="f"/>
            </div>
            <div className="product_information">
                <div className="product_name">
                    {inf.model}
                </div>
                <div className="product_information_additional">
                    Пробег: {inf.mileAge} Кузов: {inf.carcaseType} Год: {inf.year} Двигатель: {inf.engineType}
                </div>
                <div className="product_price">
                    {inf.price}$
                </div>
                
            </div>
            
        </Link>
    )
}

export default AutoCard
