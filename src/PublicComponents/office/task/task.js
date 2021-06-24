import './task.css'
import {ConfigProvider, Input, Space} from 'antd';
import {Modal, Button, Drawer, Checkbox, Select, Popover, TreeSelect, Calendar,} from 'antd';
import NewTask from "./newtask";
import '../calendar/calendar.css'
import LinkBusiness from "./link";
import React, {createElement, useState} from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from "axios";
import base from "../../../axios/axios";
moment.locale('zh-cn');

function Task() {
    let token = window.localStorage.getItem('token')
    let [hidden, setHidden] = useState(true)//描述
    let [hiddenComment, setHiddenComment] = useState(true)//评论
    let [visibleMan, setVisibleMan] = useState(false)    //参与人
    let [taskPerson, setTaskPerson] = useState()
    let [taskCheckBox,setTaskCheckBox] = useState(false)
    let [taskAllLabel,setTaskAllLabel] = useState([])
    const {Search} = Input;
    const {SHOW_PARENT} = TreeSelect;
    //标签
    let allLabel = () =>{
        axios({
            method:'get',
            url:base.url+'/task/all-label?token='+token,
        }).then((response)=>{
            console.log(response)
            if (response.data.code === 'ERROR'){
                alert(response.data.message)
            }else {
                setTaskAllLabel(response.data.data)
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    const { Option } = Select;
    const children = [];
    for (let i = 0; i < taskAllLabel.length; i++) {
        children.push(<Option key={i}>{taskAllLabel[i].labelName}</Option>);
    }

    let handleChangeLabel=(value)=> {
        console.log(`selected ${value}`);
    }
    const contentLabel = (
        <div style={{width:'300px',height:'200px'}}>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%'}}
                placeholder="请选择标签"
                onChange={handleChangeLabel}
            >
                {children}
            </Select>
        </div>
    );
    //截止日期
    let onPanelChange = (value, mode) => {
        console.log(value, mode);
    }
    const contentDate = (
        <div>
            <div className="site-calendar-demo-card">
                <ConfigProvider locale={zhCN}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
                </ConfigProvider>
            </div>
        </div>
    );
    //评论
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };
    //关联业务模块
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //参与人
    const treeData = [
        {
            title: '123',
            value: '123',
            key: '0',
        },
        {
            title: '456',
            value: '456',
            key: '1',
        },
    ];
    let onChangePerson = value => {
        console.log('onChange ', value);
        setTaskPerson(value)
    };
    const tProps = {
        treeData,
        value: taskPerson,
        onChange: onChangePerson,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择员工',
        style: {
            width: '100%',
        },
    };
    let hide = () => {
        setVisibleMan(false)
    };
    let handleVisibleChange = visibleMan => {
        setVisibleMan(visibleMan)
    };
    const contentMan = (
        <div style={{width: '400px', height: '300px'}}>
            <TreeSelect {...tProps} allowClear={true}/>
            <div style={{position: 'absolute', bottom: 0, right: 0, margin: '20px'}}>
                <Button onClick={hide}>确定</Button>
                <Button onClick={hide} style={{marginLeft: '30px'}}>取消</Button>
            </div>

        </div>
    );
    //抽屉描述
    const {TextArea} = Input;
    let taskDescribe = () => {
        setHidden(!hidden)
    }
    //添加评论
    let taskAddComment = () => {
        setHiddenComment(!hiddenComment)
    }
    //抽屉表头优先级
    const content = (
        <div className={'class'}>
            <span>高</span>
            <span>中</span>
            <span>低</span>
            <span>无</span>
        </div>
    );

    //抽屉
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    //多选框
    let onChangeCheckbox = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setTaskCheckBox(e.target.checked)
    }

    //下拉菜单
    // const {Option} = Select;
    let handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    //搜索任务
    const onSearch = value => console.log(value);
    //新建任务
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <div className={'taskContent'}>
                <div className={'taskTop'}>
                    <span className={'taskSp'}>我的任务</span>
                    <span>
                        <Button type="primary" onClick={showModal}>
                            新建任务
                        </Button>
                        <Modal title="新建任务"
                               visible={isModalVisible}
                               cancelText={'取消'}
                               okText={'确定'}
                               onOk={handleOk}
                               width={700}
                               onCancel={handleCancel}>
                            <NewTask></NewTask>

                        </Modal>
                    </span>
                </div>
                <div style={{padding: '0 20px'}}>
                    <Space direction="vertical">
                        <Search placeholder="搜索任务名称" size={'large'} onSearch={onSearch}
                                style={{width: 400, margin: "20px 0"}}/>
                    </Space>
                    <div className={'taskDropdown'}>
                        <span>
                            <span className={'taskAll'}>任务类型</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChange}>
                            <Option value="全部">全部</Option>
                            <Option value="我负责的">我负责的</Option>
                            <Option value="我创建的">我创建的</Option>
                            <Option value="我参与的">我参与的</Option>
                        </Select>
                        </span>
                        <span>
                            <span className={'taskAll'}>优先级</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChange}>
                            <Option value="全部">全部</Option>
                            <Option value="高">高</Option>
                            <Option value="中">中</Option>
                            <Option value="低">低</Option>
                            <Option value="无">无</Option>
                        </Select>
                        </span>
                        <span>
                            <span className={'taskAll'}>截止时间</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChange}>
                            <Option value="全部">全部</Option>
                            <Option value="今天到期">今天到期</Option>
                            <Option value="明天到期">明天到期</Option>
                            <Option value="一周到期">一周到期</Option>
                            <Option value="一个月到期">一个月到期</Option>
                        </Select>
                        </span>
                    </div>
                </div>
                <div style={{padding: '30px 20px 0 20px'}}>
                    <div>
                        <div className={'taskCheckbox'} onClick={showDrawer}>
                            <Checkbox disabled={true} onChange={onChangeCheckbox}>Checkbox</Checkbox>
                            <span>6-23截止 <span className={'taskAvatar'}>111</span></span>
                        </div>
                        <Drawer
                            title={<div>
                                <Popover content={content} title="优先级" trigger="click">
                                    <Button>优先级</Button>
                                </Popover>
                                <Button style={{margin: '0 20px'}}>删除</Button>
                            </div>}
                            keyboard={false}
                            placement="right"
                            closable={true}
                            onClose={onClose}
                            visible={visible}
                            width={930}
                            headerStyle={{cursor: 'pointer'}}

                        >
                            <div style={{padding: '20px'}}>
                                <div className={'taskMan'}>
                                    <div><Checkbox onChange={onChangeCheckbox} >CheckBox</Checkbox><span className={taskCheckBox === true?'':'hidden'}>已完成</span></div>
                                    <div><span>负责人：<span>123</span></span></div>
                                </div>
                                <div className={'taskAddLabel'}>
                                    <div>
                                        <span></span>
                                        <span className={'taskAddLabel1'}>
                                            <Popover content={contentLabel} title="选择标签" trigger="click">
                                                <span onClick={allLabel}>+标签</span>
                                            </Popover>
                                        </span>
                                    </div>
                                    <div>
                                        截止日期：
                                        <Popover content={contentDate} title="" trigger="click">
                                            <span><i style={{color: '#a6a6e6', cursor: 'pointer'}}
                                                     className="fa fa-calendar" aria-hidden="true"></i> </span>
                                        </Popover>


                                        <span></span>
                                    </div>
                                </div>
                                <div>
                                    描述：
                                    <div></div>
                                    <span style={{color: '#3E84E9', cursor: 'pointer'}}
                                          onClick={taskDescribe}>添加描述</span>
                                    <div className={hidden === true ? 'hidden' : ''}>
                                        <TextArea rows={4}/>
                                        <div style={{margin: '10px 0'}}>
                                            <Button type="primary" style={{marginRight: '20px'}}
                                                    onClick={taskDescribe}>保存</Button>
                                            <Button onClick={taskDescribe}>取消</Button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{margin: '30px 0'}}>
                                    参与人：<span></span>
                                    <span style={{fontSize: '20px', cursor: 'pointer', color: '#3E84E9'}}>
                                        <Popover
                                            visible={visibleMan}
                                            onVisibleChange={handleVisibleChange}
                                            content={contentMan} title="选择成员" trigger="click">
                                          <span>✚</span>
                                        </Popover>
                                    </span>
                                </div>
                                <div style={{marginBottom: '30px'}}>
                                    关联业务
                                    <div className={'linkBusiness'} type="primary" onClick={showBusinessModal}
                                         style={{cursor: 'pointer'}}>
                                        关联业务
                                    </div>
                                    <Modal title="关联业务模块"
                                           width={800}
                                           bordered={true}
                                           bodyStyle={{padding: 0}}
                                           visible={isBusinessModalVisible}
                                           onOk={() => {
                                               setIsBusinessModalVisible(false);
                                           }}
                                           onCancel={() => {
                                               setIsBusinessModalVisible(false);
                                           }}>
                                        <LinkBusiness></LinkBusiness>
                                    </Modal>
                                </div>
                                <div>
                                    评论
                                    <div style={{margin: '20px 0'}}>
                                        <span style={{marginRight: '20px'}}>123</span>
                                        <span onClick={taskAddComment} className={'taskAddComment'}>添加评论</span>
                                    </div>
                                    <div className={hiddenComment === true ? 'hidden' : ''}>
                                        <TextArea rows={4}/>
                                        <div style={{margin: '10px 0'}}>
                                            <Button type="primary" style={{marginRight: '20px'}}
                                                    onClick={taskAddComment}>保存</Button>
                                            <Button onClick={taskAddComment}>取消</Button>
                                        </div>
                                    </div>
                                    <div style={{marginLeft: '43px'}} className={'taskReply'}>
                                        <div>
                                            <span>123</span>
                                            <span style={{margin: '0 20px'}}>一个好人</span>
                                            <span>时间</span>
                                        </div>
                                        <div>
                                            <span style={{marginRight: '20px'}}>删除</span>
                                            <span>回复</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
