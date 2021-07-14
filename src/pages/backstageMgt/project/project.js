import React, { useState, useEffect } from 'react';
import { Modal, Button, Popover } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Tablelist from './table'
import { TreeSelect } from 'antd';
import '../font-awesome-4.7.0/css/font-awesome.css'
import '../systemMgt/system.css'
import axios from "axios";
import base from '../../../axios/axios';

import qs from 'qs'
function Project() {
    let length = 0
    let token = window.localStorage.getItem('token')
    let [arr, setArr] = useState([])
    let [getStaff, setGetStaff] = useState([])//关联员工获取员工数
    let [selectedRoleId, setSelectedRoleId] = useState('1') // 选中的角色id
    let [editRoles, setEditRoles] = useState('')    //选中的角色
    let [roleId, setRoleId] = useState(length)
    let [activeInxex, setActiveIndex] = useState(0)
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let [text, setText] = useState('')
    let [hidden, setHidden] = useState('none')
    let [collapsed, setCollapsed] = useState(false)
    const { SHOW_PARENT } = TreeSelect;
    let [value, setValue] = useState([])    //关联员工
    let toggle = () => {
        setCollapsed(!collapsed)
    };
    //编辑角色
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = () => {
        console.log(base.url + '/manager/edit')
        console.log(editRoles)
        setIsModalVisible2(false);
        axios({
            method: 'post',
            url: base.url + '/manager/edit',
            params: {
                name: editRoles,
                token: token,
                roleId: selectedRoleId
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('编辑成功')
                get()
            }
        }).catch((error) => {
            alert(error)
        })
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const content = (
        <div className={'copy'}>
            <p>复制</p>
            <div onClick={showModal2}>
                <p>编辑</p>
            </div>
            <Modal title="编辑角色" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                <p>角色名称</p>
                <div>
                    <input type="text" value={editRoles} style={{ width: '100%' }} onChange={(e) => {
                        setEditRoles(e.target.value)
                    }} />
                </div>
            </Modal>
            <p onClick={() => {
                deleteRole(selectedRoleId)
            }}>删除</p>
        </div>
    );


    //删除角色
    let deleteRole = (id) => {
        if (window.confirm('确定删除吗？')) {
            axios({
                method: 'post',
                url: base.url + '/manager/deleteRole',
                params: {
                    token: token,
                    roleId: selectedRoleId
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    alert('删除成功')
                    get()
                    setActiveIndex(0)
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //获取角色列表
    let get = () => {
        axios({
            method: 'get',
            url: base.url + '/manager/roles',
            params: {
                token: token,
                classifyRoleId: 4
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setArr(response.data.data)
                setRoleId(response.data.data[0].id)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    useEffect(() => {
        getCustomer()
        get()
    }, [text])
    let getCustomer = () =>{
        axios({
            method: 'get',
            url: base.url + '/manager/roles',
            params: {
                token: token,
                classifyRoleId: 3
            }
        }).then((response) => {
            // console.log(response.data.data.length)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                length = response.data.data.length+1
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //添加员工
    const treeData = [];
    if (getStaff !== null) {
        for (let i = 0; i < getStaff.length; i++) {
            treeData.push({
                title: <span><img style={{width: '15px', height: '15px', marginRight: '10px'}} src={getStaff[i].avatar}
                                  alt=""/>{getStaff[i].username}</span>,
                value: getStaff[i].id,
            })
        }
    }
    let onChange = value => {
        console.log('onChange ', value);
        setValue(value)
    };
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
    //关联员工
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal1 = () => {
        setIsModalVisible(true);
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token,
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setGetStaff(response.data.data)
                setValue([])
            }
        }).catch((error) => {
            alert(error)
        })
    };

    const handleOk1 = () => {
        setIsModalVisible(false);
        //获取选中的员工和id
        console.log(roleId)
        axios({
            method: 'post',
            url: base.url + '/manager/link-employee',
            params: {
                token: token,
                roleId: roleId,
            },
            data: qs.stringify({
                employeeIds: value
            })
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('关联成功')
                window.location.reload()
            }
        }).catch((error) => {
            alert(error)
        })
    };

    const handleCancel1 = () => {
        setIsModalVisible(false);
        setValue([])
    };
    //新建角色
    const showModal = () => {
        setVisible(true);
    };
    //点击确定
    const handleOk = () => {
        setVisible(false);
        //添加角色
        if (text !== ''){
            axios({
                method: 'post',
                url: base.url + '/manager/add',
                params: {
                    token: token,
                    classifyRoleId: 4,
                    roleName: text,
                }
            }).then((response) => {
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    setText('')
                }
            }).catch((error) => {
                alert(error)
            })
        }

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
    return (
        <div className={'system'}>
            <div className={'system1'}>项目管理角色</div>
            <div className={'system2'}>
                <div className={'system_right'}>
                    <div className={'system_new'}>
                        <div className={'system_new1'}>
                            <div type="primary" onClick={showModal}>
                                新建角色
                            </div>
                            <Modal
                                maskStyle={{backgroundColor: '#fff'}}
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
                                        <div key={index} className={index === activeInxex ? 'activeIndex system_item1' : 'system_item1'}

                                            onClick={() => {
                                                setActiveIndex(index)
                                                setHidden('none')
                                                setRoleId(item.id)
                                            }}
                                        >
                                            <span
                                            >{item.name}</span>
                                            <span className={index === 0 ? 'hidden' : ''}>
                                                <Popover placement="bottom"
                                                    content={content}
                                                    onClick={() => {
                                                        //角色id和角色
                                                        setSelectedRoleId(item.id)
                                                        setEditRoles(item.name)
                                                    }}
                                                    trigger="click">
                                                    <div><i className="fa fa-angle-down" aria-hidden="true"></i></div>
                                                </Popover>

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
                                okText={'确定'} visible={isModalVisible}
                               maskStyle={{backgroundColor: '#fff'}}
                               onOk={handleOk1} onCancel={handleCancel1}>
                            <p>选择员工</p>
                            <div >
                                <TreeSelect {...tProps} />
                            </div>
                        </Modal>
                        <div>
                            <Tablelist roleId={roleId}></Tablelist>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Project
