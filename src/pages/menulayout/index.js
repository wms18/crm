import {Layout, Menu} from 'antd';
import React, {useState, useEffect} from 'react'
import {HashRouter, Route, Link, withRouter} from 'react-router-dom'
import './style.css';
import Creatpopover from '../../components/Creatpopover'


import Dashbord from '../dashboardlayout'
import ProductTable from './component/prodocutTable';
import BizOpp from '../bizOpp'
import Clue from './component/clue'
import Contract from './component/contract'
import Contacts from './component/contacts'
import Opensea from './component/opensea/'
import Payment from './component/payment'
import TodoList from './component/todolist'
import Customer from './component/customer'


import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import {createFromIconfontCN} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_2607566_a8bvf81fzlt.js', // icon-home  icon-gouwucheman
    ],
});


function Menulayout(props) {
    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            props.history.push('/')
            return
        }
    }, [])

    let [collapsed, setcollapsed] = useState(false)

    function toggle() {
        collapsed = !collapsed
        setcollapsed(collapsed)
    };
    let pathname = props.location.pathname
    let number = ''
    let arr = ['/customerMgt/', '/customerMgt/todolist', '/customerMgt/clue',
        '/customerMgt/customer', '/customerMgt/contacts', '/customerMgt/opensea',
        '/customerMgt/bizOpp', '/customerMgt/contract', '/customerMgt/payment',
        '/customerMgt/product']
    arr.forEach((value, index) => {
        if (pathname === value) {
            number = index + 1;
            number = number.toString()
        }
    })

    return (
        <HashRouter>
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: 'calc(100vh - 60px)',
                        position: 'fixed',
                        left: 0,
                        zIndex: 1,
                        marginTop: '60px'
                    }}
                >
                    <Creatpopover></Creatpopover>
                    <Menu className='createitem' theme="dark" mode="inline" defaultSelectedKeys={[number]}>
                        <Menu.Item key="1" icon={<IconFont type="icon-yibiaopan"/>}>
                            <Link to='/customerMgt/'>?????????</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<IconFont type="icon-daiban"/>}>
                            <Link to='/customerMgt/todolist'>????????????</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<IconFont type='icon-i_xiansuo'/>}>
                            <Link to='/customerMgt/clue'>??????</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<IconFont type='icon-kehu1'/>}>
                            <Link to='/customerMgt/customer'>??????</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<IconFont type='icon-ren1'/>}>
                            <Link to='/customerMgt/contacts'>?????????</Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<IconFont type='icon-gonghai'/>}>
                            <Link to='/customerMgt/opensea'>??????</Link>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<IconFont type='icon-shangji'/>}>
                            <Link to='/customerMgt/bizOpp'>??????</Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<IconFont type='icon-hetong'/>}>
                            <Link to='/customerMgt/contract'>??????</Link>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<IconFont type='icon-qiandai1'/>}>
                            <Link to='/customerMgt/payment'>??????</Link>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<IconFont type='icon-chanpin'/>}>
                            <Link to='/customerMgt/product'>??????</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Content style={{margin: '60px 16px 0', backgroundColor: '#fff', padding: '0 0 40px 0'}}>

                        <div
                            style={{
                                backgroundColor: '#fff',
                                minHeight: 280,
                            }}
                        >

                            {/* ???????????????content??????????????? */}
                            <Route path='/customerMgt/' exact component={Dashbord}></Route>
                            <Route path='/customerMgt/todolist' component={TodoList}></Route>
                            <Route path='/customerMgt/clue' component={Clue}></Route>
                            <Route path='/customerMgt/customer' component={Customer}></Route>
                            <Route path='/customerMgt/contacts' component={Contacts}></Route>
                            <Route path='/customerMgt/opensea' component={Opensea}></Route>
                            <Route path='/customerMgt/bizOpp' component={BizOpp}></Route>
                            <Route path='/customerMgt/contract' component={Contract}></Route>
                            <Route path='/customerMgt/payment' component={Payment}></Route>
                            <Route path='/customerMgt/product' component={ProductTable}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>

    )
}

export default withRouter(Menulayout);
