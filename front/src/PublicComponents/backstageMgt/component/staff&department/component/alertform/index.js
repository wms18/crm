import React, {useState} from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import SelectCascader from "./component/cascader";
const {Option, OptGroup} = Select

const CollectionCreateForm = ({visible, onCreate, onCancel}) => {
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="新建员工"
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="mobile"
                        label="手机号(登录名)"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                        ]}
                    >
                        <Input style={{width: 200}}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="登录密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input style={{width: 200}}/>
                    </Form.Item>
                </Form>
                <Form style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="name"
                        label="姓名"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名',
                            },
                        ]}
                    >
                        <Input style={{width: 200}}/>
                    </Form.Item>
                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="gender"
                        label="性別"

                    >
                        <Select style={{width: 200}} onChange={handleChange}>
                            <Option>男</Option>
                            <Option>女</Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Form style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱',
                            },
                        ]}
                    >
                        <Input style={{width: 200}}/>
                    </Form.Item>

                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="department"
                        label="部门"

                    >
                        <Select placeholder='请选择' style={{width: 200}}  onChange={handleChange}>
                            <Option>
                                总公司
                            </Option>
                            <Option>
                                直营部
                            </Option>
                            <Option>
                                业务经理
                            </Option>
                            <Option>
                                业务人员
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>

                <Form style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="post"
                        label="岗位"
                    >
                        < Input style={{width: 200}}/>
                    </Form.Item>

                    <Form.Item
                        style={{width: 200, display: 'inline-block'}}
                        name="superior"
                        label="直属上级"

                    >
                        <Select placeholder='请选择' style={{width: 200}} onChange={handleChange}>
                            <Option>
                                销售经理
                            </Option>
                            <Option>
                                南京区域经理
                            </Option>
                            <Option>
                                总公司
                            </Option>
                        </Select>
                    </Form.Item>
                </Form>

                <Form style={{display: 'flex', justifyContent: 'space-between'}}>
                    <SelectCascader></SelectCascader>
                </Form>
            </Form>
        </Modal>
);
};

const Alertform = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
};

    return (
    <div style={{display: 'inline-block'}}>
    <Button
    type="primary"
    onClick={() => {
        setVisible(true);
    }}
    >
    新建
    </Button>
    <CollectionCreateForm
    visible={visible}
    onCreate={onCreate}
    onCancel={() => {
        setVisible(false);
    }}
    />
    </div>
    );
};

export default Alertform