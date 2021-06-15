import React from 'react'
import './style.css'
import Top from './component/top'
import StaffDep from './component/staff&department'
   

function BackstageMgt() {
        return(
            <div>
                <Top></Top>
                <StaffDep></StaffDep>
            </div>
        )
}

export default BackstageMgt