import { Layout, Menu } from 'antd';
import React, { useState } from 'react'
import { Hashrouter, Switch, Route } from 'react-router-dom'
import './style.css';
import Creatpopover from '../components/Creatpopover'
import Dashbord from './component/dashboardlayout'   //仪表盘组件
import sdTable from '../components/sdtable'
import ProductTable from './component/prodocutTable';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;


function Menulayout() {

  let [collapsed, setcollapsed] = useState(false)

  function toggle() {
    collapsed = !collapsed
    setcollapsed(collapsed)
  };



  return (
    <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}

        // style={{
        //   overflow: 'auto',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 0,
        // }}
        >
          <Creatpopover></Creatpopover>
          <Menu className='createitem' theme="dark" mode="inline" defaultSelectedKeys={['4']} >
            <Menu.Item key="1" icon={<UserOutlined />}>
              仪表盘
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              待办事项
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              线索
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              客户
            </Menu.Item>
            <Menu.Item key="5" icon={<CloudOutlined />}>
              联系人
            </Menu.Item>
            <Menu.Item key="6" icon={<AppstoreOutlined />}>
              公海
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              商机
            </Menu.Item>
            <Menu.Item key="8" icon={<ShopOutlined />}>
              合同
            </Menu.Item>
            <Menu.Item key="9" icon={<ShopOutlined />}>
              回款
            </Menu.Item>
            <Menu.Item key="10" icon={<ShopOutlined />}>
              产品
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <div style={{ padding: 30, fontSize: 18 }} >
            产品管理
          </div>
          <Content

            style={{
              backgroundColor:'#fff',
              padding: 24,
              minHeight: 280,
            }}
          >

            {/* 在这里切换content的组件显示 */}
            <ProductTable></ProductTable>

          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Menulayout;