import React, {useState, useEffect} from "react";
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Space, Table, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import './newtask.css'
import LinkBusiness from "./link";
import axios from "axios";
import base from "../../../axios/axios";

let clients; // 空Map
let mans;
let businesss;
let contracts;
let initIdsObj = {
    clients,
    mans,
    businesss,
    contracts,
}

function NewTask(props) {
    const [form] = Form.useForm();
    let token = window.localStorage.getItem('token')
    let arrPrior = ['高', '中', '低', '无']   //优先级
    let [prior, setPrior] = useState('') //优先级
    let [taskItem, setTaskItem] = useState('')   //任务名称
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [idsObj, setIdsObj] = useState(initIdsObj)   // 4个ids
    let [man, setMan] = useState([])//负责人
    let [textArea, setTextArea] = useState('')   //任务描述
    let [time, setTime] = useState([])   //时间
    let [timeValue, setTimeValue] = useState([null, null])   //时间
    let [data, setData] = useState('')
    //参与人
    useEffect(() => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setAllStaff(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }, [])

    //关联业务
    //关联业务模块
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //备注
    const {TextArea} = Input;
    //参与人
    const {SHOW_PARENT} = TreeSelect;
    const treeData = [];
    for (let i = 0; i < allStaff.length; i++) {
        treeData.push({
            title: <span><img style={{width: '15px', height: '15px', marginRight: '10px'}} src={allStaff[i].avatar}
                              alt=""/>{allStaff[i].username}</span>,
            value: allStaff[i].id,
        })
    }
    let onChange1 = value => {
        console.log('onChange ', value);
        setMan(value)
    };
    const tProps = {
        treeData,
        value: man,
        bordered: true,
        onChange: onChange1,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择',
        style: {
            width: '100%',
        },
    };

    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        timeValue = value
        setTimeValue(timeValue)
        time = dateString
        setTime(time)
    }

    let onOk = (value) => {
        console.log('onOk: ', value);
    }
    //输入框
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //优先级
    let handlePrior = (item) => {
        prior = item
        setPrior(prior)
        console.log(prior)
    }
    //任务名称
    let handleTask = (task) => {
        setTaskItem(task)
        console.log(task)
    }
    //任务描述
    let handleText = (value) => {
        textArea = value
        setTextArea(textArea)
        console.log(textArea)
    }
    return (
        <>
            <div>
                {/*输入内容*/}
                <div className={'newtask'}>
                    <div>
                        <Form
                            form={form}
                            {...layout}
                            layout="vertical"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="任务名称"
                                name="username"
                                style={{width: '350px'}}
                                rules={[
                                    {
                                        required: true,
                                        message: '主题不能为空',
                                    },
                                ]}
                            >
                                <Input value={taskItem} onChange={(e) => {
                                    handleTask(e.target.value)
                                }}/>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        {/*参与人*/}
                        <div style={{margin: '6px 0 6px 0'}}>
                            <span>负责人</span>
                        </div>
                        <TreeSelect {...tProps} style={{width: '253px'}}/>
                    </div>
                </div>
                {/*时间*/}
                <div style={{margin: '20px 0 5px 0'}}>
                    <span>*开始时间</span>
                    <span style={{float: 'right'}}>*结束时间</span>
                </div>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            value={timeValue}
                            bordered={false}
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChangeTime}
                            onOk={onOk}
                            style={{width: '183%', padding: '5px 0 10px 0'}}
                        />
                    </ConfigProvider>
                </Space>
                <div>
                    <span>优先级</span>
                </div>
                <div className={'class'}>
                    {arrPrior.map((item, index) => {
                        return (
                            <span key={index}
                                  className={prior === item ? 'class activeColor' : ''}
                                  onClick={() => {
                                      handlePrior(item)
                                  }}>{item}</span>
                        )
                    })}
                </div>
                <div style={{margin: '20px 0'}}>
                    <span>任务描述</span>
                </div>
                <TextArea rows={4} value={textArea} placeholder={'请输入内容'} onChange={(e) => {
                    handleText(e.target.value)
                }}/>
                <div style={{margin: '20px 0 0 0', color: '#3E84E9'}}>
                    <Button type="primary" onClick={showBusinessModal} style={{cursor: 'pointer'}}>
                        关联业务
                    </Button>
                    <Modal title="关联业务模块"
                           width={800}
                           bordered={true}
                           bodyStyle={{padding: 0}}
                           maskClosable={false}
                           maskStyle={{backgroundColor: '#fff'}}
                           keyboard={false}
                           visible={isBusinessModalVisible}
                           footer={null}
                           closable={false}
                           onCancel={() => {
                               setIsBusinessModalVisible(false);
                           }}>
                        <LinkBusiness onOk={(value) => {
                            console.log("孙子传给儿子的值", value)
                            setIdsObj(value || initIdsObj)
                            setIsBusinessModalVisible(false);
                        }}/>
                    </Modal>
                </div>
            </div>
            <div className={"ok-button"}>
                <Button style={{marginRight: '20px'}} onClick={() => {
                    props.onCancel()
                    setPrior("")
                    setTaskItem("")
                    setMan([])
                    setTextArea("")
                    setTime("")
                    setIdsObj(initIdsObj)
                    setTimeValue([null, null])
                    form.setFieldsValue({"username": ""}) // 清空任务名称
                }}>取消</Button>
                <Button type={"primary"} onClick={() => {
                    props.handleMessage(data = ({
                        prior: prior,
                        taskItem: taskItem,
                        man: man,
                        textArea: textArea,
                        time: time,
                        ...idsObj,
                    }))
                    setPrior("")
                    setTaskItem("")
                    setMan([])
                    setTextArea("")
                    setTime("")
                    setIdsObj(initIdsObj)
                    setTimeValue([null, null])
                    form.setFieldsValue({"username": ""}) // 清空任务名称
                }}>确定</Button>
            </div>
        </>
    )
}

export default NewTask
