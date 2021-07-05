import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './pages/backstageMgt'
import CustomerMgt from './pages/customerMgt';
import TestTable from './test'
import './App.css'

import Top from './PublicComponents/top'
import PersonalInfo from './PublicComponents/personInfo';
// import ProductTable from './Protable'
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { routes } from './router';
import Paging from './PublicComponents/backstageMgt/component/staff&department/component/Paging';
import Login from "./PublicComponents/login/login";
import MenuLeft from "./PublicComponents/office/menu/menu-left";
function App() {

    return (
        <div>
            {/*<Top></Top>*/}
            {/* <PersonalInfo></PersonalInfo> */}
            <CustomerMgt/>
            {/* <BackstageMgt></BackstageMgt>*/}
            {/*<Login></Login>*/}
                {/* <MenuLeft></MenuLeft> */}
        </div>
    );


}

export default App;
