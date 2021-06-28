import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
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


class TodoList extends Component {

  componentDidMount() {
    this.getTodoList()
    this.getEmployeeName()
  }

  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: false,

      token: window.localStorage.getItem('token'),


      Data: Data.columnsCustomer,
      current: '1',
      title: '我负责的客户',

      isCreate: true,
      formTitle: '新建待办事项',

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

      // 搜素待办事项名称
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
    this.getTodoList = this.getTodoList.bind(this)
    this.createTodoList = this.createTodoList.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setTransferVisible = this.setTransferVisible.bind(this)
    this.getEmployeeName = this.getEmployeeName.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  handleClick = e => {
    console.log(typeof (e.key));
    this.setState({
      current: e.key
    })
    switch (e.key) {
      case '1':
        this.setState({
          title: '分配给我的客户',
          Data: Data.columnsCustomer

        })
        break;
      case '2':
        this.setState({
          title: '分配给我的线索',
          Data: Data.columnsClue
        })
        break;
      case '3':
        this.setState({
          title: '今日需联系的客户',
          Data: Data.columnsCustomer
        })
        break;
      case '4':
        this.setState({
          title: '未审核的合同',
          Data: Data.columnsContract
        })
        break;
      case '5':
        this.setState({
          title: '即将进入公海的客户',
          Data: Data.columnsCustomer
        })
        break;
    }

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

  transferSubmit() {
    // setTransferVisible
  }

  getTodoList() {
    //获取待办事项
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


  createTodoList() {
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

          this.getTodoListt()
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
    this.createTodoList()

  }


  onSearch(val) {
    console.log(val);
    console.log(typeof (val));
    //获取待办事项
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
      this.getTodoList()
    })



  }

  setVisible() {
    this.setState({
      visible: !this.state.visible
    })

  };

  onCancel() {
    this.setState({
      visible: false,
      isCreate: true
    })

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
          <span style={{ fontSize: '18px' }}>待办事项管理</span>
        </div >

        <div>
          <div style={{ height: 20 }}
            onClick={() => {
              console.log(this.state.employeeArr)
            }}
          >

          </div  >

          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div>
              <Menu
                theme={"light"}
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultOpenKeys={['1']}
                mode="inline"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
              >
                <Menu.Item key='1'>分配给我的客户</Menu.Item>
                <Menu.Item key='2'>分配给我的线索</Menu.Item>
                <Menu.Item key='3'>今日需联系的客户</Menu.Item>
                <Menu.Item key='4'>未审核的合同</Menu.Item>
                <Menu.Item key='5'>即将进入公海的客户</Menu.Item>
              </Menu>
            </div>
            <div >
              <div style={{ height: 20, marginRight: '20px' }}
                onClick={() => {
                  console.log(this.state.employeeArr)
                }}
              >
                {this.state.title}
              </div  >
              <div >
                <Table

                  columns={this.state.Data}
                  dataSource={this.state.tableArr}
                  style={{ width: '58vw' }}

                  scroll={{ x: 300, }}
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
                <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                  <ConfigProvider locale={zhCN}>
                    <Pagination showQuickJumper
                      showSizeChanger
                      defaultPageSize={10}
                      showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
                  </ConfigProvider>
                </div>

                <Drawer
                  mask={false}
                  title={this.state.name}
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
                        title="转移待办事项"
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
                            formTitle: '新建待办事项'

                          })
                        }}

                      >编辑</Button>


                      {/* <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}> */}
                      <Button type='primary' size={'small'} style={{ marginLeft: '10px' }}
                        onClick={() => {
                          Modal.confirm({
                            title: '确认删除',
                            icon: <ExclamationCircleOutlined />,
                            content: '确认删除此待办事项么？',
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
                      >刪除</Button>
                      {/* </Dropdown> */}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "40vw", padding: '0 30px 30px', alignItems: 'baseline' }}>

                      <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                        <span style={{ fontSize: 12, color: '#777' }}>客户名称</span>
                        <span style={{ fontSize: 14 }}>{this.state.record.clientName}</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                        <span style={{ fontSize: 12, color: '#777' }}>待办事项金额</span>
                        <span style={{ fontSize: 14 }}>{this.state.record.totalPrice}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                        <span style={{ fontSize: 12, color: '#777' }}>待办事项状态</span>
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
                                  <div>待办事项名称</div>
                                  <div>{this.state.record.clientName}</div>
                                </div>
                                <div>
                                  <div>电话</div>
                                  <div>{this.state.record.phone}</div>
                                </div>
                                <div>
                                  <div>待办事项来源</div>
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
                                  <div>待办事项类型</div>
                                  <div>{this.state.record.clientType}</div>
                                </div>
                                <div>
                                  <div>待办事项等级</div>
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
        </div>



      </div >
    );
  }
}

export default TodoList;



