import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import Tablelist from './table'
import '../../font-awesome-4.7.0/css/font-awesome.css'
import { TreeSelect } from 'antd';
import axios from "axios";
import base from "../../../../../../../axios/axios";
import SystemMgt from './components/systemMgt'

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function System() {
    let token = window.localStorage.getItem('token')
    let [arr, setArr] = useState([])
    let [activeInxex, setActiveIndex] = useState(0)
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let [text, setText] = useState('')
    let [num, setNum] = useState('')
    let ul = document.getElementsByClassName('ul')[0]
    let [hidden, setHidden] = useState('none')
    let [collapsed, setCollapsed] = useState(false)
    let toggle = () => {
        setCollapsed(!collapsed)
    };


    useEffect(() => {
        if (isModalVisible === false) {
            setValue([])
        }
        //添加角色
        axios({
            method: 'post',
            url: base.url + '/manager/add',
            params: {
                classifyRoleId: 1,
                roleName: text,
            }
        }).then((response) => {
            if (response.data.code === 'ERROR') {
                // alert(response.data.message)
            }
        }).catch((error) => {
            // alert(error)
        })
        //获取角色列表
        axios({
            method: 'get',
            url: base.url + '/manager/roles',
            params: {
                classifyRoleId: 1
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                // alert(response.data.message)
            } else {
                setArr(response.data.data)

            }
        }).catch((error) => {
            // alert(error)
        })
        //获取员工
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployee',
        }).then((response) => {
            // console.log(response)
        }).catch((error) => {
            // alert(error)
        })
    }, [text])
    const { SHOW_PARENT } = TreeSelect;
    //添加员工
    const treeData = [
        {
            title: '员工0',
            value: '0',
            key: '0',
        },
        {
            title: '员工1',
            value: '1',
            key: '1',
        },
        {
            title: '员工2',
            value: '2',
            key: '2',
        },
    ];
    let onChange = value => {
        console.log('onChange ', value);
        setValue(value)
    };
    let [value, setValue] = useState([])
    const tProps = {
        treeData,
        value: value,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择员工',
        style: {
            width: '100%',
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal1 = () => {
        setIsModalVisible(true);
    };

    const handleOk1 = () => {
        setIsModalVisible(false);
    };

    const handleCancel1 = () => {
        setIsModalVisible(false);
    };


    //新建角色
    const showModal = () => {
        setVisible(true);
    };
    //点击确定
    const handleOk = () => {
        setVisible(false);

        // setText('')
    };
    //点击取消
    const handleCancel = () => {
        setVisible(false);
        setText('')
    };
    //新建角色
    let handlePeople = (item) => {
        text = item
        setText(text)
    }
    let handleEdit = (index, e) => {
        setActiveIndex(index)
        e.stopPropagation()
        setNum(index)
        if (hidden === 'none') {
            setHidden('block')
        } else {
            setHidden('none')
        }
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                </Menu>
            </Sider>

                {/* 系统管理组件 */}
            <SystemMgt></SystemMgt>

        </Layout>
    )
}

export default System;
