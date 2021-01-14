import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import axios from 'axios';
import Button from "react-bootstrap/cjs/Button";
import Url from '../../../URL';
import '../../main.css';
import Modal from "react-bootstrap/Modal";
function AdminRemoveItem (){
    const [item, setItem] = useState([]);
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState({});
    const [changedName, setChangedName] = useState( '');
    const [changedDescription, setChangedDescription] = useState( '');
    const [changedUsage, setChangedUsage] = useState( '');
    const [changedContraindications, setChangedContraindications] = useState( '');
    const [changedWeight, setChangedWeight] = useState( '');
    const [changedPrice, setChangedPrice] = useState( '');
    const [soldOut, setSoldOut] = useState(false);
    useEffect(()=>{
        axios.get(Url + 'getAll')
            .then(res => {
                console.log(res);
                setItem(res.data);
                setSoldOut(res.data.SoldOut);
            })
    }, []);
    function change(index){
        if(changedName !== '' && changedWeight !== '' && changedPrice !== ''){
            let data = {
                Name: changedName,
                Description: changedDescription,
                Usage: changedUsage,
                Contraindications: changedContraindications,
                Weight: changedWeight,
                Price: changedPrice,
                SoldOut: soldOut,
                id: index,
            };
            axios.post(Url + 'changeItems',data).then(res=>{
                window.location.reload()
            })
        }else{
            alert('Հոպար սաղ չես լրացրել!!!')
        }
    };
    function hide(index){
        setChanged(item[index]);
        setShow(!show)
    };
    return (

        <div className='AdminAddItem'>
            {console.log(soldOut)}
            <div>
                <Modal show={show}>
                    <Modal.Header closeButton onClick={()=>hide(0)} />
                    <Modal.Body>
                        <input type="text" id='changedName' placeholder={changed.Name} onChange={(e)=>setChangedName(e.target.value)}/>
                        <input type="text" id='changedDescription' placeholder={changed.Description} onChange={(e)=>setChangedDescription(e.target.value)}/>
                        <input type="text" id='changedUsage' placeholder={changed.Usage} onChange={(e)=>setChangedUsage(e.target.value)}/>
                        <input type="text" id='changedContraindications' placeholder={changed.Contraindications} onChange={(e)=>setChangedContraindications(e.target.value)}/>
                        <input type="text" id='changedWeight' placeholder={changed.Weight} onChange={(e)=>setChangedWeight(e.target.value)}/>
                        <input type="text" id='changedPrice' placeholder={changed.Price} onChange={(e)=>setChangedPrice(e.target.value)}/>
                        <input type="checkbox" onClick={()=>setSoldOut(!soldOut)}/>
                        <Button onClick={()=>change(changed._id)}>Change</Button>
                    </Modal.Body>
                </Modal>
            </div>

            <Row>
                {item?item.map((item, index)=>
                    <Col xs={3} key={index}>
                        <div className="itemImage" style={{backgroundImage: `url(${Url + 'static/' + item.Image})`}} />
                        <p>{item.Name}</p>
                        <div className="d-flex justify-content-around">
                            <span>{item.Weight}</span>
                            <span>{item.Price}</span>
                        </div>
                        <div onClick={()=>hide(index)}>Change</div>
                    </Col>
                ):null}
            </Row>

        </div>
    )
}
export default AdminRemoveItem;