
import React from 'react'
// import CustomerMgt from './PublicComponents/customerMgt'
import BackstageMgt from './PublicComponents/backstageMgt'
import Top from './PublicComponents/top'
import  PersonalInfo from './PublicComponents/personInfo';
import  CustomerMgt from './PublicComponents/customerMgt'


function App() {

    return (
        <div className="App">
            {/* <Top></Top> */}
            {/* <PersonalInfo></PersonalInfo> */}
            <CustomerMgt></CustomerMgt> 
            {/* <BackstageMgt></BackstageMgt> */}
        </div>
    );


}

export default App;
