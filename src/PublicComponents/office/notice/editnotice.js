import {ConfigProvider, DatePicker, Form, Input, Space, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React, {useState} from "react";

function EditNotice() {
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
    return(
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
                <div>
                    {/*通知部门*/}
                    <div style={{margin:'6px 0 6px 0'}}>
                        <span >通知部门</span>
                    </div>
                    <TreeSelect {...tProps} style={{width: '253px'}}/>
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
    )
}
export default EditNotice
