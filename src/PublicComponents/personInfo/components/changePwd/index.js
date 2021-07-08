import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Form, Input } from 'antd';
import './style.css';
import axios from "axios";
import base from "../../../../axios/axios";

function ChangePwd() {
    let [pwd,setPwd] = useState('') //旧密码
    let [newPwd,setNewPwd] = useState('') //新密码
    const [isModalVisible, setIsModalVisible] = useState(false);
    let token=window.localStorage.getItem('token')
    const layout = {
        labelCol: {
            span: 0,
            offset: 0
        },
        wrapperCol: {
            span: 20,
        },
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        axios({
            method:'post',
            url:base.url+'/employee/modifyPassword?token='+token,
            params:{
                newPassword:newPwd,
                password:pwd
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.code==='ERROR'){
                alert(response.data.message)
            }else{
                alert('更改成功')
            }
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewPwd('')
        setPwd('')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };


    return (
        <div style={{ marginLeft: '20px', display: 'inline-block' }}>
            <Button type="primary" onClick={showModal} >
                修改密码
            </Button>
            <Modal title="修改密码" visible={isModalVisible} 
            maskStyle={{backgroundColor:'#fff'}}
            okText={'确定'}
            cancelText={'取消'}
            onOk={handleOk} 
            onCancel={handleCancel}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        label="旧密码"
                        name="oldPassword"
                        rules={[{ required: true, message: '请输入旧密码!' }]}
                    >
                        <Input.Password onChange={(e)=>{
                                pwd=e.target.value
                                setPwd(pwd)
                        }} />
                    </Form.Item>
                
                        <Form.Item
                            style={{marginTop:'20px'}}
                            label="新密码"
                            name="newPassword"
                            rules={[{ required: true, message: '请输入新密码!' }]}
                        >
                            <Input.Password onChange={(e)=>{
                                newPwd=e.target.value
                                setNewPwd(newPwd)
                            }} />
                        </Form.Item>
            
                </Form>


            </Modal>
        </div>
    )
}

export default ChangePwd;