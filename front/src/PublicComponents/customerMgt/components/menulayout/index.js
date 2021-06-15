import { Layout, Menu } from 'antd';
import React from 'react'
import {Hashrouter,Switch,Route} from 'react-router-dom'
import './style.css';
import  Creatpopover  from  '../Creatpopover/index'
import Dashbord from './component/dashboardlayout'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

function Menulayout() {
  return (
    <div>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
           <Creatpopover></Creatpopover>
          <div className="logo" />  
          <Menu  className='createitem' theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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
       <Dashbord></Dashbord>
       
      </Layout>
    </div>
  )
}

export default Menulayout;