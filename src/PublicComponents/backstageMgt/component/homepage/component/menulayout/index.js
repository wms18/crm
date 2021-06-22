import React, { Componet } from 'react';
import { Layout, Menu,Button,Input,Image  } from 'antd';
import icon from './imgs/alibabaicon.jpeg';
import Uploadimg from "./component/uploadimg";
import './style.css'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { auto } from 'async';


const { SubMenu } = Menu
const { Header, Sider, Content } = Layout;

class Menulayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout
      >
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}
          style={{ height: '100vh' }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              企业首页
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              员工与部门管理
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="角色权限控制">
              <Menu.Item key="3">系统管理角色</Menu.Item>
              <Menu.Item key="4">办公管理角色</Menu.Item>
              <Menu.Item key="5">客户管理角色</Menu.Item>
              <Menu.Item key="6">项目管理角色</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout"  >
          <Header className="site-layout-background" style={{ padding: 0 ,fontSize:18}}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            企业首页
          </Header>
          {/* <div>企业首页</div> */}
          <Content
            className="site-layout-background"
            style={{
              marginTop: '24px',
              padding: '40px 30px 20px'
            }}
          >
            <div  style={{textAlign:'right'}}>
              <Button  type='primary'>保存</Button>
            </div>
            <div style={{marginBottom:30}}>
              <span style={{fontSize:12,marginBottom:'8px',display:'block'}}>企业名称</span>
              <Input  value="Outstanding Group"  style={{width:200,display:'block'}}></Input>
            </div>
            <div>
            <span style={{fontSize:12,marginBottom:'8px',display:'block'}}>企业logo</span>
            <Image  
              width={auto}
              height={40}
              width={70}
              src={icon}
            />
            <Uploadimg></Uploadimg>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Menulayout