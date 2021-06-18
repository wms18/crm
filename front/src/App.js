
import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Login from "./PublicComponents/backstageMgt/component/pub/login/login";
import './PublicComponents/backstageMgt/component/pub/login/login.css'
import Office from './PublicComponents/backstageMgt/component/pub/office/office'
import Top from './PublicComponents/top'
import  PersonalInfo from './PublicComponents/personInfo';
import  CustomerMgt from './PublicComponents/customerMgt'


function App() {

    return (
        <div className="App">
            {/*<Top></Top>*/}
            {/* <PersonalInfo></PersonalInfo> */}
            {/*<CustomerMgt></CustomerMgt>*/}
             <BackstageMgt></BackstageMgt>
            {/*<Login></Login>*/}
        </div>
    );


}

export default App;
