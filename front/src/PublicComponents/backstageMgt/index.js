import React from 'react'
import './style.css'
import Top from './component/top'
import StaffDep from './component/staff&department'
import  HomePage from './component/homepage'


function BackstageMgt() {
        return(
            <div>
                <Top></Top>
                <StaffDep></StaffDep>
                {/*<HomePage></HomePage>*/}
            </div>
        )
}

export default BackstageMgt
