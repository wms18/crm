import React, { Component } from 'react';
import './style.css'
import SdTable from "../sdtable";
import { Layout, Menu, Button, Input, Image, Space, Select,TreeSelect } from 'antd';
import SdContent from "../sdcontent";
import Alertform from '../alertform'
// import Jurisdiction from "../../../pub/jurisdiction";
// import SystemMgt from '../../../pub/jurisdiction/system/components/systemMgt';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
  AudioOutlined
} from '@ant-design/icons';
import Alertmodal from '../alertform';
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

            <div style={{ padding: 30, fontSize: 18 }} >
              人员管理
            </div>
            <div  style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{display:'inline-block'}} >
                <SdContent ></SdContent>
              </div>
              <div style={{display:'inline-block',width:'60vw'}} >
                <SdTable ></SdTable>
              </div>
            </div>

         
          </div>

    );
  }
}

export default Menulayout
