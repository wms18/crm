import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Top from './PublicComponents/top'
import PersonalInfo from './PublicComponents/personInfo';
import CustomerMgt from './PublicComponents/customerMgt'
import ProductTable from './Protable'
import Index from "./PublicComponents/office";
import { HashRouter,Route,Link,Switch } from 'react-router-dom';
import {routes} from './router';
import Paging from './PublicComponents/backstageMgt/component/staff&department/component/Paging';
import Login from "./PublicComponents/login/login";
import MenuLeft from "./PublicComponents/office/menu/menu-left";
function App() {

    return (
        <div>
            <HashRouter>
                <Switch>
                    {/*<Top></Top>*/}
                    {/* <PersonalInfo></PersonalInfo> */}
                    {/* <CustomerMgt></CustomerMgt> */}
                    {/* <BackstageMgt></BackstageMgt>*/}
                    {/*<Login></Login>*/}
                    {/* <ProductTable></ProductTable> */}
                    {/*<Index></Index>*/}
                    <MenuLeft></MenuLeft>
                </Switch>
            </HashRouter>
        </div>
    );


}

export default App;
