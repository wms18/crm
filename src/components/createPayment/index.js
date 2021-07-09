import React, { useState, useEffect } from 'react'
import GetEmployee from '../getEmployee'
import GetCustomer from '../getCustomer'
import GetContractTable from '../getContractTable'
import { Modal, Select, Input, DatePicker, Form, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
const { TextArea } = Input


function CreatePayment(props) {

    let [visible, setVisible] = useState(false)

    useEffect(() => {
        if (props.show) {
            setVisible(props.show)

        }
    })

    function onCancel() {
        setVisible(false)
        props.method(false)
    }
    function submit() {
        setVisible(false)
        props.method(false)

    }
    function getCustomerID() {

    }
    function getContractID(val) {
        console.log(val);
    }
    function getEmployee(val) {
        console.log(val);
    }
    function getContractID(val) {
        console.log(val);
    }
    function onChangeDate(data, dateString) {
        console.log(dateString);

    }

    return (
        <div>
            <Modal
                maskStyle={{ backgroundColor: "#fff" }}
                bodyStyle={{ height: '380px', overflowY: 'auto' }}
                visible={visible}
                title={'新建回款'}
                okText="提交审核"
                cancelText="取消"
                onCancel={onCancel}
                onOk={submit}

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
                            name="returnNumber"
                            label="回款编号"
                            rules={[
                                {
                                    required: 'true',
                                    message: '回款编号不能为空'
                                }
                            ]}
                        >
                            <Input></Input>


                            {/* 客户名称 */}
                        </Form.Item>
                        <Form.Item
                            name="clientId"
                            label="客户名称"
                            rules={[
                                {
                                    required: 'true',
                                    message: '客户名称不能为空'
                                }
                            ]}
                        >
                            <GetCustomer methods={(val) => { getCustomerID(val) }}   ></GetCustomer>
                        </Form.Item>

                    </div>


                    <div>

                        {/* 合同编号 */}
                        <GetContractTable methods={(val) => { getContractID(val) }}  ></GetContractTable>

                        <Form.Item
                            name="receiveTime"
                            label="回款日期"
                            rules={[
                                {
                                    required: true,
                                    message: '回款日期不能为空'
                                }
                            ]}
                        >
                            <ConfigProvider locale={zhCN}>
                                <DatePicker style={{ width: 184 }} onChange={onChangeDate} />
                            </ConfigProvider>

                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="receiveWay"
                            label="回款方式"
                            rules={[
                                {
                                    required: 'true',
                                    message: '回款方式不能为空'
                                }
                            ]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="receiveMoney"
                            label="回款金额"

                            rules={[
                                {
                                    required: true,
                                    message: "回款金额不能为空"
                                }
                            ]}
                        >
                            <Input type='number' />
                        </Form.Item>

                    </div>


                    <div>
                        <Form.Item
                            name="periods"
                            label="期数"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="备注"
                        >
                            <TextArea style={{ width: 184, height: 60 }} ></TextArea>
                        </Form.Item>


                    </div>

                    <div>

                        <Form.Item
                            name="employeeCheckId"
                            label="审核人"
                            rules={[
                                {
                                    required: true,
                                    message: '审核人不能为空'
                                }
                            ]}
                        >
                            <GetEmployee contentResponsible={(val) => { getEmployee(val) }}   ></GetEmployee>
                        </Form.Item>
                    </div>



                </Form>
            </Modal>
        </div>
    )
}
export default CreatePayment