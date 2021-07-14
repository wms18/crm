import {Calendar, Badge, ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, {useEffect, useState} from 'react';
import {Modal, Button, Input, Form} from 'antd';
import {DatePicker, Space, TreeSelect, Popover, Table} from 'antd';
import './calendar.css'
import LinkBusiness from "../task/link";
import axios from "axios";
import base from "../../../axios/axios";

import Icon from '@ant-design/icons';

import { UserOutlined } from '@ant-design/icons';
moment.locale('zh-cn');

function SchedulePage(props) {
    const [form] = Form.useForm();
    let clients; // 空Map
    let mans ;
    let businesss ;
    let contracts;
    let ids = {
        clients,
        mans,
        businesss,
        contracts,
    }
    let [data,setData] = useState(ids)
    let token=window.localStorage.getItem('token')
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    let [title,setTitle] = useState('') //主题
    let [time,setTime] = useState([])   //时间
    let [timeValue,setTimeValue] = useState([]) //时间
    let [content,setContent] = useState('')    //内容
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    useEffect(() => {
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
        all()
    }, [])
    //所有员工
    let all = () => {
         axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token
        }).then((response) => {
            console.log(response)
            setAllStaff(response.data.data)
        }).catch((error) => {
            alert(error)
        })
    }
      //备注
    const {TextArea} = Input;
    //参与人
    const {SHOW_PARENT} = TreeSelect;
    const treeData = [];
    if (allStaff !== null){
    for (let j = 0; j < allStaff.length; j++) {
        treeData.push({
            title:<span><img style={{width:'15px',height:'15px',marginRight:'10px'}} src={allStaff[j].avatar} alt=""/>{allStaff[j].username}</span>  ,
            value: allStaff[j].id,
        })
    }}
    let onChangeStaff = value => {
        console.log('onChange ', value);
        selectStaff = value
        setSelectStaff(selectStaff)
    };
    const tProps = {
        showArrow:true,
        allowClear: true,
        treeData,
        value: selectStaff,
        onChange: onChangeStaff,
        treeCheckable: true,
        multiple: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择员工',
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
        if (time[0] !== '' && time[1]!== '' && content!=='' && selectStaff !== ''&& title!== ''){
            axios({
                method:'post',
                url:base.url+'/schedule/add',
                params:{
                    token:token
                },
                data:{
                    beginTime:time[0],
                    endTime:time[1],
                    content:content,
                    employeeIds:selectStaff,
                    title:title,
                    business:{
                        1: data.clients,
                        2: data.mans,
                        3: data.businesss,
                        4: data.contracts,
                    }
                }
            }).then((response)=>{
                console.log(response)
                if (response.data.code==='ERROR'){
                    console.log(response.data.message)
                }else {
                    alert('新建日程成功')
                    setIsModalVisible(false);
                    setTimeValue([null,null])
                    setSelectStaff([])
                    setContent('')
                    form.setFieldsValue({"title": ""}) // 清空标题
                    setData(ids)
                }
            }).catch((error)=>{
                alert(error)
            })
        }else {
            alert("请重新输入")
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible(false);
        setTimeValue([null,null])
        setSelectStaff([])
        setContent('')
        form.setFieldsValue({"title": ""}) // 清空标题
        setData(ids)
    };
    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        time=dateString
        setTime(time)
        timeValue = value
        setTimeValue(timeValue)
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
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //日历
    let onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    }
    //主题
    let handleTitle = (value)=>{
        console.log(value)
        title = value
        setTitle(title)
    }
    //内容
    let handleContent = (value) =>{
        console.log(value)
        content=value
        setContent(content)
    }

    return (
        <div style={{marginTop:'60px'}}>
            <div style={{position: 'absolute', margin: '15px',height:'500px'}}>
                <Button type="primary" onClick={showModal}>
                    创建日程
                </Button>
            </div>
            <Modal title="创建日程"
                   maskStyle={{backgroundColor: '#fff'}}
                   width={550}
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}>
                {/*输入内容*/}
                <Form
                    {...layout}
                    form={form}
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="主题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '主题不能为空',
                            },
                        ]}
                    >
                        <Input placeholder={'请输入内容'} value={title} onChange={(e)=>{
                            handleTitle(e.target.value)
                        }} />
                    </Form.Item>
                </Form>
                {/*时间*/}
                <div style={{marginTop: '20px'}}>
                    <span>选择时间</span>
                </div>
                <div style={{margin: '10px 0'}}>
                    <Space direction="vertical" size={12}>
                        <ConfigProvider locale={zhCN}>
                            <RangePicker
                                // bordered={false}
                                showTime={{format: 'HH:mm'}}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}
                                value={timeValue}
                                onOk={onOk}
                                style={{width: '130%'}}
                            />
                        </ConfigProvider>
                    </Space>
                </div>
                {/*参与人*/}
                <div style={{marginBottom: '10px'}}>
                    <span>参与人</span>
                </div>
                <TreeSelect {...tProps}  />
                <div style={{margin: '20px 0'}}>
                    <span>备注</span>
                </div>
                <TextArea rows={4} value={content} onChange={(e)=>{
                    handleContent(e.target.value)
                }} placeholder={'请输入内容'}/>
                <div style={{margin: '20px 0 0 0', color: '#3E84E9'}}>
                    <Button type="primary" onClick={showBusinessModal} style={{cursor: 'pointer'}}>
                        关联业务
                    </Button>
                    <Modal title="关联业务模块"
                           width={800}
                           bordered={true}
                           bodyStyle={{padding: 0}}
                           visible={isBusinessModalVisible}
                           maskStyle={{backgroundColor: '#fff'}}
                           footer={null}
                           onOk={() => {
                               setIsBusinessModalVisible(false);
                           }}
                           onCancel={() => {
                               setIsBusinessModalVisible(false);
                           }}>
                        <LinkBusiness onOk={(value) => {
                            console.log(value)
                            data=value
                            setData(data||ids)
                            setIsBusinessModalVisible(false);
                        }}/>
                    </Modal>
                </div>
                {/*<div>*/}
                {/*    <div className={data.clients !== null?'':'hidden'}>*/}
                {/*        {data.clients}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Modal>
            <ConfigProvider locale={zhCN} fullscreen={false}>
                <Calendar onPanelChange={onPanelChange}/>
            </ConfigProvider>
        </div>
    )
}

export default SchedulePage;
