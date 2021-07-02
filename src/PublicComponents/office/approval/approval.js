import './approval.css'
import {Button, Select, DatePicker, Space, ConfigProvider, Popover, Drawer, Modal, Form, Input, TreeSelect} from 'antd';
import React, {useState, useEffect} from "react";
import zhCN from "antd/lib/locale/zh_CN";
import axios from "axios";
import base from "../../../axios/axios";
import LinkBusiness from "../task/link";
import Edit from "./edit";

function Approval() {
    let token = window.localStorage.getItem('token')
    let arr = ['我发起的', '我审批的']
    let [approveIndex, setApproveIndex] = useState(0)    //arr
    let [time, setTime] = useState([])   //时间
    let [status, setStatus] = useState(0)    //审批状态
    let [type, setType] = useState(0)    //审批类型
    let [approvalList, setApprovalList] = useState([])   //列表
    let results = ["未审核", "通过", "拒绝", '已撤回']
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [drawerInformation, setDrawerInformation] = useState('') //抽屉信息
    const {SHOW_PARENT} = TreeSelect;

    useEffect(() => {
        myApproval()
        list()
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
    //抽屉
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    //我发起的
    let list = () => {
        axios({
            method: 'get',
            url: base.url + '/approve/getApprove?token=' + token,
            params: {
                approveType: type,
                result: status,
                beginTime: time[0] === undefined ? '' : time[0],
                endTime: time[1] === undefined ? '' : time[1],
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                approvalList = response.data.data
                setApprovalList(approvalList)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //我审批的
    let myApproval = () => {
        axios({
            method: 'get',
            url: base.url + '/approve/getMyCheckApprove?token=' + token,
            params: {
                approveType: type,
                result: status,
                beginTime: time[0] === undefined ? '' : time[0],
                endTime: time[1] === undefined ? '' : time[1],
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                console.log(response.data.message)
            } else {
                approvalList = response.data.data
                setApprovalList(approvalList)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //日期选择框
    let onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        time = dateString
        setTime(time)
        list()
        myApproval()
    }

    let onOk = (value) => {
        console.log('onOk: ', value);
    }
    //审批状态
    let handleChange = (value) => {
        console.log(`selected ${value}`);
        status = value
        setStatus(status)
        list()
        myApproval()
    }
    //审批类型
    let handleType = (value) => {
        console.log(`selected ${value}`);
        type = value
        setType(type)
        list()
        myApproval()
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
    //关联业务模块
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //点击抽屉
    let handleDrawer = (id) => {
        axios({
            method: 'get',
            url: base.url + '/approve/getApproveById',
            params: {
                token: token,
                approveId: id
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                console.log(response.data.message)
            } else {
                drawerInformation = response.data.data
                setDrawerInformation(drawerInformation)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //撤回
    let withDrawApprove = (id) => {
        axios({
            method: 'post',
            url: base.url + '/approve/withDrawApprove?token=' + token,
            params: {
                approveId: id,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //编辑审批
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

    const showModalEdit = () => {
        setIsModalVisibleEdit(true);
    };

    const handleOkEdit = () => {
        setIsModalVisibleEdit(false);
    };

    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
    };

    return (
        <div className={'approval'}>
            <div className={'approvalTop'}>
                <div>
                    {arr.map((item, index) => {
                        return (
                            <span key={index}
                                  className={index === approveIndex ? 'approvalActive approveSp' : 'approveSp'}
                                  onClick={() => {
                                      setApproveIndex(index)
                                  }}
                            >{item}</span>
                        )
                    })}
                </div>
                <div>
                    <span>审批类型</span>
                    <Select defaultValue="全部" style={{width: 120, margin: '0 20px'}} onChange={handleType} allowClear>
                        <Option value="0">全部</Option>
                        <Option value="1">请假审批</Option>
                        <Option value="2">差旅报销</Option>
                        <Option value="3">借款申请</Option>
                        <Option value="4">出差申请</Option>
                    </Select>
                    <Button type="primary" onClick={showModal}>
                        新建审批
                    </Button>
                    <Modal title="新建审批"
                           width={800}
                           visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
                                    <Input style={{width: 300}} onChange={(e) => {
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
                            <Button type="primary" onClick={showBusinessModal} style={{cursor: 'pointer'}}>
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
                            }}>*</span>
                            审核人：
                        </div>
                        <TreeSelect {...tProps} style={{width: 300}}/>
                    </Modal>
                </div>
            </div>
            <div style={{margin: '20px 0'}}>
                <span>审核状态</span>
                <Select defaultValue="全部" style={{width: 120, margin: '0 20px'}} onChange={handleChange} allowClear>
                    <Option value="0">全部</Option>
                    <Option value="1">未审核</Option>
                    <Option value="2">通过</Option>
                    <Option value="3">拒绝</Option>
                    <Option value="4">已撤回</Option>
                </Select>
                <span style={{marginRight: '10px'}}>发起时间</span>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChange}
                            onOk={onOk}
                        />
                    </ConfigProvider>
                </Space>
            </div>
            <div className={'approveFoot'}>
                <div className={'approveFoot1'}>
                    {approvalList == null ? "" : approvalList.map((item, index) => {
                        return (
                            <div key={index} style={{margin: '0 0 20px 0', borderBottom: '1px solid #e6e6e6'}}>
                                <div className={'approveInfor'}>
                                    <div>
                                        <img className={'approveImage'}
                                             src={item.avatar}
                                             alt=""/>
                                        <div style={{display: 'inline-block', width: '200px', height: '35px'}}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '200px',
                                                height: '20px'
                                            }}>{item.employeeName}</span>
                                            <span>{item.createTime}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span>{item.name}</span>—
                                        <span>{results[item.result - 1]}</span>
                                        <Popover content={
                                            <div className={'approvalEdit'}>
                                                <div>
                                                    <p className={item.result - 1 === 1 ? 'hidden' : ''}
                                                       onClick={showModalEdit}>编辑</p>
                                                    <Modal title="编辑审批"
                                                           width={800}
                                                           visible={isModalVisibleEdit} onOk={handleOkEdit}
                                                           onCancel={handleCancelEdit}>
                                                        <Edit edit={item}/>
                                                    </Modal>
                                                </div>
                                                <p className={item.result - 1 === 1 ? 'hidden' : ''}>删除</p>
                                                <p className={item.result - 1 === 3 || 4 ? 'hidden' : ''}>撤回</p>
                                            </div>
                                        }
                                                 placement="bottom" zIndex={100} trigger="click">
                                            <span className={item.result - 1 === 2 ? 'hidden' : ''} style={{
                                                margin: '0 20px',
                                                fontSize: '18px',
                                                cursor: 'pointer'
                                            }}>···</span>
                                        </Popover>
                                    </div>
                                </div>
                                <div type="primary" onClick={showDrawer}>
                                    <div className={'approvalContent'} onClick={() => {
                                        handleDrawer(item.id)
                                    }}>{item.content}</div>
                                </div>
                                <Drawer
                                    title="请假审批"
                                    width={800}
                                    placement="right"
                                    closable={false}
                                    onClose={onClose}
                                    visible={visible}
                                >
                                    <div style={{padding: '20px'}}>
                                        <div className={'approvalDrawer'}>
                                            <div style={{width: '300px'}}>
                                                <span>请假类型：</span>
                                                <span>{results[drawerInformation.result - 1]}</span>
                                            </div>
                                            <div style={{width: '300px'}}>
                                                <span>审批内容：</span>
                                                <span>{drawerInformation.content}</span>
                                            </div>
                                        </div>
                                        <div className={'approvalDrawer'}>
                                            <div style={{width: '300px'}}>
                                                <span>开始时间：</span>
                                                <span>{drawerInformation.beginTime}</span>
                                            </div>
                                            <div style={{width: '300px'}}>
                                                <span>结束时间：</span>
                                                <span>{drawerInformation.endTime}</span>
                                            </div>
                                        </div>
                                        <div style={{margin: '20px',}}>
                                            <Button onClick={() => {
                                                withDrawApprove(drawerInformation.id)
                                            }}>撤回审批</Button>
                                            <Button style={{margin: '0 20px'}} type="primary" danger>拒绝</Button>
                                            <Button type={"primary"}>通过</Button>
                                        </div>
                                    </div>
                                </Drawer>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Approval
