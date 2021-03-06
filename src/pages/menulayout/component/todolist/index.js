import React, { Component } from "react";
import axios from 'axios';
import base from "../../../../axios/axios";
import qs from 'qs'
import './style.css'
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space, Steps
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";
import GetEmployee from "../../../../components/getEmployee";

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


      Data: Data.columnsGetCustomer,
      current: '1',
      title: '我负责的客户',
      path: '/backlog/getMyClient?',


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
    this.getTodoList = this.getTodoList.bind(this)
    this.onClose = this.onClose.bind(this)
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
          Data: Data.columnsGetCustomer,
          path: '/backlog/getMyClient?'
        }, () => {
          this.getTodoList(e.key)
        })
        break;
      case '2':
        this.getTodoList(e.key)
        this.setState({
          title: '分配给我的线索',
          Data: Data.columnsClue,
          path: '/backlog/getMyClue?'
        }, () => {
          this.getTodoList(e.key)
        })
        break;
      case '3':
        this.getTodoList(e.key)
        this.setState({
          title: '今日需联系的客户',
          Data: Data.columnsGetCustomer,
          path: '/backlog/getTodayClient?'
        }, () => {
          this.getTodoList(e.key)
        })
        break;
      case '4':
        this.getTodoList(e.key)
        this.setState({
          title: '未审核的合同',
          Data: Data.columnsContract,
          path: '/backlog/unCheckedContract?'

        }, () => {
          this.getTodoList(e.key)
        })
        break;
      case '5':
        this.getTodoList(e.key)
        this.setState({
          title: '即将进入公海的客户',
          Data: Data.columnsGetCustomer,
          path: '/backlog/willIntoSea?'
        }, () => {
          this.getTodoList(e.key)
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
    axios({
      method: 'get',
      url: base.url + this.state.path + `currentPage=` + this.state.currentPage + `&limit=` + this.state.limit,
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
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
            <div style={{ height: 'calc(100vh - 152px)', width: '25px', backgroundColor: '#f5f6f9' }}>

            </div>
            <div >
              <div style={{
                height: '40px',
                marginRight: '20px',
                // marginRight: '20px',
                padding: ' 15px',
                marginBottom: '20px',
                fontSize: '18px'
              }}
                onClick={() => {
                  console.log(this.state.employeeArr)
                }}
              >
                {this.state.title}
              </div  >
              <div >
                <ConfigProvider locale={zhCN}>
                  <Table
                    bordered={true}
                    columns={this.state.Data}
                    dataSource={this.state.tableArr}
                    style={{ width: '58vw' }}

                    scroll={{ x: 400, y: 250 }}
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
                </ConfigProvider>
                <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                  <ConfigProvider locale={zhCN}>
                    <Pagination showQuickJumper
                      showSizeChanger
                      responsive={true}
                      size={'small'}
                      defaultPageSize={10}
                      showTotal={total => `共 ${total} 项`} defaultCurrent={this.state.currentPage} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
                  </ConfigProvider>
                </div>


              </div>
            </div>


          </div>
        </div>



      </div >
    );
  }
}

export default TodoList;



