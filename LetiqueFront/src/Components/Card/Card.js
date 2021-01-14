import React, {useState, useEffect} from 'react';
import '../main.css';
import Url from "../../URL";
function Card ({setCardItems, priceRenderer}){
    let [items, setItems] = useState([]);

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('cardItems')).length > 0){
            setItems(JSON.parse(localStorage.getItem('cardItems')));
        }else{
            setItems([])
        }
    }, []);
    return (
        <div className={`HomeTopSale`}>
            {items.map((item, index)=>
                <div key={index} className="d-flex justify-content-between align-items-center card-item">
                    <div className="card-item-image" style={{backgroundImage: `url(${Url + 'static/' + item.Image})`}} />
                    <div className="item-details">
                        <div>{item.Name}</div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <button className='counterButton' onClick={()=>{setCardItems(item,'minus'); setItems(JSON.parse(localStorage.getItem('cardItems'))); priceRenderer()}}>-</button>
                            <div>{item.Count}</div>
                            <button className='counterButton' onClick={()=>{setCardItems(item,'plus'); setItems(JSON.parse(localStorage.getItem('cardItems'))); priceRenderer()}}>+</button>
                        </div>
                    </div>
                    <div>{item.Count * item.Price} դր․</div>
                </div>
            )}
        </div>
    )
}
export default Card;