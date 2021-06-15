import React, { useState } from 'react';
import { Modal, Button, Transfer } from 'antd';
import './style.css';
import Searchtabs from './component/searchtabs'

function Alertmodal() {

    let [visible, setVisible] = useState(false);

    return (<div>
        <Button type="primary" onClick={() => setVisible(true)}  className='Button'>
            切换
        </Button>
        <Modal
            title=""
            mask='false'
            maskClosable='false'
            cancelText={'取消'}
            okText={'确定'}
            visible={visible}
            onClick={() => setVisible(false)}
            onCancel={() => setVisible(false)}  
            style={{ padding: '12px', height:'300px', top: 60, left: -100 }}
            width={574}
        >
            <Searchtabs></Searchtabs>
        </Modal>
    </div>)

}

export default Alertmodal;

