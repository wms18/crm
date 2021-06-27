import {Calendar, Badge, ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, {useState} from 'react';
import {Modal, Button, Input, Form} from 'antd';
import {DatePicker, Space, TreeSelect, Popover,Table } from 'antd';
import './calendar.css'
import {AudioOutlined} from '@ant-design/icons';

moment.locale('zh-cn');

function SchedulePage() {
    let arr = ['客户', '联系人', '商机', '合同']
    let [activeIndex1, setActiveIndex1] = useState(0)  //关联业务
    //关联业务
    //关联业务模块
    const {Search} = Input;
    const onSearch = value => console.log(value);

    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //关联业务模块 表格
    const columns = [
        {
            title: '客户名称',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '下次联系时间',
            width: 120,
            dataIndex: 'time',
            key: '0',
        },
        {
            title: '最后跟进时间',
            dataIndex: 'time1',
            key: '1',
            width: 120,
        },
        {
            title: '创建时间',
            dataIndex: 'time2',
            key: '2',
            width: 150,
        },
    ];
    let [selectedRowKeys,setSelectedRowKeys] = useState([])
    let onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: '奇数行',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
            {
                key: 'even',
                text: '偶数行',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
        ],
    };
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            time: '2021-6-23',
            time1: '2021-6-23',
            time2: '2021-6-23',
        });
    }
    //备注
    const {TextArea} = Input;
    //参与人
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
    let [man, setMan] = useState()//参与人
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
    //对话框
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
    //开始时间，结束时间
    const {RangePicker} = DatePicker;
    let onChange = (value, dateString) => {
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
    //日历
    let getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    {type: 'warning', content: 'This is warning event.'},
                    {type: 'success', content: 'This is usual event.'},
                ];
                break;
            case 10:
                listData = [
                    {type: 'warning', content: 'This is warning event.'},
                    {type: 'success', content: 'This is usual event.'},
                    {type: 'error', content: 'This is error event.'},
                ];
                break;
            case 15:
                listData = [
                    {type: 'warning', content: 'This is warning event'},
                    {type: 'success', content: 'This is very long usual event。。....'},
                    {type: 'error', content: 'This is error event 1.'},
                ];
                break;
            default:
        }
        return listData || [];
    }

    let dateCellRender = (value) => {
        const listData = getListData(value);
        console.log(value.month())
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    }

    let getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    let monthCellRender = (value) => {
        const num = getMonthData(value);
        console.log(num)
        // return num ? (
        //     <div className="notes-month">
        //         <section>{num}</section>
        //         <span>Backlog number</span>
        //     </div>
        // ) : null;
    }
    let handle = (value) => {
        console.log(value.month())
        setIsModalVisible(true);
    }
    return (
        <div style={{margin: '20px'}}>
            <div type="primary" onClick={showModal}>
                <ConfigProvider locale={zhCN}>
                    <Calendar fullscreen={false}
                              dateCellRender={dateCellRender}
                              onSelect={handle}
                              monthCellRender={monthCellRender}
                    />
                </ConfigProvider>
            </div>
            <Modal title="创建日程" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                {/*输入内容*/}
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
                        label="主题"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '主题不能为空',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
                {/*时间*/}
                <div style={{marginTop: '20px'}}>
                    <span>*开始时间</span>
                    <span>*结束时间</span>
                </div>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker
                            // bordered={false}
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChange}
                            onOk={onOk}
                            style={{width: '130%'}}
                        />
                    </ConfigProvider>
                </Space>
                {/*参与人*/}
                <div>
                    <span>参与人</span>
                </div>
                <TreeSelect {...tProps} />
                <div style={{margin: '20px 0'}}>
                    <span>备注</span>
                </div>
                <TextArea rows={4} placeholder={'请输入内容'}/>
                <div style={{margin: '20px 0 0 0', color: '#3E84E9'}}>
                    <Button  type="primary" onClick={showBusinessModal} style={{cursor: 'pointer'}}>
                        关联业务
                    </Button>
                    <Modal title="关联业务模块"
                           width={800}
                           bordered={true}
                           bodyStyle={{padding:0}}
                           visible={isBusinessModalVisible}
                           onOk={()=>{
                               setIsBusinessModalVisible(false);
                           }}
                           onCancel={()=>{
                               setIsBusinessModalVisible(false);
                           }}>
                        <div className={'bus'}>
                            <div className={'business'}>
                                {arr.map((item, index) => {
                                    return (
                                        <div  className={index === activeIndex1 ? 'active1' : ''}
                                             onClick={() => {
                                                 setActiveIndex1(index)
                                             }}
                                             key={index}>{item}</div>
                                    )
                                })}
                            </div>

                            <div className={'business1'}>
                                <div className={'businessTop'}>
                                    <div>
                                        <Space direction="vertical">
                                            <Search  onSearch={onSearch} style={{width: 200,height:'30px',overflow:'hidden'}}/>
                                        </Space>
                                    </div>
                                    <div>
                                        <button className={'businessBtn'}>新建</button>
                                    </div>
                                </div>
                                <div style={{width: '675px',height:'325px'}}>
                                    <ConfigProvider locale={zhCN}>
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 150, y: 200 }} />
                                    </ConfigProvider>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </Modal>

        </div>
    )
}

export default SchedulePage;
