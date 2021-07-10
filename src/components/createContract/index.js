import React, { Component } from 'react'
import { Drawer, Table, Form, Modal, Input, Button } from 'antd'
import GetProduct from '../../pages/bizOpp/getProduct'
import AddedProduct from '../addedProduct'
import GetCustomer from '../getCustomer'
import GetBizOppTable from '../getBizOppTable'
import GetEmployee from '../getEmployee'
import { useState } from 'react'
import { useEffect } from 'react'
import { subscribe } from 'pubsub-js'



function CreateContract(props) {


    useEffect(() => {

        if (props.show) {
            setVisible(props.show)
        }


    }, [props])


    let [getLinkBizOppCustomerId, setGetLinkBizOppCustomerId] = useState('')
    let [visible, setVisible] = useState(false)
    let [linkBizOpp, setLinkBizOpp] = useState('')










    function getCustomerID(val) {
        console.log(val);


    }

    function onCancel() {
        setVisible(false)
        props.method(false)
    }

    function getBizOppID(val) {
        console.log(val);

    }

    function getEmployeeSignId(val) {
        console.log('签字人id', val);
    }

    function getEemployeeCheckId(val) {
        console.log('审核人id', val);
    }

    function getProductId(val) {
        console.log(val);
    }
    function submit() {
        
    }

    return (
        <div>
            <Modal
                // bodyStyle={{ width: '100vw',height:'100vh' }}
                maskStyle={{backgroundColor:'#fff'}}
                bodyStyle={{height:350,overflowY:"auto"}}
                visible={visible}
                title={'新建合同'}
                onCancel={onCancel}
                onOk={submit}

            >
                        <Form
                            layout="vertical"
                            name="form_in_modal"
                            initialValues={{
                                modifier: 'public',
                            }}
                        // ref={this.formRef}
                        >
                            <div>
                                <Form.Item
                                    name="contractCoding"
                                    label="合同编号"
                                    rules={[
                                        {
                                            required: true,
                                            message: '合同编号不能为空'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="contractName"
                                    label="合同名称"
                                    rules={[
                                        {
                                            required: true,
                                            message: '合同名称不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>


                            <div>
                                <Form.Item
                                    name="cilentId"
                                    label="客户名称"
                                >
                                    <GetCustomer methods={(val) => {
                                        this.getCustomerID(val)

                                    }}  ></GetCustomer>
                                </Form.Item>
                                <GetBizOppTable
                                    id={getLinkBizOppCustomerId}
                                    linkBizOpp={linkBizOpp} methods={(val) => { getBizOppID(val) }}  ></GetBizOppTable>
                            </div>

                            <div>
                                <Form.Item
                                    name="orderTime"
                                    label="下单时间"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="contractPrice"
                                    label="合同金额"
                                    rules={[
                                        {
                                            required: true,
                                            message: '合同金额不能为空'
                                        }
                                    ]}
                                >
                                    <Input type='number' />
                                </Form.Item>

                            </div>


                            <div>
                                <Form.Item
                                    name="contractBeginTime"
                                    label="合同开始时间"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="contractEndTime"
                                    label="合同到期时间"
                                >
                                    <Input />
                                </Form.Item>


                            </div>
                            <div>
                                <Form.Item
                                    name="employeeSignId"
                                    label="签字人"

                                >
                                    {/* 签字人对应子组件对应的负责人方法 */}
                                    <GetEmployee contentResponsible={(val) => { getEmployeeSignId(val) }}  ></GetEmployee>

                                </Form.Item>
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
                                    {/* 审核人 对应的子组件接受的创建人*/}
                                    <GetEmployee contentCreate={(val) => { getEemployeeCheckId(val) }} ></GetEmployee>
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
                                    name="currency"
                                    label="货币"
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div>
                                {/* <Form.Item
                    name="produceIds"
                    label="产品id"
                  >
                    <Input />
                  </Form.Item> */}
                                <AddedProduct methods={(val) => {
                                    getProductId(val)
                                }} ></AddedProduct>
                            </div>

                        </Form>
            </Modal>
        </div>
    )
}



export default CreateContract;