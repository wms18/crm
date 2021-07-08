import React, { useState } from 'react';
import { Modal, Button, Transfer, Tabs } from 'antd';
import './style.css';
import Searchtransfer from '../searchtransfer'
import axios from 'axios';
import qs from 'qs'
import { useEffect } from 'react';
const { TabPane } = Tabs;
function Alertmodal(props) {

    let [visible, setVisible] = useState(false);
    let [empDepId, setEmpDepId] = useState()


    useEffect(() => {
        console.log(props.methods);
    }, [])


    function callback() {

    }



    function sendId() {
        visible = false
        setVisible(false)
        props.methods(empDepId)
        
    }

    function sendEmpId(val) {
        console.log(val);

        let newArr = []
        val.arr.forEach(item => newArr.push(parseInt(item)))

        let str = `&ids=${newArr[0]}&`
        for (let i = 1; i <= newArr.length - 1; i++) {
            str = str + `ids=${newArr[i]}&`
        }
        let obj = { type: val.type, data: str }
        console.log(obj);
        empDepId = obj.data
        setEmpDepId(empDepId)
        console.log(empDepId);
        // empDepId = obj
        // setEmpDepId(obj)


    }
    function sendDepId(val) {

        let newArr = []
        val.arr.forEach(item => newArr.push(parseInt(item)))

        let str = `&ids=${newArr[0]}&`
        for (let i = 1; i <= newArr.length - 1; i++) {
            str = str + `ids=${newArr[i]}&`
        }
        let obj = { type: val.type, data: str }
        empDepId = obj.data
        setEmpDepId(empDepId)
        console.log(empDepId);
    }



    function getEmpId(val) {
        console.log(val);
    }
    function getDepId(val) {
        console.log(val);
    }
    return (
        <div>
            <span type="primary" onClick={() => setVisible(true)} style={{ color: '#3e84e9', fontSize: "12px", cursor: 'pointer' }} >
                切换
            </span>
            <Modal
                title=""
                mask='false'
                maskClosable='false'
                cancelText={'取消'}
                okText={'确定'}
                visible={visible}
                onOk={()=>{sendId()}}
                onCancel={() => setVisible(false)}
                style={{ padding: '', height: '300px', top: 60, left: -100 }}
            // width={500}
            >
                <div style={{ margin: '0 auto' }}>

                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="员工" key="1">
                            <div>
                                <Searchtransfer getEmpId={(val) => { sendEmpId(val) }} emp={'emp'} ></Searchtransfer>
                            </div>

                        </TabPane>
                        <TabPane tab="部门" key="2">
                            <div>
                                <Searchtransfer getDepId={(val) => { sendDepId(val) }} dep={'dep'} ></Searchtransfer>
                            </div>

                        </TabPane>
                    </Tabs>
                </div>

            </Modal>
        </div>)

}

export default Alertmodal;

