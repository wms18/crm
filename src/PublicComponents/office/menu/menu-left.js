import {Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import Middle from "../work/middle/middle";
import Right from "./right/right";
import './menu-left.css'
import SchedulePage from "../calendar/calendar";
import Task from "../task/task";
import Notice from "../notice/notice";
import Mail from "../mail/mail";
import Approval from "../approval/approval";
import Journal from "../journal/journal";
import {Link, Route, HashRouter} from "react-router-dom";
import {
    DesktopOutlined,
    CarryOutOutlined,
    MailOutlined,
    ProfileOutlined,
    ClearOutlined,
    TeamOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import ReceptionTop from "../../top";
const {Content, Sider} = Layout;

function MenuLeft() {
    return (
        <div>
            {/*<ReceptionTop/>*/}
            <Layout style={{minHeight: '100vh',overflow: 'auto',}}>
                <HashRouter>
                    <Sider>
                        <div className="logo"/>
                        <Right/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                            <Menu.Item key="1" icon={<DesktopOutlined/>}>
                                <Link to={'/office'}>工作台</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<ScheduleOutlined/>}>
                                <Link to={'/office/schedule'}>日程</Link>

                            </Menu.Item>
                            <Menu.Item key="3" icon={<CarryOutOutlined/>}>
                                <Link to={'/office/task'}>任务</Link>

                            </Menu.Item>
                            <Menu.Item key="4" icon={<MailOutlined/>}>
                                <Link to={'/office/notice'}>公告</Link>

                            </Menu.Item>
                            <Menu.Item key="5" icon={<ProfileOutlined/>}>
                                <Link to={'/office/journal'}>日志</Link>

                            </Menu.Item>
                            <Menu.Item key="6" icon={<ClearOutlined/>}>
                                <Link to={'/office/approval'}>审批</Link>

                            </Menu.Item>
                            <Menu.Item key="7" icon={<TeamOutlined/>}>
                                <Link to={'/office/mail'}>通讯录</Link>

                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <div>
                        <Route path={'/office'} exact component={Middle}></Route>
                        <Route path={'/office/schedule'} component={SchedulePage}></Route>
                        <Route path={'/office/task'} component={Task}></Route>
                        <Route path={'/office/notice'} component={Notice}></Route>
                        <Route path={'/office/journal'} component={Journal}></Route>
                        <Route path={'/office/approval'} component={Approval}></Route>
                        <Route path={'/office/mail'} component={Mail}></Route>
                    </div>
                </HashRouter>

            </Layout>
        </div>
    )
}

export default MenuLeft
