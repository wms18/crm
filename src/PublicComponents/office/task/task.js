import './task.css'
import {ConfigProvider, Input, Space} from 'antd';
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

function Task() {
    let n = 1
    let arrPrior = ['全部', '高', '中', '低', '无']   //优先级
    let taskArrPrior = ['高', '中', '低', '无']   //优先级
    let endTime = ['全部', '今天到期', '明天到期', '一周到期', '一个月到期']
    let token = window.localStorage.getItem('token')
    let [hidden, setHidden] = useState(true)//描述
    let [hiddenComment, setHiddenComment] = useState(true)//评论
    let [visibleMan, setVisibleMan] = useState(false)    //参与人
    let [taskPerson, setTaskPerson] = useState()
    let [taskCheckBox, setTaskCheckBox] = useState(false)
    let [taskAllLabel, setTaskAllLabel] = useState([])   //所有标签
    let [taskAllLabelName, setTaskAllLabelName] = useState([])   //该任务标签
    let [taskList, setTaskList] = useState([]) //任务列表
    let [taskId, setTaskId] = useState('')   //任务id
    let [charge, setCharge] = useState([])   //负责人
    let [taskAddLabels, setTaskAddLabels] = useState('') //任务添加标签
    let [labelId, setLabelId] = useState([]) //任务标签id
    let [timeOver,setTimeOver] = useState('')   //截止日期
    const {Search} = Input;
    const {SHOW_PARENT} = TreeSelect;
    let [data, setData] = useState('')
    let handleMessage = (value) => {
        data = value
        setData(data)
        console.log("子传给父的值", value)
        setIsModalVisible(false)
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
                    1: data.clientId,
                    2: data.manId,
                    3: data.businessId,
                    // 4:data.contractId,
                }
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('新建任务成功')
                myTask()
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
        children.push(<Option key={i}>{taskAllLabel[i].labelName}</Option>);
    }
    //添加标签
    let handleChangeLabel = (value) => {
        console.log(Number(value.splice(-1)) + 1);
        axios({
            method: 'post',
            url: base.url + '/task/add-label',
            params: {
                token: token,
                id: taskId,
                labelId: Number(value.splice(-1)) + 1,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            }
        }).catch((error) => {
            alert(error)
        })
    }

    const contentLabel = (
        <div style={{width: '300px', height: '200px'}}>
            <Select
                mode="multiple"
                allowClear
                style={{width: '100%'}}
                placeholder="请选择标签"
                onChange={handleChangeLabel}
            >
                {children}
            </Select>
        </div>
    );
    //删除标签
    let confirmLabel = (id) => {
        console.log(id);
        // axios({
        //     method: 'post',
        //     url: base.url + '/task/delete-label',
        //     params: {
        //         token: token,
        //         id: taskId,
        //         labelId: id,
        //     }
        // }).then((response) => {
        //     console.log(response)
        //     if (response.data.code === 'ERROR') {
        //         alert(response.data.message)
        //         return
        //     } else {
        //         allLabels()
        //     }
        // }).catch((error) => {
        //     alert(error)
        // })
        message.success('确认删除');
    }

    let cancelLabel = (e) => {
        console.log(e);
        message.error('取消删除');
    }

    //截止日期
    let onPanelChange = (value) => {
        console.log(value._d);
        let d=value._d
        setTimeOver(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() )
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
            {taskArrPrior.map((item, index) => {
                return (
                    <span key={index} onClick={() => {
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
    //抽屉
    const [visible, setVisible] = useState(false);
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
            }
        }).catch((error) => {
            alert(error)
        })
    };

    const onClose = () => {
        setVisible(false);
    };
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
                // console.log(response)
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
            // console.log(response)
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
                alert(response.data.message)
            } else {
                setTaskAllLabelName(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }


    useEffect(() => {
        myTask()
        allLabels()
        allLabel()

    }, [n])
    //删除任务
    let confirm = (e) => {
        console.log(e);
        // axios({
        //     method: 'post',
        //     url: base.url + '/task/delete-task',
        //     params: {
        //         token: token,
        //         id: taskId
        //     }
        // }).then((response) => {
        //     console.log(response)
        //     if (response.data.code === 'ERROR') {
        //         alert(response.data.message)
        //         return
        //     } else {
        //         myTask()
        //         message.success('删除成功');
        //     }
        // })
    }

    let cancel = (e) => {
        console.log(e);
        message.error('取消删除');
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
                               onOk={handleOk}
                               footer={null}
                               width={700}
                               onCancel={handleCancel}>
                            <NewTask handleMessage={handleMessage}></NewTask>
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
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChangeCreat}>
                            <Option value="全部">全部</Option>
                            <Option value="我负责的">我负责的</Option>
                            <Option value="我创建的">我创建的</Option>
                            <Option value="我参与的">我参与的</Option>
                        </Select>
                        </span>
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
                                    <Button style={{margin: '0 20px'}}>删除</Button>
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
                                                <Checkbox key={index} className={item.id === taskId ? '' : 'hidden'}
                                                          onChange={onChangeCheckbox}>{item.taskName}</Checkbox>
                                            )
                                        })}
                                        <span className={taskCheckBox === true ? '' : 'hidden'}>已完成</span>
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
