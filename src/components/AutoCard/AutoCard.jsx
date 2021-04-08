import React from 'react'
import './AutoCard.scss'
// import 'D:/Study/C#/Tutorials/app/src/Pictures'
const a = "/Pictures/"
var b ="citroen_xsara_2000.jpg"

const AutoCard = ({ inf }) => {
    var stroka = a + inf.pathToPicture
    return (
        <div className="card">
            <div className="card_picture">
                
                <img className="card_image" src={stroka} alt="f"/>
            </div>
            <div className="product_information">
                <div className="product_name">
                    {inf.markName} {inf.model}
                </div>
                <div className="product_information_additional">
                    Пробег: {inf.mileAge} Кузов: {inf.carcaseType} Год: {inf.year} Двигатель: {inf.engineType}
                </div>
                <div className="product_price">
                    {inf.price}$
                </div>
                
            </div>
            
        </div>
    )
}

export default AutoCard
