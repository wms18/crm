import React, { Component } from 'react';
import './style.css'
import { Layout, Menu, Button, Input, Image, Space, Select } from 'antd';
import SystemMgt from '../component/jurisdiction/system/components/systemMgt';
import Office from '../component/jurisdiction/office/office';
import Project from '../component/jurisdiction/project/project'
import Customer from '../component/jurisdiction/customer/customer';
import HomePage from '../../homepage'
import StaffDep from '../../staff&department'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
  AudioOutlined
} from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;





const { SubMenu } = Menu
const { Header, Sider, Content } = Layout;
const toggle = () => {
  this.setState({
    collapsed: !this.state.collapsed,
  });
};

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


const onSearch = value => console.log(value);

const handleChange = value => console.log(`selected ${value}`)

class Menulayout extends React.Component {


  state = {
    collapsed: false,
  };

  render() {
    return (
      <div>
        <HashRouter>
          <Layout
          >
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}
              style={{height:'100vh'}}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ marginTop: 38 }}>

                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link link to='/'>企业首页</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <Link link to='/StaffDep'>员工与部门管理</Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<MailOutlined />} title="角色权限控制">

                  <Menu.Item key="3"><Link link to='/system'>系统管理角色</Link></Menu.Item>

                  <Menu.Item key="4"><Link to='/office'>办公管理角色</Link> </Menu.Item>

                  <Menu.Item key="5"><Link to='/customer'>客户管理角色</Link> </Menu.Item>

                  <Menu.Item key="6"><Link to='/project'>项目管理角色</Link> </Menu.Item>

                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="site-layout"  >
      
              {/* <Content> */}
                <Route path='/' exact component={HomePage}></Route>
                <Route path='/StaffDep' component={StaffDep}></Route>
                <Route path='/system' component={SystemMgt}></Route>
                <Route path='/office' component={Office}></Route>
                <Route path='/project' component={Project}></Route>
                <Route path='/customer' component={Customer}></Route>
          
              {/* </Content> */}
        
            </Layout>
          </Layout>
        </HashRouter>
      </div>
    );
  }
}

export default Menulayout
