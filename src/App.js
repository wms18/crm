import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './pages/backstageMgt'
import CustomerMgt from './pages/customerMgt';
import TestTable from './test'
import './App.css'

import Top from './PublicComponents/top'
import PersonalInfo from './PublicComponents/personInfo';
// import ProductTable from './Protable'
import {HashRouter, Route, Link, Switch, withRouter} from 'react-router-dom';
import {routes} from './router';
import Paging from './PublicComponents/backstageMgt/component/staff&department/component/Paging';
import Login from "./PublicComponents/login/login";
import MenuLeft from "./PublicComponents/office/menu/menu-left";
import ReceptionTop from "./PublicComponents/top";
import { useEffect } from 'react';
import store from "./store/store";
import {Provider} from "react-redux";
function App() {
    // const history = useHistory()
    useEffect(() => {
        if (!window.localStorage.getItem('token') || window.localStorage.getItem('token') == undefined || window.localStorage.getItem('token') == null) {
            // history.push('/')
            window.location.hash = "/";

        }
    }, [])

    return (
        <Provider store={store}>
        <div>
            <HashRouter>
                <Switch>

                    {/*<Top></Top>*/}
                    <Route path={'/person'} component={PersonalInfo}></Route>
                    {/* <PersonalInfo></PersonalInfo> */}
                    <Route path={'/customerMgt/'} component={CustomerMgt}></Route>
                    {/*    <CustomerMgt/>*/}
                    <Route path={'/back'} component={BackstageMgt}></Route>
                    {/* <BackstageMgt></BackstageMgt>*/}
                    <Route exact path={'/'} component={Login}></Route>
                    {/*<Login></Login>*/}
                    <Route path={'/office'} component={MenuLeft}></Route>
                    {/* <Redirect from="/*" to="/" /> */}

                </Switch>
            </HashRouter>
        </div>
        </Provider>
    );
}
export default App;
