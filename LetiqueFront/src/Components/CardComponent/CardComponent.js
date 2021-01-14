import React, {useEffect, useRef, useState} from 'react';
import Url from '../../URL';
import axios from 'axios';
import Smile from './smile.png';
import useOnclickOutside from "react-cool-onclickoutside";
import '../main.css';
import Card from "../Card/Card";
// import Modal from "react-bootstrap/Modal";
function CardComponent({showCard, setShowCard, setAnimation}){
    const [delivery, setDelivery] = useState(false);
    const [type, setType] = useState('take');
    const [name, setName] = useState('');
    // eslint-disable-next-line
    const [nameError, setNameError] = useState(false);
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    // eslint-disable-next-line
    const [phoneError, setPhoneError] = useState(false);
    const [email, setEmail] = useState('');
    // eslint-disable-next-line
    const [emailError, setEmailError] = useState(false);
    // eslint-disable-next-line
    const [valid, setValid] = useState(false);
    const [message, setMessage] = useState('');
    // const [show, setShow] = useState(false);
    const [price, setPrice] = useState(0);

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
    useEffect(()=>{
        priceRenderer();
    },[price]);
    let refItem = useRef();
    const ref = useOnclickOutside(() => {
        setShowCard(false);
    });
    function priceRenderer() {
        let localPrice = 0;
        // eslint-disable-next-line
        JSON.parse(localStorage.getItem('cardItems')).map((item, index) => {
            localPrice += Number(item.Count * item.Price);
        });
        setPrice(localPrice);
    }

    function send(){
        // eslint-disable-next-line
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let Email = re.test(email);
        if(name === ''){
            setNameError(true);
        }
        if (email === '') {
            setValid(false);
            setEmailError(true);
        }
        if(email !== '' && Email === false) {
            setValid(true);
            setEmailError(false);
        }
        if(phone === ''){
            setPhoneError(true);
        }
        let obj = {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            address: address,
            message: message,
            array: JSON.parse(localStorage.getItem('cardItems')),
        };
        axios.post(Url+'send',obj).then(res =>{
            if(res.data === true){
                console.log('send');
                axios.post(Url + 'sendUser', obj).then(r  => console.log(r));
            } else{
                console.log('chsend')
            }

        });
        setName('');
        setSurname('');
        setEmail('');
        setAddress('');
        setPhone('');
        setMessage('');
    }
    return (
        <>
            {showCard  ? JSON.parse(localStorage.getItem('cardItems'))?.length > 0 ?
                <div className={`card-component ${delivery? 'delivery':''}`} ref={ref}>
                    <p onClick={()=>{setShowCard(false); setDelivery(false)}} className={"close"}>X</p>
                    <div className="d-flex w-100">
                        <div className={delivery? 'delivery-block' : 'w-100'} ref={refItem}>
                            <Card setCardItems={setCardItems} priceRenderer={priceRenderer} />
                            <div className="buttons">
                                <button className="button-card" onClick={()=>{setDelivery(true); setType('take')}}>Ես Կվերցնեմ</button>
                                <button className="button-card" onClick={()=>{setDelivery(true);setType('delivery')}}>Պատվիրել Առաքում</button>
                            </div>
                            <div className="all-price">
                                Ընդամենը։
                                {console.log(price)}
                                <span>{price} դր․</span>
                            </div>

                        </div>
                        {
                            delivery ? (
                                <div className='delivery-block'>
                                    {type === 'take' ? (
                                        <p>Take Text</p>
                                    ): (
                                        <div className="pl-4 pr-4">
                                            <p className="delivery-description">
                                                Առաքումը իրականացվում է 3 աշխատանքային օրվա ընթացքում։
                                                Ստորև տվյալները լրացնելուց հետո մեր աշխատակիցը կապ կհաստատի Ձեզ հետ։
                                                Առաքման արժեքը՝ 500դր․։
                                            </p>
                                            <input type="text" placeholder={'Անուն'} value={name} onChange={(e)=>setName(e.target.value)}/>
                                            <input type="text" placeholder={'Ազգանուն'} value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                                            <input type="text" placeholder={'Հեռախոս'} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                            <input type="text" placeholder={'Էլ․ Փոստ'} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                            <input type="text" placeholder={'Հասցե'} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                            <textarea placeholder={'Հավելյալ նշումներ'} value={message} onChange={(e)=>setMessage(e.target.value)}/>
                                            <button onClick={()=>send()} disabled={name === '' && email === '' && phone === ''}>Պատվիրել</button>
                                        </div>
                                    )}
                                </div>
                            ): null
                        }
                    </div>

                </div> : <div className="card-component">
                    <p onClick={()=>{setShowCard(false); setDelivery(false)}} className={"close"}>X</p>
                    <div>
                        <img src={Smile} alt="smile" className="smile-img"/>
                        <p className="empty-card-text">ՀԱՐԳԵԼԻ ՀԱՃԱԽՈՐԴ ՁԵՐ ԶԱՄԲՅՈՒՂԸ ԴԱՏԱՐԿ Է։</p>
                        <a href="/shop" className="empty-link-button"><button>ԴԻՏԵԼ ՏԵՍԱԿԱՆԻՆ</button></a>
                    </div>
                </div>
            : null}
            </>
    )
}
export default CardComponent;