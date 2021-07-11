import React, { useEffect, useState } from 'react'
import DrawerContract from '../../../components/drawerContract'
import {
  UserAddOutlined
}
  from '@ant-design/icons'
import "./style.css"
import { Drawer, Button, Input, Table } from 'antd';
import Data from './js/index'

import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2607566_a8bvf81fzlt.js', // icon-home  icon-gouwucheman
  ],
});

const { Search } = Input


function Contract(props) {

  let [visible, setVisible] = useState(false)

  let [record,setRecord]=useState([])
  let [showInfo,setShowInfo]=useState(false)
  useEffect(() => {

  }, [props])

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (


    <div className="site-drawer-render-in-current-wrapper">
      <div
        style={{
          marginTop: 16,
        }}
      >

        <div
          style={{
            padding: 8,
            width: 180,
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f2f2f5',
            borderRadius: 3
          }}
          onClick={showDrawer}
        >
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <span className='iconfont icon-hetong' style={{ color: '#FB94A0', fontSize: '18px', marginRight: "5px" }} ></span>
            <span style={{ fontSize: 12 }} >新增合同</span>
          </div>
          <div>
            <span style={{ fontSize: 12 }} >{props.data.qty ? props.data.qty : 0}</span>
          </div>
        </div>
        {/* 
        <Button type="primary" icon={<IconFont type='icon-kehu1' />} onClick={showDrawer} style={{ width: 180 }}>
          客戶&nbsp;&nbsp;
        </Button> */}
      </div>
      <Drawer
        title="销售简报-新增客户"
        // placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={'100vw'}
        // height={'100vh'}
        getContainer={false}
        closable={true}
        destroyOnClose={true}
        bodyStyle={{ padding: '30px' }}
      >


        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '20px' }}>
            <Search style={{ width: 250 }} placeholder='请输入合同编号' ></Search>
          </div>
          <div>
            <Table columns={Data.columns} dataSource={props.data.data.data} scroll={{ x: 1500, y: 380 }}
              onRow={(record) => ({
                onClick: () => {
                  console.log(record);

                  record = record
                  showInfo = true
                  setRecord(record)
                  setShowInfo(record)
                },
              })}
            />
          </div>
        </div>
      </Drawer>
      <DrawerContract record={{ show: showInfo, record: record }} ></DrawerContract>
    </div>
  );
}

export default Contract