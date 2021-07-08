import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select } from 'antd';
import './style.css'
import base from '../../../../axios/axios'
import axios from 'axios';
import { Form, InputNumber, } from 'antd';
import qs from 'qs'
const { Option } = Select

function InfoEdit(params) {
    let token = window.localStorage.getItem('token')
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [user, setUser] = useState('')   //获取个人信息
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [sex, setSex] = useState('')
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
    }

    useEffect(() => {
        all()
    }, [])
    let all = () => {
        axios({
            method: 'get',
            url: base.url + "/employee/whoami?token=" + token,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                user = response.data.data
                setUser(user)
                name = response.data.data.username
                setName(name)
                email = response.data.data.email
                setEmail(email)
                setSex(response.data.data.sex)
                form.setFieldsValue({email:email})
            }
        }).catch((error) => {
            alert(error)
        })
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        axios({
            method: 'post',
            url: base.url + '/employee/update?token=' + token,
            data: qs.stringify({
                email: email,
                sex: sex,
                username: name
            })
        }).then((response) => {
            console.log(response);
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('更新成功')
                all()
            }
        }).catch((error) => {
            alert(error)
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (value) => {
        sex = value
        setSex(sex)
        // console.log(1);
    }
   
    return (
        <div style={{ marginLeft: '20px', display: 'inline-block' }}>
            <Button type="primary" onClick={showModal}>
                编辑
            </Button>

            <Modal title="编辑资料" visible={isModalVisible}
                maskStyle={{backgroundColor:'#fff'}}
                okText={'确定'} cancelText={'取消'} onOk={handleOk} onCancel={handleCancel}>
                <div className="userName">
                    <div>
                        <span >姓名</span>
                        <Input style={{ margin: '20px 0' }} value={name} onChange={(e) => {
                            name = e.target.value
                            setName(name)

                        }}></Input>
                    </div>
                    <div>
                        <span>邮箱</span>
                        <Form {...layout} initialValues={email}
                            form={form}
                            name="nest-messages" onFinish={onFinish} >
                            <Form.Item
                                name={['email']}
                                rules={[
                                    {
                                        type: 'email',
                                        message: '请输入正确的邮箱',
                                    },
                                ]}
                            >
                                <Input style={{ width: 207, height: 30, margin: '20px 0 0px 0' }} 
                                 value={email} onChange={(e) => {
                                    email = e.target.value
                                    setEmail(email)
                                }} />
                            </Form.Item>
                        </Form>

                    </div>
                </div>
                <div className="userName" style={{ margin: '16px 0' }}>
                    <div >
                        <span>性别</span>
                        <Select value={sex} style={{ width: 207, height: 30, margin: '20px 0' }} onChange={handleChange}>
                            <Option value='男'>男</Option>
                            <Option value='女'>女</Option>
                        </Select>
                    </div>
                    <div style={{ marginLeft: '60px' }}>
                        <span>手机号(登录名)</span>
                        <Input prefix={user.phone} disabled style={{ width: 207, height: 30, margin: '20px 0' }}></Input>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default InfoEdit;