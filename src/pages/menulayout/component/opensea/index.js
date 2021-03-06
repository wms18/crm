import React, { Component } from "react";
import axios from 'axios';
import base from "../../../../axios/axios";
import qs from 'qs'
import './style.css'
import GetBizOpp from "./getBussinessOpp";
import GetContract from "./getContract";
import GetPayment from "./getPayment";
import GetEmployee from "../../../../components/getEmployee";
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Tag, Popconfirm
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js";
import MapControl from "../../../../components/mapControl";
import GdMap from '../../../../components/gdMap'


const { TabPane } = Tabs
const { Option } = Select
const { Search, TextArea } = Input
const { Content, Footer, Header } = Layout

class Opensea extends Component {

  componentDidMount() {

    this.getCustomer()
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
      empResponseID: '',

      isCreate: true,
      formTitle: '新建公海',

      transferVisible: false,

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,


      isDistribution: '',  //是否是分配
      editAddr: '',
      CsrAddr: '',
      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      employeeArr: '',

      // 表格行点击时公海信息
      record: "",

      // 搜素公海名称
      keyword: '',





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
    this.giveMethCreate = this.giveMethCreate.bind(this)
    this.giveMethResponsible = this.giveMethResponsible.bind(this)
    this.getOneClient = this.getOneClient.bind(this)
    this.getOneClient = this.getOneClient.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this)
    this.editCsrInfo = this.editCsrInfo.bind(this)
    this.putIntoSea = this.putIntoSea.bind(this)
    this.lockCsr = this.lockCsr.bind(this)
    this.unLockCsr = this.unLockCsr.bind(this)
    this.alterDealstatus = this.alterDealstatus.bind(this)
    this.changeEmpRespon = this.changeEmpRespon.bind(this)
    this.alterEmpRespon = this.alterEmpRespon.bind(this)
    this.transferSubmit = this.transferSubmit.bind(this)
    this.distributionCsr = this.distributionCsr.bind(this)
    this.receiveCsr = this.receiveCsr.bind(this)


  }

  //分配公海员工的id
  changeEmpRespon(val) {
    this.setState({
      empResponseID: val
    })


  }

  alterEmpRespon() {
    axios({
      method: 'post',
      url: `${base.url}/client/changeResponsibleEmployee`,
      params: {
        token: this.state.token,
        clientId: this.state.record.id,
        employeeId: this.state.empResponseID
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code == 'ERROR') {
          message.warning(res.data.message)
        } else {
          message.success('已转移负责人')
          this.setState({
            transferVisible: !this.state.transferVisible
          })
          this.getCustomer()
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  //更改成交状态
  alterDealstatus() {
    axios({
      method: 'post',
      url: `${base.url}/client/changeDealStatus`,
      params: {
        token: this.state.token,
        clientId: this.state.record.id,
        dealStatus: this.state.dealStatus
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code == 'ERROR') {
          message.warning(res.data.message)
        } else {
          message.success('已改变成交状态')
          this.setState({
            changeDealStatus: false
          })
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  lockCsr() {
    axios({
      method: 'post',
      url: `${base.url}/client/lockClient`,
      params: {
        token: this.state.token,
        clientId: this.state.record.id
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 'ERROR') {
          message.warning(res.data.message)
        } else {

          message.success('已锁定公海,将不会掉入公海')

        }
      })
      .catch((res) => {
        console.log(res);
      })
  }
  unLockCsr() {
    axios({
      method: 'post',
      url: `${base.url}/client/unlockClient`,
      params: {
        token: this.state.token,
        clientId: this.state.record.id
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 'ERROR') {
          message.warning(res.data.message)
        } else {
          message.success('已解锁公海')
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  putIntoSea() {
    axios({
      method: 'post',
      url: `${base.url}/client/intoSea`,
      params: {
        token: this.state.token,
        clientId: this.state.record.id
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 'ERROR') {
          message.warning(res.data.message)
        } else {
          this.getCustomer()
          message.success('已成功放入公海')
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }

  getAddr(val) {
    console.log(val);
    this.setState({
      CsrAddr: val
    })
  }

  getOneClient(id, isCreate) {
    axios({
      method: 'get',
      url: `${base.url}/client/getOneClient`,
      params: {
        clientId: id
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      })
  }


  giveMethCreate(key) {
    this.setState({
      employeeCreateId: key
    }, () => {

    })
  }
  giveMethResponsible(key) {
    this.setState({
      employeeResponsibleId: key
    }, () => {
    })
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
        businessTypeId: 6  //公海类型，id为6  
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

  deleteCustomer() {
    axios({
      method: 'delete',
      url: `${base.url}/client/deleteClient`,
      params: {
        token: this.state.token,
        id: this.state.record.id
      },

    })
      .then((res) => {
        console.log(res);
        if (res.data.code == 'ERROR') {
          message.success('请重试')
          // this.getFollowUpRecord()
        } else {
          message.success('已成功删除')
          this.getCustomer()
        }
      })
      .catch((res) => {
        console.log(res);
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
        businessTypeId: 6, //公海类型id为6
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
            this.setState({
              isDistribution: true
            }, () => {
              this.setTransferVisible()
            })
          }}
        >
          分配
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            this.setState({
              isDistribution: false
            }, () => {
              this.setTransferVisible()
            })
          }}
        >
          领取
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            Modal.confirm({
              title: '确认删除',
              icon: <ExclamationCircleOutlined />,
              content: '确认删除此公海么？',
              okText: '是',
              okType: '',
              cancelText: '否',
              onOk: () => {
                this.deleteCustomer()
              }
              ,
              onCancel() {
                // console.log('Cancel');
                message.warning('已取消删除')
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
    axios.get(`${base.url}/employee/getEmployee`, {
      params: {
        token: this.state.token,
        keyword: this.state.keyword,
        currentPage: this.state.currentPage,
        limit: this.state.limit
      }
    })
      .then((res) => {
        console.log(res);
        if (res.data.code == 'ERROR') {

        } else {
          this.setState({
            employeeArr: res.data.data,
          })
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }


  //转移负责人弹窗关闭
  setTransferVisible() {
    this.setState({
      transferVisible: !this.state.transferVisible
    })
  }


  receiveCsr() {
    axios({
      method: 'post',
      url: `${base.url}/opensea/toClient`,
      params: {
        employeeId: this.state.empResponseID,
        token: this.state.token,
        openseaId: this.state.record.id
      }
    })
      .then((res) => {
        if (res.data.code == 'ERROR') {
          message.warning('请重试')
        } else {
          message.success(this.state.isDistribution ? '分配成功' : "领取成功")
          this.setTransferVisible()
          this.getCustomer()
        }
      })
  }

  distributionCsr() {

  }
  //领取或分配客户
  transferSubmit() {
    this.receiveCsr()

  }

  getCustomer() {
    //获取公海
    axios.get(`${base.url}/opensea/getOpenseas?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        keyword: this.state.keyword
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
          clientName: data.clientName,
          clientLevel: data.clientLevel,
          content: data.content,
          dingtalk: data.dingtalk,
          nextTalkTime: data.nextTalkTime,
          phone: data.phone,
          employeeCreateId: this.state.employeeCreateId,
          employeeResponsibleId: this.state.employeeResponsibleId,
          detailAddress: this.state.CsrAddr
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error('请重试');
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()

          this.getCustomer()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }

  editCsrInfo() {
    const data = this.formRef.current.getFieldsValue();
    console.log(data);
    axios({
      method: 'post',
      url: `${base.url}/client/editClient`,
      params: {
        token: this.state.token
      },
      data: qs.stringify({
        clientId: this.state.record.id,
        certificate: data.certificate,
        certificateId: data.certificateId,
        clientFrom: data.clientFrom,
        clientName: data.clientName,
        clientLevel: data.clientLevel,
        content: data.content,
        dingtalk: data.dingtalk,
        nextTalkTime: data.nextTalkTime,
        phone: data.phone,
        employeeCreateId: this.state.employeeCreateId,
        employeeResponsibleId: this.state.employeeResponsibleId,
        detailAddress: this.state.CsrAddr
      })
    })
      .then((res) => {
        console.log(res);
        if (res.data.code == 'ERROR') {
          message.warning('请重试')
        } else {
          message.success('编辑成功')
          this.getCustomer()
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }



  formRef = React.createRef()
  submit() {

    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.state.isCreate ? this.createCustomer() : this.editCsrInfo()


  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取公海
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
      drawerVisible: false,

      //当drawer
      editAddr: '',
    })
  }
  showDrawer() {
    this.setState({
      drawerVisible: true
    })
  }


  //表格分页
  onChange(page, pageSize) {
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
        // this.formRef.current.resetFields();
      } else {

        this.formRef.current.setFieldsValue({
          certificate: this.state.record.certificate,
          certificateId: this.state.record.certificateId,
          clientFrom: this.state.record.clientFrom,
          clueFrom: this.state.record.clueFrom,
          clientLevel: this.state.record.clientLevel,
          clientName: this.state.record.clientName,
          content: this.state.record.content,
          // detailAddress: this.state.record.detailAddress,
          dingtalk: this.state.record.dingtalk,
          // employeeCreateName: this.state.record.employeeCreateName,
          // employeeResponsibleName: this.state.record.employeeResponsibleName,
          nextTalkTime: this.state.record.nextTalkTime,
          // nextTalkTime: this.state.record.nextTalkTime,
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
          <span style={{ fontSize: '18px' }}>公海管理</span>
          <Search placeholder='请输入公海名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>


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
            <div >
              <ConfigProvider locale={zhCN}>
                <Table

                  columns={Data.columns}
                  dataSource={this.state.tableArr}
                  scroll={{ x: 1500, y: '300px' }}
                  // pagination={{ pageSize: this.state.pagination.limit }}
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
                        let isCreate = 'create'
                        let isResponsible = 'responsible'
                        console.log(this.state.record.id);
                        this.getFollowUpRecord()
                      })
                    },
                  })}

                ></Table>
              </ConfigProvider>
              <div style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
                <ConfigProvider locale={zhCN}>
                  <Pagination showQuickJumper
                    size={'small'}
                    responsive={true}
                    showSizeChanger
                    defaultPageSize={10}
                    showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.pagination.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
                </ConfigProvider>
              </div>
              <Drawer
                title={this.state.record.clientName}
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






                    <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}>
                      <Button type='default' size={'small'} style={{ marginLeft: '20px' }}>更多</Button>
                    </Dropdown>


                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px' }}>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>公海级别</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.clientLevel ? this.state.record.clientLevel : '暂无'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>成交状态</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.dealStatus ? this.state.record.dealStatus : '未成交'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>负责人</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.employeeResponsibleName ?
                        this.state.record.employeeResponsibleName : this.state.record.employeeCreateName
                      }</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>更新时间</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.updateTime}</span>
                    </div>

                  </div>

                  <div>
                    <Tabs defaultActiveKey="1" >
                      <TabPane tab="基本信息" key="1">
                        <Modal
                          visible={this.state.transferVisible}
                          title={this.state.isDistribution ? "分配客户" : '领取客户'}
                          mask={false}
                          // okText="保存"
                          // cancelText="取消"
                          // onOk={this.transferSubmit}
                          footer={[
                            <Button onClick={this.transferSubmit} type='primary'>保存</Button>,
                            <Button onClick={this.setTransferVisible} type='default'>取消</Button>
                          ]}
                        >
                          <div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", width: '263px', margin: '0 auto', alignItems: 'center' }}>
                              <span>{this.state.isDistribution ? "分配" : '领取'}</span>
                              <GetEmployee contentResponsible={(val) => { this.changeEmpRespon(val) }}  ></GetEmployee>

                            </div>
                          </div>

                        </Modal>
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
                                <div>公海来源</div>
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
                                <div>{this.state.record.employeeCreateName}</div>
                              </div>
                              <div>
                                <div>创建时间</div>
                                <div>{this.state.record.createTime}</div>
                              </div>
                            </div>

                            <div>
                              <div>
                                <div>客戶类型</div>
                                <div>{this.state.record.clientType ? this.state.record.clientType : '暂无'}</div>
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
                                <div>{this.state.record.employeeResponsibleName ?
                                  this.state.record.employeeResponsibleName : this.state.record.employeeCreateName
                                }</div>
                              </div>
                            </div>
                          </div>

                          <div>

                          </div>
                        </div>
                      </TabPane>
                      {/* <TabPane tab="跟进记录" key="2">

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

                          </Tabs>
                        </div>
                      </TabPane> */}

                      <TabPane tab="商机" key="5">
                        <GetBizOpp value={this.state.record.id}></GetBizOpp>
                      </TabPane>
                      <TabPane tab="合同" key="6">
                        <GetContract value={this.state.record.id}></GetContract>
                      </TabPane>
                      <TabPane tab="回款信息" key="7">
                        <GetPayment value={this.state.record.id}></GetPayment>
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

export default Opensea;



