import React, { useEffect, useState } from "react";
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import Tablelist from '../../table'
import '../../../../font-awesome-4.7.0/css/font-awesome.css'
import { TreeSelect } from 'antd';
import axios from "axios";
import base from '../../../../../../../../axios/axios'

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';




function SystemMgt() {

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
        <div className={'system'}>
            <div className={'system1'}>系统管理角色</div>
            <div className={'system2'}>
                <div className={'system_right'}>
                    <div className={'system_new'}>
                        <div className={'system_new1'}>
                            <div type="primary" onClick={showModal}>
                                新建角色
                            </div>
                            <Modal
                                cancelText={'取消'}
                                okText={'确定'}
                                title="新建角色"
                                visible={visible}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <p>角色名称</p>
                                <input type="text" value={text} onChange={(e) => {
                                    handlePeople(e.target.value)
                                }} />
                            </Modal>
                        </div>
                    </div>
                    <div className={'right1'}>
                        <div className={'right2'}>
                            <div className={'system_item'}>
                                {arr.map((item, index) => {
                                    return (
                                        <div key={index}
                                            className={index === activeInxex ? 'activeIndex system_item1' : 'system_item1'}
                                            onClick={() => {
                                                setActiveIndex(index)
                                                setHidden('none')
                                            }}
                                        >
                                            <span
                                            >{item.name}</span>
                                            <span className={index === 0 ? 'hidden' : ''}>
                                                <i className="fa fa-angle-down" aria-hidden="true" onClick={(e) => {
                                                    handleEdit(index, e)
                                                }}></i>
                                                <span style={{ display: hidden }}>
                                                    <ul className={'ul'} style={{ top: `${260 + num * 40}px` }}>
                                                        <li>复制</li>
                                                        <li>编辑</li>
                                                        <li>删除</li>
                                                    </ul>
                                                </span>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'system_left'}>
                    <div style={{ padding: '0 20px' }}>
                        <div className={'system_top'}>
                            <span>角色员工</span>
                        </div>
                    </div>
                    <div className={'system_concat'}>
                        <div className={'system_concat1'}>
                            <Button type="primary" onClick={showModal1}>
                                关联员工
                            </Button>
                        </div>
                        <Modal title=" 关联员工" cancelText={'取消'}
                            okText={'确定'} visible={isModalVisible} onOk={handleOk1} onCancel={handleCancel1}>
                            <p>选择员工</p>
                            <div>
                                <TreeSelect {...tProps} />
                            </div>
                        </Modal>
                        <div>
                            <Tablelist></Tablelist>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemMgt