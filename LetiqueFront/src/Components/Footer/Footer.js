import React from 'react';
import {ReactComponent as Logo} from './Logo.svg';
import facebook from './facebook.png';
import instagram from './instagram.png';
import developer from './code.png';
import '../main.css';
function Footer (){
    return (
        <div className='footer'>
            <div className="footer-logo">
                <Logo />
            </div>
            <div className="footer-icons">
                <a href="https://www.facebook.com/">
                    <img src={facebook} alt="facebook" />
                </a>
                <a href="https://www.facebook.com/">
                    <img src={instagram} alt="instagram" />
                </a>
            </div>
            <a href="https://www.facebook.com/">
                <img src={developer} alt="developer" />
                <div>
                    Developed By SARSHAKYAN333
                </div>
            </a>
        </div>
    )
}
export default Footer;