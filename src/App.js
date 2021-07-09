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
import {useEffect} from 'react'
function App() {
    return (
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
                </Switch>
            </HashRouter>
        </div>
    );
}
export default App;
