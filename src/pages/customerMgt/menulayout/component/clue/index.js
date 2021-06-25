import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs, Checkbox, Row, Col, Alert, DatePicker, Space
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";

const { TabPane } = Tabs
const { Option, TextArea } = Select
const { Search } = Input
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
              title: '确认删除',
              icon: <ExclamationCircleOutlined />,
              content: '确认删除此产品么？',
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
              content: '确认转移为客户么?',
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
          转移为客户
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
        if (!res.data.code === "SUCCESS") {

        } else {
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
      || data.clientName == undefined || data.clientType == undefined || data.clueFrom == undefined || data.company == undefined
      || reg.exec(data.nextTalkTime) != null || reg.exec(data.clientLevel) != null
      || reg.exec(data.clientName) != null || reg.exec(data.clientType) != null || reg.exec(data.clueFrom) != null || reg.exec(data.company) != null
    ) {
      message.error('请填写必填选项并不要输入空格');
    } else {
      axios({
        method: "post",
        url: `${base.url}/clue/add`,
        params: {
          token: this.state.token,
        },
        // .replace(/\s+/g,'')
        data: qs.stringify({
          address: data.address,
          clientLevel: data.clientLevel,
          clientName: data.clientName,
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
          // this.onCancel()

          this.getCluet()
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
    this.createCluet()

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
          clientName: this.state.record.clientName,
          clientType: this.state.record.clientType,
          clueFrom: this.state.record.clueFrom,
          company: this.state.record.company,
          content: this.state.record.content,
          createTime: this.state.record.createTime,
          currency: this.state.record.currency,
          departmentId: this.state.record.departmentId,
          employeeCreateId: this.state.record.employeeCreateId,
          employeeResponsibleId: this.state.record.employeeResponsibleId,
          mobile: this.state.record.mobile,
          nextTalkTime: this.state.record.nextTalkTime,
          phone: this.state.record.phone,
          record: this.state.record.record,
          updateTime: this.state.record.updateTime,
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
              visible={this.state.visible}
              title="新建线索"
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
                    name="clientName"
                    label="客户姓名"
                    rules={[
                      {
                        required: true,
                        message: '客户姓名不能为空',
                      },
                    ]}
                  >
                    <Input />
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
                      drawerTitle: record.clientName

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
                      title="转移线索"
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
                          formTitle: '新建线索'

                        })
                      }}

                    >编辑</Button>


                    <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']}>
                      <Button type='primary' size={'small'} style={{ marginLeft: '10px' }}>更多</Button>
                    </Dropdown>
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
                        <div style={{padding:'0 0 20px 0'}}>
                          <Input style={{ height: 100 }}></Input>
                        </div>
                        <div style={{ fontSize: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
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
                          <div  style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            下次联系时间
                            &nbsp;
                            &nbsp;
                            <ConfigProvider locale={zhCN}>
                              <Space direction="vertical" style={{marginRight:"20px"}}>
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
                      </TabPane>
                      <TabPane tab="操作记录" key="3">
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

export default Clue;



