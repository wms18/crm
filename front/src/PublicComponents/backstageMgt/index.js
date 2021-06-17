import React from 'react'
import './style.css'
import Top from './component/top'
import StaffDep from './component/staff&department'
import Jurisdiction from "./component/pub/jurisdiction";
import SystemMgt from './component/pub/jurisdiction/system/components/systemMgt';
import RoleControl  from './component/rolecontrol'

function BackstageMgt() {
        return(
            <div>
                <Top></Top>
                {/* <SystemMgt></SystemMgt> */}
                {/*<StaffDep></StaffDep>*/}
                <RoleControl></RoleControl>
            </div>
        )
}

export default BackstageMgt
