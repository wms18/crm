import './notice.css'
import {Avatar, Button, ConfigProvider, DatePicker, Form, Image, Input, Modal, Select, Space, TreeSelect} from "antd";
import React, {useState, useEffect} from 'react';
import avatar from "../work/middle/3.jpg";
import {ScheduleOutlined} from "@ant-design/icons";
import Newnotice from "./newnotice";
import zhCN from "antd/lib/locale/zh_CN";
import axios from "axios";
import base from "../../../axios/axios";
import moment from 'moment';

function Notice() {
    let newContent=''
    let time=[]
    let notice=''
    let messages={
        newContent:newContent,
        time:time,
        notice:notice
    }
    const dateFormat = 'YYYY-MM-DD';
    let [mesObj,setMesObj] = useState(messages)
    let [end, setEnd] = useState(1)
    let token = window.localStorage.getItem('token')
    let [allList, setAllList] = useState([])    //公告列表
    let [noticeTheme, setNoticeTheme] = useState('') //公告主题
    let [noticeTime, setNoticeTime] = useState([])   //公告时间
    let [content, setContent] = useState('')  //公告内容
    let [theme, setTheme] = useState('') //公告详情
    useEffect(() => {
        all()
    }, [])
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/notice/getList?token=' + token,
            params: {
                status: end
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                allList = response.data.data.noticeList
                setAllList(allList)
            }
        }).catch((error) => {
            alert(error)
        })
    }
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
        noticeTime = dateString
        setNoticeTime(noticeTime)
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
    const showModalTheme = (item) => {
        setIsModalVisibleTheme(true);
        console.log(item)
        theme = item
        setTheme(theme)
    };
    //编辑
    const handleOkTheme = () => {
        setIsModalVisibleTheme(false);
        setIsModalVisibleEdit(true);

    };
    const handleOkEdit = (id) => {
        if (noticeTheme === '' || content === ''||noticeTime===''){
            alert('请重新输入')
        }else {
        setIsModalVisibleEdit(false);
        axios({
            method: 'post',
            url: base.url + '/notice/update',
            params: {
                token: token,
                beginTime: noticeTime[0],
                endTime: noticeTime[1],
                content: content,
                noticeId: id,
                title: noticeTheme === '' ? theme.title : noticeTheme
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                all()
                alert('编辑成功')
            }
        }).catch((error) => {
            alert(error)
        })
        }
    };
    //删除
    let deleteNotice = (id) => {
        if (window.confirm('确认删除吗？')) {
            axios({
                method: 'delete',
                url: base.url + '/notice/delete',
                params: {
                    token: token,
                    noticeId: id
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    setIsModalVisibleTheme(false);
                    all()
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    const handleCancelTheme = () => {
        setIsModalVisibleTheme(false);

    };
    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
        setIsModalVisibleTheme(true);

    };
    //公告
    const {Option} = Select;
    let handleChange = (value) => {
        console.log(`selected ${value}`);
        if (value === '已结束') {
            end = 0
            setEnd(end)
            all()
        } else {
            end = 1
            setEnd(end)
            all()
        }
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
    //编辑主题
    let changeTheme = (value) => {
        console.log(value)
        noticeTheme = value
        setNoticeTheme(noticeTheme)
    }
    //编辑公告内容
    let noticeContent = (value) => {
        content = value
        setContent(value)
    }
    //新建公告
    let handleNotice = () =>{
        axios({
            method:'post',
            url:base.url+'/notice/create',
            params:{
                token:token,
                beginTime: mesObj.time[0],
                endTime: mesObj.time[1],
                content:mesObj.notice,
                title:mesObj.newContent
            }
        }).then((response)=>{
            console.log(response)
            if (response.data.code === 'ERROR'){
                alert(response.data.message)
            }else {
                alert('新建成功')
                all()
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    return (
        <div style={{ width: '930px'}}>
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
                           footer={null}
                           onCancel={handleCancel}
                    >
                        <Newnotice onOk={(value)=>{
                            console.log(value)
                            mesObj = value
                            setMesObj(mesObj)
                            setIsModalVisible(false);
                            handleNotice()
                        }} onCancel={()=>{
                            setIsModalVisible(false);
                        }}></Newnotice>
                    </Modal>
                </span>
                </div>
                <div style={{margin: '20px'}}>
                    <span>公告状态：</span>
                    <Select defaultValue="公示中" style={{width: 120}} onChange={handleChange}>
                        <Option value="公示中">公示中</Option>
                        <Option value="已结束">已结束</Option>
                    </Select>
                </div>
                <div className={'middle_one1'}>
                    <div className={'middle_two'}>
                        {allList.map((item, index) => {
                            return (
                                <div key={index} className={'message'}>
                                    <div className={'middle_mes'}>
                                        <div>
                                            <div className={'avatar'}>
                                                <Avatar
                                                    src={<Image src={item.employee.avatar}/>}
                                                />
                                            </div>
                                            <div className={'one'}>
                                                <div>
                                                    <span>{item.employee.username}</span>
                                                </div>
                                                <span className={'one_time'}>{item.createTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{margin: '10px 0 10px 50px', cursor: 'pointer'}}>
                                        <div type="primary" onClick={() => {
                                            showModalTheme(item)
                                        }}>
                                            {item.title}
                                        </div>
                                        <Modal title="公告详情"
                                               visible={isModalVisibleTheme}
                                               onOk={() => {
                                                   handleOkTheme()
                                               }}
                                               width={700}
                                               cancelText={'取消'}
                                               okText={'编辑'}
                                               onCancel={handleCancelTheme}>
                                            <div>
                                                <div className={'noticeTheme'}>{theme.title}</div>
                                            </div>

                                            <p style={{height: '200px', fontSize: '18px'}}>{theme.content}</p>
                                            <div style={{position: 'absolute', bottom: '10px'}}>
                                                <Button danger type="primary" onClick={() => {
                                                    deleteNotice(theme.id)
                                                }}>删除</Button>
                                            </div>

                                        </Modal>
                                        <Modal title="编辑公告"
                                               visible={isModalVisibleEdit}
                                               onOk={() => {
                                                   handleOkEdit(theme.id)
                                               }}
                                               width={700}
                                               cancelText={'取消'}
                                               okText={'提交'}
                                               onCancel={handleCancelEdit}>
                                            <div>
                                                {/*输入内容*/}
                                                <div className={'newtask'}>
                                                    <div>
                                                        <Form
                                                            {...layout}
                                                            layout="vertical"
                                                            name="basic"
                                                            onFinish={onFinish}
                                                            onFinishFailed={onFinishFailed}
                                                        >
                                                            <Form.Item
                                                                label="公告主题"
                                                                name="title"
                                                                initialValue={theme.title}
                                                                style={{width: '350px'}}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: '公告主题不能为空',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input onChange={(e) => {
                                                                    changeTheme(e.target.value)
                                                                }}/>
                                                            </Form.Item>
                                                        </Form>
                                                    </div>
                                                </div>
                                                {/*时间*/}
                                                <div style={{margin: '20px 0 5px 0'}}>
                                                    <span>*开始时间</span>
                                                    <span style={{float: 'right'}}>*结束时间</span>
                                                </div>
                                                <Space direction="vertical" size={12}>
                                                    <ConfigProvider locale={zhCN}>
                                                        <RangePicker
                                                            defaultValue={[moment(theme.beginTime, dateFormat), moment(theme.endTime, dateFormat)]}
                                                            bordered={false}
                                                            showTime={{format: 'HH:mm'}}
                                                            format="YYYY-MM-DD HH:mm"
                                                            onChange={onChangeTime}
                                                            onOk={onOk}
                                                            style={{width: '183%', padding: '5px 0 10px 0'}}
                                                        />
                                                    </ConfigProvider>
                                                </Space>
                                                <div style={{margin: '20px 0'}}>
                                                    <span>公告正文</span>
                                                </div>
                                                <TextArea rows={4} onChange={(e) => {
                                                    noticeContent(e.target.value)
                                                }} defaultValue={theme.content} placeholder={'请输入内容'}/>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className={'middle_content'}>{item.content}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Notice
