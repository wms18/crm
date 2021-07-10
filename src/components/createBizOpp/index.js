import React, { useEffect, useState } from 'react'
import AddedProduct from '../addedProduct'
import GetCustomer from '../getCustomer'
import {Modal,Input,Select,DatePicker,Form} from 'antd'
const {Option} =Select
function CreateBizOpp(props) {

    let [visible,setVisible]=useState(false)


    useEffect(()=>{
        if(props.show){
            setVisible(props.show)
        }
    },[props])
    function onCancel() {
        setVisible(false)
        props.method(false)
    }
    function submit() {
        props.method(false)
        
    }
    function getCustomerId(val) {
        console.log(val);
        
    }
    function onChangeDate(value,dateString) {
            console.log(dateString);
    }
    function getProductId(val) {
        console.log(val);
    }
   

    return (
        <div>
            <Modal

                // style={{ position: "relative" }}
                bodyStyle={{ height: '380px', overflowY: 'auto' }}
                visible={visible}
                maskStyle={{backgroundColor:'#fff'}}
                title={'新建商机'}
                okText="确认"
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
                            name="clientId"
                            label="客户名称"   //客户名称
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
                            name="commercialPrice"
                            label="商机金额"
                        >
                            <Input></Input>
                        </Form.Item>
                    </div>


                    <div>
                        <Form.Item
                            name="commercialStage"
                            label="商机阶段"
                            rules={[
                                {
                                    required: true,
                                    message: '商机阶段不能为空'
                                }
                            ]}
                        >
                            {/* <Input /> */}
                            <Select style={{ width: 184 }} showArrow={true}>
                                <Option value='赢单'>赢单</Option>
                                <Option value='输单'>输单</Option>
                                <Option value='无效'>无效</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="commercialStatusGroup"
                            label="商机状态组"

                        >
                            <Select showArrow={true} style={{ width: 184 }} >
                                <Option value='服务产品线'>服务产品线</Option>
                                <Option value='数据监测'>数据监测</Option>
                                <Option value='服务产品线'>服务产品线</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="name"
                            label="商机名称"
                            rules={[
                                {
                                    require: true,
                                    message: '商机名称不能为空'
                                }
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
                            name="submissionTime"
                            label="预计成交时间"

                        >
                            <DatePicker onChange={onChangeDate} />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="手机号"

                        >
                            <Input />
                        </Form.Item>

                    </div>
                    <div>
                        <Form.Item
                            name="totalPrice"
                            label="预计总金额"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="discount"
                            label="折扣"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <AddedProduct methods={(val) => { getProductId(val) }} ></AddedProduct>
                    </div>


                </Form>
            </Modal>
        </div>
    )
}
export default CreateBizOpp;