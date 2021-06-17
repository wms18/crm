
import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Login from "./PublicComponents/backstageMgt/component/pub/login/login";
import './PublicComponents/backstageMgt/component/pub/login/login.css'
import Office from './PublicComponents/backstageMgt/component/pub/office/office'


function App() {

    return (
        <div className="App">
            {/* <CustomerMgt></CustomerMgt> */}
            <BackstageMgt></BackstageMgt>
            {/*<Login></Login>*/}
            {/*<Office></Office>*/}
        </div>
    );


}

export default App;
