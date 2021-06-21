import React, { Component } from 'react';
import './style.css'
import SdTable from "./component/sdtable";
import { Layout, Menu, Button, Input, Image, Space, Select, TreeSelect } from 'antd';
import SdContent from "./component/sdcontent";
import Alertform from './component/alertform';
import Paging from './component/Paging';


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

class StaffDep extends Component {


  state = {
    collapsed: false,
    loading:true
  };


  render() {
    return (
      <div  style={{border:'1px  black'}}>
        <div style={{ padding: 30, fontSize: 18 }} >
          员工与部门管理
        </div>
        <div style={{ padding: '0 30px 0' }}>
          <div style={{ backgroundColor: '#fff', float: 'left',border:'1px  yellow' }} >
            <SdContent ></SdContent>
          </div>

          <div style={{ float: 'right',border:'1px  blue' }} >
            <div style={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
              <Search placeholder='输入员工名称' style={{ width: 200 }} ></Search>
              <div style={{ fontSize: '15px' }}>
                状态:&nbsp;<Select placeholder='请选择' style={{ width: 200 }}>
                  <Option value='禁用'>禁用</Option>
                  <Option value='激活'>激活</Option>
                  <Option value='未激活'>未激活</Option>
                </Select>
              </div>

              <Button style={{ width: '100px' }}>新建员工</Button>
            </div>
            <div style={{ backgroundColor: '#fff', width: '63vw',border:'1px  green' }} >
              <SdTable ></SdTable>
            </div>
          </div>
        </div>
        


      </div>

    );
  }
}

export default StaffDep
