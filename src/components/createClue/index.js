import React,{useState,useEffect} from 'react'
import {Modal,Form,Input} from 'antd'
function CreateClue(props) {

    useEffect(() => {

        if (props.show) {
            setVisible(props.show)
        }

    }, [props])

    let [visible, setVisible] = useState(false)
    function submit() {

    }
    function onCancel() {
        setVisible(false)

        props.method(false)
    }


    return (
        <div>
            <Modal
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
                    // ref={this.formRef}
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
                            <Input />
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