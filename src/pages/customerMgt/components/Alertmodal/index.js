import React, { useState } from 'react';
import { Modal, Button, Transfer } from 'antd';
import './style.css';
import Searchtabs from './component/searchtabs'

function Alertmodal() {

    let [visible, setVisible] = useState(false);

    return (
        <div>
            <span type="primary" onClick={() => setVisible(true)}   style={{color:'#3e84e9',fontSize:"12px",cursor:'pointer'}} >
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
                <Searchtabs></Searchtabs>
            </Modal>
        </div>)

}

export default Alertmodal;

