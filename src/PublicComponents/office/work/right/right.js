import './right.css'
import {
    Checkbox,
    Row,
    Col,
    Card,
    ConfigProvider,
    Form,
    Input,
    Space,
    TreeSelect,
    Button,
    Modal,
    Table,
    DatePicker
} from 'antd';
import {Calendar, Select, Radio, Typography} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, {useEffect, useState} from "react";
import LinkBusiness from "../../task/link";
import axios from "axios";
import base from "../../../../axios/axios";

moment.locale('zh-cn');

function MenuRight(props) {
    const [form] = Form.useForm();
    let clients; // 空Map
    let mans;
    let businesss;
    let contracts;
    let ids = {
        clients,
        mans,
        businesss,
        contracts,
    }
    let [data, setData] = useState(ids)
    let token = window.localStorage.getItem('token')
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    let [title, setTitle] = useState('') //主题
    let [time, setTime] = useState([])   //时间
    let [timeValue, setTimeValue] = useState([]) //时间
    let [content, setContent] = useState('')    //内容
    let [scheduleNum, setScheduleNum] = useState([]) //日程列表
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    useEffect(() => {
        all()
        schedule()
    }, [])
    //日程
    let schedule = () => {
        axios({
            method: 'get',
            url: base.url + '/schedule/all?token=' + token
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                console.log(response.data.message)
            } else {
                scheduleNum = response.data.data
                setScheduleNum(scheduleNum)
            }
        }).catch((error) => {
            alert(error)
        })
    }
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
    //备注
    const {TextArea} = Input;
    //参与人
    const {SHOW_PARENT} = TreeSelect;
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
    //对话框
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    //日程
    const handleOk = () => {
        newSchedule()
        setIsModalVisible(false);
    };
    //新建日程
    let newSchedule = () =>{
        axios({
            method: 'post',
            url: base.url + '/schedule/add',
            params: {
                token: token
            },
            data: {
                beginTime: time[0],
                endTime: time[1],
                content: content,
                employeeIds: selectStaff,
                title: title,
                business: {
                    1: data.clients,
                    2: data.mans,
                    3: data.businesss,
                    4: data.contracts,
                }
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                console.log(response.data.message)
            } else {
                alert('新建日程成功')
                schedule()
                setTimeValue([null, null])
                setSelectStaff([])
                setContent('')
                form.setFieldsValue({"title": ""}) // 清空标题
                setData(ids)
                props.onHandle(1)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setTimeValue([null, null])
        setSelectStaff([])
        setContent('')
        form.setFieldsValue({"title": ""}) // 清空标题
        setData(ids)
    };

    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChangeTime = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        time = dateString
        setTime(time)
        timeValue = value
        setTimeValue(timeValue)
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
    let handleTitle = (value) => {
        console.log(value)
        title = value
        setTitle(title)
    }
    //内容
    let handleContent = (value) => {
        console.log(value)
        content = value
        setContent(content)
    }
    //删除日程
    let deleteSchedule = (id) => {
        console.log(id)
        if (window.confirm("确定删除吗")) {
            axios({
                method:'post',
                url:base.url+'/schedule/remove?token='+token,
                params:{
                    id:id
                }
            }).then((response)=>{
                console.log(response)
                if (response.data.code ==='ERROR'){
                    console.log(response.data.message)
                }else {
                    alert('删除成功')
                    schedule()
                }
            }).catch((error)=>{
                alert(error)
            })
        }
    }
    return (
        <div className={'middle_right'}>
            <div style={{width: '370px', height: '300px', marginBottom: '20px'}}>
                <Card title="日程" style={{width: 370, height: '300px'}}>
                    <p className={'right_one'}>
                        <p className={'right_two'}>
                            {scheduleNum === null ? '' : scheduleNum.map((item, index) => {
                                return (
                                    <p key={index} className={'scheduleList'}>
                                        <span>{item.content}</span>
                                        <span>
                                            <i className="fa fa-trash-o" aria-hidden="true" onClick={()=>{
                                                deleteSchedule(item.id)
                                        }}></i>
                                        </span>
                                    </p>
                                )
                            })}
                        </p>
                    </p>

                </Card>
            </div>
            <div className="site-calendar-customize-header-wrapper">
                <ConfigProvider locale={zhCN}>
                    <Calendar
                        fullscreen={false}
                        headerRender={({value, type, onChange, onTypeChange}) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];
                            const current = value.clone();
                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                                current.month(i);
                                months.push(localeData.monthsShort(current));
                            }

                            for (let index = start; index < end; index++) {
                                monthOptions.push(
                                    <Select.Option className="month-item" key={`${index}`}>
                                        {months[index]}
                                    </Select.Option>,
                                );
                            }
                            const month = value.month();

                            const year = value.year();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                                options.push(
                                    <Select.Option key={i} value={i} className="year-item">
                                        {i}
                                    </Select.Option>,
                                );
                            }
                            return (
                                <div style={{padding: 8}}>
                                    <div className={'right_calendar'}>
                                        <span>日程</span>
                                        <div type="primary" onClick={showModal}>
                                            <span style={{color: '#3E84E9'}}>+创建</span>
                                        </div>
                                        <Modal title="创建日程"
                                               width={550}
                                               visible={isModalVisible}
                                               onOk={handleOk}
                                               onCancel={handleCancel}>
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
                                                    <Input placeholder={'请输入内容'} value={title} onChange={(e) => {
                                                        handleTitle(e.target.value)
                                                    }}/>
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
                                            <TextArea rows={4} value={content} onChange={(e) => {
                                                handleContent(e.target.value)
                                            }} placeholder={'请输入内容'}/>
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
                                                       onOk={() => {
                                                           setIsBusinessModalVisible(false);
                                                       }}
                                                       onCancel={() => {
                                                           setIsBusinessModalVisible(false);
                                                       }}>
                                                    <LinkBusiness onOk={(value) => {
                                                        console.log(value)
                                                        data = value
                                                        setData(data || ids)
                                                        setIsBusinessModalVisible(false);
                                                    }}/>
                                                </Modal>
                                            </div>
                                        </Modal>
                                    </div>
                                    <Row gutter={8}>
                                        <Col>
                                            <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)}
                                                         value={type}>
                                                <Radio.Button value="month">月</Radio.Button>
                                                <Radio.Button value="year">年</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                onChange={newYear => {
                                                    const now = value.clone().year(newYear);
                                                    onChange(now);
                                                }}
                                                value={String(year)}
                                            >
                                                {options}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                value={String(month)}
                                                onChange={selectedMonth => {
                                                    const newValue = value.clone();
                                                    newValue.month(parseInt(selectedMonth, 10));
                                                    onChange(newValue);
                                                }}
                                            >
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }}
                        onPanelChange={onPanelChange}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}

export default MenuRight
