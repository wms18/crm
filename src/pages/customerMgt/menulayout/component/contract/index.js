import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import GetProduct from "./getProduct";
import AddedProduct from "../../../../../components/addedProduct";  //新增的产品列表
import GetCustomer from "../../../../../components/getCustomer";
import GetEmployee from '../../../../../components/getEmployee';
import GetBizOppTable from "../../../../../components/getBizOppTable";

import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Steps
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";

const { Step } = Steps;
const { TabPane } = Tabs
const { Option, TextArea } = Select
const { Search } = Input
const { Content, Footer, Header } = Layout




class Contract extends Component {

  componentDidMount() {
    // console.log(111);
    this.getContract()
    // this.getEmployeeName()
  }

  constructor(props) {
    super(props)
    this.state = {

      drawerVisible: false,

      token: window.localStorage.getItem('token'),



      isCreate: true,
      formTitle: '新建合同',

      transferVisible: false,

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,

      getLinkBizOppCustomerId: '',   //获取商机拿到的客户id
      linkBizOpp: '',
      BizOppID: '',    //添加的商机id
      produceIds: [],

      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      employeeArr: '',

      // 表格行点击时产品信息
      record: "",

      // 搜素合同名称
      keyword: '',


      // 新增产品信息
      number: '',
      price: '',
      produceCoding: '',
      produceIntroduce: '',
      produceName: '',
      produceType: '',
      putaway: "",
      specification: ''


    }
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.submit = this.submit.bind(this)
    this.getContract = this.getContract.bind(this)
    this.createContract = this.createContract.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setTransferVisible = this.setTransferVisible.bind(this)
    this.getEmployeeName = this.getEmployeeName.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.getProductId = this.getProductId.bind(this)
    this.getCustomerID = this.getCustomerID.bind(this)
    this.getBizOppID = this.getBizOppID.bind(this)
    this.getEemployeeCheckId = this.getEemployeeCheckId.bind(this)
    this.getEmployeeSignId = this.getEmployeeSignId.bind(this)

  }


  getEemployeeCheckId(val) {   //审核人
    console.log(val);
    this.setState({
      employeeCheckId: val
    })
  }

  getEmployeeSignId(val) {    //签字人
    console.log(val);
    this.setState({
      employeeSignId: val
    })
  }

  getBizOppID(val) {   //关联商机传过来的商机信息
    console.log(val);
    this.setState({
      BizOppID: val ? val[0].id : ''
    })

  }

  getProductId(val) {  //拿到产品信息
    console.log(val);
    let arr = []
    val ? val.map((item) => {
      arr.push(item.id)
    })
      :
      arr = []

    this.setState({
      produceIds: arr
    }, () => {
      console.log(this.state.produceIds);

    })

  }



  // 获取客户id
  getCustomerID(val) {
    console.log(val);
    console.log("获取客户id", val);
    this.setState({
      getLinkBizOppCustomerId: val ? val[0].id : ''
    })
  }

  createFollowupRecord() {
    axios.post(`${base.url}/follow/add`, {
      params: {
        token: this.state.token
      },
      data: qs.stringify({
        businessId: this.state.record.id,
        businessTypeId: 1,
        followRecord: this.state.followRecord,
        nextTime: this.state.nextTalkTime,
        recordType: '上门拜访',
        remind: 0

      })

    })
  }

  onChangeDate(date, dateString) {
    this.setState({
      submissionTime: dateString
    })
  }



  getEmployeeName() {
    axios.get(`${base.url}/employee/getEmployeeName`, {
      params: {
        token: this.state.token
      }
    })
      .then((res) => {
        console.log(res);
        if (res.data.code == 'ERROR') {

        } else {
          this.setState({
            employeeArr: res.data.data
          })
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  setTransferVisible() {
    this.setState({
      transferVisible: !this.state.transferVisible
    })
  }

  transferSubmit() {
    // setTransferVisible
  }

  getContract() {
    // 获取合同
    // console.log(222);
    axios({
      method: 'get',
      url: `${base.url}/contract/getContract`,
      params: {
        token: this.state.token,
        keyword: this.state.keyword,
        currentPage: this.state.currentPage,
        limit: this.state.limit
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {

        } else {
          this.setState({
            tableArr: res.data.data.data,
            pagination: res.data.data.pagination
          })
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }


  createContract() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data);
    console.log(this.state.submissionTime);
    var reg = /\s/;
    if (
      0 > 1
      // data.nextTalkTime == undefined || data.clientLevel == undefined
      //   || data.clientName == undefined || data.clientType == undefined || data.clueFrom == undefined || data.company == undefined
      //   || reg.exec(data.nextTalkTime) != null || reg.exec(data.clientLevel) != null
      //   || reg.exec(data.clientName) != null || reg.exec(data.clientType) != null || reg.exec(data.clueFrom) != null || reg.exec(data.company) != null

    ) {
      message.error('请填写必填选项并不要输入空格');
    } else {
      axios({
        method: "post",
        url: `${base.url}/contract/createContract`,
        params: {
          token: this.state.token,
        },
        // .replace(/\s+/g,'')
        data: qs.stringify({
          beginTime: data.beginTime,
          clientId: data.clientId,
          commercialOpportunityId: this.state.BizOppID,
          content: data.content,
          contractCoding: data.contractCoding,
          clientId: this.state.getLinkBizOppCustomerId,
          contractName: data.contractName,
          currency: data.currency,
          employeeCheckId: this.state.employeeCheckId,
          employeeSignId: this.state.employeeSignId,
          endTime: data.endTime,
          orderTime: data.orderTime,
          produceIds: this.state.produceIds,
          // totalPrice: data.totalPrice,
          contractPrice: data.contractPrice,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error('请重试');
          // this.onCancel()
        } else {
          message.success('新增成功');
          // this.onCancel()

          this.getContractt()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }

  deleteContract() {
    axios({
      method: "post",
      url: `${base.url}/contract/deleteContract`,
      params: {
        token: this.state.token,
        contractId: this.state.record.id
      },
    }).then((res) => {
      console.log(res);
      if (res.data.code === "ERROR") {
        message.error('请重试');
        // this.onCancel()
      } else {
        message.success('删除成功');
        // this.onCancel()

        this.getContractt()
      }
    }).catch((error) => {
      console.log(error);
    })
  }



  formRef = React.createRef()
  submit() {

    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.createContract()

  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取合同
    axios.get(`${base.url}/commercialOpportunity/all?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        keyword: val
      },
      // data: qs.stringify({
      // })
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {

        }
        else {
          this.setState({
            tableArr: res.data.data.data,
            pagination: res.data.data.pagination
          })
        }
      })
  }


  onClose() {
    this.setState({
      drawerVisible: false
    })
  }
  showDrawer() {
    this.setState({
      drawerVisible: true
    })
  }

  onChange(page, pageSize) {    //currentPage切换
    console.log(page, pageSize);
    this.setState({
      currentPage: page,
      limit: pageSize
    }, () => {      //setstate异步回调箭头函数
      this.getContract()
    })



  }

  setVisible() {
    this.setState({
      visible: !this.state.visible
    })
    setTimeout(() => {
      console.log('record', this.state.record);
      if (this.state.isCreate) {
        this.formRef.current.resetFields();
      } else {

        this.formRef.current.setFieldsValue({
          clientId: this.state.record.clientId,
          commercialPrice: this.state.record.commercialPrice,
          commercialStage: this.state.record.commercialStage,
          commercialStatusGroup: this.state.record.commercialStatusGroup,
          content: this.state.record.content,
          discount: this.state.record.discount,
          name: this.state.record.name,
          produceIds: this.state.record.produceIds,
          submissionTime: this.state.record.submissionTime,
          totalPrice: this.state.record.totalPrice,
          totalPrice: this.state.record.contractPrice,
          // record: this.state.record.record,
        })
      }
    }, 100);
  };

  onCancel() {
    this.setState({
      visible: false,
      isCreate: true
    })
    setTimeout(() => {
      this.formRef.current.resetFields();
    }, 100);
  }

  onCreate(values) {
    console.log('Received values of form: ', values);
    this.setState({
      visible: false
    })
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', backgroundColor: '#f5f6f9', padding: '24px' }}>
          <span style={{ fontSize: '18px' }}>合同管理</span>
          <Search placeholder='请输入合同名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建合同</Button>
            <Modal
              bodyStyle={{ height: '380px', overflowY: 'auto' }}
              visible={this.state.visible}
              title={this.state.isCreate ? '新建合同' : '编辑合同'}
              okText="确认"
              cancelText="取消"
              onCancel={this.onCancel}
              onOk={this.submit}

            >

              <Form
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                  modifier: 'public',
                }}
                ref={this.formRef}
              >
                <div>
                  <Form.Item
                    name="contractCoding"
                    label="合同编号"
                    rules={[
                      {
                        required: true,
                        message: '合同编号不能为空'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="contractName"
                    label="合同名称"
                    rules={[
                      {
                        required: true,
                        message: '合同名称不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="cilentId"
                    label="客户名称"
                  >
                    <GetCustomer methods={(val) => {
                      this.getCustomerID(val)

                    }}  ></GetCustomer>
                  </Form.Item>
                  <GetBizOppTable
                    id={this.state.getLinkBizOppCustomerId}
                    linkBizOpp={this.state.linkBizOpp} methods={(val) => { this.getBizOppID(val) }}  ></GetBizOppTable>
                </div>

                <div>
                  <Form.Item
                    name="orderTime"
                    label="下单时间"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="contractPrice"
                    label="合同金额"
                    rules={[
                      {
                        required: true,
                        message: '合同金额不能为空'
                      }
                    ]}
                  >
                    <Input type='number' />
                  </Form.Item>

                </div>


                <div>
                  <Form.Item
                    name="beginTime"
                    label="合同开始时间"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="endTime"
                    label="合同到期时间"
                  >
                    <Input />
                  </Form.Item>


                </div>
                <div>
                  <Form.Item
                    name="employeeSignId"
                    label="签字人"

                  >
                    {/* 签字人对应子组件对应的负责人方法 */}
                    <GetEmployee contentResponsible={(val) => { this.getEmployeeSignId(val) }}  ></GetEmployee>

                  </Form.Item>
                  <Form.Item
                    name="employeeCheckId"
                    label="审核人"
                    rules={[
                      {
                        required: true,
                        message: '审核人不能为空'
                      }
                    ]}
                  >
                    {/* 审核人 对应的子组件接受的创建人*/}
                    <GetEmployee contentCreate={(val) => { this.getEemployeeCheckId(val) }} ></GetEmployee>
                  </Form.Item>

                </div>
                <div>
                  <Form.Item
                    name="content"
                    label="备注"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="currency"
                    label="货币"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  {/* <Form.Item
                    name="produceIds"
                    label="产品id"
                  >
                    <Input />
                  </Form.Item> */}
                  <AddedProduct methods={(val) => {
                    this.getProductId(val)
                  }} ></AddedProduct>
                </div>

              </Form>
            </Modal>
          </div>
        </div >

        <div>
          <div style={{ height: 20 }}
            onClick={() => {
              console.log(this.state.employeeArr)
            }}
          >

          </div  >

          <div >
            <div style={{ position: 'relative' }}>
              <Table

                columns={Data.columns}
                dataSource={this.state.tableArr}
                scroll={{ x: 1500, y: '26vw' }}
                pagination={{ pageSize: this.state.pagination.limit }}
                defaultCurrent={1}
                onRow={(record) => ({
                  onClick: () => {
                    console.log(record);
                    this.setState({
                      drawerVisible: true,
                      record: record,
                      name: record.name

                    })
                  },
                })}

              ></Table>
              <div style={{ position: 'absolute', bottom: '-32vw', right: '0px' }}>
                <ConfigProvider locale={zhCN}>
                  <Pagination showQuickJumper
                    defaultPageSize={10}
                    showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
                </ConfigProvider>
              </div>
              <Drawer
                mask={false}
                title={this.state.record.contractName}
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
                    <Button
                      type='primary'
                      size={'small'}
                      onClick={() => {
                        this.setTransferVisible()
                      }}
                    >转移</Button>

                    <Modal
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

                    </Modal>
                    <Button type='primary' size={'small'}
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        this.setVisible()
                        this.setState({
                          isCreate: false,
                          formTitle: '新建合同'

                        })
                      }}

                    >编辑</Button>


                    {/* <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}> */}
                    <Button type='primary' size={'small'} style={{ marginLeft: '10px' }}
                      onClick={() => {
                        Modal.confirm({
                          title: '确认删除',
                          icon: <ExclamationCircleOutlined />,
                          content: '确认删除此合同么？',
                          okText: '是',
                          okType: '',
                          cancelText: '否',
                          onOk: () => {
                            this.deleteContract()
                          }
                          ,
                          onCancel() {
                            message.warning('已取消刪除')
                          },
                        });
                      }}
                    >刪除</Button>
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
            </div>


          </div>
        </div>



      </div >
    );
  }
}

export default Contract;



