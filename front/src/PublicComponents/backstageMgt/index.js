import React from 'react'
import './style.css'
import Top from './component/top'
import StaffDep from './component/staff&department'
import Jurisdiction from "./component/pub/jurisdiction";

function BackstageMgt() {
        return(
            <div>
                <Top></Top>
                {/*<StaffDep></StaffDep>*/}
                <Jurisdiction></Jurisdiction>
            </div>
        )
}

export default BackstageMgt
