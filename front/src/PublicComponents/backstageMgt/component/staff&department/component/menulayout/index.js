import React, { Componet } from 'react';
import './style.css'
import SdTable from '../sdtable';
import { Layout, Menu, Button, Input, Image,Space } from 'antd';
import SdContent, { sdContent } from '../sdcontent'
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

class Menulayout extends React.Component {


    state = {
    collapsed: false,
  };

  //   onSearch(e){
  //   console.log(e);
  // }


  
  render() {
    return (
      <div>

        <Layout
        >
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}
            style={{ height: '90vh' }}
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
          <Layout className="site-layout" style={{ height: '90vh' }} >
            <Header className="site-layout-background" style={{ padding: 0, fontSize: 18, backgroundColor: '#F5F6F9', }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              员工与部门管理
            </Header>
            {/* <div>企业首页</div> */}
            <Content
              className="site-layout-background"
              style={{
              }}
            >
              <div className='content'>
                <div className='sdcontent'>
                  <SdContent style={{}}></SdContent>
                </div>
                <div className='table'>
                  <div>
                  <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                  </div>
                  <div>
                    <SdTable></SdTable>

                  </div>
                </div>
              </div>

            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Menulayout