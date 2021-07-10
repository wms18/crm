import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Tag
  , Popconfirm
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";
import GetBizOpp from './GetBizOpp'
import GetCustomer from "../../../../../components/getCustomer";
const { TabPane } = Tabs
const { Option } = Select
const { Search, TextArea } = Input
const { Content, Footer, Header } = Layout

class Clue extends Component {

  componentDidMount() {

    this.getClue()
    this.getEmployeeName()
  }

  constructor(props) {
    super(props)
    this.state = {

      drawerVisible: false,

      token: window.localStorage.getItem('token'),

      remind: 0, //跟进记录是否加入日程
      nextTime: '',  //跟进记录的下次联系时间
      followRecord: '',  //跟进记录的内容
      recordType: "",  //记录类型


      //新建时传入的客户id
      customerName: "",

      isCreate: true,
      formTitle: '新建线索',

      transferVisible: false,

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,

      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      employeeArr: '',

      // 表格行点击时产品信息
      record: "",

      // 搜素产品名称
      keyWord: '',


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
    this.moveClue = this.moveClue.bind(this)
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.submit = this.submit.bind(this)
    this.getClue = this.getClue.bind(this)
    this.createCluet = this.createCluet.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setTransferVisible = this.setTransferVisible.bind(this)
    this.getEmployeeName = this.getEmployeeName.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeRecordType = this.onChangeRecordType.bind(this)
    this.onChangeRemind = this.onChangeRemind.bind(this)
    this.onChangeFollowRecord = this.onChangeFollowRecord.bind(this)
    this.createFollowUpRecord = this.createFollowUpRecord.bind(this)
    this.getFollowUpRecord = this.getFollowUpRecord.bind(this)
    this.deleteFollowUpRecord = this.deleteFollowUpRecord.bind(this)
    this.getCustomerId = this.getCustomerId.bind(this)
    this.transferCustomer = this.transferCustomer.bind(this)

  }


  //转移为客户
  transferCustomer() {
    axios({
      method: 'post',
      url: `${base.url}/clue/tranfer-client`,
      params: {
        token: this.state.token,
        clueId: this.state.record.id
      }
    })
      .then((res) => {
        if (res.data.code == 'SUCCESS') {
          message.success('已成功转移为客户')
          this.getClue()
        } else {
          message.warning('请重试')
        }
      })
  }

  getCustomerId(val) {
    this.setState({
      customerName: val ? val[0].clientName : ''
    }, () => {
    })

  }




  moveClue() {

    axios({
      method: "post",
      url: `${base.url}/clue/delete`,
      params: {
        token: this.state.token,
        clueId: this.state.record.id
      }
    })
      .then((res) => {
        if (res.data.code == 'SUCCESS') {
          message.success('删除成功')
          this.getClue()
        } else {
          message.warning('请重试')
        }
      })
  }



  deleteFollowUpRecord(id) {
    console.log(id);
    axios({
      method: 'post',
      url: `${base.url}/follow/delete`,
      params: {
        token: this.state.token,
        followId: id
      }
    })
      .then((res) => {
        if (res.data.code == 'ERROR') {
          message.warning('请重试')
        } else {
          message.success(res.data.message)
          this.getFollowUpRecord()
        }
      })
      .catch((res) => {
        console.log(res);
      })

  }

  getFollowUpRecord() {
    axios({
      method: 'get',
      url: `${base.url}/follow/get-record`,
      params: {
        token: this.state.token,
        businessId: this.state.record.id,
        businessTypeId: 5
      },

    })
      .then((res) => {
        console.log(res);
        if (res.data.code === 'ERROR') {

        } else {
          this.setState({
            followUpRecordArr: res.data.data
          })
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  onChangeFollowRecord(e) {
    this.setState({
      followRecord: e.target.value
    })
  }



  //是否添加到日程提醒
  onChangeRemind(e) {
    let remind = e.target.checked ? 1 : 0
    this.setState({
      remind: remind
    })
  }

  onChangeRecordType(val) {
    console.log(val);
  }

  createFollowUpRecord() {
    axios({
      method: 'post',
      url: `${base.url}/follow/add?`,
      params: {
        token: this.state.token
      },
      data: qs.stringify({
        businessId: this.state.record.id,
        businessTypeId: 5, //线索id为5
        followRecord: this.state.followRecord,
        nextTime: this.state.nextTime,
        recordType: this.state.recordType,
        remind: this.state.remind
      })
    })
      .then((res) => {
        console.log(res);
        if (res.data.message == '保存成功') {
          message.success(res.data.message)
          this.getFollowUpRecord()
        } else {
          message.warning('请重试')
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  onChangeDate(date, dateString) {
    console.log(typeof (dateString));
    this.setState({
      nextTime: dateString
    })
  }


  getEmployeeName() {
    axios.get(`${base.url}/employee/getEmployeeName`, {
      params: {
        token: this.state.token
      }
    })
      .then((res) => {
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

  getClue() {
    //获取线索
    axios.get(`${base.url}/clue/my-clue?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        // keyWord: this.state.keyWord
      }
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.setState({
            tableArr: res.data.data.data,
            pagination: res.data.data.pagination
          })
        }


      })
  }


  createCluet() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    var reg = /\s/;
    if (data.nextTalkTime == undefined || data.clientLevel == undefined
      || data.clientType == undefined || data.clueFrom == undefined || data.company == undefined
      || !this.state.customerName
    ) {
      message.warning('请填写必填选项');
    } else if (data.nextTalkTime.indexOf(' ') == 0 || data.clientLevel.indexOf(' ') == 0
      || data.clientType.indexOf(' ') == 0 || data.clueFrom.indexOf(' ') == 0 || data.company.indexOf(' ') == 0) {
      message.warning('请勿输入空格')
    } else {
      axios({
        method: "post",
        url: `${base.url}/clue/add`,
        params: {
          token: this.state.token,
        },

        data: qs.stringify({
          address: data.address,
          clientLevel: data.clientLevel,
          clientName: this.state.customerName,
          clientType: data.clientType,
          clueFrom: data.clueFrom,
          company: data.company,
          content: data.content,
          currency: data.currency,
          mobile: data.mobile,
          nextTalkTime: data.nextTalkTime,
          phone: data.phone,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error('请重试');
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()
          this.getClue()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }
  editClue() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    if (data.nextTalkTime == undefined || data.clientLevel == undefined
      || data.clientType == undefined || data.clueFrom == undefined || data.company == undefined
      || !this.state.customerName
    ) {
      message.warning('请填写必填选项');
    } else if (data.nextTalkTime.indexOf(' ') == 0 || data.clientLevel.indexOf(' ') == 0
      || data.clientType.indexOf(' ') == 0 || data.clueFrom.indexOf(' ') == 0 || data.company.indexOf(' ') == 0) {
      message.warning('请勿输入空格')
    } else {
      axios({
        method: "post",
        url: `${base.url}/clue/update`,
        params: {
          token: this.state.token,
        },

        data: qs.stringify({
          address: data.address,
          clientLevel: data.clientLevel,
          clientName: this.state.customerName,
          clientType: data.clientType,
          clueFrom: data.clueFrom,
          company: data.company,
          content: data.content,
          currency: data.currency,
          mobile: data.mobile,
          nextTalkTime: data.nextTalkTime,
          phone: data.phone,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error('请重试');
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()
          this.getClue()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }



  formRef = React.createRef()
  submit() {

    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.state.isCreate ?
      this.createCluet()
      :
      this.editClue()

  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取线索
    axios.get(`${base.url}/clue/search`, {
      params: {
        token: this.state.token,
        clientName: val
      },
      // data: qs.stringify({
      // })
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {

        }
        // else {
        //   this.setState({
        //     tableArr: res.data.data.data,
        //     pagination: res.data.data.pagination
        //   })
        // }
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
      this.getClue()
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
          clientLevel: this.state.record.clientLevel,
          // clientName: this.state.record.clientName,
          clientType: this.state.record.clientType,
          clueFrom: this.state.record.clueFrom,
          company: this.state.record.company,
          content: this.state.record.content,
          // createTime: this.state.record.createTime,
          currency: this.state.record.currency,
          // departmentId: this.state.record.departmentId,
          // employeeCreateId: this.state.record.employeeCreateId,
          // employeeResponsibleId: this.state.record.employeeResponsibleId,
          mobile: this.state.record.mobile,
          nextTalkTime: this.state.record.nextTalkTime,
          phone: this.state.record.phone,
          record: this.state.record.record,
          // updateTime: this.state.record.updateTime,
          address: this.state.record.address
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
          <span style={{ fontSize: '18px' }}>线索管理</span>
          <Search placeholder='请输入线索名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建线索</Button>
            <Modal
              // mask={false}
              maskStyle={{ backgroundColor: "#fff" }}
              visible={this.state.visible}
              title={this.state.isCreate ? "新建线索" : '编辑线索'}
              okText="确认"
              cancelText="取消"
              // confirmLoading={true}
              onCancel={this.onCancel}
              onOk={this.submit}
              bodyStyle={{ height: '280px', overflowY: 'auto' }}

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
                    name="clientName"
                    label="客户姓名"
                    rules={[
                      {
                        required: true,
                        message: '客户姓名不能为空',
                      },
                    ]}
                  >
                    {/* <Input /> */}
                    <GetCustomer methods={(val) => { this.getCustomerId(val) }}  ></GetCustomer>
                  </Form.Item>
                  <Form.Item
                    name="mobile"
                    label="手机号"
                  >
                    <Input></Input>
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="phone"
                    label="电话"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="地址"
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="clueFrom"
                    label="线索来源"
                    rules={[
                      {
                        required: true,
                        message: '线索来源不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="company"
                    label="公司"
                    rules={[
                      {
                        required: true,
                        message: '公司不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                </div>


                <div>
                  <Form.Item
                    name="clientType"
                    label="客户类型"
                    rules={[
                      {
                        required: true,
                        message: '客户类型不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="clientLevel"
                    label="客户等级"
                    rules={[
                      {
                        required: true,
                        message: "客户等级不能为空"
                      }
                    ]}
                  >
                    <Input />
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
                    name="nextTalkTime"
                    label="下次联系时间"
                    rules={[
                      {
                        required: true,
                        message: '下次联系时间不能为空'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                </div>
                <div>
                  <Form.Item
                    name="currency"
                    label="货币"
                  >
                    <Input />
                  </Form.Item>
                </div>

              </Form>
            </Modal>
          </div>
        </div>

        <div>
          <div style={{ height: 20 }}
            onClick={() => {
              console.log(this.state.employeeArr)
            }}
          >

          </div  >

          <div >
            <div>
              <Table

                columns={Data.columns}
                dataSource={this.state.tableArr}
                scroll={{ x: 1500 }}
                pagination={null}
                defaultCurrent={1}
                onRow={(record) => ({
                  onClick: () => {
                    console.log(record);
                    this.setState({
                      drawerVisible: true,
                      record: record,
                      drawerTitle: record.clientName

                    }, () => {
                      console.log(this.state.record.id);
                      this.getFollowUpRecord()
                    })
                  },
                })}

              ></Table>
                      <div style={{ position: 'absolute', bottom: '30px', right: '20px' }}>

                <ConfigProvider locale={zhCN}>
                  <Pagination showQuickJumper
                    showSizeChanger
                    responsive={true}
                    size={'small'}
                    defaultPageSize={10}
                    showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />                </ConfigProvider>
              </div>
              <Drawer
                title={this.state.drawerTitle}
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

                    <Button type='primary'
                      style={{ marginLeft: '20px' }}
                      size={'small'}
                      onClick={() => {
                        this.moveClue()
                      }}
                    >删除</Button>


                    <Button type='primary' size={'small'}
                      style={{ marginLeft: '20px' }}
                      onClick={() => {
                        this.setVisible()
                        this.setState({
                          isCreate: false,
                          formTitle: '新建线索'

                        })
                      }}

                    >编辑</Button>


                    <Button type='default' size={'small'} style={{ marginLeft: '20px', backgroundColror: '#fff !important', color: 'black !important' }}

                      onClick={() => {
                        this.transferCustomer()
                      }}
                    >转移为客户</Button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px' }}>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>线索来源</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.clueFrom}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>手机</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.mobile ? this.state.record.mobile : '无'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>负责人ID</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.employeeResponsibleId}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>更新时间</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.updateTime}</span>
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
                                <div>{this.state.record.clientName}</div>
                              </div>
                              <div>
                                <div>电话</div>
                                <div>{this.state.record.phone}</div>
                              </div>
                              <div>
                                <div>线索来源</div>
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
                                <div>线索类型</div>
                                <div>{this.state.record.clientType}</div>
                              </div>
                              <div>
                                <div>客户等级</div>
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
                          <TextArea style={{ height: 100 }} onChange={this.onChangeFollowRecord} ></TextArea>
                        </div>
                        <div style={{ fontSize: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            记录类型
                            &nbsp;
                            &nbsp;
                            <Select style={{ width: 200 }} onChange={this.onChangeRecordType}>
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
                                <DatePicker showTime onChange={this.onChangeDate} />
                              </Space>,
                            </ConfigProvider>
                            <Checkbox
                              style={{ fontSize: 12 }}
                              onChange={this.onChangeRemind}  //是否添加到日程
                            >
                              添加到日常提醒
                            </Checkbox>
                          </div>
                          <div>
                            <Button
                              onClick={this.createFollowUpRecord}
                              size={'small'}>发布</Button>
                          </div>
                        </div>
                        {
                          this.state.followUpRecordArr ? this.state.followUpRecordArr.map((item, index) => {
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
                                        // <img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fc8%2Fdd%2Fb9%2Fc8ddb934a69d90216f1b406cf3975475.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627462261&t=4e52d02794c760fb28e678c680fa467e'  />
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
                        }
                      </TabPane>
                      {/* <TabPane tab="商机" key="3">
                        <GetBizOpp value={this.state.record.id} ></GetBizOpp>
                      </TabPane> */}
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

export default Clue;



