import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Form, Input } from 'antd';
import './style.css';


function ChangePwd() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const layout = {
        labelCol: {
            span:0,
            offset:0
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
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                <Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                            rules={[{ required: true, message: '请输入你的密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="新密码"
                            name="newPassword"
                            rules={[{ required: true, message: '请输入你的密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>


                </Modal>
            </div>
    )
}

export default ChangePwd;