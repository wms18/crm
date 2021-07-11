import React, { useState, useEffect } from 'react'
import MapControl from '../mapControl'
import GetEmployee from '../getEmployee'
import { Modal, Form, Input, message } from 'antd'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'

function CreateCustomer(props) {


    let formRef = React.createRef()

    let [visible, setVisible] = useState(false)
    let [clientName, setClientName] = useState('')
    let [token, setToken] = useState(window.localStorage.getItem("token"))
    let [employeeResponsibleId, setEmployeeResponsibleId] = useState()
    let [employeeCreateId, setEmployeeCreateId] = useState()
    let [CsrAddr, setCsrAddr] = useState()


    useEffect(() => {
        if (props.show) {
            setVisible(props.show)
        }
    }, [props])


    function onCancel() {
        setVisible(false)
        props.method(false)
    }

    function submit() {

        createCustomer()

        props.method(false)
    }




    //创建人
    function giveMethCreate(val) {
        employeeCreateId = val
        setEmployeeCreateId(employeeCreateId)
    }



    //负责人
    function giveMethResponsible(val) {
        employeeResponsibleId = val
        setEmployeeResponsibleId(employeeResponsibleId)
    }



    function getAddr(val) {
        CsrAddr = val
        setCsrAddr(CsrAddr)
    }



    function createCustomer() {
        const data = formRef.current.getFieldsValue();  //拿到form表单的值
        // var reg = /\s/;
        if (
            // 0 > 1
            data.certificate == undefined || data.clientFrom == undefined
            || data.clientLevel == undefined || data.clientName == undefined || data.phone == undefined
        ) {
            message.error('请填写必填选项');
        } else if (
            data.certificate.indexOf(' ') == 0 || data.clientFrom.indexOf(' ') == 0
            || data.clientLevel.indexOf(' ') == 0 || data.clientName.indexOf(' ') == 0
            || data.phone.indexOf(' ') == 0
        ) {
            message.error('请不要包含空格');
        } else {
            axios({
                method: "post",
                url: `${base.url}/client/create?`,
                params: {
                    token: token,
                },
                // .replace(/\s+/g,'')
                data: qs.stringify({
                    certificate: data.certificate,
                    certificateId: data.certificateId,
                    clientFrom: data.clientFrom,
                    clientName: data.clientName,
                    clientLevel: data.clientLevel,
                    content: data.content,
                    dingtalk: data.dingtalk,
                    nextTalkTime: data.nextTalkTime,
                    phone: data.phone,
                    employeeCreateId: employeeCreateId,
                    employeeResponsibleId: employeeResponsibleId,
                    detailAddress: CsrAddr


                })
            }).then((res) => {
                console.log(res);
                if (res.data.code === "ERROR") {
                    message.error('请重试');
                    // this.onCancel()
                } else {
                    message.success(res.data.message);
                    onCancel()

                }
            }).catch((error) => {
                console.log(error);
            })
        }

    }


    return (
        <div>
            <Modal
                destroyOnClose={true}
                visible={visible}
                title={'新建客户'}
                okText="确认"
                cancelText="取消"
                onCancel={onCancel}
                onOk={submit}
                bodyStyle={{ height: 380, overflowY: "auto" }}

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
                            name="certificate"
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
                            name="employeeCreateId"
                            label="创建人"

                        >
                            <GetEmployee
                                // name={record.employeeCreateName}
                                contentCreate={(val) => { giveMethCreate(val) }} ></GetEmployee>
                        </Form.Item>
                        <Form.Item
                            name="employeeResponsibleId"
                            label="负责人"
                        >
                            <GetEmployee
                                contentResponsible={(val) => { giveMethResponsible(val) }} >
                            </GetEmployee>
                        </Form.Item>

                    </div>


                    <div>
                        {/* <Form.Item
                    name="detailAddress"
                    label="详细地址"

                  >
                    <Input />
                  </Form.Item> */}
                        <Form.Item
                            name="dingtalk"
                            label="钉钉"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="nextTalkTime"
                            label="下次联系时间"
                        >
                            <Input />
                        </Form.Item>

                    </div>
                    <div>

                        <Form.Item
                            name="address"
                            label="详细地址"

                        >

                            <MapControl method={(val) => { getAddr(val) }}  ></MapControl>
                            {/* <GdMap></GdMap> */}
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

export default CreateCustomer;