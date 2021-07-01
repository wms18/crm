import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Space, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React, {useState,useEffect} from "react";
import base from "../../../axios/axios";
import axios from "axios";
function Newnotice(props) {
    let token = window.localStorage.getItem('token')
    let [newContent,setNewContent] = useState('') //主题
    let [time,setTime] = useState([])   //时间
    let [timeValue,setTimeValue] = useState(null,null)  //时间
    let [notice,setNotice] = useState('')   //正文
    const [form] = Form.useForm();
    //公告正文
    const {TextArea} = Input;


    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        timeValue = value
        setTimeValue(value)
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
    //主题
    let newTheme =(value) =>{
        console.log(value)
        newContent = value
        setNewContent(newContent)
    }
    //正文
    let handle =(value)=>{
        notice = value
        setNotice(notice)
    }
    return(
        <div >
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
                            label="公告主题"
                            name="username"
                            style={{width:'350px'}}
                            rules={[
                                {
                                    required: true,
                                    message: '公告主题不能为空',
                                },
                            ]}
                        >
                            <Input value={newContent} onChange={(e)=>{
                                newTheme(e.target.value)
                            }}/>
                        </Form.Item>
                    </Form>
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
                        value={timeValue}
                        bordered={false}
                        showTime={{format: 'HH:mm'}}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChangeTime}
                        onOk={onOk}
                        style={{width: '183%',padding:'5px 0 10px 0'}}
                    />
                </ConfigProvider>
            </Space>
            <div style={{margin: '20px 0'}}>
                <span>公告正文</span>
            </div>
            <TextArea rows={4} value={notice} onChange={(e)=>{
                handle(e.target.value)
            }} placeholder={'请输入内容'}/>
            <div className={'ok-button'}>
                <Button style={{marginRight: '20px'}} onClick={()=>{
                   props.onCancel()
                    setNewContent('')
                    setTime([])
                    setNotice('')
                    setTimeValue(null,null)
                    form.setFieldsValue({"username": ""})
                }}> 取消</Button>
                <Button type={"primary"} onClick={() => {
                    if (newContent === '' || notice ===''){
                        alert('正文、标题不能为空')
                        return
                    }else {
                        let messages={
                            newContent:newContent,
                            time:time,
                            notice:notice
                        }
                        props.onOk(messages)
                        setNewContent('')
                        setTime([])
                        setNotice('')
                        setTimeValue(null,null)
                        form.setFieldsValue({"username": ""})
                    }
                }}>确定</Button>
            </div>
        </div>
    )
}
export default Newnotice
