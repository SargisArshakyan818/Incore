import React, {useEffect, useState} from 'react';

import '../main.css';
import Col from "react-bootstrap/cjs/Col";
import ShopItem from "../ShopItem/ShopItem";
import Row from "react-bootstrap/cjs/Row";
import axios from "axios";
import Url from "../../URL";
import CardIcon from "../CardIcon/CardIcon";
import CardComponent from "../CardComponent/CardComponent";
import { useWindowSize } from '../../useWindowSizeHook';

function Shop (){
    const [items, setItems] = useState([]);
    const [animation, setAnimation] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        axios.get(Url + 'getAll')
            .then(res => {
                setItems(res.data)
            });
    },[]);
    const {width}  = useWindowSize();
    let setCardItems= (cardItem, count) => {
        let arr;
        if(count === 'plus'){
            cardItem.Count += 1;
        }else{
            if(cardItem.Count>0){
                cardItem.Count -= 1;
            }else{
                cardItem.Count = 0;
            }
        }


        arr = JSON.parse(localStorage.getItem('cardItems')) || [];
        // eslint-disable-next-line
        Array.prototype.inArray = function(comparer) {
            for(let i=0; i < this.length; i++) {
                if(comparer(this[i])) return true;
            }
            return false;
        };
        // eslint-disable-next-line
        Array.prototype.pushIfNotExist = function(cardItem, ars) {
            if (!this.inArray(ars)) {
                this.push(cardItem);
            }else{
                let result = arr.find(i=> i._id === cardItem._id);
                let index = arr.indexOf(result);
                if(count ==='plus'){
                    cardItem.Count = arr[index].Count + 1;
                    arr[index] = cardItem;
                }else{
                    if(arr[index].Count>0){
                        cardItem.Count = arr[index].Count - 1;
                        arr[index] = cardItem;
                    } else{
                        arr.splice(index,1);
                    }
                }


            }
        };
        arr.pushIfNotExist(cardItem, function(e) {
            return  e._id === cardItem._id;
        });
        if(cardItem.Count === 0){
            let result = arr.find(i=> i._id === cardItem._id);
            let index = arr.indexOf(result);
            arr.splice(index, 1);
        }
        localStorage.setItem('cardItems', JSON.stringify(arr));
        setAnimation(true);
        setTimeout(()=>{
            setAnimation(false);
        }, 1000);

    };
    let itemsFilterer = (type, active) =>{
        if(type === 'All'){
            axios.get(Url + 'getAll')
                .then(res => {
                    setItems(res.data);
                });
        }else{
            axios.get(Url + 'getAll')
                .then(res => {
                    let data = res.data.filter(item => item.Type === type);
                    setItems(data);
                });
        }
        let arr = document.getElementsByClassName('filter-item');
        for(let i of arr){
            if(i.classList.contains('active')){
                i.classList.remove('active');
                arr[active].classList.add('active');
            }else{
                arr[active].classList.add('active')
            }
        }
    };
    return (
        <div className='shop'>
            <CardIcon animation={animation} setShowCard={setShowCard}/>
            <CardComponent showCard={showCard} setShowCard={setShowCard} setAnimation={setAnimation}/>
            <Row className="pr-4 pl-4">
                <Col xs={12}>
                    <div className="filter-section">
                        <h3 className="filter-title">
                            Տեսակ
                            {width < 768 ? (
                                <p onClick={()=>setOpen(!open)}>{open ? '-' : '+' }</p>
                            ): null}
                        </h3>

                        {width < 768 && open ? (
                            <div className="filter-items">
                                <p onClick={()=>itemsFilterer('All',0)} className="filter-item active">Բոլորը</p>
                                <p onClick={()=>itemsFilterer('Body',1)} className="filter-item">Մարմին</p>
                                <p onClick={()=>itemsFilterer('Face',2)} className="filter-item">Դեմք</p>
                                <p onClick={()=>itemsFilterer('Hair',3)} className="filter-item">Մազեր</p>
                                <p onClick={()=>itemsFilterer('Scrubs',4)} className="filter-item">Սկրաբեր</p>
                                <p onClick={()=>itemsFilterer('Other',5)} className="filter-item">Այլ</p>
                            </div>
                        ): width >= 767 ? (
                            <div className="filter-items">
                                <p onClick={()=>itemsFilterer('All',0)} className="filter-item active">Բոլորը</p>
                                <p onClick={()=>itemsFilterer('Body',1)} className="filter-item">Մարմին</p>
                                <p onClick={()=>itemsFilterer('Face',2)} className="filter-item">Դեմք</p>
                                <p onClick={()=>itemsFilterer('Hair',3)} className="filter-item">Մազեր</p>
                                <p onClick={()=>itemsFilterer('Scrubs',4)} className="filter-item">Սկրաբեր</p>
                                <p onClick={()=>itemsFilterer('Other',5)} className="filter-item">Այլ</p>
                            </div>
                        ) : null}
                    </div>
                </Col>
                <Col xs={12}>
                    <Row>
                        {items.map((item, index)=>
                            <Col xs={width < 768 ? 12 : 3} key={index}>
                                <ShopItem
                                    name={item.Name}
                                    weight={item.Weight}
                                    price={item.Price}
                                    image={item.Image}
                                    id={item._id}
                                    setCardItems={setCardItems}
                                />
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default Shop;