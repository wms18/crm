import React, { useEffect, useState } from 'react'
import {
  UserAddOutlined
}
  from '@ant-design/icons'
import "./style.css"
import { Drawer, Button, Input,Table } from 'antd';
import columns from './js/index'

import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2607566_a8bvf81fzlt.js', // icon-home  icon-gouwucheman
  ],
});

const { Search } = Input

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

function FollowUp(props) {

  let [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('跟进记录：',props.data);


  }, [props.data])

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
            <span className='iconfont icon-genjin' style={{ color: '#F47D71', fontSize: '18px', marginRight: "5px" }} ></span>
            <span style={{fontSize:12}}>新增跟进记录</span>
          </div>
          <div>
            <span style={{fontSize:12}}>{props.data.qty ? props.data.qty : 0}</span>
          </div>
        </div>
        {/* 
        <Button type="primary" icon={<IconFont type='icon-kehu1' />} onClick={showDrawer} style={{ width: 180 }}>
          客戶&nbsp;&nbsp;
        </Button> */}
      </div>
      <Drawer
        title="销售简报-新增跟进记录"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={'100vw'}
        getContainer={false}
        closable={true}
        destroyOnClose={true}
        bodyStyle={{ padding: '0 30px 30px' }}
      >


        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '20px' }}>
            <Search style={{ width: 250 }} placeholder='请输入客户名称/手机/电话' ></Search>
          </div>
          <div>
            <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 380 }} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default FollowUp