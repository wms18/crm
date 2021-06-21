import React, { Component } from 'react';
import './style.css'
// import SdTable from '../sdtable';
import { Layout, Menu, Button, Input, Image, Space, Select } from 'antd';
// import SdContent, { sdContent } from '../sdcontent'
// import Alertform from '../alertform'
import Office from "../jurisdiction/office/office";
import Project from "../jurisdiction/project/project";
import SystemMgt from "../jurisdiction/system/components/systemMgt/index";
import Customer from "../jurisdiction/customer/customer";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
  AudioOutlined
} from '@ant-design/icons';
// import Alertmodal from '../alertform';
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

  //   onSearch(e){rrrrrrrrr
  //   console.log(e);
  // }



  render() {
    return (
      <div>
        <Layout
        >
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}
            style={{  }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}  style={{marginTop:38}}>
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
            {/*<Header className="site-layout-background" style={{ padding: 0, fontSize: 18, backgroundColor: '#F5F6F9', }}>*/}
            {/*  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
            {/*    className: 'trigger',*/}
            {/*    onClick: this.toggle,*/}
            {/*  })}*/}
            {/*  员工与部门管理*/}
            {/*</Header>*/}
            {/* <div>企业首页</div> */}
            {/*<Content*/}
            {/*  className="site-layout-background"*/}
            {/*  style={{*/}
            {/*  }}*/}
            {/*>*/}
              {/*<div className='content'>*/}
              {/*  <div className='sdcontent'>*/}
              {/*    <SdContent style={{}}></SdContent>*/}
              {/*  </div>*/}
              {/*  <div className='table'  style={{padding:'34px 10px 0px 10px'}}>*/}
              {/*    <div  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>*/}
              {/*      <div >*/}
              {/*        <Search placeholder="请输入员工名称" onSearch={onSearch} style={{ width: 262 }} />*/}
              {/*      </div>*/}

              {/*      <div>*/}
              {/*        <span  style={{marginRight:'10px'}}>*/}
              {/*          状态*/}
              {/*        </span>*/}
              {/*        <Select style={{ display: 'inline-block' }} placeholder="请选择" style={{ width: 120 }} onChange={handleChange}>*/}
              {/*          <Option value="0">禁用</Option>*/}
              {/*          <Option value="1">激活</Option>*/}
              {/*          <Option value="2">未激活</Option>*/}
              {/*        </Select>*/}
              {/*      </div>*/}
              {/*      <div>*/}
              {/*        <Alertform></Alertform>*/}
              {/*      </div>*/}

              {/*    </div>*/}

              {/*    <div>*/}
              {/*      <SdTable></SdTable>*/}
              {/*    </div>*/}

              {/*  </div>*/}
              {/*</div>*/}
            {/*<SystemMgt></SystemMgt>*/}
            <Office></Office>
            {/*<Project></Project>*/}
            {/*<Customer></Customer>*/}
            {/*</Content>*/}
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Menulayout
