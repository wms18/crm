import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import './style.css';
import Alertmodal from '../../../../../components/alertmodal';
import EchartsTest from '../../../../../components/echarts';
import SalesTrend from '../../../../../components/salesTrend';
import Topleft from './component/topleft'
import Toprightt from './component/topright'
import Footleft from './component/footleft'
import Footright from './component/footright'
import base from '../../../../../axios/axios';
import { AlignCenterOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Button, Select, DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';


const { Header, Content, Footer, } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker

function Dashboaedlayout() {
    
    let [token, setToken] = useState(window.localStorage.getItem('token'))
    
    useEffect(() => {
        getPpt()
        getEmployee()
        getPerformance()
        getPptDetail()
        getDep()
    }, [])
    
    //获得所有部门
    function getDep() {
        axios({
            method: 'get',
            url: `${base.url}/employee/getAllDepartment`,   //获取业绩指标
            params:{
                token:token
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
    }
    function onOk(value, dateString) {
        console.log('onOk: ', value);
        let startTime = value[0]._d.getFullYear() + '-' + Number(value[0]._d.getMonth() + 1) + '-' + value[0]._d.getDate()
        let endTime = value[1]._d.getFullYear() + '-' + Number(value[1]._d.getMonth() + 1) + '-' + value[1]._d.getDate()
        //  console.log(startTime);
        //  console.log(endTime);
    }

    function getPerformance() {
        axios({
            method: 'get',
            url: `${base.url}/dashboard/performance?&ids=1&ids=2&ids=3`,   //获取业绩指标
            params: {
                token: token,
                endTime: '2020-07-05',
                // ids: [1,2,3],
                startTime: '2021-07-5',
                status: 0
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
    }


    function getPpt() {

        const arr = [1, 2, 3]
        let str = `&ids=${arr[0]}&`

        for (let i = 1; i <= arr.length - 1; i++) {
            str = str + `ids=${arr[i]}&`
            if (i = arr.length - 1) {
                str = str + `ids=${arr[i]}`
            }
        }

        console.log(str);

        axios({
            method: 'get',
            url: `${base.url}/dashboard/powerPoint?${str}`,
            params: {
                token: token,
                endTime: '2021-07-05',
                startTime: '2020-07-05',

            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
    }
    function getPptDetail() {

        const arr = [1, 2, 3]
        let str = `&ids=${arr[0]}&`

        for (let i = 1; i <= arr.length - 1; i++) {
            str = str + `ids=${arr[i]}&`
            if (i = arr.length - 1) {
                str = str + `ids=${arr[i]}`
            }
        }


        axios({
            method: 'get',
            url: `${base.url}/dashboard/powerPoint/detail?${str}`,
            params: {
                token: token,
                limit: 10,
                currentPage: 1,
                endTime: '2021-07-05',
                startTime: '2020-07-05',
                choice: 1,
                keyword: ''
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
    }
    function getEmployee() {
        axios({
            method: 'get',
            url: `${base.url}/employee/getEmployee`,
            params: {
                token: token,
                currentPage: 1,
                // keyword:'',
                limit: 10,
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', backgroundColor: '#f5f6f9', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '540px', minWidth: '540px', justifyContent: 'space-between' }}>
                    <span >本人及下属</span>
                    <span  >|</span>
                    <Alertmodal name='切换' ></Alertmodal>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            // onChange={onChange}
                            onOk={onOk}
                        ></RangePicker>
                    </ConfigProvider>
                   
                </div>

                <div>
                    <Button icon={<AlignCenterOutlined />} width={100} style={{ backgroundColor: '#3e84e9', color: '#fff' }} >数据查重</Button>
                </div>
            </div>


            <div className="site-layout-background2" style={{ padding: 24 }}>
                <div>

                    <div>
                        < Topleft></Topleft>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <EchartsTest></EchartsTest>
                        {/* <Toprightt></Toprightt> */}
                    </div>

                </div>

                <div>

                    <div>
                        <Footleft></Footleft>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <SalesTrend></SalesTrend>
                        {/* <Footright></Footright> */}
                    </div>

                </div>

            </div>

        </div>

    )

}

export default Dashboaedlayout;

