import React, { Component } from 'react'
import {Drawer,Tabs,Input,Select,ConfigProvider,DatePicker,Checkbox,Button,Space}  from 'antd'
import GetProduct from '../getProductTable'
import zhCN from 'antd/es/locale/zh_CN';
const {TabPane} =Tabs
const {Option} =Select

class DrawerContract extends Component {

    state = {
        record: this.props.record ? this.props.record : '',
        transferVisible: false,
        drawerVisible: false,
    }

    componentDidMount() {

        console.log(this.props.record);
    }


    onClose() {

    }
    render() {

        return (

            <div>

                {this.props.record ?
                    <Drawer
                        mask={false}
                        title={this.state.record ? this.state.record.contractName : '  '}
                        placement="right"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.drawerVisible}
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
                                    visible={this.state.transferVisible}
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
                                                {this.state.employeeArr.length ? this.state.employeeArr.map((item, index) => {
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

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px', alignItems: 'baseline' }}>

                                <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                                    <span style={{ fontSize: 12, color: '#777' }}>客户名称</span>
                                    <span style={{ fontSize: 14 }}>{this.state.record.clientName}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                                    <span style={{ fontSize: 12, color: '#777' }}>合同金额</span>
                                    <span style={{ fontSize: 14 }}>{this.state.record.totalPrice}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                                    <span style={{ fontSize: 12, color: '#777' }}>合同状态</span>
                                    <span style={{ fontSize: 14 }}>{this.state.record.commercialStage}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                                    <span style={{ fontSize: 12, color: '#777' }}>负责人</span>
                                    <span style={{ fontSize: 14 }}>{this.state.record.employeeResponsible}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                                    <span style={{ fontSize: 12, color: '#777' }}>创建时间</span>
                                    <span style={{ fontSize: 14 }}>{this.state.record.createTime}</span>
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
                                                        <div>合同名称</div>
                                                        <div>{this.state.record.clientName}</div>
                                                    </div>
                                                    <div>
                                                        <div>电话</div>
                                                        <div>{this.state.record.phone}</div>
                                                    </div>
                                                    <div>
                                                        <div>合同来源</div>
                                                        <div>{this.state.record.clueFrom}</div>
                                                    </div>
                                                    <div>
                                                        <div>备注</div>
                                                        <div>{this.state.record.content}</div>
                                                    </div>
                                                    <div>
                                                        <div>下次联系时间</div>
                                                        <div>{this.state.record.nextTalkTime}</div>

                                                    </div>
                                                    <div>
                                                        <div>创建人</div>
                                                        <div>{this.state.record.employeeCreateId}</div>
                                                    </div>
                                                    <div>
                                                        <div>创建时间</div>
                                                        <div>{this.state.record.createTime}</div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div>
                                                        <div>合同类型</div>
                                                        <div>{this.state.record.clientType}</div>
                                                    </div>
                                                    <div>
                                                        <div>合同等级</div>
                                                        <div>{this.state.record.clientLevel}</div>
                                                    </div>
                                                    <div>
                                                        <div>部门ID</div>
                                                        <div>{this.state.record.departmentId}</div>
                                                    </div>
                                                    <div>
                                                        <div>公司</div>
                                                        <div>{this.state.record.company}</div>
                                                    </div>
                                                    <div>
                                                        <div>更新时间</div>
                                                        <div>{this.state.record.updateTime}</div>
                                                    </div>
                                                    <div>
                                                        <div>负责人</div>
                                                        <div>{this.state.record.employeeResponsible}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>

                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="跟进记录" key="2">

                                        <div style={{ padding: '0 0 20px 0' }}>
                                            <Input style={{ height: 100 }}></Input>
                                        </div>
                                        <div style={{ fontSize: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                记录类型
                                                &nbsp;
                                                &nbsp;
                                                <Select style={{ width: 200 }}>
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
                                                        <DatePicker onChange={this.onChangeDate} />
                                                    </Space>,
                                                </ConfigProvider>
                                                <Checkbox style={{ fontSize: 12 }}>
                                                    添加到日常提醒
                                                </Checkbox>
                                            </div>
                                            <div>
                                                <Button size={'small'}>发布</Button>
                                            </div>
                                        </div>
                                        <div style={{ border: '1px solid rgb(230, 230, 230)', marginTop: '20px' }}>
                                            <Tabs defaultActiveKey="1" >
                                                <TabPane tab="跟进记录" key="1">
                                                    1
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


                                    <TabPane tab="联系人" key="3">
                                    </TabPane>
                                    <TabPane tab="合同" key="4">
                                    </TabPane>
                                    <TabPane tab="产品" key="5">
                                        <GetProduct value={this.state.record.id} ></GetProduct>
                                    </TabPane>
                                    <TabPane tab="相关团队" key="6">
                                    </TabPane>
                                    <TabPane tab="附件" key="7">
                                    </TabPane>
                                    <TabPane tab="操作记录" key="8">
                                    </TabPane>

                                </Tabs>
                            </div>

                        </div>

                    </Drawer>
                    :
                    <div></div>
                }
            </div>
        )
    }


}

export default DrawerContract;


