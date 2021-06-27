import './notice.css'
import {Avatar, Button, ConfigProvider, DatePicker, Form, Image, Input, Modal, Select, Space, TreeSelect} from "antd";
import React, { useState } from 'react';
import avatar from "../work/middle/3.jpg";
import {ScheduleOutlined} from "@ant-design/icons";
import Newnotice from "./newnotice";
import zhCN from "antd/lib/locale/zh_CN";
function Notice(){
    //编辑公告
    //公告正文
    const {TextArea} = Input;
    //通知部门
    const {SHOW_PARENT} = TreeSelect;
    const treeData = [
        {
            title: 'Node1',
            value: '0',
            key: '0',
        },
        {
            title: 'Node2',
            value: '1',
            key: '1',
        },
    ];
    let [man, setMan] = useState()//通知部门
    let onChange1 = value => {
        console.log('onChange ', value);
        setMan(value)
    };
    const tProps = {
        treeData,
        value: man,
        bordered: true,
        onChange: onChange1,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择',
        style: {
            width: '100%',
        },
    };
    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    let onOk = (value) => {
        console.log('onOk: ', value);
    }
    //输入框
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //编辑主题
    const [isModalVisibleTheme, setIsModalVisibleTheme] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const showModalTheme = () => {
        setIsModalVisibleTheme(true);
    };
    //编辑
    const handleOkTheme = () => {
        setIsModalVisibleTheme(false);
        setIsModalVisibleEdit(true)
    };
    const handleOkEdit = () => {
        setIsModalVisibleEdit(false);
    };
    const handleCancelTheme = () => {
        setIsModalVisibleTheme(false);
    };
    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
        setIsModalVisibleTheme(true);
    };
    //公告
    const { Option } = Select;
    let handleChange=(value)=> {
        console.log(`selected ${value}`);
    }
    //新建公告
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
    return(
        <div style={{padding:'20px',width: '800px'}}>
            <div className={'notice'}>
                <div className={'noticeTop'}>
                    <span className={'noticeSp'}>公告</span>
                    <span>
                    <Button type="primary" onClick={showModal}>
                        新建公告
                    </Button>
                    <Modal title="新建公告"
                           visible={isModalVisible}
                           cancelText={'取消'}
                           okText={'确定'}
                           onOk={handleOk}
                           width={700}
                           onCancel={handleCancel}>
                        <Newnotice></Newnotice>
                    </Modal>
                </span>
                </div>
                <div style={{margin:'20px'}}>
                    <span>公告状态：</span>
                    <Select defaultValue="公示中" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="公示中">公示中</Option>
                        <Option value="已结束">已结束</Option>
                    </Select>
                </div>
                <div className={'middle_one1'}>
                    <div className={'middle_two'}>
                        <div className={'message'}>
                            <div className={'middle_mes'}>
                                <div>
                                    <div className={'avatar'}>
                                        <Avatar
                                            src={<Image src={avatar}/>}
                                        />
                                    </div>
                                    <div className={'one'}>
                                        <div>
                                            <span>一个好人</span>
                                        </div>
                                        <span className={'one_time'}>时间</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin:'10px 0 10px 50px',cursor:'pointer'}}>
                                <div type="primary" onClick={showModalTheme}>
                                    456
                                </div>
                                <Modal title="公告详情"
                                       visible={isModalVisibleTheme}
                                       onOk={handleOkTheme}
                                       width={700}
                                       cancelText={'删除'}
                                       okText={'编辑'}
                                       onCancel={handleCancelTheme}>
                                    <div>
                                        <div className={'noticeTheme'}>456</div>
                                    </div>

                                    <p style={{height:'200px'}}>详情</p>
                                </Modal>
                                <Modal title="编辑公告"
                                       visible={isModalVisibleEdit}
                                       onOk={handleOkEdit}
                                       width={700}
                                       cancelText={'取消'}
                                       okText={'提交'}
                                       onCancel={handleCancelEdit}>
                                    <div >
                                        {/*输入内容*/}
                                        <div className={'newtask'}>
                                            <div>
                                                <Form
                                                    {...layout}
                                                    layout="vertical"
                                                    name="basic"
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}
                                                >
                                                    <Form.Item
                                                        label="公告主题"
                                                        name="username"
                                                        style={{width:'350px'}}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '公告主题不能为空',
                                                            },
                                                        ]}
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </div>
                                        {/*时间*/}
                                        <div style={{margin: '20px 0 5px 0'}}>
                                            <span>*开始时间</span>
                                            <span style={{float:'right'}}>*结束时间</span>
                                        </div>
                                        <Space direction="vertical" size={12}>
                                            <ConfigProvider locale={zhCN}>
                                                <RangePicker
                                                    bordered={false}
                                                    showTime={{format: 'HH:mm'}}
                                                    format="YYYY-MM-DD HH:mm"
                                                    onChange={onChangeTime}
                                                    onOk={onOk}
                                                    style={{width: '183%',padding:'5px 0 10px 0'}}
                                                />
                                            </ConfigProvider>
                                        </Space>
                                        <div style={{margin: '20px 0'}}>
                                            <span>公告正文</span>
                                        </div>
                                        <TextArea rows={4} placeholder={'请输入内容'}/>
                                    </div>
                                </Modal>
                            </div>
                            <div className={'middle_content'}>123</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Notice
