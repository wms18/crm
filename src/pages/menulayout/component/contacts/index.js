import React, { Component } from "react";
import axios from 'axios';
import base from "../../../../axios/axios";
import qs from 'qs'
import './style.css'
import GetBizOpp from './GetBizOpp'
import GetCustomer from '../../../../components/getCustomer';
import MapControl from '../../../../components/mapControl'
import GetEmployee from "../../../../components/getEmployee";
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Popconfirm, Tag
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";

const { TabPane } = Tabs
const { Option } = Select
const { Search, TextArea } = Input
const { Content, Footer, Header } = Layout

class Contacts extends Component {

  componentDidMount() {

    this.getContacts()
    this.getEmployeeName()
  }

  constructor(props) {
    super(props)
    this.state = {

      drawerVisible: false,

      token: window.localStorage.getItem('token'),



      isCreate: true,
      formTitle: '新建联系人',

      transferVisible: false,


      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,


      csrName: '',  //编辑时传入的客户名称
      customerID: '',   //新建时传入的客户id
      address: '',    //编辑时传给地图组组件的值
      detailAddr: '', //新建时传入的详细地址
      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      employeeArr: '',

      //转移负责人
      empResponseID: '',  //负责人id


      //跟进记录
      followUpRecordArr: "",
      followUpnextTIme: '',
      remind: '',
      followRecord: '',
      recordType: "",
      // 表格行点击时产品信息
      record: "",

      // 搜素联系人名称
      keyWord: '',




    }
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.submit = this.submit.bind(this)
    this.getContacts = this.getContacts.bind(this)
    this.createContacts = this.createContacts.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setTransferVisible = this.setTransferVisible.bind(this)
    this.getEmployeeName = this.getEmployeeName.bind(this)
    this.getCustomerID = this.getCustomerID.bind(this)
    this.editContactInfo = this.editContactInfo.bind(this)
    this.deleteContacts = this.deleteContacts.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeRemind = this.onChangeRemind.bind(this)
    this.onChangeFollowRecord = this.onChangeFollowRecord.bind(this)
    this.onChangeRecordType = this.onChangeRecordType.bind(this)
    this.createFollowUpRecord = this.createFollowUpRecord.bind(this)
    this.getFollowUpRecord = this.getFollowUpRecord.bind(this)
    this.deleteFollowUpRecord = this.deleteFollowUpRecord.bind(this)
    this.changeEmpRespon = this.changeEmpRespon.bind(this)
    this.transferSubmit = this.transferSubmit.bind(this)
    this.alterEmpRespon = this.alterEmpRespon.bind(this)
  }



  //转移负责人
  alterEmpRespon() {


    // //获取联系人id
    // axios({
    //   method:'get',
    //   url:`${base.url}/linkman/information`,
    //   params:{
    //     id :this.state.record.id
    //   }
    // })
    // .then((res)=>{
    //   console.log(res);
    //   // if(res.data.code=='ERROR'){

    //   // }else{
    //   //   this.setState({
    //   //     employeeResponsibleId:res.data.data.employeeResponsibleId
    //   //   })
    //   // }
    // })
    // .catch((res)=>{

    // })

    axios({
      method: 'post',
      url: `${base.url}/linkman/tranfer?linkmanIds=` + this.state.record.id,
      params: {
        token: this.state.token,
        employeeResponsibleId: this.state.empResponseID
      }
    })
      .then((res) => {
        // console.log(res);
        if (res.data.code == 'ERROR') {
          message.warning(res.data.message)
        } else {
          message.success('已转移负责人')
          // this.setState({
          //   transferVisible: !this.state.transferVisible
          // })
          this.getContacts()
          this.setTransferVisible()
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }



  //转移负责人弹窗保存
  transferSubmit() {
    // setTransferVisible
    this.alterEmpRespon()
  }

  //转移负责人组件获取负责人id
  changeEmpRespon(val) {
    this.setState({
      empResponseID: val
    })


  }

  //删除跟进记录
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

  //获取跟进记录
  getFollowUpRecord() {
    axios({
      method: 'get',
      url: `${base.url}/follow/get-record`,
      params: {
        token: this.state.token,
        businessId: this.state.record.id,
        businessTypeId: 2  //联系人类型，id为1
      },

    })
      .then((res) => {
        console.log(res);
        if (res.data.code == 'ERROR') {

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


  //创建跟进记录
  createFollowUpRecord() {
    axios({
      method: 'post',
      url: `${base.url}/follow/add?`,
      params: {
        token: this.state.token
      },
      data: qs.stringify({
        businessId: this.state.record.id,
        businessTypeId: 2, //联系人类型id为1
        followRecord: this.state.followRecord,
        nextTime: this.state.followUpnextTIme,
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


  //跟进记录类型
  onChangeRecordType(val) {
    console.log(val);
    this.setState({
      recordType: val
    })
  }

  //跟进记录内容
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


  //编辑客户信息
  editContactInfo() {

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
        method: 'post',
        url: `${base.url}/linkman/edit`,
        params: {
          token: this.state.token,
        },
        data: qs.stringify({
          clientId: this.state.customerID,
          content: data.content,
          decision: data.decision,
          detailAddress: this.state.detailAddr,
          email: data.email,
          linkmanName: data.linkmanName,
          nextTalkTime: data.nextTalkTime,
          phone: data.phone,
          role: data.role,
          sex: data.sex,
        })
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === "ERROR") {
            message.error('请重试');
            // this.onCancel()
          } else {
            message.success(res.data.message);
            this.onCancel()
            this.getContacts()
          }
        }).catch((error) => {
          console.log(error);
        })
    }

  }

  //从地图组件获取详细地址
  getAddr(val) {
    console.log(val);
    this.setState({
      detailAddr: val

    })

  }


  getCustomerID(val) {
    console.log(val);
    this.setState({
      customerID: val ? val[0].id : ''
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


  //跟进记录日期
  onChangeDate(date, dateString) {
    console.log(date, dateString);
    this.setState({
      followUpnextTIme: dateString
    })

  }
  dropdownMenu() {
    const menu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            Modal.confirm({
              title: '确认删除',
              icon: <ExclamationCircleOutlined />,
              content: '确认删除此联系人么？',
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

        <Menu.Item

          onClick={() => {
            Modal.confirm({
              title: '确认转移',
              icon: <ExclamationCircleOutlined />,
              content: '确认转移为商机么?',
              okText: '转移',
              okType: '',
              cancelText: '取消',
              onOk: () => {
                // this.handleOk(id)//确认按钮的回调方法，在下面
                // <Alert message="已取消转移" type="success" showIcon />
                message.success('已成功转移')
              }
              ,
              onCancel() {
                message.warning('已取消')
                // <Alert message="已取消转移" type="info" showIcon />
              },
            });
          }}>
          转移为联系人
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




  getContacts() {
    //获取联系人
    axios({
      method: 'get',
      url: `${base.url}/linkman/all`,
      params: {
        token: this.state.token,
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
  }


  createContacts() {
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
        method: 'post',
        url: `${base.url}/linkman/add`,
        params: {
          token: this.state.token,
        },
        data: qs.stringify({
          clientId: this.state.customerID,
          content: data.content,
          decision: data.decision,
          detailAddress: this.state.detailAddr,
          email: data.email,
          linkmanName: data.linkmanName,
          nextTalkTime: data.nextTalkTime,
          phone: data.phone,
          role: data.role,
          sex: data.sex,
        })
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === "ERROR") {
            message.error('请重试');
            // this.onCancel()
          } else {
            message.success(res.data.message);
            this.getContacts()
            this.onCancel()
          }
        }).catch((error) => {
          console.log(error);
        })
    }

  }

  deleteContacts() {
    axios({
      method: 'post',
      url: `${base.url}/linkman/delete?ids=` + this.state.record.id,
      params: {
        token: this.state.token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.code == "ERROR") {
          message.error('请重试');
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.getContacts()
        }
      }).catch((error) => {
        console.log(error);
      })
  }



  formRef = React.createRef()
  submit() {

    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.createContacts()

  }




  //搜索联系人
  onSearch(val) {

    axios({
      method: 'get',
      url: `${base.url}/linkman/search`,
      params: {
        token: this.state.token,
        keyWord: val,
        currentPage: this.state.currentPage,
        limit: this.state.limit
      }
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
      this.getContacts()
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
          clientName: this.state.record.clientName,
          createTime: this.state.record.createTime,
          decision: this.state.record.decision,
          detailAddress: this.state.record.detailAddress,
          email: this.state.record.email,
          employeeCreateName: this.state.record.employeeCreateName,
          employeeResponsibleName: this.state.record.employeeResponsibleName,
          linkmanName: this.state.record.linkmanName,
          mobile: this.state.record.mobile,
          nextTalkTime: this.state.record.nextTalkTime,
          phone: this.state.record.phone,
          role: this.state.record.role,
          sex: this.state.record.sex,
          updateTime: this.state.record.updateTime.sex,
          // record: this.state.record.record,
        })
      }
    }, 100);
  };

  onCancel() {

    this.setState({
      visible: false,
      isCreate: true,
      address: '',  //编辑显示信息传入子组件的详细地址
      csrName: ''  //编辑显示信息传入子组件的客户名称
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
          <span style={{ fontSize: '18px' }}>联系人管理</span>
          <Search placeholder='请输入联系人名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建联系人</Button>
            <Modal
              visible={this.state.visible}
              title={this.state.isCreate ? '新建联系人' : '编辑联系人'}
              okText="确认"
              cancelText="取消"
              onCancel={this.onCancel}
              onOk={() => {
                this.state.isCreate ?
                  this.submit()
                  :
                  this.editContactInfo()

              }}

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
                    name="clientId"
                    label="客户Id"   //客户名称
                    rules={[
                      {
                        required: true,
                        message: '客户姓名不能为空',
                      },
                    ]}
                  >
                    <GetCustomer  methods={(val) => { this.getCustomerID(val) }} ></GetCustomer>

                  </Form.Item>
                  <Form.Item
                    name="content"
                    label="备注"
                  >
                    <Input></Input>
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="decision"
                    label="是否未关键决策人"

                  >
                    <Select style={{ width: 184 }} >
                      <Option value={true} >是</Option>
                      <Option value={false} >否</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="role"
                    label="职位"
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="email"
                    label="邮箱"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="sex"
                    label="性别"
                  >
                    <Select style={{ width: 184 }} >
                      <Option value={true}>男</Option>
                      <Option value={false}>女</Option>
                    </Select>
                  </Form.Item>

                </div>


                <div>
                  <Form.Item
                    name="linkmanName"
                    label="联系人姓名"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="mobile"
                    label="电话号"
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
                    label="手机号"

                  >
                    <Input />
                  </Form.Item>

                </div>
                <div>
                  <Form.Item
                    name="detailAddress"
                    label="详细地址"
                  >
                    {/* <Input /> */}
                    <MapControl detailAddr={this.state.address} method={(val) => { this.getAddr(val) }} ></MapControl>
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
            <div >
              <Table

                columns={Data.columns}
                dataSource={this.state.tableArr}
                scroll={{ x: 1500, y: '26vw' }}
                pagination={{ pageSize: this.state.pagination.limit }}
                defaultCurrent={1}
                onRow={(record) => ({
                  onClick: () => {
                    console.log(record);
                    this.getFollowUpRecord()
                    this.setState({
                      drawerVisible: true,
                      record: record,
                      linkmanName: record.linkmanName,
                      detailAddr: record.detailAddress

                    })
                  },
                })}

              ></Table>
              <div style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
                <ConfigProvider locale={zhCN}>
                  <Pagination showQuickJumper
                    responsive={true}
                    showSizeChanger
                    defaultPageSize={10}
                    size={'small'}
                    showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
                </ConfigProvider>
              </div>
              <Drawer
                mask={false}
                title={[
                  <div>{this.state.linkmanName}</div>
                ]}
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
                      title="转移联系人"
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
                          <span>变更负责人</span>
                          <GetEmployee contentResponsible={(val) => { this.changeEmpRespon(val) }}  ></GetEmployee>

                        </div>
                      </div>

                    </Modal>
                    <Button type='primary' size={'small'}
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        this.setVisible()
                        this.setState({
                          isCreate: false,
                          formTitle: '新建联系人',
                          address: this.state.record.detailAddress,  //编辑显示信息传入子组件的详细地址
                          csrName: this.state.record.clientName  //编辑显示信息传入子组件的客户名称
                        })
                      }}

                    >编辑</Button>


                    {/* <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}> */}
                    <Button type='primary' size={'small'} style={{ marginLeft: '10px' }}
                      onClick={() => {
                        Modal.confirm({
                          title: '确认删除',
                          icon: <ExclamationCircleOutlined />,
                          content: '确认删除此联系人么？',
                          okText: '是',
                          okType: '',
                          cancelText: '否',
                          onOk: () => {
                            // this.handleOk(id)//确认按钮的回调方法，在下面
                            // message.success('已成功刪除')
                            this.deleteContacts()
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
                      <div style={{ fontSize: 12, color: '#777' }}>联系人级别</div>
                      <div style={{ fontSize: 14 }}>{this.state.record.clientLevel ? this.state.record.clientLevel : ' '}</div>
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
                                <div>联系人名称</div>
                                <div>{this.state.record.clientName}</div>
                              </div>
                              <div>
                                <div>电话</div>
                                <div>{this.state.record.phone}</div>
                              </div>
                              <div>
                                <div>联系人来源</div>
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
                                <div>联系人类型</div>
                                <div>{this.state.record.clientType}</div>
                              </div>
                              <div>
                                <div>联系人等级</div>
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
                                <DatePicker onChange={this.onChangeDate} />
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
                      </TabPane>

                      <TabPane tab="商机" key="5">
                        <GetBizOpp value={this.state.record.id} ></GetBizOpp>
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

export default Contacts;



