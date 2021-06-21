import React, { useState, useEffect } from 'react';
import { Modal, Button,Layout } from 'antd';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Tablelist from './table'
import '../../font-awesome-4.7.0/css/font-awesome.css'
import './office.css'
import '../system/system.css'
import { TreeSelect } from 'antd';
const {Content} = Layout
function Office() {
    const { SHOW_PARENT } = TreeSelect;
    //添加员工
    const treeData = [
        {
            title: '员工1',
            value: '0',
            key: '0',
        },
        {
            title: '员工2',
            value: '1',
            key: '1',
        },
        {
            title: '员工3',
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
    let staff = ['角色员工', '角色权限']
    let [displayStaff, setDisplayStaff] = useState('block')  // 隐藏角色员工或角色权限
    let [activeStaff, setActiveStaff] = useState(0)      //选择角色员工或角色权限
    let [arr, setArr] = useState([])         //新建角色
    let [activeInxex, setActiveIndex] = useState(0)  //选择新建的角色
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let [text, setText] = useState('')
    let [num, setNum] = useState('')

    let [hidden, setHidden] = useState('none')
    //新建角色
    const showModal = () => {
        setVisible(true);
    };
    //点击确定
    const handleOk = () => {
        setVisible(false);
        arr = [...arr, text]
        arr = new Set(arr)
        setArr([...arr])
        setText('')
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
                    <div className={'system1'}>办公管理角色</div>
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
                                                    >{item}</span>
                                                    <span>
                                                        <i className="fa fa-angle-down" aria-hidden="true" onClick={(e) => {
                                                            handleEdit(index, e)
                                                        }}></i>
                                                        <span style={{ display: hidden }}>
                                                            <ul className={'ul'} style={{ top: `${210 + num * 35}px` }}>
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
                                    <span className={'system_active'}>角色员工</span>
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

export default Office
