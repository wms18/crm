import {Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import Middle from "../middle/middle";
import Right from "../right/right";
import {
    DesktopOutlined,
    CarryOutOutlined,
    MailOutlined,
    ProfileOutlined,
    ClearOutlined   ,
    TeamOutlined,
    ScheduleOutlined
} from '@ant-design/icons';

const { Content, Sider} = Layout;

function MenuLeft() {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider >
                <div className="logo"/>
                <Right/>

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    <Menu.Item key="1" icon={<DesktopOutlined/>}>
                        工作台
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ScheduleOutlined/>}>
                        日程
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CarryOutOutlined/>}>
                        任务
                    </Menu.Item>
                    <Menu.Item key="4" icon={<MailOutlined/>}>
                        公告
                    </Menu.Item>
                    <Menu.Item key="5" icon={<ProfileOutlined/>}>
                        日志
                    </Menu.Item>
                    <Menu.Item key="6" icon={<ClearOutlined/>}>
                        审批
                    </Menu.Item>
                    <Menu.Item key="7" icon={<TeamOutlined/>}>
                        通讯录
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: '16px'}}>
                    <Middle/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MenuLeft
