import React from 'react'
import './style.css'
import BackstageTop from '../../components/backstageTop'
import StaffDep from './staff&department'
// import RoleControl  from './component/rolecontrol'
import  HomePage from './homepage'
import Menulayout from './menulayout'


function BackstageMgt(props) {

        return(
            <div>
                <BackstageTop></BackstageTop>
                <Menulayout></Menulayout>
            </div>
        )
}

export default BackstageMgt
