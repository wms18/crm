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
import React, {useState} from "react";

moment.locale('zh-cn');

function MenuRight() {
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
    //任务
    let onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    //日程
    let onPanelChange = (value, mode) => {
        console.log(value, mode);
    }
    return (
        <div className={'middle_right'}>
            <Card title="任务" style={{width: '370px', height: '300px', marginBottom: '20px'}}>
                <div className={'right_one'}>
                    <div className={'right_two'}>
                        <Checkbox.Group style={{width: '100%'}} onChange={onChange}>
                            <Row className={'right_row'}>
                                <Col span={18}>
                                    <Checkbox value="A">A</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="B">B</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="C">C</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="D">D</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="E">E</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
            </Card>
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
                                                        onChange={onChangeTime}
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
                                                            <div style={{width: '675px',height:'300px'}}>
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
