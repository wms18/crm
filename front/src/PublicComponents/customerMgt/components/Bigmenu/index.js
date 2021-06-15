import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import { Menu, Button } from 'antd';

//导入ICON
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;


class Bigmenu extends Component{
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
           
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
               
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        健康
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        美食
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                       數碼
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="電子">
                        <Menu.Item key="5">手機</Menu.Item>
                        <Menu.Item key="6">電腦</Menu.Item>
                        <Menu.Item key="7">科技配件</Menu.Item>
                        <Menu.Item key="8">相機</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="服飾">
                        <Menu.Item key="9">男T賉</Menu.Item>
                        <Menu.Item key="10">男運動褲</Menu.Item>
                        <SubMenu key="sub3" title="女裝">
                            <Menu.Item key="11">短裙</Menu.Item>
                            <Menu.Item key="12">纺裙</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export  default  Bigmenu;


