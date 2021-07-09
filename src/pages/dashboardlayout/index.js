import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import './style.css';
import Alertmodal from '../../components/alertmodal'
import EchartsTest from '../../components/echarts';
import SalesTrend from '../../components/salesTrend';
import Topright from './component/topright'
import Footleft from './component/footleft'
import Customer from './customer'
import Contacts from './contacts'
import BizOpp from './bizOpp';
import Contract from './contract'
import FollowUp from './followup'
import Payment from './payment'
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
    let [salesKit, setSalesKit] = useState([])

    //新增的销售简报
    let [contactsQty, setContactsQty] = useState('')
    let [contractQty, setContractQty] = useState('')
    let [followRecordQty, setFollowRecordQty] = useState('')
    let [paymentQty, setPaymentQty] = useState('')
    let [customerQty, setCustomerQty] = useState('')
    let [bizOppQty, setBizOppQty] = useState('')

    let [customerData, setCustomerData] = useState([])
    let [contactsData, setContactsData] = useState([])
    let [bizOppData, setBizOppData] = useState([])
    let [followUpRecordData, setFollowUpRecordData] = useState([])
    let [contractData, setContractData] = useState([])
    let [paymentData, setPaymentData] = useState([])

    let [record, setRecord] = useState([])
    let [showInfo, setShowInfo] = useState(false)
    useEffect(() => {
        getPpt()
        getEmployee()
        getPerformance(0)
        getPerformance(1)
        getPptDetail(1)
        getPptDetail(2)
        getPptDetail(3)
        getPptDetail(4)
        getPptDetail(5)
        getDep()


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
        if (value[0] && value[1]) {
            let startTime = value[0]._d.getFullYear() + '-' + Number(value[0]._d.getMonth() + 1) + '-' + value[0]._d.getDate()
            let endTime = value[1]._d.getFullYear() + '-' + Number(value[1]._d.getMonth() + 1) + '-' + value[1]._d.getDate()
            setStartTime(startTime)
            setEndTime(endTime)

            getPpt()
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
                status: status,
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

        // let newArr = []
        // val.arr.forEach(item => newArr.push(parseInt(item)))

        // let str = `&ids=${newArr[0]}&`
        // for (let i = 1; i <= newArr.length - 1; i++) {
        //     str = str + `ids=${newArr[i]}&`
        // }
        // let obj = { type: val.type, data: str }
        // console.log(obj);
        // empDepId = obj
        // setEmpDepId(obj)
        console.log(val);
        empDepId = { data: val }

        setEmpDepId(empDepId)


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
                if (res.data.data) {
                    salesKit = res.data.data
                    setSalesKit(salesKit)
                    console.log(salesKit);
                    let arr = []
                    for (let name in salesKit) {//遍历对象属性名
                        arr.push({ type: name, qty: salesKit[name] })
                    }
                    console.log(arr);
                    arr.map((item) => {
                        if (item.type == '联系人') {
                            contactsQty = item.qty
                            setContactsQty(contactsQty)
                            console.log(contactsQty);
                        } else if (item.type == '合同') {
                            contractQty = item.qty
                            setContractQty(contractQty)
                            console.log(contractQty);
                        } else if (item.type == '跟进记录') {
                            followRecordQty = item.qty
                            setFollowRecordQty(followRecordQty)
                            console.log(followRecordQty);
                        } else if (item.type == '回款') {
                            paymentQty = item.qty
                            setPaymentQty(paymentQty)
                            console.log(paymentQty);
                        } else if (item.type == '客户') {
                            customerQty = item.qty
                            setCustomerQty(customerQty)
                            console.log(customerQty);
                        } else if (item.type == '商机') {
                            bizOppQty = item.qty
                            setBizOppQty(bizOppQty)
                            console.log(bizOppQty);
                        }
                    })
                }
            })
            .catch((res) => {
                console.log(res);
            })
    }


    //获取新增的客户/商机表格具体信息
    function getPptDetail(type) {

        axios({
            method: 'get',
            url: `${base.url}/dashboard/powerPoint/detail?${empDepId.data}`,
            params: {
                token: token,
                limit: 100,
                currentPage: 1,
                endTime: endTime,
                startTime: startTime,
                choice: type,
                keyword: ''
            },
        })
            .then((res) => {
               
                switch (type) {
                    case 1:
                        console.log('合同',res);
                        break;
                    case 2:
                        console.log('联系人',res);
                        
                        break;
                    case 3:
                        console.log('商机',res);
                        break;
                    case 4:
                        console.log('跟进记录',res);
                        break;
                    case 5:
                        console.log('合同',res);
                        break;
                    case 6:
                        console.log('回款',res);
                        break;
                }
                if (res.data.code == 'SUCCESS') {
                    switch (type) {
                        case 1:
                            customerData = res.data.data
                            setCustomerData(customerData)
                            break;
                        case 2:
                            contactsData = res.data.data
                            setContactsData(contactsData)
                            break;
                        case 3:
                            bizOppData = res.data.data
                            setBizOppData(bizOppData)
                            break;
                        case 4:
                            console.log('跟进');
                            followUpRecordData = res.data.data
                            setFollowUpRecordData(res.data.data)
                            console.log('跟进记录', res.data.data);
                            break;
                        case 5:
                            contractData = res.data.data
                            setContractData(contractData)
                            break;
                        case 6:
                            paymentData = res.data.data
                            setPaymentData(paymentData)
                            break;
                    }
                }


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
                    <Alertmodal methods={(val) => { getEmpDepId(val) }} name='切换' ></Alertmodal>


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

                    <div style={{ padding: '20px' }}  >
                        <div style={{ display: "flex", alignItems: 'center' }} >
                            <i className='iconfont icon-jianbao' style={{ color: '#FF6767', fontSize: 15 }} ></i>
                            <span style={{ fontSize: 14 }} >&nbsp;销售简报</span>
                        </div>
                        <div className='dash-board-button'>

                            <div>
                                <Customer data={{ qty: customerQty, data: customerData }}   ></Customer>
                                <Contacts data={{ qty: contactsQty, data: contactsData }} ></Contacts>
                            </div>
                            <div>
                                <BizOpp data={{ qty: bizOppQty, data: bizOppData }} ></BizOpp>
                                <Contract data={{ qty: contractQty, data: contractData }} ></Contract>
                            </div>
                            <div>
                                <FollowUp data={{ qty: followRecordQty, data: followUpRecordData }} ></FollowUp>
                                <Payment data={{ qty: paymentQty, data: paymentData }} ></Payment>
                            </div>


                        </div>
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

