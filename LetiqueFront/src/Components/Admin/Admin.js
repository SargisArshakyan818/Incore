import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Url from '../../URL';
import '../main.css';
import AdminAddItem from "./AdminAddItem/AdminAddItem";
import AdminHome from "./AdminHome/AdminHome";
import AdminRemoveItem from "./AdminRemoveItem/AdminRemoveItem";
import AdminChangeItem from './AdminChangeItem/AdminChangeItem';
function Admin (){

    const [login, setLogin] = useState(false);

    useEffect(()=> {
        axios.post(Url + 'islogin', localStorage.getItem('user'),{headers:{'authorization': localStorage.getItem('user')}}).then(res => setLogin(res.data));
    });

    const loginFunc = ()=>{
        let data = {
            username:  document.getElementById('login').value,
            password: document.getElementById('password').value
        };
        axios.post(Url + 'login', data).then(res=> { localStorage.setItem('user',res.data);setLogin(true)});
    };

    return (
        <div>
            {login? <div className='admin'>
                <Router>
                    <Route exact path="/admin" component={AdminHome}/>
                    <Route exact path="/admin/add" component={AdminAddItem}/>
                    <Route exact path="/admin/remove" component={AdminRemoveItem}/>
                    <Route exact path="/admin/change" component={AdminChangeItem}/>

                </Router>
            </div>:<div className='login' style={{'height':window.innerHeight}}>
                <div className='registerBlock'>
                    <input id='login' type="text" placeholder='login'/>
                    <input id='password'  type="password" placeholder='password'/>
                    <button onClick={()=>loginFunc()}>Sign In</button>
                </div>
            </div>}
        </div>

    )
}
export default Admin;