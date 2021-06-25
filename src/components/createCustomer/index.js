import React, { Component } from "react";
import axios from 'axios';
import base from "../../axios/axios";
import qs from 'qs'
import './style.css'
import {
    Button, Input, Modal, Form, message
} from 'antd';


class CreateCustomer extends Component() {

    constructor(props) {
        super(props)
        this.state = {
            token: window.localStorage.getItem('token'),
            visible: false,

            currentPage: 1,
            limit: 10,
        }
        this.setVisible = this.setVisible.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.submit = this.submit.bind(this)
        this.createCustomer = this.createCustomer.bind(this)
    }



    createCustomer() {
        const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
        var reg = /\s/;
        if (
            data.nextTalkTime == undefined || data.clientLevel == undefined
            || data.clientName == undefined || data.clientType == undefined || data.clueFrom == undefined || data.company == undefined
            || reg.exec(data.nextTalkTime) != null || reg.exec(data.clientLevel) != null
            || reg.exec(data.clientName) != null || reg.exec(data.clientType) != null || reg.exec(data.clueFrom) != null || reg.exec(data.company) != null

        ) {
            message.error('请填写必填选项并不要输入空格');
        } else {
            axios({
                method: "post",
                url: `${base.url}/client/create?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit,
                params: {
                    token: this.state.token,
                },
                data: qs.stringify({
                    certificate: data.certificate,
                    certificateId: data.certificateId,
                    clientFrom: data.clientFrom,
                    clientLevel: data.clientName,
                    content: data.content,
                    dingtalk: data.dingtalk,
                    nextTalkTime: data.nextTalkTime,
                    phone: data.phone,
                })
            }).then((res) => {
                console.log(res);
                if (res.data.code === "ERROR") {
                    message.error('请重试');
                    // this.onCancel()
                } else {
                    message.success(res.data.message);
                    // this.onCancel()

                }
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    setVisible() {
        this.setState({
            visible: !this.state.visible
        })
        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                certificate: this.state.record.certificate,
                certificateId: this.state.record.certificateId,
                clientFrom: this.state.record.clientFrom,
                clueFrom: this.state.record.clueFrom,
                clientLevel: this.state.record.clientLevel,
                clientName: this.state.record.clientName,
                content: this.state.record.content,
                detailAddress: this.state.record.detailAddress,
                dingtalk: this.state.record.dingtalk,
                employeeCreateId: this.state.record.employeeCreateId,
                employeeResponsibleId: this.state.record.employeeResponsibleId,
                nextTalkTime: this.state.record.nextTalkTime,
                nextTalkTime: this.state.record.nextTalkTime,
                phone: this.state.record.phone,
                // record: this.state.record.record,
            })
        }, 100);
    };

    onCancel() {
        this.setState({
            visible: false,
        })
        setTimeout(() => {
            this.formRef.current.resetFields();
        }, 100);
    }


    render() {
        return (
            <div>
                <Button type='primary'
                    onClick={this.setVisible}
                >新建客户</Button>
                <Modal
                    visible={this.state.visible}
                    title='新建客户'
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.onCancel}
                    onOk={this.submit}

                >

                    <Form
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        ref={this.formRef}
                    >
                        <div>
                            <Form.Item
                                name="certificate "
                                label="客户证件类型"
                                rules={[
                                    {
                                        required: true,
                                        message: '客户证件类型不能为空',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="certificateId"
                                label="客户证件号"
                            >
                                <Input></Input>
                            </Form.Item>
                        </div>


                        <div>
                            <Form.Item
                                name="clientFrom"
                                label="客户来源"
                                rules={[
                                    {
                                        required: true,
                                        message: '客户来源不能为空',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="clientLevel"
                                label="客户级别"
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div>
                            <Form.Item
                                name="clientName"
                                label="客户名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '客户名称不能为空',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="content"
                                label="备注"
                            >
                                <Input />
                            </Form.Item>

                        </div>


                        <div>
                            <Form.Item
                                name="detailAddress"
                                label="详细地址"

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="dingtalk"
                                label="钉钉"
                            >
                                <Input />
                            </Form.Item>


                        </div>
                        <div>
                            <Form.Item
                                name="content"
                                label="备注"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="nextTalkTime"
                                label="下次联系时间"
                                rules={[
                                    {
                                        required: true,
                                        message: '下次联系时间不能为空'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                        </div>
                        <div>
                            <Form.Item
                                name="nextTalkTime"
                                label="下次联系时间"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="客户手机号"
                                rules={[
                                    {
                                        required: true,
                                        message: '客户手机号不能为空'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                    </Form>
                </Modal>
            </div>
        )
    }

}

export default CreateCustomer;