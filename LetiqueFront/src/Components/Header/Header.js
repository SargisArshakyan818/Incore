import React, {useRef, useState} from 'react';
import Logo from "./Logo.svg";
import '../main.css';
import Menu from "../Menu/Menu";
function Header (){
    const [open, setOpen] = useState(false);
    const [workAnimation, setWorkAnimation] = useState(false);
    const menuIcon = useRef();
    const OpenMenu = () => {
        setWorkAnimation(true);
        menuIcon.current.classList.toggle('open');
        setOpen(!open);
    };

    return (
        <div className='header'>
            <div className="navba d-flex justify-content-between align-items-center">
                <div id="nav-icon1" ref={menuIcon} onClick={()=>OpenMenu()}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`${workAnimation ? open ?'showBackgroundEffect':'hideBackgroundEffect' : ''} background-effect`} />
                <div className={`${workAnimation ? open ? 'showMenu': 'hideMenu' : ''} menu-block`} >
                    <Menu openMenu={()=>OpenMenu}/>
                </div>
                <img src={Logo} alt="logo" height="80" width="80" />
                {/*<ul className='navbars-right mb-0'>*/}
                {/*    <Link to="/"><i className="fas fa-shopping-bag navItem"></i></Link>*/}
                {/*</ul>*/}
            </div>
        </div>
    )
}
export default Header;