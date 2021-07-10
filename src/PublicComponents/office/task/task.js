import './task.css'
import {ConfigProvider, Input, Space, Tag} from 'antd';
import {Modal, Button, Drawer, Checkbox, Select, Popover, TreeSelect, Calendar, Popconfirm, message} from 'antd';
import NewTask from "./newtask";
import '../calendar/calendar.css'
import LinkBusiness from "./link";
import React, {createElement, useEffect, useState} from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from "axios";
import base from "../../../axios/axios";
import qs from 'qs'

moment.locale('zh-cn');

function Task(props) {
    let clients; // 空Map
    let mans;
    let businesss;
    let contracts;
    let n = 1
    let initIdsObj = {
        clients,
        mans,
        businesss,
        contracts,
    }
    let [idsObj, setIdsObj] = useState(initIdsObj)   // 4个ids
    let arrPrior = ['全部', '高', '中', '低', '无']   //优先级
    let taskArrPrior = ['高', '中', '低', '无']   //优先级
    let endTime = ['全部', '今天到期', '明天到期', '一周到期', '一个月到期']
    let token = window.localStorage.getItem('token')
    let [hidden, setHidden] = useState(true)//描述
    let [hiddenComment, setHiddenComment] = useState(true)//评论
    let [visibleMan, setVisibleMan] = useState(false)    //参与人
    let [taskMan, setTaskMan] = useState([]) //参与人
    let [taskPerson, setTaskPerson] = useState()
    let [taskCheckBox, setTaskCheckBox] = useState(false)
    let [taskAllLabel, setTaskAllLabel] = useState([])   //所有标签
    let [taskAllLabelName, setTaskAllLabelName] = useState([])   //该任务标签
    let [taskList, setTaskList] = useState([]) //任务列表
    let [taskId, setTaskId] = useState('')   //任务id
    let [charge, setCharge] = useState([])   //负责人
    let [timeOver, setTimeOver] = useState('')   //截止日期
    let [taskPrior, setTaskPrior] = useState('') //优先级
    let [taskContent, setTaskContent] = useState('') //描述
    let [client, setClient] = useState([])   //关联客户
    let [personInformation, setPersonInformation] = useState('') //个人信息
    let [beginTime, setBeginTime] = useState('') //评论时间
    const {Search} = Input;
    const {SHOW_PARENT} = TreeSelect;
    let [data, setData] = useState('')
    let [addStore, setAddStore] = useState('')   //添加标签库
    let [taskText, setTaskText] = useState('')   //评论
    let [textContent, setTextContent] = useState([]) //评论内容
    let [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
        myTask()
        getInformation()
        allLabels()
        allLabel()
    }, [taskId])
    //新建任务
    let handleMessage = (value) => {
        data = value
        setData(data)
        console.log("子传给父的值", value)
        axios({
            method: 'post',
            url: base.url + '/task/add',
            params: {
                token: token,
            },
            data: {
                beginTime: data.time[0],
                content: data.textArea,
                employeeIds: data.man,
                endTime: data.time[1],
                prior: data.prior,
                taskName: data.taskItem,
                business: {
                    1: data.clients,
                    2: data.mans,
                    3: data.businesss,
                    4: data.contracts,
                }
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('新建任务成功')
                myTask()
                setIsModalVisible(false);
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //所有标签
    let allLabel = () => {
        axios({
            method: 'get',
            url: base.url + '/task/all-label?token=' + token,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setTaskAllLabel(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    const {Option} = Select;
    const children = [];

    for (let i = 0; i < taskAllLabel.length; i++) {
        children.push(<Option key={taskAllLabel[i].id}>{taskAllLabel[i].labelName}</Option>);
    }
    //添加标签
    let handleChangeLabel = (value, key) => {
        axios({
            method: 'post',
            url: base.url + '/task/add-label',
            params: {
                token: token,
                id: taskId,
                labelId: value,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                allLabels()
            }
        }).catch((error) => {
            alert(error)
        })
    }

//新增标签库
    let addLabels = () => {
        console.log(addStore)
        axios({
            method: 'post',
            url: base.url + '/task/addLabelStore?token=' + token,
            data: qs.stringify({
                label: addStore
            })
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'SUCCESS') {
                setAddStore('')
                allLabel()
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //新增标签库
    const addContent = (
        <div style={{width: '300px', height: '200px'}}>
            <Input placeholder="新增标签"
                   value={addStore}
                   onChange={(e) => {
                       setAddStore(e.target.value)
                   }}
                   style={{cursor: 'pointer'}}/>
            <Button
                onClick={addLabels}
                style={{
                    margin: '20px 0 0 0px',
                    color: '#3e84e9',
                    cursor: 'pointer'
                }}>保存</Button>
        </div>
    );
    //删除标签库
    let deleteLabels = (id) => {
        if (window.confirm('确定删除吗')) {
            axios({
                method: 'post',
                url: base.url + '/task/deleteLabelStore?token=' + token,
                params: {
                    id: id
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    alert('删除成功')
                    allLabel()
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //删除标签库
    const deleteContents = (
        <div style={{width: '300px', height: '200px', overflow: 'hidden'}}>
            <div className={'deleteLabels1'}>
                {taskAllLabel.map((item, index) => {
                    return (
                        <div key={index} className={'deleteLabels'}>
                            <span>{item.labelName}</span>
                            <span style={{color:'#1890FF'}}>
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={() => {
                                deleteLabels(item.id)
                            }}></i>
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
    const contentLabel = (
        <div style={{width: '300px', height: '200px'}}>
            <Select
                mode="multiple"
                allowClear
                style={{width: '90%'}}
                placeholder="请选择标签"
                onSelect={handleChangeLabel}
                autoClearSearchValue={false}
            >
                {children}
            </Select>
            <Popover content={addContent} color={'#ffffff'} zIndex={10000}
                     title="新增标签" trigger="click">
                <Button style={{position: 'absolute', left: '10px', bottom: '10px'}}>新增标签</Button>
            </Popover>
            <Popover content={deleteContents} color={'#ffffff'} zIndex={10000}
                     title="删除标签" trigger="click">
                <Button type={"primary"} danger
                        style={{position: 'absolute', right: '10px', bottom: '10px'}}>删除标签</Button>
            </Popover>
        </div>

    );

    //删除标签
    let confirmLabel = (id) => {
        axios({
            method: 'post',
            url: base.url + '/task/delete-label',
            params: {
                token: token,
                id: taskId,
                labelId: id,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
                return
            } else {
                allLabels()
            }
        }).catch((error) => {
            alert(error)
        })
        message.success('确认删除');
    }

    let cancelLabel = (e) => {
        console.log(e);
        message.error('取消删除');
    }

    //截止日期
    let onPanelChange = (value) => {
        console.log(value._d);
    }
    const contentDate = (
        <div>
            <div className="site-calendar-demo-card">
                <ConfigProvider locale={zhCN}>
                    <Calendar fullscreen={false} onChange={onPanelChange}/>
                </ConfigProvider>

            </div>
        </div>
    );

    //关联业务模块
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //关联业务
    let taskclient = () => {
        console.log(idsObj)
        console.log(idsObj.clients)
        axios({
            method: 'post',
            url: base.url + '/task/linkBusiness?token=' + token,
            data: {
                linkBusinessMap: {
                    1: idsObj.clients,
                    2: idsObj.mans,
                    3: idsObj.businesss,
                    4: idsObj.contracts,
                },
                taskId: taskId,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'SUCCESS') {
                showDrawer(taskId)
            }
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            }
        }).catch((error) => {
            alert(error)
        })

    }

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
    //保存
    let taskAddCommentOk = () => {
        setHiddenComment(!hiddenComment)
        axios({
            method: 'post',
            url: base.url + '/task/addComment',
            params: {
                token: token,
                content: taskText,
                taskId: taskId,
                id: personInformation.id
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'SUCCESS') {
                setTaskText('')
                showDrawer(taskId)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //评论内容
    let handleText = (value) => {
        taskText = value
        setTaskText(taskText)
    }
    //取消
    let taskAddCommentCancle = () => {
        setHiddenComment(!hiddenComment)
        setTaskText('')
    }
    //抽屉表头优先级
    const content = (
        <div className={'class'}>
            {taskArrPrior.map((item, index) => {
                return (
                    <span key={index}
                          className={taskPrior === item ? 'class activeColor' : ''}
                          onClick={() => {
                              taskArrPriorId(item)
                          }}>{item}</span>
                )
            })}
        </div>
    );
    let taskArrPriorId = (prior) => {
        // console.log(taskId)
        axios({
            method: 'post',
            url: base.url + '/task/update-prior',
            params: {
                token: token,
                prior: prior,
                id: taskId,
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('修改优先级成功')
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //个人信息
    let getInformation = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/whoami?token=' + token
        }).then((response) => {
            // console.log(response.data.data)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setPersonInformation(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //抽屉
    //获取信息
    const showDrawer = (id) => {
        setTaskId(id)
        setVisible(true);
        // console.log(id)
        axios({
            method: 'get',
            url: base.url + '/task/task-information?token=' + token + '&id=' + id,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setCharge(response.data.data.employeesName)
                setTimeOver(response.data.data.endTime)
                taskPrior = response.data.data.prior
                setTaskPrior(taskPrior)
                setTaskContent(response.data.data.content)
                setTaskMan(response.data.data.employeesName)
                setBeginTime(response.data.data.beginTime)
                setTextContent(response.data.data.comments)
                setClient(response.data.data.linkClient)
            }
        }).catch((error) => {
            alert(error)
        })
    };

    const onClose = () => {
        setVisible(false);
    };
    //删除关联业务
    let deleteClient = (id) => {
        if (window.confirm('确定删除吗')) {
            axios({
                method: 'post',
                url: base.url + '/task/deleteLinkBusiness?token=' + token,
                data: qs.stringify({
                    id: id
                })
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'SUCCESS') {
                    showDrawer(taskId)
                    alert('删除成功')
                }
            }).catch((error) => {
                alert(error)
            })
        } else {
            alert('取消删除')
        }
    }
    //多选框
    let onChangeCheckbox = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setTaskCheckBox(e.target.checked)
    }

    //截止时间
    let handleChangeEnd = (value) => {
        console.log(`selected ${value}`);
        if (value === '全部') {
            myTask()
        } else {
            axios({
                method: 'get',
                url: base.url + '/task/search?token=' + token,
                params: {
                    endTime: value,
                    prior: '',
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    setTaskList(response.data.data)
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //优先级
    let handleChangePrior = (value) => {
        // console.log(value);
        if (value === '全部') {
            myTask()
        } else {
            axios({
                method: 'get',
                url: base.url + '/task/search?token=' + token,
                params: {
                    prior: value,
                    endTime: '',
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    setTaskList(response.data.data)
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //我创建的
    let handleChangeCreat = (value) => {
        console.log(`selected ${value}`);
    }
    //搜索任务
    const onSearch = value => {
        // console.log(value);
        axios({
            method: 'get',
            url: base.url + "/task/search-name",
            params: {
                token: token,
                taskName: value,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setTaskList(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
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
    //我的任务
    let myTask = () => {
        axios({
            mehtod: 'get',
            url: base.url + '/task/my-task?token=' + token,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setTaskList(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //该任务标签
    let allLabels = () => {
        axios({
            method: 'get',
            url: base.url + '/task/task-label?token=' + token + '&id=' + taskId,
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                // alert(response.data.message)
            } else {
                setTaskAllLabelName(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //删除任务
    let confirm = (e) => {
        console.log(e);
        axios({
            method: 'post',
            url: base.url + '/task/delete-task',
            params: {
                token: token,
                id: taskId
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
                return
            } else {
                myTask()
                message.success('删除成功');
                onClose()
            }
        }).catch((error)=>{
            alert(error)
        })
    }

    let cancel = (e) => {
        console.log(e);
        message.error('取消删除');
    }
    //删除评论
    let deleteContent = (id) => {
        axios({
            method: 'post',
            url: base.url + '/task/deleteComment',
            params: {
                token: token,
                id: id
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'SUCCESS') {
                showDrawer(taskId)
            }
        }).catch((error) => {
            alert(error)
        })
    }
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
                               maskStyle={{backgroundColor: '#fff'}}
                               onOk={handleOk}
                               footer={null}
                               width={700}
                               onCancel={handleCancel}>
                            <NewTask handleMessage={(value)=>{
                                console.log(value)
                                handleMessage(value)
                            }} onCancel={() => {
                                setIsModalVisible(false);
                            }}></NewTask>
                        </Modal>
                    </span>
                </div>
                <div style={{padding: '0 20px'}}>
                    <Space direction="vertical">
                        <Search placeholder="搜索任务名称" size={'large'} onSearch={onSearch}
                                style={{width: 400, margin: "20px 0"}}/>
                    </Space>
                    <div className={'taskDropdown'}>
                        {/*<span>*/}
                            {/*<span className={'taskAll'}>任务类型</span>*/}
                        {/*<Select defaultValue="全部" style={{width: 120}} onChange={handleChangeCreat}>*/}
                        {/*    <Option value="全部">全部</Option>*/}
                        {/*    <Option value="我负责的">我负责的</Option>*/}
                        {/*    <Option value="我创建的">我创建的</Option>*/}
                        {/*    <Option value="我参与的">我参与的</Option>*/}
                        {/*</Select>*/}
                        {/*</span>*/}
                        <span>
                            {/*优先级*/}
                            <span className={'taskAll'}>优先级</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChangePrior}>
                            {arrPrior.map((item, index) => {
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })}
                        </Select>
                        </span>
                        <span>
                            {/*截止时间*/}
                            <span className={'taskAll'}>截止时间</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChangeEnd}>
                            {endTime.map((item, index) => {
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })}
                        </Select>
                        </span>
                    </div>
                </div>
                <div style={{padding: '30px 20px 0 20px'}}>
                    <div>
                        {taskList.map((item, index) => {
                            // console.log(item)
                            return (
                                <div
                                    className={'taskCheckbox'}
                                    key={index} onClick={() => {
                                    showDrawer(item.id)
                                }}>
                                    <Checkbox disabled={true} onChange={onChangeCheckbox}>{item.taskName}</Checkbox>
                                    <span>截止时间：{item.endTime}</span>
                                </div>
                            )
                        })
                        }
                        <Drawer
                            title={<div>
                                <Popover content={content} title="优先级" trigger="click">
                                    <Button>优先级</Button>
                                </Popover>
                                {/*删除任务*/}
                                <Popconfirm
                                    title="确定删除吗？"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button danger type={"primary"} style={{margin: '0 20px'}}>删除</Button>
                                </Popconfirm>
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
                                    <div>
                                        {taskList.map((item, index) => {
                                            return (
                                                <Checkbox key={index} disabled={true}
                                                          className={item.id === taskId ? '' : 'hidden'}
                                                          onChange={onChangeCheckbox}>{item.taskName}</Checkbox>
                                            )
                                        })}
                                        {/*<span className={taskCheckBox === true ? '' : 'hidden'}>已完成</span>*/}
                                    </div>
                                    <div><span>负责人：<span>{charge[0]}</span></span></div>
                                </div>
                                {/*标签*/}
                                <div className={'taskAddLabel'}>
                                    <div>
                                        {taskAllLabelName.map((item, index) => {
                                            return (
                                                <span className={item === '' ? 'hidden' : 'taskLabelName'}
                                                      key={index}>
                                                    <Popconfirm
                                                        title="确定删除吗?"
                                                        onConfirm={() => {
                                                            confirmLabel(item.id)
                                                        }}
                                                        onCancel={cancelLabel}
                                                        okText="确定"
                                                        cancelText="取消"
                                                    >
                                                        {item.labelName}
                                                </Popconfirm>
                                                </span>
                                            )
                                        })}
                                        <span className={'taskAddLabel1'}>
                                            <Popover content={contentLabel} title="选择标签" trigger="click">
                                                <span>+标签</span>
                                            </Popover>
                                        </span>
                                    </div>
                                    <div>
                                        截止日期：
                                        <Popover content={contentDate} title="" trigger="click">
                                            <span><i style={{color: '#a6a6e6', cursor: 'pointer'}}
                                                     className="fa fa-calendar" aria-hidden="true"></i> </span>
                                        </Popover>
                                        <span>{timeOver}</span>
                                    </div>
                                </div>
                                <div>
                                    描述：
                                    <span>{taskContent}</span>
                                </div>
                                <div style={{margin: '30px 0'}}>
                                    参与人：{taskMan.map((item, index) => {
                                    return (
                                        <span key={index} style={{margin: '0 10px'}}>{item}</span>
                                    )
                                })}

                                    <span style={{fontSize: '20px', cursor: 'pointer', color: '#3E84E9'}}>
                                        <Popover
                                            visible={visibleMan}
                                            onVisibleChange={handleVisibleChange}
                                            content={contentMan} title="选择成员" trigger="click">
                                        </Popover>
                                    </span>
                                </div>
                                <div style={{marginBottom: '30px'}}>
                                    关联业务
                                    {client === null ? '' : client.map((item, index) => {
                                        return (
                                            <div key={index} className={'taskClient'}>
                                                <span>{item.name}-{item.clientName}</span>
                                                <span onClick={() => {
                                                    deleteClient(item.id)
                                                }}>删除</span>
                                            </div>
                                        )
                                    })}
                                    <div className={'linkBusiness'} type="primary" onClick={showBusinessModal}
                                         style={{cursor: 'pointer'}}>
                                        关联业务
                                    </div>
                                    <Modal title="关联业务模块"
                                           width={800}
                                           bordered={true}
                                           bodyStyle={{padding: 0}}
                                           maskStyle={{backgroundColor: '#fff'}}
                                           visible={isBusinessModalVisible}
                                           footer={null}
                                           onOk={() => {
                                               setIsBusinessModalVisible(false);
                                           }}
                                           onCancel={() => {
                                               setIsBusinessModalVisible(false);
                                           }}>
                                        <LinkBusiness onOk={(value) => {
                                            console.log("孙子传给儿子的值", value)
                                            idsObj = value
                                            setIdsObj(idsObj || initIdsObj)
                                            setIsBusinessModalVisible(false);
                                            taskclient()
                                        }}></LinkBusiness>
                                    </Modal>
                                </div>
                                <div>
                                    评论
                                    <div style={{margin: '20px 0'}}>
                                        <span style={{marginRight: '20px'}}>
                                                <img style={{width: '30px', height: '30px', borderRadius: '50%'}}
                                                     src={personInformation.avatar} alt=""/>
                                        </span>
                                        <span onClick={taskAddComment} className={'taskAddComment'}>添加评论</span>
                                    </div>
                                    <div className={hiddenComment === true ? 'hidden' : ''}>
                                        <TextArea rows={4} value={taskText} onChange={(e) => {
                                            handleText(e.target.value)
                                        }}/>
                                        <div style={{margin: '10px 0'}}>
                                            <Button type="primary" style={{marginRight: '20px'}}
                                                    onClick={taskAddCommentOk}>保存</Button>
                                            <Button onClick={taskAddCommentCancle}>取消</Button>
                                        </div>
                                    </div>
                                    {textContent.map((item, index) => {
                                        return (
                                            <div>
                                                <div style={{marginLeft: '43px'}} className={'taskReply'}>
                                                    <div>
                                            <span>
                                                <img style={{width: '30px', height: '30px', borderRadius: '50%'}}
                                                     src={personInformation.avatar} alt=""/>
                                            </span>
                                                        <span
                                                            style={{margin: '0 20px'}}>{personInformation.username}</span>
                                                        <span>{beginTime}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{marginRight: '20px'}} onClick={() => {
                                                            deleteContent(item.id)
                                                        }}>删除</span>
                                                        {/*<span>回复</span>*/}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={'textContent'} key={index}>{item.content}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
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
