import React, { Component } from 'react';
import './style.css'
import { Layout, Menu, Button, Input, Image, Space, Select } from 'antd';
import SystemMgt from '../systemMgt';
import Office from '../office/office';
import Project from '../project/project'
import Customer from '../customer/customer';
import HomePage from '../homepage'
import StaffDep from '../staff&department'
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
            <Sider style={{height:'100vh'}} trigger={null} collapsible collapsed={this.state.collapsed}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ marginTop: 38 }}>

                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link  to='/back'>企业首页</Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <Link  to='/back/StaffDep'>员工与部门管理</Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<MailOutlined />} title="角色权限控制">

                  <Menu.Item key="3"><Link  to='/back/system'>系统管理角色</Link></Menu.Item>

                  <Menu.Item key="4"><Link to='/back/backoffice'>办公管理角色</Link> </Menu.Item>

                  <Menu.Item key="5"><Link to='/back/customer'>客户管理角色</Link> </Menu.Item>

                  <Menu.Item key="6"><Link to='/back/project'>项目管理角色</Link> </Menu.Item>

                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="site-layout"  >

              {/* <Content> */}
                <Route path='/back' exact  component={HomePage}></Route>
                <Route path='/back/StaffDep'  component={StaffDep}></Route>
                <Route path='/back/system' component={SystemMgt}></Route>
                <Route path='/back/backoffice' component={Office}></Route>
                <Route path='/back/project' component={Project}></Route>
                <Route path='/back/customer' component={Customer}></Route>

              {/* </Content> */}

            </Layout>
          </Layout>
        </HashRouter>
      </div>
    );
  }
}

export default Menulayout
