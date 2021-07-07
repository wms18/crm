import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Space, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import LinkBusiness from "../task/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import base from "../../../axios/axios";

function NewSchedule(props) {
    const [form] = Form.useForm();
    let clients; // 空Map
    let mans ;
    let businesss ;
    let contracts;
    let ids = {
        clients,
        mans,
        businesss,
        contracts,
    }
    let [data,setData] = useState(ids)
    let token=window.localStorage.getItem('token')
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    let [title,setTitle] = useState('') //主题
    let [time,setTime] = useState([])   //时间
    let [timeValue,setTimeValue] = useState([]) //时间
    let [content,setContent] = useState('')    //内容
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    useEffect(() => {
        all()
    }, [])
    //所有员工
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token
        }).then((response) => {
            console.log(response)
            setAllStaff(response.data.data)
        }).catch((error) => {
            alert(error)
        })
    }
    //备注
    const {TextArea} = Input;
    //参与人
    const {SHOW_PARENT} = TreeSelect;
    const treeData = [];
    if (allStaff.length !== 0){
        for (let j = 0; j < allStaff.length; j++) {
            treeData.push({
                title:<span><img style={{width:'15px',height:'15px',marginRight:'10px'}} src={allStaff[j].avatar} alt=""/>{allStaff[j].username}</span>  ,
                value: allStaff[j].id,
            })
        }
    }
    let onChangeStaff = value => {
        console.log('onChange ', value);
        selectStaff = value
        setSelectStaff(selectStaff)
    };
    const tProps = {
        showArrow:true,
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
    //输入框
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //任务
    let onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    //日历
    let onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    }
    //主题
    let handleTitle = (value)=>{
        console.log(value)
        title = value
        setTitle(title)
    }
    //内容
    let handleContent = (value) =>{
        console.log(value)
        content=value
        setContent(content)
    }
    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        time=dateString
        setTime(time)
        timeValue = value
        setTimeValue(timeValue)
    }

    let onOk = (value) => {
        console.log('onOk: ', value);
    }
    //新建日程
    const handleOk = () => {
        axios({
            method:'post',
            url:base.url+'/schedule/add',
            params:{
                token:token
            },
            data:{
                beginTime:time[0],
                endTime:time[1],
                content:content,
                employeeIds:selectStaff,
                title:title,
                business:{
                    1: data.clients,
                    2: data.mans,
                    3: data.businesss,
                    4: data.contracts,
                }
            }
        }).then((response)=>{
            console.log(response)
            if (response.data.code==='ERROR'){
                console.log(response.data.message)
            }else {
                alert('新建日程成功')
                props.onOk()
                setTimeValue([null,null])
                setSelectStaff([])
                setContent('')
                form.setFieldsValue({"title": ""}) // 清空标题
                setData(ids)
            }
        }).catch((error)=>{
            alert(error)
        })

    };
    const handleCancel = () => {
        setTimeValue([null,null])
        setSelectStaff([])
        setContent('')
        form.setFieldsValue({"title": ""}) // 清空标题
        setData(ids)
    };
    return(
        <div>
            {/*输入内容*/}
            <Form
                {...layout}
                form={form}
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="主题"
                    form={form}
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: '主题不能为空',
                        },
                    ]}
                >
                    <Input placeholder={'请输入内容'} value={title} onChange={(e)=>{
                        handleTitle(e.target.value)
                    }} />
                </Form.Item>
            </Form>
            {/*时间*/}
            <div style={{marginTop: '20px'}}>
                <span>选择时间</span>
            </div>
            <div style={{margin: '10px 0'}}>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            // bordered={false}
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChangeTime}
                            value={timeValue}
                            onOk={onOk}
                            style={{width: '130%'}}
                        />
                    </ConfigProvider>
                </Space>
            </div>
            {/*参与人*/}
            <div style={{marginBottom: '10px'}}>
                <span>参与人</span>
            </div>
            <TreeSelect {...tProps} />
            <div style={{margin: '20px 0'}}>
                <span>备注</span>
            </div>
            <TextArea rows={4} value={content} onChange={(e)=>{
                handleContent(e.target.value)
            }} placeholder={'请输入内容'}/>
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
                       onOk={() => {
                           setIsBusinessModalVisible(false);
                       }}
                       onCancel={() => {
                           setIsBusinessModalVisible(false);
                       }}>
                    <LinkBusiness onOk={(value) => {
                        console.log(value)
                        data=value
                        setData(data||ids)
                        setIsBusinessModalVisible(false);
                    }}/>
                </Modal>
            </div>
            <div className={'ok-button'}>
                <Button style={{marginRight:'20px'}} onClick={()=>{
                    props.onCancel()
                    handleCancel()
                }}>取消</Button>
                <Button type={"primary"} onClick={()=>{

                    handleOk()
                }}>提交</Button>
            </div>
        </div>
    )
}
export default NewSchedule
