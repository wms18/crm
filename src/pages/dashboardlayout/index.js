import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import './style.css';
import Alertmodal from '../../components/alertmodal'
import EchartsTest from '../../components/echarts';
import SalesTrend from '../../components/salesTrend';
import Topleft from './component/topleft'
import Toprightt from './component/topright'
import Footleft from './component/footleft'
import Footright from './component/footright'
import base from '../../axios/axios'
import { AlignCenterOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Button, Select, DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';


const { Header, Content, Footer, } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker

function Dashboaedlayout() {

    let [token, setToken] = useState(window.localStorage.getItem('token'))
    let [empDepId, setEmpDepId] = useState({ data: "&ids=1&ids=2&ids=4&" })
    let [startTime, setStartTime] = useState('2020-01-01')
    let [endTime, setEndTime] = useState('2021-12-31')
    let [contractGoal, setContractGoal] = useState('')
    let [returnMoneyGoal, setReturnMoneyGoal] = useState('')

    useEffect(() => {
        getPpt()
        getEmployee()
        getPerformance(0)
        getPerformance(1)
        getPptDetail()
        getDep()
        // getEmpDepId(val)


    }, [empDepId])

    //获得所有部门
    function getDep() {
        axios({
            method: 'get',
            url: `${base.url}/employee/getAllDepartment`,   //获取业绩指标
            params: {
                token: token
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
        if (value[0]._d && value[1]._d) {
            let startTime = value[0]._d.getFullYear() + '-' + Number(value[0]._d.getMonth() + 1) + '-' + value[0]._d.getDate()
            let endTime = value[1]._d.getFullYear() + '-' + Number(value[1]._d.getMonth() + 1) + '-' + value[1]._d.getDate()
            setStartTime(startTime)
            setEndTime(endTime)
        }


    }


    //获取业绩指标,合体金额,回款金额,0回款金额,1合同金额
    function getPerformance(status) {
        axios({
            method: 'get',
            url: `${base.url}/dashboard/performance?${empDepId.data}`,
            params: {
                token: token,
                endTime: endTime,
                startTime: startTime,
                status: status
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.code == 'SUCCESS') {
                    status == 0 ?
                        setContractGoal(res.data.data.contractGoal)
                        :
                        setReturnMoneyGoal(res.data.data.returnMoneyGoal)
                }
            })
            .catch((res) => {
                console.log(res);
            })
    }

    //从孙组件获取到的员工/部门Id
    function getEmpDepId(val) {

        let newArr = []
        val.arr.forEach(item => newArr.push(parseInt(item)))

        let str = `&ids=${newArr[0]}&`
        for (let i = 1; i <= newArr.length - 1; i++) {
            str = str + `ids=${newArr[i]}&`
        }
        let obj = { type: val.type, data: str }
        console.log(obj);
        empDepId = obj
        setEmpDepId(obj)

    }


    //获得新增客户/合同的数量
    function getPpt() {

        axios({
            method: 'get',
            url: `${base.url}/dashboard/powerPoint?${empDepId.data}`,
            params: {
                token: token,
                endTime: endTime,
                startTime: startTime,
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
    }


    //获取新增的客户/商机表格具体信息
    function getPptDetail() {

        axios({
            method: 'get',
            url: `${base.url}/dashboard/powerPoint/detail?${empDepId.data}`,
            params: {
                token: token,
                limit: 10,
                currentPage: 1,
                endTime: endTime,
                startTime: startTime,
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
                    <Alertmodal method={(val) => { getEmpDepId(val) }} name='切换' ></Alertmodal>


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
                        <Topleft></Topleft>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <EchartsTest data={{
                            rG: returnMoneyGoal,
                            cG: contractGoal
                        }}  ></EchartsTest>
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

