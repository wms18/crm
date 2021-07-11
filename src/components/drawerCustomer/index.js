import React, { useEffect } from 'react'
import { Drawer, Tabs, Input, Select, ConfigProvider, DatePicker, Checkbox, Button, Space, Popconfirm, message, Tag } from 'antd'
import GetProduct from '../getProductTable'
import zhCN from 'antd/es/locale/zh_CN';
import { useState } from 'react';
const { TextArea } = Input
const { TabPane } = Tabs
const { Option } = Select

function DrawerCustomer(props) {




    let [record, setRecord] = useState([])
    let [transferVisible, setTransferVisible] = useState(false)
    let [drawerVisible, setDrawerVisible] = useState(false)

    useEffect(() => {
        // ? props.record.show : ''
        drawerVisible = props.record.show
        setDrawerVisible(drawerVisible)
        // ? props.record.record : ''
        console.log(drawerVisible);
        record = props.record.record
        setRecord(record)

    }, [props])


    function onClose() {

        drawerVisible = false
        setDrawerVisible(drawerVisible)


    }

    return (

        <div>
            <Drawer
                mask={false}
                title={record ? record.clientName : '  '}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={drawerVisible}
                getContainer={false}
                width={'74vw'}
                destroyOnClose={true}
            >
                <div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>
                        {/* <Button
                                type='primary'
                                size={'small'}
                                onClick={() => {
                                    this.setTransferVisible()
                                }}
                            >转移</Button> */}

                        {/* <Modal
                                    visible={transferVisible}
                                    title="转移合同"
                                    // okText="保存"
                                    // cancelText="取消"
                                    // onOk={this.transferSubmit}
                                    footer={[
                                        <Button onClick={this.transferSubmit} type='primary'>保存</Button>,
                                        <Button onClick={this.setTransferVisible} type='default'>取消</Button>
                                    ]}
                                >
                                    <div>
                                        变更负责人
                                        <div>
                                            <span>+点击选择</span>
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                mode='multiple'
                                                optionLabelProp="label"
                                            >
                                                {employeeArr.length ? employeeArr.map((item, index) => {
                                                    return (<Option value={index} >
                                                        <Checkbox>
                                                            <div>
                                                                <img src={item.arr} style={{ display: "inline-block", width: '20px', height: '20px', borderRadius: '100%', marginRight: '10px' }} />
                                                                <Row style={{ display: 'inline' }}>{item.username}</Row>
                                                            </div>

                                                        </Checkbox>
                                                    </Option>)
                                                }) : ''}
                                            </Select>
                                        </div>
                                    </div>

                                </Modal> */}
                        {/* <Button type='primary' size={'small'}
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        this.setVisible()
                                        this.setState({
                                            isCreate: false,
                                            formTitle: '新建合同'

                                        })
                                    }}

                                >编辑</Button> */}


                        {/* <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}> */}
                        {/* <Button type='primary' size={'small'} style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '确认删除',
                                            icon: <ExclamationCircleOutlined />,
                                            content: '确认删除此合同么？',
                                            okText: '是',
                                            okType: '',
                                            cancelText: '否',
                                            onOk: () => {
                                                // this.deleteContract()
                                            }
                                            ,
                                            onCancel() {
                                                message.warning('已取消刪除')
                                            },
                                        });
                                    }}
                                >刪除</Button> */}
                        {/* </Dropdown> */}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px' }}>

                        <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                            <span style={{ fontSize: 12, color: '#777' }}>客户级别</span>
                            <span style={{ fontSize: 14 }}>{record.clientLevel}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                            <span style={{ fontSize: 12, color: '#777' }}>成交状态</span>
                            <span style={{ fontSize: 14 }}>{record.dealStatus ? record.dealStatus : '未成交'}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                            <span style={{ fontSize: 12, color: '#777' }}>负责人</span>
                            <span style={{ fontSize: 14 }}>{record.employeeResponsibleName}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                            <span style={{ fontSize: 12, color: '#777' }}>更新时间</span>
                            <span style={{ fontSize: 14 }}>{record.updateTime}</span>
                        </div>

                    </div>


                    <div>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="基本信息" key="1">
                                <div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span></span>
                                        <span style={{ fontSize: 13 }}>基本信息</span>
                                    </div>

                                    <div className='pro-info'>
                                        <div>
                                            <div>
                                                <div>客户名称</div>
                                                <div>{record.clientName}</div>
                                            </div>
                                            <div>
                                                <div>电话</div>
                                                <div>{record.phone}</div>
                                            </div>
                                            <div>
                                                <div>客户来源</div>
                                                <div>{record.clueFrom}</div>
                                            </div>
                                            <div>
                                                <div>备注</div>
                                                <div>{record.content}</div>
                                            </div>
                                            <div>
                                                <div>下次联系时间</div>
                                                <div>{record.nextTalkTime}</div>

                                            </div>
                                            <div>
                                                <div>创建人</div>
                                                <div>{record.employeeCreateName}</div>
                                            </div>
                                            <div>
                                                <div>创建时间</div>
                                                <div>{record.createTime}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <div>客户类型</div>
                                                <div>{record.clientType}</div>
                                            </div>
                                            <div>
                                                <div>客户等级</div>
                                                <div>{record.clientLevel}</div>
                                            </div>
                                            <div>
                                                <div>部门ID</div>
                                                <div>{record.departmentId}</div>
                                            </div>
                                            <div>
                                                <div>公司</div>
                                                <div>{record.company}</div>
                                            </div>
                                            <div>
                                                <div>更新时间</div>
                                                <div>{record.updateTime}</div>
                                            </div>
                                            <div>
                                                <div>负责人</div>
                                                <div>{record.employeeResponsibleName}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>

                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="跟进记录" key="2">

                                <div style={{ padding: '0 0 20px 0' }}>
                                    <TextArea style={{ height: 100 }}
                                    // onChange={this.onChangeFollowRecord}
                                    ></TextArea>
                                </div>
                                <div style={{ fontSize: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        记录类型
                                        &nbsp;
                                        &nbsp;
                                        <Select style={{ width: 200 }}
                                        // onChange={this.onChangeRecordType}
                                        >
                                            <Option value='上门拜访'>上门拜访</Option>
                                            <Option value='电话邀约'>电话邀约</Option>
                                            <Option value='线下单杀'>线下单杀</Option>
                                        </Select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        下次联系时间
                                        &nbsp;
                                        &nbsp;
                                        <ConfigProvider locale={zhCN}>
                                            <Space direction="vertical" style={{ marginRight: "20px" }}>
                                                {/* <DatePicker onChange={this.onChangeFollowDate} /> */}
                                            </Space>,
                                        </ConfigProvider>
                                        {/* <Checkbox style={{ fontSize: 12 }} onChange={this.onChangeRemind} >
                                                添加到日常提醒
                                            </Checkbox> */}
                                    </div>
                                    <div>
                                        <Button size={'small'}
                                        // onClick={createFollowUpRecord}
                                        >发布</Button>
                                    </div>
                                </div>
                                <div style={{ border: '1px solid rgb(230, 230, 230)', marginTop: '20px' }}>
                                    <Tabs defaultActiveKey="1" >
                                        <TabPane tab="跟进记录" key="1">

                                            {/* {
                                                    followUpRecordArr ? followUpRecordArr.map((item, index) => {
                                                        return (
                                                            <div key={index} style={{ margin: '30px 0' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                                    <div>
                                                                        <span>跟进记录</span>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        <Popconfirm
                                                                            title="你确定要删除这条记录么?"
                                                                            onConfirm={() => {
                                                                                this.deleteFollowUpRecord(item.id)
                                                                            }
                                                                            }
                                                                            onCancel={() => {
                                                                                message.warning('已取消')
                                                                            }}
                                                                            okText="删除"
                                                                            cancelText="取消"
                                                                        >

                                                                            <span className='iconfont icon-lajitong' ></span>
                                                                        </Popconfirm>
                                                                    </div>

                                                                    <div style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <div
                                                                            style={{
                                                                                width: '34px',
                                                                                height: '34px',
                                                                                backgroundColor: 'blue',
                                                                                borderRadius: '50%',
                                                                                color: 'white',
                                                                                textAlign: 'center',
                                                                                lineHeight: '34px',
                                                                                marginRight: '8px'
                                                                            }} F
                                                                        >
                                                                            {item.employeeAvatar ?
                                                                                <span>{item.employeeName.slice(0, 2)}</span>
                                                                                :
                                                                                <span>{item.employeeName.slice(0, 2)}</span>
                                                                            }
                                                                        </div>
                                                                        <div>


                                                                            <div style={{ fontSize: '13px' }}>{item.employeeName}</div>
                                                                            <div style={{ color: 'rgb(153, 153, 153)', marginTop: '3px', fontSize: '12px' }} >{item.createTime}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div style={{ padding: '20px 0px 0px 40px' }}>
                                                                    {item.followRecord}
                                                                </div>
                                                                <div style={{ padding: '20px 0px 0px 40px' }}>
                                                                    {item.recordType ? <Tag>{item.recordType}</Tag> : ''}
                                                                    {item.nextTime ? <Tag>{item.nextTime}</Tag> : ''}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                        :
                                                        ""
                                                } */}

                                        </TabPane>
                                        <TabPane tab="日志" key="2">
                                            2
                                        </TabPane>
                                        <TabPane tab="审批" key="3">
                                            3
                                        </TabPane>
                                        <TabPane tab="任务" key="4">
                                            4
                                        </TabPane>
                                        <TabPane tab="日程" key="5">
                                            5
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </TabPane>

                            {/* <TabPane tab="商机" key="5">
                                        <GetBizOpp value={record.id}></GetBizOpp>
                                    </TabPane>
                                    <TabPane tab="合同" key="6">
                                        <GetContract value={record.id}></GetContract>
                                    </TabPane>
                                    <TabPane tab="回款信息" key="7">
                                        <GetPayment value={record.id}></GetPayment>
                                    </TabPane> */}
                        </Tabs>
                    </div>

                </div>

            </Drawer>
        </div>
    )



}

export default DrawerCustomer;


