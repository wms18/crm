import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import GetBizOpp from "./getBussinessOpp";
import GetContract from "./getContract";
import GetPayment from "./getPayment";
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Tag, Popconfirm
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";


const { TabPane } = Tabs
const { Option } = Select
const { Search, TextArea } = Input
const { Content, Footer, Header } = Layout

class Customer extends Component {

  componentDidMount() {
    this.getCustomer()
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

      //更改成交状态的显示框
      changeDealStatus: false,
      dealStatus: '',

      isCreate: true,
      formTitle: '新建客户',

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
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.submit = this.submit.bind(this)
    this.getCustomer = this.getCustomer.bind(this)
    this.createCustomer = this.createCustomer.bind(this)
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
    this.onChangeFollowDate = this.onChangeFollowDate.bind(this)
    this.deleteFollowUpRecord = this.deleteFollowUpRecord.bind(this)
    this.dropdownMenu = this.dropdownMenu.bind(this)
    this.onChangeDealStatus = this.onChangeDealStatus.bind(this)

  }


  onChangeDealStatus(val) {
    console.log(val);
    this.setState({
      dealStatus: val
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
        businessTypeId: 1  //客户类型，id为1
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
    this.setState({
      recordType: val
    })
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
        businessTypeId: 1, //客户类型id为1
        followRecord: this.state.followRecord,
        nextTime: this.state.nextTime,
        recordType: this.state.recordType,
        remind: this.state.remind
      })
    })
      .then((res) => {
        console.log(res);
        if (res.data.message == '保存成功') {
          message.success('新增成功')
          this.getFollowUpRecord()
        } else {
          message.warning('请重试')
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }
  onChangeFollowDate(date, dateString) {
    console.log(typeof (dateString));
    this.setState({
      nextTime: dateString
    })
  }


  onChangeDate(date, dateString) {
    console.log(date, dateString);
  }
  dropdownMenu() {
    const menu = (
      <Menu>
        <Menu.Item

          onClick={() => {
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确认放入公海么?',
              okText: '确定',
              okType: '',
              cancelText: '取消',
              onOk: () => {
                // this.handleOk(id)//确认按钮的回调方法，在下面
                // <Alert message="已取消转移" type="success" showIcon />
                message.success('已成功放入公海')
              }
              ,
              onCancel() {
                message.warning('已取消放入公海')
                // <Alert message="已取消转移" type="info" showIcon />
              },
            });
          }}>
          放入公海
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            this.setState({
              changeDealStatus: true
            })
          }}
        >
          更改成交状态
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确定要锁定这个客户么？锁定后将不会掉入公海',
              okText: '确认',
              okType: '',
              cancelText: '取消',
              onOk: () => {
                // this.handleOk(id)//确认按钮的回调方法，在下面
                message.success('已成功锁定')
              }
              ,
              onCancel() {
                message.warning('已取消锁定')
              },
            });
          }}
        >
          锁定
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确定要解鎖这个客户么？',
              okText: '确认',
              okType: '',
              cancelText: '取消',
              onOk: () => {
                // this.handleOk(id)//确认按钮的回调方法，在下面
                message.success('已成功解鎖')
              }
              ,
              onCancel() {
                message.warning('已取消解锁')
              },
            });
          }}
        >
          解锁
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            Modal.confirm({
              title: '确认删除',
              icon: <ExclamationCircleOutlined />,
              content: '确认删除此客户么？',
              okText: '是',
              okType: '',
              cancelText: '否',
              onOk: () => {
                // this.handleOk(id)//确认按钮的回调方法，在下面
                console.log('确认');
              }
              ,
              onCancel() {
                console.log('Cancel');
              },
            });
          }}
        >
          删除
        </Menu.Item>


      </Menu>
    )
    return menu
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

  getCustomer() {
    //获取客户
    axios.get(`${base.url}/client/getClient?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        keyWord: this.state.keyWord
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
  }


  createCustomer() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
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
        url: `${base.url}/client/create?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit,
        params: {
          token: this.state.token,
        },
        // .replace(/\s+/g,'')
        data: qs.stringify({
          certificate: data.certificate,
          certificateId: data.certificateId,
          clientFrom: data.clientFrom,
          clientLevel: data.clientName,
          content: data.content,
          dingtalk: data.dingtalk,
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
          // this.onCancel()

          this.getCustomert()
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
    this.createCustomer()

  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取客户
    axios.get(`${base.url}/client/getClient?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
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
      this.getCustomer()
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
          certificate: this.state.record.certificate,
          certificateId: this.state.record.certificateId,
          clientFrom: this.state.record.clientFrom,
          clueFrom: this.state.record.clueFrom,
          clientLevel: this.state.record.clientLevel,
          clientName: this.state.record.clientName,
          content: this.state.record.content,
          detailAddress: this.state.record.detailAddress,
          dingtalk: this.state.record.dingtalk,
          employeeCreateId: this.state.record.employeeCreateId,
          employeeResponsibleId: this.state.record.employeeResponsibleId,
          nextTalkTime: this.state.record.nextTalkTime,
          nextTalkTime: this.state.record.nextTalkTime,
          phone: this.state.record.phone,
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
          <span style={{ fontSize: '18px' }}>客户管理</span>
          <Search placeholder='请输入客户名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建客户</Button>
            <Modal
              visible={this.state.visible}
              title={this.state.isCreate ? '新建客户' : '编辑客户'}
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
                    name="certificate "
                    label="客户证件类型"
                    rules={[
                      {
                        required: true,
                        message: '客户证件类型不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="certificateId"
                    label="客户证件号"
                  >
                    <Input></Input>
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="clientFrom"
                    label="客户来源"
                    rules={[
                      {
                        required: true,
                        message: '客户来源不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="clientLevel"
                    label="客户级别"
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="clientName"
                    label="客户名称"
                    rules={[
                      {
                        required: true,
                        message: '客户名称不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="content"
                    label="备注"
                  >
                    <Input />
                  </Form.Item>

                </div>


                <div>
                  <Form.Item
                    name="detailAddress"
                    label="详细地址"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="dingtalk"
                    label="钉钉"
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
                    name="nextTalkTime"
                    label="下次联系时间"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="客户手机号"
                    rules={[
                      {
                        required: true,
                        message: '客户手机号不能为空'
                      }
                    ]}
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
                      drawerTitle: record.clientFrom,
                      dealStatus: record.dealStatus

                    }, () => {
                      console.log(this.state.record.id);
                      this.getFollowUpRecord()
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
                    <Button
                      type='primary'
                      size={'small'}
                      onClick={() => {
                        this.setTransferVisible()
                      }}
                    >转移</Button>

                    <Modal
                      visible={this.state.transferVisible}
                      title="转移客户"
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
                      onClick={() => {
                        this.setVisible()
                        this.setState({
                          isCreate: false,
                          formTitle: '新建客户'

                        })
                      }}

                    >编辑</Button>


                    <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}>
                      <Button type='default' size={'small'} style={{ marginLeft: '10px' }}>更多</Button>
                    </Dropdown>

                    <Modal
                      visible={this.state.changeDealStatus}
                      mask={false}
                      title="更改成交状态"
                      style={{ width: '400px !important' }}
                      // onOk={}
                      onCancel={() => {
                        this.setState({
                          changeDealStatus: false
                        })
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                        <span>成交状态：</span>
                        <Select showArrow={true} value={this.state.dealStatus}
                          style={{ width: 350 }}
                          onChange={this.onChangeDealStatus}
                        >
                          <Option value='已成交' >已成交</Option>
                          <Option value='未成交' >未成交</Option>
                        </Select>
                      </div>

                    </Modal>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px' }}>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>客户级别</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.clientLevel}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>成交状态</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.dealStatus ? this.state.record.mobile : '未成交'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>负责人</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.employeeResponsibleName}</span>
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
                                <div>客户来源</div>
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
                                <div>客户类型</div>
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
                          <TextArea style={{ height: 100 }}
                            onChange={this.onChangeFollowRecord}
                          ></TextArea>
                        </div>
                        <div style={{ fontSize: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            记录类型
                            &nbsp;
                            &nbsp;
                            <Select style={{ width: 200 }}
                              onChange={this.onChangeRecordType}
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
                                <DatePicker onChange={this.onChangeFollowDate} />
                              </Space>,
                            </ConfigProvider>
                            <Checkbox style={{ fontSize: 12 }} onChange={this.onChangeRemind} >
                              添加到日常提醒
                            </Checkbox>
                          </div>
                          <div>
                            <Button size={'small'}
                              onClick={this.createFollowUpRecord}
                            >发布</Button>
                          </div>
                        </div>
                        <div style={{ border: '1px solid rgb(230, 230, 230)', marginTop: '20px' }}>
                          <Tabs defaultActiveKey="1" >
                            <TabPane tab="跟进记录" key="1">

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
                      <TabPane tab="相关团队" key="4">
                      </TabPane>
                      <TabPane tab="商机" key="5">
                        <GetBizOpp value={this.state.record.id}></GetBizOpp>
                      </TabPane>
                      <TabPane tab="合同" key="6">
                        <GetContract value={this.state.record.id}></GetContract>
                      </TabPane>
                      <TabPane tab="回款信息" key="7">
                        <GetPayment value={this.state.record.id}></GetPayment>
                      </TabPane>
                      <TabPane tab="附件" key="8">
                      </TabPane>
                      <TabPane tab="操作记录" key="9">
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

export default Customer;



