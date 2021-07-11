import React, { Component } from "react";
import axios from 'axios';
import base from "../../../../axios/axios";
import qs from 'qs'
import './style.css'
import GetCustomer from "../../../../components/getCustomer";
import GetEmployee from "../../../../components/getEmployee";
import GetContractTable from '../../../../components/getContractTable'
import GetProductTable from "../../../../components/getProductTable";
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Steps
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Data from "./js/index";

const { Step } = Steps;
const { TabPane } = Tabs
const { Option } = Select
const { Search, TextArea } = Input
const { Content, Footer, Header } = Layout




class Payment extends Component {

  componentDidMount() {
    this.getPayment()
  }

  constructor(props) {
    super(props)
    this.state = {

      drawerVisible: false,

      token: window.localStorage.getItem('token'),



      customerID: '',

      isCreate: true,
      formTitle: '新建回款',

      transferVisible: false,

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,


      returnNumber: '',   //查询回款用的编号
      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      employeeArr: '',

      // 表格行点击时产品信息
      record: "",

      // 搜素回款名称
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
    this.getPayment = this.getPayment.bind(this)
    this.createPayment = this.createPayment.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setTransferVisible = this.setTransferVisible.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.getCustomerID = this.getCustomerID.bind(this)
    this.deletePayment = this.deletePayment.bind(this)

  }


  getEmployee(val) {   //获取审核人员工ID
    console.log(val);
    this.setState({
      employeeCheckedId: val ? val : ''
    })
  }

  getContractID(val) {
    console.log(val);
    this.setState({
      contractCoding: val ? val[0].contractCoding : '',
      // contractID:val?val[0].
    }, () => {
      console.log(this.state.contractCoding);
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

  onChangeDate(date, dateString) {
    console.log(dateString);
    this.setState({
      submissionTime: dateString
    }, () => {

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

  getPayment() {
    //获取回款
    axios.get(`${base.url}/return-money/all?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {

        } else {
          if (res.data.data !== null) {
            this.setState({
              tableArr: res.data.data ? res.data.data.data : '',
              pagination: res.data.data ? res.data.data.pagination : ''
            })
          }
        }
      })
  }


  deletePayment() {
    axios({
      method: "post",
      url: `${base.url}/return-money/delete?ids=` + this.state.record.id,
      params: {
        token: this.state.token,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.code == "ERROR") {
        message.warning('请重试');
        // this.onCancel()
      } else {
        message.success(res.data.message);

        this.getPaymentt()
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  createPayment() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data);
    console.log(this.state.submissionTime);
    if (
      !this.state.customerID || !this.state.contractCoding || !this.state.submissionTime ||
      data.receiveWay == undefined || data.receiveMoney == undefined
      || data.returnNumber == undefined
    ) {
      message.error('请填写必填选项');
    } else if (data.receiveWay.indexOf(' ') == 0 || data.receiveMoney.toString().indexOf(' ') == 0
      || data.returnNumber.indexOf(' ') == 0
    ) {
      message.error('请不要输入空格');

    } else {
      axios({
        method: "post",
        url: `${base.url}/return-money/add`,
        params: {
          token: this.state.token,
          clientId: this.state.customerID,
          content: data.content,
          contractCoding: this.state.contractCoding,
          employeeCheckId: this.state.employeeCheckedId,
          content: data.content,
          periods: data.periods,
          receiveTime: this.state.submissionTime,
          receiveWay: data.receiveWay,
          returnNumber: data.returnNumber,
          receiveMoney: data.receiveMoney,
        },
        // .replace(/\s+/g,'')
        // data: qs.stringify({

        // })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error(res.data.message);
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()
          this.getPaymentt()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }
  editPayment() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data);
    console.log(this.state.submissionTime);
    var reg = /\s/;
    if (
      !this.state.customerID || !this.state.contractCoding || !this.state.submissionTime ||
      data.receiveWay == undefined || data.receiveMoney == undefined
      || data.returnNumber == undefined
    ) {
      message.error('请填写必填选项');
    } else if (data.receiveWay.indexOf(' ') == 0 || data.receiveMoney.toString().indexOf(' ') == 0
      || data.returnNumber.indexOf(' ') == 0
    ) {
      message.error('请不要输入空格');
    } else {
      axios({
        method: "post",
        url: `${base.url}/return-money/edit`,
        params: {
          token: this.state.token,
        },
        data: qs.stringify({
          clientId: this.state.customerID,
          content: data.content,
          contractCoding: this.state.contractCoding,
          employeeCheckId: this.state.employeeCheckedId,
          content: data.content,
          periods: data.periods,
          receiveTime: this.state.submissionTime,
          receiveWay: data.receiveWay,
          returnNumber: data.returnNumber,
          receiveMoney: data.receiveMoney,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error(res.data.message);
          // this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()
          this.getPaymentt()
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
      this.createPayment()
      :
      this.editPayment()

  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取回款
    axios.get(`${base.url}/return-money/search?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        returnNumber: val,   //回款编号
      },
      // data: qs.stringify({
      // })
    })
      .then((res) => {
        console.log(res);
        if (res.data.code == "ERROR") {

        }
        else {
          this.setState({
            tableArr: res.data.data ? res.data.data.data : '',
            pagination: res.data.data ? res.data.data.pagination : ''
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
      this.getPayment()
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
          content: this.state.record.content,
          contractTotal: this.state.record.contractTotal,
          createTime: this.state.record.createTime,
          clientLevel: this.state.record.clientLevel,
          periods: this.state.record.periods,
          receiveMoney: this.state.record.receiveMoney,
          // nextTalkTime: this.state.record.nextTalkTime, 
          receiveTime: this.state.record.receiveTime,
          receiveWay: this.state.record.receiveWay,
          result: this.state.record.result,
          returnNumber: this.state.record.returnNumber,
          status: this.state.record.status,
          updateTime: this.state.record.updateTime,
        })
      }
    }, 100);
  };

  onCancel() {
    this.setState({
      visible: false,
      isCreate: true
    })
    // setTimeout(() => {
    //   this.formRef.current.resetFields();
    // }, 100);
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
          <span style={{ fontSize: '18px' }}>回款管理</span>
          <Search placeholder='请输入回款名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建回款</Button>
            <Modal
              maskStyle={{ backgroundColor: "#fff" }}
              bodyStyle={{ height: '380px', overflowY: 'auto' }}
              visible={this.state.visible}
              title={this.state.isCreate ? '新建回款' : '编辑回款'}
              okText="提交审核"
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
                    name="returnNumber"
                    label="回款编号"
                    rules={[
                      {
                        required: 'true',
                        message: '回款编号不能为空'
                      }
                    ]}
                  >
                    <Input></Input>


                    {/* 客户名称 */}
                  </Form.Item>
                  <Form.Item
                    name="clientId"
                    label="客户名称"
                    rules={[
                      {
                        required: 'true',
                        message: '客户名称不能为空'
                      }
                    ]}
                  >
                    <GetCustomer methods={(val) => { this.getCustomerID(val) }}   ></GetCustomer>
                  </Form.Item>

                </div>


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
                    {/* 合同编号 */}
                    <GetContractTable id={this.state.customerID} methods={(val) => { this.getContractID(val) }}  ></GetContractTable>
                  </Form.Item>

                  <Form.Item
                    name="receiveTime"
                    label="回款日期"
                    rules={[
                      {
                        required: true,
                        message: '回款日期不能为空'
                      }
                    ]}
                  >
                    <ConfigProvider locale={zhCN}>
                      <DatePicker style={{ width: 184 }} onChange={this.onChangeDate} />
                    </ConfigProvider>

                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name="receiveWay"
                    label="回款方式"
                    rules={[
                      {
                        required: 'true',
                        message: '回款方式不能为空'
                      }
                    ]}

                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="receiveMoney"
                    label="回款金额"

                    rules={[
                      {
                        required: true,
                        message: "回款金额不能为空"
                      }
                    ]}
                  >
                    <Input type='number' />
                  </Form.Item>

                </div>


                <div>
                  <Form.Item
                    name="periods"
                    label="期数"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="content"
                    label="备注"
                  >
                    <TextArea style={{ width: 184, height: 60 }} ></TextArea>
                  </Form.Item>


                </div>

                <div>

                  <Form.Item
                    name="employeeCheckId"
                    label="审核人"
                  >
                    <GetEmployee contentResponsible={(val) => { this.getEmployee(val) }}   ></GetEmployee>
                  </Form.Item>
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
            <div >
              <ConfigProvider locale={zhCN}>
                <Table
                  columns={Data.columns}
                  dataSource={this.state.tableArr}
                  scroll={{ x: 1500, y: '26vw' }}
                  pagination={{
                    pageSize: this.state.pagination.limit ?
                      this.state.pagination.limit
                      :
                      10
                  }}
                  defaultCurrent={1}
                  onRow={(record) => ({
                    onClick: () => {
                      console.log(record);
                      this.setState({
                        drawerVisible: true,
                        record: record,
                        returnNumber: record.returnNumber

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
                    showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
                </ConfigProvider>
              </div>
              <Drawer
                mask={false}
                title={this.state.returnNumber ? this.state.returnNumber : '暂无'}
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

                    <Button type='primary' size={'small'}
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        this.setVisible()
                        this.setState({
                          isCreate: false,
                          formTitle: '新建回款'
                        })
                      }}

                    >编辑</Button>


                    <Button type='default' size={'small'} style={{ marginLeft: '10px' }}
                      onClick={() => {
                        Modal.confirm({
                          title: '确认删除',
                          icon: <ExclamationCircleOutlined />,
                          content: '确认删除此回款么？',
                          okText: '是',
                          okType: '',
                          cancelText: '否',
                          onOk: () => {
                            // this.handleOk(id)//确认按钮的回调方法，在下面
                            this.deletePayment()
                          }
                          ,
                          onCancel() {
                            message.warning('已取消刪除')
                          },
                        });
                      }}
                    >删除</Button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px', alignItems: 'baseline' }}>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>客户名称</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.clientName}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>回款金额</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.receiveMoney}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>回款状态</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.status}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>负责人</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.employeeResponsibleName}</span>
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
                                <div>回款编号</div>
                                <div>{this.state.record.returnNumber}</div>
                              </div>
                              <div>
                                <div>合同编号</div>
                                <div>{this.state.record.contractCoding}</div>
                              </div>
                              <div>
                                <div>回款方式</div>
                                <div>{this.state.record.receiveWay}</div>
                              </div>
                              <div>
                                <div>期数</div>
                                <div>{this.state.record.periods}</div>
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
                                <div>客户名称</div>
                                <div>{this.state.record.clientName}</div>
                              </div>
                              <div>
                                <div>回款金额</div>
                                <div>{this.state.record.receiveMoney}</div>
                              </div>
                              <div>
                                <div>备注</div>
                                <div>{this.state.record.content}</div>
                              </div>
                              <div>
                                <div>更新时间</div>
                                <div>{this.state.record.updateTime}</div>
                              </div>
                              <div>
                                <div>负责人</div>
                                <div>{this.state.record.employeeResponsibleName}</div>
                              </div>
                              <div>
                                <div>状态</div>
                                <div>{this.state.record.result}</div>
                              </div>
                            </div>
                          </div>

                          <div>

                          </div>
                        </div>
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

export default Payment;



