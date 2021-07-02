import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Select, Space, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import LinkBusiness from "../task/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import base from "../../../axios/axios";

function Edit(props) {
    console.log(props)
    let token = window.localStorage.getItem('token')
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    const {SHOW_PARENT} = TreeSelect;
    useEffect(() => {
        all()
    }, [])
    //所有员工
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token
        }).then((response) => {
            // console.log(response)
            setAllStaff(response.data.data)
        }).catch((error) => {
            alert(error)
        })
    }
    //关联业务模块
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //新建审批
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const {Option} = Select;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const [form] = Form.useForm();
    //请假类型
    const onGenderChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onFinish = (values) => {
        console.log(values);
    };
    //审批内容
    let approvalContent = (value) => {
        console.log(value)
    }
    //选择时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    let onOkTime = (value) => {
        console.log('onOk: ', value);
    }
    //选择员工
    const treeData = [];
    for (let j = 0; j < allStaff.length; j++) {
        treeData.push({
            title: allStaff[j].username,
            value: allStaff[j].id,
        })
    }
    let onChangeStaff = value => {
        console.log('onChange ', value);
        selectStaff = value
        setSelectStaff(selectStaff)
    };
    const tProps = {
        allowClear: true,
        treeData,
        value: selectStaff,
        onChange: onChangeStaff,
        treeCheckable: true,
        multiple: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择员工',
        style: {
            width: '100%',
        },
    };
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Form {...layout}
                      layout="vertical"
                      form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item

                        name="type"
                        label="请假类型"
                        rules={[
                            {
                                required: true,
                                message: '请选择请假类型'
                            },
                        ]}
                    >
                        <Select
                            style={{width: 300}}
                            defaultValue={props.edit.name}
                            placeholder="请选择请假类型"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="1">请假审批</Option>
                            <Option value="2">差旅报销</Option>
                            <Option value="3">借款申请</Option>
                            <Option value="4">出差申请</Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Form {...layout}
                      layout="vertical"
                      form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item

                        name="content"
                        label="审批内容"
                        rules={[
                            {
                                required: true,
                                message: '请填写内容'
                            },
                        ]}
                    >
                        <Input  defaultValue={props.edit.content} style={{width: 300}} onChange={(e) => {
                            approvalContent(e.target.value)
                        }}/>
                    </Form.Item>
                </Form>
            </div>
            <div style={{fontSize: '14px', margin: '10px 0'}}>
                <span style={{
                fontSize: '18px',
                color: 'red',
                verticalAlign: 'middle',
                marginRight: '4px'
                }}>*</span>
                选择时间：
            </div>
            <Space direction="vertical" size={12}>
                <ConfigProvider locale={zhCN}>
                    <RangePicker
                        style={{width: 755}}
                        showTime={{format: 'HH:mm'}}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChangeTime}
                        onOk={onOkTime}
                    />
                </ConfigProvider>
            </Space>
            <div style={{margin: '20px 0 0 0', color: '#3E84E9'}}>
                <Button type="primary" onClick={showBusinessModal}
                        style={{cursor: 'pointer'}}>
                    关联业务
                </Button>
                <Modal title="关联业务模块"
                       width={800}
                       bordered={true}
                       bodyStyle={{padding: 0}}
                       visible={isBusinessModalVisible}
                       footer={null}
                       onCancel={() => {
                           setIsBusinessModalVisible(false);
                       }}>
                    <LinkBusiness onOk={(value)=>{
                        setIsBusinessModalVisible(false);
                    }}/>

                </Modal>
            </div>
            <div style={{fontSize: '14px', margin: '10px 0'}}>
                <span style={{
                    fontSize: '18px',
                    color: 'red',
                    verticalAlign: 'middle',
                    marginRight: '4px'
                }}>*</span>审核人：
            </div>
            <TreeSelect {...tProps} style={{width: 300}}/>
        </div>
    )
}
export default Edit
