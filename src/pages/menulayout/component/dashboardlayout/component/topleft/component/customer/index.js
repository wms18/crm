import React, { useState } from 'react'
import {
  UserAddOutlined
}
  from '@ant-design/icons'
import "./style.css"
import { Drawer, Button, Input } from 'antd';
import Alerttable from './component/alerttable';


const { Search } = Input

function Customer() {

  let [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (

    <div className="site-drawer-render-in-current-wrapper">
      <div style={{ marginTop: 16 }}>
        <Button type="primary"  icon={<UserAddOutlined />}  onClick={showDrawer} style={{width:180}}>
          客戶
        </Button>
      </div>
      <Drawer
        title="销售简报-新增客户"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={'100vw'}
        getContainer={false}
        closable={true}
        destroyOnClose={true}
        bodyStyle={{padding:'0 30px 30px'}}
      >

        
       <Alerttable></Alerttable>
      </Drawer>
    </div>
  );
}

export default Customer