
import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Top from './PublicComponents/top'
import  PersonalInfo from './PublicComponents/personInfo';
import  CustomerMgt from './PublicComponents/customerMgt'
import Login from "./PublicComponents/login/login";
import MenuLeft from "./PublicComponents/office/menu/menu-left";
function App() {

    return (
        <div className="App">
            {/*<Top></Top>*/}
            {/* <PersonalInfo></PersonalInfo> */}
            {/*<CustomerMgt></CustomerMgt>*/}
             <BackstageMgt></BackstageMgt>
            {/*<Login></Login>*/}
            {/*<MenuLeft></MenuLeft>*/}
        </div>
    );


}

export default App;
