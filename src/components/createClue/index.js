import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import GetCustomer from '../getCustomer'
function CreateClue(props) {

    let formRef = React.createRef()

    useEffect(() => {

        if (props.show) {
            setVisible(props.show)
        }

    }, [props])

    let [visible, setVisible] = useState(false)
    let [clientName, setClientName] = useState('')
    let [token, setToken] = useState(window.localStorage.getItem("token"))


    function getCustomerId(val) {
        console.log(val);
        clientName = val ? val[0].clientName : ''
        setClientName(clientName)
    }

    function createClue() {
        const data = formRef.current.getFieldsValue();  //拿到form表单的值
        console.log(data);
        var reg = /\s/;
        if (data.nextTalkTime == undefined || data.clientLevel == undefined
            || data.clientType == undefined || data.clueFrom == undefined || data.company == undefined
            || !clientName
        ) {
            message.warning('请填写必填选项');
        } else if (data.nextTalkTime.indexOf(' ') == 0 || data.clientLevel.indexOf(' ') == 0
            || data.clientType.indexOf(' ') == 0 || data.clueFrom.indexOf(' ') == 0 || data.company.indexOf(' ') == 0) {
            message.warning('请勿输入空格')
        } else {
            axios({
                method: "post",
                url: `${base.url}/clue/add`,
                params: {
                    token: token,
                },

                data: qs.stringify({
                    address: data.address,
                    clientLevel: data.clientLevel,
                    clientName: clientName,
                    clientType: data.clientType,
                    clueFrom: data.clueFrom,
                    company: data.company,
                    content: data.content,
                    currency: data.currency,
                    mobile: data.mobile,
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
                    onCancel()
                    // getClue()
                }
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    function submit() {
        createClue()

        props.method(false)
    }
    function onCancel() {
        setVisible(false)

        props.method(false)
    }




    return (
        <div>
            <Modal
                destroyOnClose={true}
                // mask={false}
                maskStyle={{ backgroundColor: "#fff" }}
                visible={visible}
                title="新建线索"
                okText="确认"
                cancelText="取消"
                // confirmLoading={true}
                onCancel={onCancel}
                onOk={submit}
                bodyStyle={{ height: '350px', overflowY: 'auto' }}

            >

                <Form
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                    ref={formRef}
                >
                    <div>
                        <Form.Item
                            name="clientName"
                            label="客户姓名"
                            rules={[
                                {
                                    required: true,
                                    message: '客户姓名不能为空',
                                },
                            ]}
                        >
                            <GetCustomer methods={(val) => { getCustomerId(val) }}  ></GetCustomer>
                        </Form.Item>
                        <Form.Item
                            name="mobile"
                            label="手机号"
                        >
                            <Input></Input>
                        </Form.Item>
                    </div>


                    <div>
                        <Form.Item
                            name="phone"
                            label="电话"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="地址"
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="clueFrom"
                            label="线索来源"
                            rules={[
                                {
                                    required: true,
                                    message: '线索来源不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="company"
                            label="公司"
                            rules={[
                                {
                                    required: true,
                                    message: '公司不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    </div>


                    <div>
                        <Form.Item
                            name="clientType"
                            label="客户类型"
                            rules={[
                                {
                                    required: true,
                                    message: '客户类型不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="clientLevel"
                            label="客户等级"
                            rules={[
                                {
                                    required: true,
                                    message: "客户等级不能为空"
                                }
                            ]}
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
                            name="currency"
                            label="货币"
                        >
                            <Input />
                        </Form.Item>
                    </div>

                </Form>
            </Modal>
        </div>
    )
}

export default CreateClue;