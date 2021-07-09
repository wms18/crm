import React from 'react'
import './style.css'
import BackstageTop from '../../components/backstageTop'
import StaffDep from './staff&department'
// import RoleControl  from './component/rolecontrol'
import  HomePage from './homepage'
import Menulayout from './menulayout'
import ImgCrop from "antd-img-crop";
import {useEffect} from 'react'
import {withRouter} from 'react-router-dom'

function BackstageMgt(props) {
    useEffect(()=>{
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
    },[])

        return(
            <div>
                <BackstageTop></BackstageTop>
                <Menulayout></Menulayout>
            </div>
        )
}

export default withRouter(BackstageMgt)
