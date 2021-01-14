import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Header from "../Header/Header";
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import Contact from "../Contact/Contact";
import Admin from "../Admin/Admin";
import AdminAddItem from "../Admin/AdminAddItem/AdminAddItem";
import AdminRemoveItem from "../Admin/AdminRemoveItem/AdminRemoveItem";
import Footer from "../Footer/Footer";


function Page() {

    return (
        <>
            <div className="page">
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/shop" component={Shop} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/admin/add" component={AdminAddItem} />
                        <Route exact path="/admin/remove" component={AdminRemoveItem} />
                    </Switch>
                    <Footer/>
                </Router>
            </div>
        </>
    );
}

export default Page;
