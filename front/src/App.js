
import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Top from './PublicComponents/top'
import  PersonalInfo from './PublicComponents/personInfo';
import  CustomerMgt from './PublicComponents/customerMgt'
import ProductTable from './Protable'
import { HashRouter,Route,Link } from 'react-router-dom';
import {routes} from './router';
import Paging from './PublicComponents/backstageMgt/component/staff&department/component/Paging';

function App() {

    return (
        <div className="App">
            {/*<Top></Top>*/}
            {/* <PersonalInfo></PersonalInfo> */}
            {/* <CustomerMgt></CustomerMgt> */}
             <BackstageMgt></BackstageMgt>
            {/*<Login></Login>*/}
            {/* <ProductTable></ProductTable> */}

        </div>
    );


}

export default App;
