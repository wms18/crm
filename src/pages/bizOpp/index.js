import React, { Component } from "react";
import axios from 'axios';
import base from "../../axios/axios";
import qs from 'qs'
import './style.css'
import GetProduct from "./getProduct";
import GetProductTable from "../../components/getProductTable";
import GetCustomer from "../../components/getCustomer";
import AddedProduct from "../../components/addedProduct";
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Steps
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import locale from 'antd/es/date-picker/locale/zh_CN';
import GetEmployee from "../../components/getEmployee";
import Data from "./js/index";

const { Step } = Steps;
const { TabPane } = Tabs
const { Option, TextArea } = Select
const { Search } = Input
const { Content, Footer, Header } = Layout


class BizOpp extends Component {



  componentDidMount() {

    axios.get('http://47.117.138.37:8088/dashboard/powerPoint', {
      params: {
        token: this.state.token,
      }
      ,
      data: qs.stringify({
        startTime: '2000-01-01',
        endTime: '2021-06-01',
        ids: [{
          ids: 1
        },
        { ids: 2 }],

      })
    })
      .then((res) => {
        console.log(res);
      })

    this.getBizOpp()
    this.getEmployeeName()
  }

  constructor(props) {
    super(props)
    this.state = {

      dataPickerValue: '请选择日期',
      drawerVisible: false,

      token: window.localStorage.getItem('token'),
      modalProVisible: false,

      productArr: '',   //新建时添加的产品信息,是数组
      customerId: '',  //新建时添加的客户id
      isCreate: true,
      formTitle: '新建商机',

      transferVisible: false,

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      addedProduct: '',   //已添加的产品信息
      loading: false,

      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      employeeArr: '',

      // 表格行点击时产品信息
      record: "",

      // 搜素商机名称
      keyword: '',

      //转移负责人
      empResponseID: '',


    }
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.submit = this.submit.bind(this)
    this.getBizOpp = this.getBizOpp.bind(this)
    this.createBizOpp = this.createBizOpp.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setTransferVisible = this.setTransferVisible.bind(this)
    this.getEmployeeName = this.getEmployeeName.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.setModalProVisible = this.setModalProVisible.bind(this)
    this.getCustomerId = this.getCustomerId.bind(this)
    this.alterEmpRespon = this.alterEmpRespon.bind(this)
    this.transferSubmit = this.transferSubmit.bind(this)
    this.transferSubmit = this.transferSubmit.bind(this)
    this.editBizopp = this.editBizopp.bind(this)
  }

  formRef = React.createRef()




  editBizopp() {

    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data);
    console.log(this.state.submissionTime);
    var reg = /\s/;
    if (
      !this.state.customerId || !data.commercialStage || !data.commercialStatusGroup ||
      data.name == undefined || !this.state.submissionTime

    ) {
      message.error('请填写必填选项');
    } else if (data.name.indexOf(' ') == 0) {
      message.error('请不要输入空格');
    }
    else {
      axios({
        method: "post",
        url: `${base.url}/commercialOpportunity/update`,
        params: {
          token: this.state.token,
          id: this.state.record.commercialOpportunityId
        },
        data: qs.stringify({
          clientId: this.state.customerId,
          commercialPrice: data.commercialPrice,
          commercialStage: data.commercialStage,
          commercialStatusGroup: data.commercialStatusGroup,
          content: data.content,
          // id: data.id,
          discount: data.discount,
          name: data.name,
          produceIds: this.state.productArr,
          submissionTime: this.state.submissionTime,
          totalPrice: data.totalPrice,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error(res.data.message);
          this.onCancel()
          this.getBizOpp()
        } else {
          message.success(res.data.message);
          this.onCancel()
          this.getBizOpp()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }

  deleteBizOpp() {
    axios({
      method: 'delete',
      url: `${base.url}/commercialOpportunity/delete`,
      params: {
        token: this.state.token,
        id: this.state.record.commercialOpportunityId
      }
    })
      .then((res) => {
        if (res.data.code == 'ERROR') {
          message.warning('请重试')
        } else {
          message.success('删除成功')
          this.getBizOpp()
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }


  //转移负责人组件获取负责人id
  changeEmpRespon(val) {
    this.setState({
      empResponseID: val
    })

  }

  //转移负责人请求
  alterEmpRespon() {

    axios({
      method: 'post',
      url: `${base.url}/commercialOpportunity/modifyPrincipal`,
      params: {
        token: this.state.token,
        commercialOpportunityId: this.state.record.commercialOpportunityId,
        employeeId: this.state.empResponseID
      }
    })
      .then((res) => {
        if (res.data.code == 'ERROR') {
          message.warning(res.data.message)
        } else {
          message.success('已转移负责人')
          this.getBizOpp()
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


  getCustomerId(val) {
    // console.log(val[0].id);
    // this.setState({
    //     customerId:val[0].id
    // })
    this.setState({
      customerId: val ? val[0].id : ''
    }, () => {
    })

  }

  getProductId(val) {   //从孙组件拿到productId-arr

    let arr = []
    // console.log(val);
    val.map((item) => {
      arr.push(item.id)
      return arr
    })
    this.setState({
      productArr: arr
    }, () => {
    })
  }


  setModalProVisible() {
    this.setState({
      modalProVisible: !this.state.modalProVisible
    })
  }

  getContainer = () => {
    return this.container;
  };
  saveContainer = container => {
    this.container = container;
  };

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



  getBizOpp() {
    //获取商机
    axios.get(`${base.url}/commercialOpportunity/all?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        keyword: this.state.keyword,
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


  createBizOpp() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data);
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
        url: `${base.url}/commercialOpportunity/create`,
        params: {
          token: this.state.token,
        },
        // .replace(/\s+/g,'')
        data: qs.stringify({
          clientId: this.state.customerId,
          commercialPrice: data.commercialPrice,
          commercialStage: data.commercialStage,
          commercialStatusGroup: data.commercialStatusGroup,
          content: data.content,
          // id: data.id,
          discount: data.discount,
          name: data.name,
          produceIds: this.state.productArr,
          submissionTime: this.state.submissionTime,
          totalPrice: data.totalPrice,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.warning(res.data.message);
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.getBizOpp()
          this.onCancel()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }



  submit() {


    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.state.isCreate ?
      this.createBizOpp()
      :
      this.editBizopp()


  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取商机
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
      this.getBizOpp()
    })



  }

  setVisible() {

    // formRef = React.createRef()
    this.setState({
      visible: !this.state.visible
    })
    setTimeout(() => {
      // console.log('record', this.state.record);
      if (this.state.isCreate) {
        // this.formRef.current.resetFields();
      } else {

        console.log('编辑商机');

        this.formRef.current.setFieldsValue({
          // clientId: this.state.record.clientId,
          commercialPrice: this.state.record.commercialPrice,
          commercialStage: this.state.record.commercialStage,
          commercialStatusGroup: this.state.record.commercialStatusGroup,
          content: this.state.record.content,
          discount: this.state.record.discount,
          name: this.state.record.name,
          // produceIds: this.state.record.produceIds,
          totalPrice: this.state.record.totalPrice,
          // submissionTime: this.state.record.submissionTime
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
          <span style={{ fontSize: '18px' }}>商机管理</span>
          <Search placeholder='请输入商机名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建商机</Button>
            <Modal
              style={{ position: "relative" }}

              bodyStyle={{ height: '380px', overflowY: 'auto' }}
              visible={this.state.visible}
              title={this.state.isCreate ? '新建商机' : '编辑商机'}
              okText="确认"
              cancelText="取消"
              onCancel={this.onCancel}
              onOk={
                this.submit
              }

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
                    label="客户名称"   //客户名称
                    rules={[
                      {
                        required: true,
                        message: '客户姓名不能为空',
                      },
                    ]}
                  >
                    <GetCustomer methods={(val) => { this.getCustomerId(val) }}  ></GetCustomer>

                  </Form.Item>
                  <Form.Item
                    name="commercialPrice"
                    label="商机金额"
                  >
                    <Input></Input>
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="commercialStage"
                    label="商机阶段"
                    rules={[
                      {
                        required: true,
                        message: '商机阶段不能为空'
                      }
                    ]}
                  >
                    {/* <Input /> */}
                    <Select style={{ width: 184 }} showArrow={true}>
                      <Option value='赢单'>赢单</Option>
                      <Option value='输单'>输单</Option>
                      <Option value='无效'>无效</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="commercialStatusGroup"
                    label="商机状态组"

                  >
                    <Select showArrow={true} style={{ width: 184 }} >
                      <Option value='服务产品线'>服务产品线</Option>
                      <Option value='数据监测'>数据监测</Option>
                      <Option value='服务产品线'>服务产品线</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="name"
                    label="商机名称"
                    rules={[
                      {
                        require: true,
                        message: '商机名称不能为空'
                      }
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
                    name="submissionTime"
                    label="预计成交时间"

                  >
                    <DatePicker

                      placeholder={this.state.dataPickerValue} locale={locale} onChange={this.onChangeDate} />
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
                    name="totalPrice"
                    label="预计总金额"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="discount"
                    label="折扣"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <AddedProduct methods={(val) => { this.getProductId(val) }} ></AddedProduct>
                </div>


              </Form>
            </Modal>
          </div>
        </div >
        <div ref={this.saveContainer}  ></div>
        <div>
          <div style={{ height: 20 }}
            onClick={() => {
              console.log(this.state.employeeArr)
            }}
          >

          </div  >

          <div >
            <div>
              <ConfigProvider locale={zhCN}>
                <Table

                  columns={Data.columns}
                  dataSource={this.state.tableArr}
                  scroll={{ x: 1500, y: '26vw' }}
                  // height={{}}
                  style={{ minHeight: '500px !important' }}
                  // className={'-ssss'}

                  pagination={{ pageSize: this.state.pagination.limit }}
                  defaultCurrent={1}
                  style={{
                  }}
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
              </ConfigProvider>
              <div style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
                <ConfigProvider locale={zhCN}>
                  <Pagination showQuickJumper
                    showSizeChanger
                    responsive={true}
                    size={'small'}
                    defaultPageSize={10}
                    showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }}
                    onChange={this.onChange} />
                </ConfigProvider>
              </div>
              <Drawer
                mask={false}
                title={
                  [
                    <div >
                      <span className='icon-shangji' style={{
                        display: "inline-block",
                        width: 10, height: 10

                      }}  ></span>
                      <span>{this.state.name}</span>
                    </div>
                  ]
                }
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
                      title="转移商机"
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
                          formTitle: '新建商机'
                        })
                      }}

                    >编辑</Button>


                    {/* <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}> */}
                    <Button type='primary' size={'small'} style={{ marginLeft: '10px' }}
                      onClick={() => {
                        Modal.confirm({
                          title: '确认删除',
                          icon: <ExclamationCircleOutlined />,
                          content: '确认删除此商机么？',
                          okText: '是',
                          okType: '',
                          cancelText: '否',
                          onOk: () => {
                            this.deleteBizOpp()
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
                      <span style={{ fontSize: 12, color: '#777' }}>商机金额</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.totalPrice}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>商机状态</span>
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
                                <div>商机名称</div>
                                <div>{this.state.record.clientName}</div>
                              </div>
                              <div>
                                <div>电话</div>
                                <div>{this.state.record.phone}</div>
                              </div>
                              <div>
                                <div>商机来源</div>
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
                                <div>商机类型</div>
                                <div>{this.state.record.clientType}</div>
                              </div>
                              <div>
                                <div>商机等级</div>
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
                      {/* <TabPane tab="跟进记录" key="2">

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
                      </TabPane> */}
                      <TabPane tab="产品" key="5">
                        <GetProduct value={this.state.record.commercialOpportunityId}></GetProduct>
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

export default BizOpp;



