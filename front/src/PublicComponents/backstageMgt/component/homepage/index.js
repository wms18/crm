import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Image, Popover } from 'antd';
import icon from './component/menulayout/imgs/alibabaicon.jpeg';
import Uploadimg from "./component/menulayout/component/uploadimg";
import './style.css'

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
} from '@ant-design/icons';

import { auto } from 'async';


const { SubMenu } = Menu
const { Header, Sider, Content } = Layout;

const token=window.localStorage.getItem('token')
console.log(token);
function Homepage() {


    useEffect(()=>{
        let token=window.get
    },[])


    const content = (
        <span
            className='iconfont icon-jinzhi'
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => {
                isimg = true
                setisimg(isimg)
                imgsrc = ''
                setimgsrc(imgsrc)
            }}
        >
        </span>

    );


    let [imgsrc, setimgsrc] = useState(icon)

    let [isimg, setisimg] = useState(false)






    return (
        <Layout>
            <Content>
                <div style={{ padding: 30, fontSize: 18 }} >
                    企业首页
                </div>

                <div
                    style={{
                        padding: '10px 30px 20px',
                        backgroundColor: '#fff',
                        marginLeft:'30px'
                    }}
                >
                    <div style={{ textAlign: 'right', width: '100%' }}>
                        <Button type=''>保存</Button>
                    </div>
                    <div style={{ marginBottom: 30, width: '100%' }}>
                        <span style={{ fontSize: 12, marginBottom: '8px', display: 'block' }}>企业名称</span>
                        <Input value="Outstanding Group" style={{ width: 200, display: 'block' }}></Input>
                    </div>
                    <div>
                        <span style={{ fontSize: 12, marginBottom: '8px', display: 'block' }}>企业logo</span>

                        <Uploadimg hidden={isimg}></Uploadimg>

                        <div ><button
                            onClick={() => {
                                isimg = !isimg
                                setisimg(!isimg)
                            }}
                        >删除</button></div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default Homepage