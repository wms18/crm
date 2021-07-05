import React, { useState } from 'react';
import { Modal, Button, Transfer,Tabs } from 'antd';
import './style.css';
import Searchtransfer from '../searchtransfer'
import axios from 'axios';
import qs from 'qs'
const { TabPane } = Tabs;
function Alertmodal() {

    let [visible, setVisible] = useState(false);


    function callback(){

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
                onClick={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                style={{ padding: '12px', height: '300px', top: 60, left: -100 }}
                width={574}
            >

                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="员工" key="1">
                        <div>
                            <Searchtransfer emp={'emp'} ></Searchtransfer>
                        </div>

                    </TabPane>
                    <TabPane tab="部门" key="2">
                        <div>
                            <Searchtransfer dep={'dep'} ></Searchtransfer>
                        </div>

                    </TabPane>
                </Tabs>
            </Modal>
        </div>)

}

export default Alertmodal;

