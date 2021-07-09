import React, { useState, useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import MapControl from '../mapControl'
import GetEmployee from '../getEmployee'
function CreateCustomer(props) {

    let [visible, setVisible] = useState(false)


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
        props.method(false)
    }

    //创建人
    function giveMethCreate(val) {
        console.log(val);
    }
    //负责人
    function giveMethResponsible(val) {
        console.log(val);
    }

    function getAddr(val) {
        console.log(val);
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
                // ref={formRef}
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
                            name="content"
                            label="备注"
                        >
                            <Input />
                        </Form.Item>


                    </div>
                    <div>

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