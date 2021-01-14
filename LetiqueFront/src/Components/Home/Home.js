import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Url from '../../URL';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from '../ShopItem/banana.png';
import '../main.css';
import ShopItem from "../ShopItem/ShopItem";
import CardIcon from "../CardIcon/CardIcon";
import CardComponent from "../CardComponent/CardComponent";
import { useWindowSize } from '../../useWindowSizeHook';
const arr = [1,2,3];
function Home (){
    const [items, setItems] = useState([]);
    const [animation, setAnimation] = useState(false);
    const [showCard, setShowCard] = useState(false);

    useEffect(()=>{
            axios.get(Url + 'getAll')
                .then(res =>
                    setItems(res.data)
                );
    },[]);
    const { width } = useWindowSize();
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
    return (
        <div className='home'>
            {/*<div>*/}
            {/*    <Modal show={show}>*/}
            {/*        <Modal.Body>*/}
            {/*            <p>Հարգելի Հաճախորդ</p>*/}
            {/*            <p>Կայքում տեղադրված նկարները կարող են չհամապատասխանել առաքված ապրանքների տեսքին։</p>*/}
            {/*            <p>Որի համար կազմակերպությունը պատասխանատվություն չի կրում։</p>*/}
            {/*            <p>Շնորհակալություն մեզ ընտրելու համար</p>*/}
            {/*        </Modal.Body>*/}
            {/*    </Modal>*/}
            {/*</div>*/}
            <CardIcon animation={animation} setShowCard={setShowCard}/>
            <CardComponent showCard={showCard} setShowCard={setShowCard} setAnimation={setAnimation}/>

            <div className="carousel-div">
                <Carousel transition={'none'} controls={false}>
                    {arr.slice(0,3).map((item, index)=>
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={Image}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    )}
                </Carousel>
            </div>
            <div className="d-flex justify-content-between top">
                <span>Լավագույն Վաճառք</span>
            </div>
            <Row>
                {items.slice(0,3).map((item, index)=>
                    <Col xs={width < 768 ? 12 : 4} key={index}>
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
            <div className="d-flex justify-content-between top">
                <span>Ապրանքներ</span>
                <Link to="/shop">Տեսնել Բոլորը</Link>
            </div>
            <Row>
                {items.slice(0,3).map((item, index)=>
                    <Col xs={width < 768 ? 12 : 4} key={index}>
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
            <Row>
                <h3 className={"w-100 text-center mt-4 pt-4 pb-4 mb-4"}>Հարգելի հաճախորդ ներկա պահի դրությամբ մեզ մոտ գործում է գնման երկու տարբերակ․</h3>
                <Col xs={width >= 768 ? 6 : 12}>
                    <h3 className="w-100 text-center">
                        Ես Կվերցնեմ
                    </h3>
                    <p>Երբ դուք ընտրում եք "Ես Կվերցնեմ" տարբերակը ապա դուք լրացնում եք Ձեր տվյալները որից հետո մեր մասնագետը կապ է հաստատում Ձեզ հետ և նշում օր երբ դուք կարող եք մոտենալ Թումանյան 2 և վերցնել Ձեր պատվերը։</p>
                </Col>
                <Col xs={width >= 768 ? 6 : 12}>
                    <h3 className="w-100 text-center">
                        Պատվիրել
                    </h3>
                    <p>Երբ դուք ընտրում եք "Պատվիրել" տարբերակը ապա դուք լրացնում եք Ձեր տվյալները որից հետո 5 աշխատանքային օրվա ընթացքում մեր առաքիչը ապրանքը կմոտեցնի Ձեր նշված հասցե։</p>
                </Col>
            </Row>
        </div>
    )
}
export default Home;