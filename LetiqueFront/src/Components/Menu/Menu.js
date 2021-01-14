import React from 'react';
import { Link }  from "react-router-dom";
import '../main.css';
function Menu({openMenu}) {
    const OpenMenu = openMenu();
    return (
        <div className='menu'>
            <ul className='navbars'>
                <Link to="/"><li className='navItem' onClick={()=>OpenMenu()}>Գլխավոր</li></Link>
                <Link to="/about"><li className='navItem' onClick={()=>OpenMenu()}>Օրվա Ապրանք</li></Link>
                <Link to="/shop"><li className='navItem' onClick={()=>OpenMenu()}>Խանութ</li></Link>
                <Link to="/contact"><li className='navItem' onClick={()=>OpenMenu()}>Կապ</li></Link>
            </ul>
        </div>
    )
}
export default Menu;