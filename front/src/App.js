import  React from 'react'
import BackstageMgt from './PublicComponents/backstageMgt'
import PersonalInfo  from './PublicComponents/personInfo';
import ReceptionTop from './PublicComponents/top';
function App  () {

        return (
            <div className="App">
                    <PersonalInfo></PersonalInfo>
                    <ReceptionTop></ReceptionTop>
            </div>
        );


}

export default App;
