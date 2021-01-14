import React, {useEffect, useState} from 'react';
import '../main.css';
function CardIcon ({animation, setShowCard}){
    // eslint-disable-next-line
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);

    function priceRenderer() {
        let localPrice = 0;
        // eslint-disable-next-line
        JSON.parse(localStorage.getItem('cardItems')).map((item, index) => {
            localPrice += Number(item.Count * item.Price);
        });
        setPrice(localPrice);
    }

    useEffect(()=>{
        let localCount = 0;
        if(JSON.parse(localStorage.getItem('cardItems'))?.length > 0){
            // eslint-disable-next-line
            JSON.parse(localStorage.getItem('cardItems')).map((item) => {
                localCount += Number(item.Count);
            });
            setCount(localCount);
        }
        // eslint-disable-next-line
    },[count, JSON.parse(localStorage.getItem('cardItems'))]);

    return (
        <>
            {/* eslint-disable-next-line*/}
            <div className={`${animation? 'card-animation': ''} Card`} onClick={()=>{setShowCard(true); {JSON.parse(localStorage.getItem('cardItems'))?.length > 0 ? priceRenderer() :null}}}>
                <svg style={{stroke: "#ffffff"}} className="card-icon" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 64 64">
                    <path fill="none" strokeWidth="2" strokeMiterlimit="10" d="M44 18h10v45H10V18h10z" />
                    <path fill="none" strokeWidth="2" strokeMiterlimit="10"
                          d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13" />
                </svg>
                <span className="all-count">{JSON.parse(localStorage.getItem('cardItems'))?.length ? count : 0} </span>
            </div>
        </>
    )
}
export default CardIcon;