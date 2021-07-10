import React, { useEffect, useState } from 'react'
import { Modal, Input, Select, Form } from 'antd'
import MapControl from '../mapControl'
import GetCustomer from '../getCustomer'
const { Option } = Select
function CreateContacts(props) {

    let [visible, setVisible] = useState(false)


    useEffect(() => {

        if (props.show) {
            setVisible(props.show)
        }

    }, [props])
    function submit() {
        setVisible(false)

        props.method(false)
    }
    function onCancel() {
        setVisible(false)
        props.method(false)
    }
    function getCustomerID(val) {
        console.log(val);
    }
    function getAddr(val) {
        console.log(getAddr);
    }
    
    return (
        <div>
            <Modal
                destroyOnClose={true}
                maskStyle={{backgroundColor:'#fff'}}
                visible={visible}
                title={'新建联系人'}
                okText="确认"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                    // isCreate ?
                    //     submit()
                    //     :
                    //     editContactInfo()
                    submit()

                }}

                bodyStyle={{ height: '350px', overflowY: 'auto' }}

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
                            label="客户Id"   //客户名称
                            rules={[
                                {
                                    required: true,
                                    message: '客户姓名不能为空',
                                },
                            ]}
                        >
                            <GetCustomer methods={(val) => { getCustomerID(val) }} ></GetCustomer>

                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="备注"
                        >
                            <Input></Input>
                        </Form.Item>
                    </div>


                    <div>
                        <Form.Item
                            name="decision"
                            label="是否未关键决策人"

                        >
                            <Select style={{ width: 184 }} >
                                <Option value={true} >是</Option>
                                <Option value={false} >否</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="职位"
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="email"
                            label="邮箱"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sex"
                            label="性别"
                        >
                            <Select style={{ width: 184 }} >
                                <Option value={true}>男</Option>
                                <Option value={false}>女</Option>
                            </Select>
                        </Form.Item>

                    </div>


                    <div>
                        <Form.Item
                            name="linkmanName"
                            label="联系人姓名"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mobile"
                            label="电话号"
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
                            label="手机号"

                        >
                            <Input />
                        </Form.Item>

                    </div>
                    <div>
                        <Form.Item
                            name="detailAddress"
                            label="详细地址"
                        >
                            {/* <Input /> */}
                            <MapControl method={(val) => { getAddr(val) }} ></MapControl>
                        </Form.Item>

                    </div>

                </Form>
            </Modal>
        </div>
    )
}
export default CreateContacts;