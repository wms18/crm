import React, {Component} from 'react';
import './style.css'
import {Layout, Menu, Button, Input, Image, Space, Select} from 'antd';
import SystemMgt from '../systemMgt';
import Office from '../office/office';
import Project from '../project/project'
import Customer from '../customer/customer';
import HomePage from '../homepage'
import StaffDep from '../staff&department'
import {HashRouter, Link, Route,withRouter, Switch} from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
    AudioOutlined
} from '@ant-design/icons';

const {Search} = Input;
const {Option} = Select;


const {SubMenu} = Menu
const {Header, Sider, Content} = Layout;
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
    constructor(props) {
        super(props)
    }
    state = {
        collapsed: false,
    };
    render() {
        let pathname = this.props.location.pathname
        let number
        let arr=['/back','/back/backoffice','/back/customer','/back/project']
        arr.forEach((value,index)=>{
            if (pathname === value){
                number = index+1
                number = number.toString()
            }
        })
        return (
            <div>
                <HashRouter>
                    <Layout
                    >
                        <Sider style={{height: 'calc(100vh - 60px)'}} trigger={null} collapsible
                               collapsed={this.state.collapsed}
                        >
                            <div className="logo"/>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={[number]} style={{marginTop: 38}}>
                                <Menu.Item key="1"><Link to='/back'>系统管理角色</Link></Menu.Item>

                                <Menu.Item key="2"><Link to='/back/backoffice'>办公管理角色</Link> </Menu.Item>

                                <Menu.Item key="3"><Link to='/back/customer'>客户管理角色</Link> </Menu.Item>

                                <Menu.Item key="4"><Link to='/back/project'>项目管理角色</Link> </Menu.Item>

                            </Menu>
                        </Sider>
                        <Layout className="site-layout">
                            <Route path='/back' exact component={SystemMgt}></Route>
                            <Route path='/back/backoffice' component={Office}></Route>
                            <Route path='/back/project' component={Project}></Route>
                            <Route path='/back/customer' component={Customer}></Route>
                        </Layout>
                    </Layout>
                </HashRouter>
            </div>
        );
    }
}

export default withRouter(Menulayout)
