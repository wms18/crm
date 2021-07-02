import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import GetCustomer from "../../../../../components/getCustomer";
import GetEmployee from "../../../../../components/getEmployee";
import GetContractTable from '../../../../../components/getContractTable'
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




class Payment extends Component {

  componentDidMount() {
    this.getPayment()
    this.getEmployeeName()
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
    this.getEmployeeName = this.getEmployeeName.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.getCustomerID = this.getCustomerID.bind(this)

  }

  // getCustomerID(val) {
  //   console.log(val);
  //   this.setState({
  //     customerID: val[0].id
  //   })
  // }

  getContractID(val){
    console.log(val);
    this.setState({
      contractCoding:val?val[0].contractCoding:''
    })
    console.log(this.state.contractCoding);
  }

  getCustomerID(val) {
    console.log(val);
      this.setState({
        customerID: val?val[0].id:''
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
          this.setState({
            tableArr: res.data.data.data,
            pagination: res.data.data.pagination
          })
        }
      })
  }


  createPayment() {
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
        url: `${base.url}/commercialOpportunity/create`,
        params: {
          token: this.state.token,
        },
        // .replace(/\s+/g,'')
        data: qs.stringify({
          clientId: data.clientId,
          commercialPrice: data.commercialPrice,
          commercialStage: data.commercialStage,
          commercialStatusGroup: data.commercialStatusGroup,
          content: data.content,
          // id: data.id,
          discount: data.discount,
          name: data.name,
          produceIds: data.produceIds,
          submissionTime: this.state.submissionTime,
          totalPrice: data.totalPrice,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error('请重试');
          // this.onCancel()
        } else {
          message.success(res.data.message);
          // this.onCancel()

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
    this.createPayment()

  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取回款
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
          <span style={{ fontSize: '18px' }}>回款管理</span>
          <Search placeholder='请输入回款名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建回款</Button>
            <Modal
              bodyStyle={{ height: '380px', overflowY: 'auto' }}
              visible={this.state.visible}
              title={this.state.isCreate ? '新建回款' : '编辑回款'}
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
                  <GetCustomer methods={(val) => { this.getCustomerID(val) }}   ></GetCustomer>
                  <GetContractTable id={this.state.customerID} methods={(val) => { this.getContractID(val) }}  ></GetContractTable>
                </div>
                <div>

                  {/* <Form.Item
                    name="clientId"
                    label="客户名称"   //客户名称
                    rules={[
                      {
                        required: true,
                        message: '客户姓名不能为空',
                      },
                    ]}
                  >
                  </Form.Item> */}
                  <Form.Item
                    name="commercialPrice"
                    label="回款金额"
                  >
                    <Input></Input>
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="commercialStage"
                    label="回款阶段"
                    rules={[
                      {
                        required: true,
                        message: '回款阶段不能为空'
                      }
                    ]}
                  >
                    {/* <Input /> */}
                    <Select style={{ width: 200 }}>
                      <Option value='赢单'>赢单</Option>
                      <Option value='输单'>输单</Option>
                      <Option value='无效'>无效</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="commercialStatusGroup"
                    label="回款状态组"
                  // rules={[
                  //   required: true,
                  //   message:'回款状态组不能为空'
                  // ]}
                  >
                    <Select>
                      <Option value='服务产品线'>服务产品线</Option>
                      <Option value='数据监测'>数据监测</Option>
                      <Option value='服务产品线'>服务产品线</Option>
                    </Select>
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
                    name="discount"
                    label="折扣"
                  >
                    <Input type='number' />
                  </Form.Item>

                </div>


                <div>
                  <Form.Item
                    name="name"
                    label="回款名称"

                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="produceIds"
                    label="关联产品ID"
                  >
                    <Input />
                  </Form.Item>


                </div>
                <div>
                  <Form.Item
                    name="submissionTime"
                    label="预计成交时间"
                  // rules={[
                  //   required: true,
                  //   message:'预计成交时间不能为空'
                  //   ]}
                  >
                    <DatePicker onChange={this.onChangeDate} />
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
                </div>
                <div>
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
                    {/* <Input /> */}
                    <GetEmployee></GetEmployee>
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
                      returnNumber: record.returnNumber

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
                            message.success('已成功刪除')
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
                      <span style={{ fontSize: 14 }}>{this.state.record.totalPrice}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>回款状态</span>
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
                                <div>回款名称</div>
                                <div>{this.state.record.clientName}</div>
                              </div>
                              <div>
                                <div>电话</div>
                                <div>{this.state.record.phone}</div>
                              </div>
                              <div>
                                <div>回款来源</div>
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
                                <div>回款类型</div>
                                <div>{this.state.record.clientType}</div>
                              </div>
                              <div>
                                <div>回款等级</div>
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



