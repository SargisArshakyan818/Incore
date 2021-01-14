import React from 'react';
import Url from '../../URL';
import '../main.css';
import axios from "axios";

function ShopItem ({name, weight, price, image, id, setCardItems }){
    function addToCard() {
        let data ={
            id: id,
        };
        axios.post(Url + 'getItemById', data).then(res=>{
            setCardItems(res.data, 'plus');
        });
    }
    return (
        <div className='ShopItem'>
            {image?<div className="itemImage" style={{backgroundImage: `url(${Url + 'static/' + image})`}} />:null }
            <p className="name">{name}</p>
            <div className="d-flex flex-column justify-content-around">
                <span className="mb-2 weight">{weight}</span>
                <span className="strikethrough-price">000000</span>
                <span className="price">{price} դր․</span>
            </div>
            <button className="btn" onClick={() => addToCard()}><span>Ավելացնել զամբյուղ</span> <i className="fas fa-shopping-basket" /></button>
        </div>
    )
}
export default ShopItem;