import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Top from './PublicComponents/top'
import PersonalInfo from './PublicComponents/personInfo';
import CustomerMgt from './PublicComponents/customerMgt'
import ProductTable from './Protable'
import Index from "./PublicComponents/office";
import Paging from './PublicComponents/backstageMgt/component/staff&department/component/Paging';
import Login from "./PublicComponents/login/login";
import {HashRouter, Switch, Route} from "react-router-dom";

function App() {

    return (
        <div>
            <HashRouter>
                <Switch>
                    {/*<Top></Top>*/}
                    {/* <PersonalInfo></PersonalInfo> */}
                    {/* <CustomerMgt></CustomerMgt> */}
                     <BackstageMgt></BackstageMgt>
                    {/*<Route path={'/back'} component={BackstageMgt}></Route>*/}
                    {/*<Route exact path={'/'} component={Login}></Route>*/}
                    {/*<Login></Login>*/}
                    {/* <ProductTable></ProductTable> */}
                    {/*<Index></Index>*/}
                </Switch>
            </HashRouter>
        </div>
    );


}

export default App;
