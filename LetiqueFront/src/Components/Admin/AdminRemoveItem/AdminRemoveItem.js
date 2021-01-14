import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import axios from 'axios';
import Url from '../../../URL';
import '../../main.css';
function AdminRemoveItem (){
    const [item, setItem] = useState([]);
    useEffect(()=>{
        axios.get(Url + 'getAll')
            .then(res => {
                setItem(res.data)
            })
    });
    function remove(index){
        let data = {
            id: item[index]._id,
        };
        axios.post(Url + 'removeItems',data).then(res=>{
            window.location.reload()
        })
    };
    return (
        <div className='AdminAddItem'>
            <Row>
                {item?item.map((item, index)=>
                    <Col xs={3} key={index}>
                        <div className="itemImage" style={{backgroundImage: `url(${Url + 'static/' + item.Image})`}} />
                        <p>{item.Name}</p>
                        <div className="d-flex justify-content-around">
                            <span>{item.Weight}</span>
                            <span>{item.Price}</span>
                        </div>
                        <div onClick={()=>remove(index)}>Remove</div>
                    </Col>
                ):null}
            </Row>
        </div>
    )
}
export default AdminRemoveItem;