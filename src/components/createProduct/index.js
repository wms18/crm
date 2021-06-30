import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios';



class CreateProduct extends Component {

    state = {
        visible: false,

    }

    submit() {
        this.createProduct()
    }


    onCancel() {
        this.setState({
            visible: false,
        })
        setTimeout(() => {
            this.formRef.current.resetFields();
        }, 100);
    }

    createProduct() {
        const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
        var reg = /\s/;
        // reg.exec(text)==null
        console.log(data);
        if (
            0 < 1
            // data.number == undefined || data.produceCoding == undefined
            // || data.putaway == undefined || data.specification == undefined || data.produceType == undefined || data.produceName == undefined
            // || reg.exec(data.number) != null || reg.exec(data.produceCoding) != null || reg.exec(data.putaway) != null || reg.exec(data.specification) != null
            // || reg.exec(data.produceType) != null || reg.exec(data.produceName) != null

        ) {
            message.error('请填写必填选项并不要输入空格');
        } else {
            axios({
                method: "post",
                url: `${base.url}/produce/create`,
                params: {
                    token: this.state.token,
                },
                // .replace(/\s+/g,'')
                data: qs.stringify({
                    number: data.number,
                    price: data.price,
                    produceCoding: data.produceCoding,
                    produceIntroduce: data.produceIntroduce,
                    produceName: data.produceName,
                    produceType: data.produceType,
                    putaway: data.putaway,
                    specification: data.specification,
                })
            }).then((res) => {
                console.log(res);
                if (res.data.code === "ERROR") {
                    message.error('请重试');
                    this.onCancel()
                } else {
                    message.success(res.data.message);
                    this.onCancel()

                    // this.getProduct()
                }
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    render() {
        return (
            <div>

                <Button type='primary'
                    size={'small'}
                    onClick={this.setVisible}
                >新建产品</Button>
                <Modal
                    visible={this.state.visible}
                    title={'新建产品'}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.onCancel}
                    onOk={this.submit}
                    bodyStyle={{ height: 350, overflowY: 'auto' }}
                >
                    <Form
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                            modifier: 'public',
                        }}
                        //绑定
                        ref={this.formRef}
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
                                <Input />
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
            </div>
        )
    }
}
