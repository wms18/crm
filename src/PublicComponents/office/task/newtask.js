import React, {useState,useEffect} from "react";
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Space, Table, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import './newtask.css'
import LinkBusiness from "./link";
import axios from "axios";
import base from "../../../axios/axios";
function NewTask() {
    let token = window.localStorage.getItem('token')
    let arrPrior = ['高','中','低','无']   //优先级
    let [prior,setPrior] = useState('') //优先级
    let [taskItem,setTaskItem] = useState('')   //任务名称
    let [allStaff,setAllStaff] = useState([])   //所有员工
    let [man, setMan] = useState([])//参与人
    let [textArea,setTextArea] = useState('')   //任务描述
    //参与人
    useEffect(()=>{
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            }else {
                setAllStaff(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    },[])
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
    for (let i=0;i<allStaff.length;i++){
        treeData.push({
            title: allStaff[i].username,
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
    //对话框
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
    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
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
    let handlePrior = (item) =>{
        prior = item
        setPrior(prior)
        console.log(prior)
    }
    //任务名称
    let handleTask = (task) =>{
        setTaskItem(task)
        console.log(task)
    }
    //任务描述
    let handleText = (value) =>{
        textArea = value
        setTextArea(textArea)
        console.log(textArea)
    }
    return(
        <span>
            <div >
                {/*输入内容*/}
                <div className={'newtask'}>
                    <div>
                <Form
                    {...layout}
                    layout="vertical"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="任务名称"
                        name="username"
                        style={{width:'350px'}}
                        rules={[
                            {
                                required: true,
                                message: '主题不能为空',
                            },
                        ]}
                    >
                        <Input value={taskItem} onChange={(e)=>{
                            handleTask(e.target.value)
                        }}/>
                    </Form.Item>
                </Form>
                        </div>
                    <div>
                        {/*参与人*/}
                <div style={{margin:'6px 0 6px 0'}}>
                    <span >负责人</span>
                </div>
                <TreeSelect {...tProps} style={{width: '253px'}}/>
                </div>
                    </div>
                {/*时间*/}
                <div style={{margin: '20px 0 5px 0'}}>
                    <span>*开始时间</span>
                    <span style={{float:'right'}}>*结束时间</span>
                </div>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            bordered={false}
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChangeTime}
                            onOk={onOk}
                            style={{width: '183%',padding:'5px 0 10px 0'}}
                        />
                    </ConfigProvider>
                </Space>
                <div>
                    <span>优先级</span>
                </div>
                <div className={'class'}>
                    {arrPrior.map((item,index)=>{
                        return  (
                            <span key={index}
                                  onClick={()=>{
                                      handlePrior(item)
                                  }}>{item}</span>
                        )
                    })}
                </div>


                <div style={{margin: '20px 0'}}>
                    <span>任务描述</span>
                </div>
                <TextArea rows={4} value={textArea} placeholder={'请输入内容'} onChange={(e)=>{
                    handleText(e.target.value)
                }}/>
                <div style={{margin: '20px 0 0 0', color: '#3E84E9'}}>
                    <Button  type="primary" onClick={showBusinessModal} style={{cursor: 'pointer'}}>
                        关联业务
                    </Button>
                    <Modal title="关联业务模块"
                           width={800}
                           bordered={true}
                           bodyStyle={{padding:0}}
                           visible={isBusinessModalVisible}
                           onOk={()=>{
                               setIsBusinessModalVisible(false);
                           }}
                           onCancel={()=>{
                               setIsBusinessModalVisible(false);
                           }}>
                        <LinkBusiness></LinkBusiness>
                    </Modal>
                </div>
            </div>
        </span>

    )
}
export default NewTask
