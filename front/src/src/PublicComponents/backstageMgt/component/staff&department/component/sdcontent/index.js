import React, { Component } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { render } from 'react-dom'
const { SubMenu } = Menu;


class SdContent extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  }


  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          style={{ width: '16vw',backgroundColor:'white' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          
        >
          <SubMenu key="sub1" title="总公司">
            <SubMenu title="直营部">
              <SubMenu key='sub8' title="业务经理 ">
                <Menu.Item key="6">业务人员</Menu.Item >
              </SubMenu>
              <Menu.Item key='sub7'>维修部门
              </Menu.Item >
            </SubMenu>
            <SubMenu key='sub4' title="南京区域 ">
              <SubMenu key='sub5' title="业务经理 ">
                <Menu.Item key="6">业务人员</Menu.Item >
              </SubMenu>

            </SubMenu>
            <SubMenu key='sub3' title="运营一组 ">
              <Menu.Item key="3">销售部</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default SdContent;

