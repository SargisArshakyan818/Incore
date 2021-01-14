import React, {useEffect, useState} from 'react';

import '../main.css';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";

function Card (){
    return (
        <div className='card'>
            <Row>
                <Col>
                    Items
                </Col>
            </Row>
        </div>
    )
}
export default Card;