import React, { Component } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Select, Input, Form ,Modal} from 'antd'

const { Option } = Select

function PopCreateProduct(props) {


    let [visible, setVisible] = useState(false)


    useEffect(() => {
        if (props.show) {
            setVisible(props.show)
        }else{
            setVisible(props.show)
        }
    }, [props])

    function onCancel() {
        props.method(false)
    }
    function submit() {
        props.method(false)
    }
    // function onCancel() {

    // }
    // function onCancel() {

    // }
    // function onCancel() {

    // }
    // function onCancel() {

    // }
    // function onCancel() {

    // }
    // function onCancel() {

    // }
    // function onCancel() {

    // }

    return (
        <Modal
            maskStyle={{ backgroundColor: "#fff" }}
            visible={visible}
            title={'新建产品'}
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={submit}
            bodyStyle={{ height: 350, overflowY: 'auto' }}
        >
            <Form
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            //绑定
            // ref={formRef}
            >
                <div>
                    <Form.Item
                        name="produceName"
                        label="产品名称"
                        rules={[
                            {
                                required: true,
                                message: '产品名称不能为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ width: 200 }}
                        name="produceType"
                        label="产品类别"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input  ></Input>
                    </Form.Item>
                </div>


                <div>
                    <Form.Item
                        name="produceCoding"
                        label="产品编码"
                        rules={[
                            {
                                required: true,
                                message: '产品编码不能为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="putaway"
                        label="是否上架"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Select style={{ width: 200 }} >
                            <Option value='上架'>上架</Option>
                            <Option value='下架'>下架</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        style={{ width: 184 }}
                        name="specification"
                        label="产品规格"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Select  >
                            <Option value='大'>大</Option>
                            <Option value='中'>中</Option>
                            <Option value='小'>小</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ width: 200 }}
                        name="price"
                        label="价格"
                    >
                        <Input value='0' />
                    </Form.Item>
                </div>


                <div>
                    <Form.Item
                        name="number"
                        label="库存数量"
                        rules={[
                            {
                                required: true,
                                message: '库存数量不能为空',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ width: 200 }}
                        name="produceIntroduce"
                        label="产品介绍"
                    >
                        <Input />
                    </Form.Item>

                </div>

            </Form>
        </Modal>
    )
}

export default PopCreateProduct;