import React from 'react';
import { Link } from 'react-router-dom';

import '../../main.css';

function AdminHome (){
    return (
        <div className='admin'>
            <Link to="/admin/add">Ավելացնել Ապրանք</Link>
            <Link to="/admin/change">Փոխել Ապրանքի նկարագիրը</Link>
            <Link to="/admin/remove">Հեռացնել Ապրանքը</Link>
        </div>
    )
}
export default AdminHome;