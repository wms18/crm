import { Layout, Button, Select } from 'antd';
import React, { useState } from 'react';
import './style.css';
import Alertmodal from '../../../components/Alertmodal'
import { AlignCenterOutlined, HomeOutlined } from '@ant-design/icons';
import Topleft from './component/topleft'
import Toprightt from './component/topright'
import Footleft from './component/footleft'
import Footright from './component/footright'
import axios from 'axios';
import base from '../../../../../axios/axios';
import { useEffect } from 'react';
const { Header, Content, Footer, } = Layout;
const { Option } = Select;


function Dashboaedlayout() {

    let [token,setToken]=useState(window.localStorage.getItem('token'))
    
    useEffect(()=>{
        getPpt()
        getEmployee()
    },[])

    function getPpt() {
        axios({
            method:'get',
            url:`${base.url}/dashboard/powerPoint`,
            params:{
                token:token,
                endTime:'2020',
                ids:1,
                startTime:'2021',

            }
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((res)=>{
            console.log(res);
        })
    }
    function getEmployee() {
        axios({
            method:'get',
            url:`${base.url}/employee/getEmployee`,
            params:{
                token:token,
                currentPage:1,
                // keyword:'',
                limit:10,
            }
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((res)=>{
            console.log(res);
        })
    }

    return (
        <div>
            <div style={{ display: 'flex' ,justifyContent:'space-between',marginBottom:'10px',backgroundColor:'#f5f6f9',padding:'24px'}}>
                <div style={{display:'flex',alignItems:'center',width:'360px',justifyContent:'space-between'}}>
                    <span >本人及下属</span>
                    <span  >|</span>
                    <Alertmodal    name='切换' ></Alertmodal>
                    <Select  defaultValue="本年" style={{ width: 200 }} onChange={''}>
                        <Option value="today">今天</Option>
                        <Option value="yesterday">昨天</Option>
                        <Option value="thisweek">本周</Option>
                        <Option value="lastweek">上周</Option>
                        <Option value="thismonth">本月</Option>
                        <Option value="lastmonth">上月</Option>
                        <Option value="thisseason">本季</Option>
                        <Option value="lastseason">上季</Option>
                        <Option value="thisyear">本年</Option>
                        <Option value="lastyear">去年</Option>
                    </Select>
                </div>

                <div>
                    <Button icon={<AlignCenterOutlined />} width={100}  style={{backgroundColor:'#3e84e9',color:'#fff'}} >数据查重</Button>
                </div>
            </div>


            <div className="site-layout-background2" style={{    padding: 24}}>
                <div>

                    <div>
                        < Topleft></Topleft>
                    </div>

                    <div>
                        <Toprightt></Toprightt>
                    </div>

                </div>

                <div>

                    <div>
                        <Footleft></Footleft>
                    </div>

                    <div>
                        <Footright></Footright>
                    </div>

                </div>

            </div>

        </div>

    )

}

export default Dashboaedlayout;

