import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import {
  Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message
  , Dropdown, Menu, ConfigProvider, Tabs
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import Data from "./js/index";

const { TabPane } = Tabs
const { Option } = Select
const { Search } = Input
const { Content, Footer, Header } = Layout




class ProductTable extends Component {


  componentDidMount() {
    this.getProduct()
  }

  constructor(props) {
    super(props)
    this.state = {

      isCreate: true,
      formTitle: '新建产品',

      drawerVisible: false,

      token: window.localStorage.getItem('token'),

      editProVisible: false,
      transferVisible: false,    //转移框显示



      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,

      pagination: '',
      currentPage: 1,
      limit: 10,
      tableArr: '',

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
      specification: '',

    }
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.submit = this.submit.bind(this)
    this.getProduct = this.getProduct.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.setEditProVisible = this.setEditProVisible.bind(this)
    this.setEditProCancel = this.setEditProCancel.bind(this)
  }


  dropdownMenu() {
    const menu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            Modal.confirm({
              title: '确认上架',
              icon: <ExclamationCircleOutlined />,
              content: '确认上架此产品么？',
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
          上架
        </Menu.Item>

        <Menu.Item

          onClick={() => {
            Modal.confirm({
              title: '确认下架',
              icon: <ExclamationCircleOutlined />,
              content: '确认下架此产品么',
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
          }}>
          下架
        </Menu.Item>
      </Menu>
    )
    return menu
  }



  getProduct() {
    //获取产品列表
    axios.get(`${base.url}/produce/getProduce?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        keyWord: this.state.keyWord
      }
    })
      .then((res) => {
        console.log(res);
        if (!res.data.code == "SUCCESS") {

        } else {
          this.setState({
            tableArr: res.data.data.data,
            pagination: res.data.data.pagination
          })
        }
      })
  }

  editProduct() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    var reg = /\s/;
    // reg.exec(text)==null
    if (data.number == undefined || data.produceCoding == undefined
      || data.putaway == undefined || data.specification == undefined || data.produceType == undefined || data.produceName == undefined
      || reg.exec(data.number) != null || reg.exec(data.produceCoding) != null || reg.exec(data.putaway) != null || reg.exec(data.specification) != null
      || reg.exec(data.produceType) != null || reg.exec(data.produceName) != null
    ) {
      message.error('请填写必填选项并不要输入空格');
    } else {
      axios({
        method: "post",
        url: `${base.url}/produce/update`,
        params: {
          token: this.state.token,
        },
        data: qs.stringify({
          id: this.state.record.id,
          number: data.number,
          price: data.price,
          produceCoding: data.produceCoding,
          produceIntroduce: data.produceIntroduce,
          produceName: data.produceName,
          produceType: data.produceType,
          putaway: data.putaway,
          specification: data.specification,
        })
      }).then((res) => {
        if (res.data.code === "ERROR") {
          message.error('请重试');
          this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()

          this.getProduct()
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }


  createProduct() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    var reg = /\s/;
    // reg.exec(text)==null
    console.log(data);
    if (data.number == undefined || data.produceCoding == undefined
      || data.putaway == undefined || data.specification == undefined || data.produceType == undefined || data.produceName == undefined
      || reg.exec(data.number) != null || reg.exec(data.produceCoding) != null || reg.exec(data.putaway) != null || reg.exec(data.specification) != null
      || reg.exec(data.produceType) != null || reg.exec(data.produceName) != null
    ) {
      message.error('请填写必填选项并不要输入空格');
    } else {
      axios({
        method: "post",
        url: `${base.url}/produce/create`,
        params: {
          token: this.state.token,
        },
        // .replace(/\s+/g,'')
        data: qs.stringify({
          number: data.number,
          price: data.price,
          produceCoding: data.produceCoding,
          produceIntroduce: data.produceIntroduce,
          produceName: data.produceName,
          produceType: data.produceType,
          putaway: data.putaway,
          specification: data.specification,
        })
      }).then((res) => {
        console.log(res);
        if (res.data.code === "ERROR") {
          message.error('请重试');
          this.onCancel()
        } else {
          message.success(res.data.message);
          this.onCancel()

          this.getProduct()
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  }



  formRef = React.createRef()   //调用Form方法
  submit() {
    console.log(this.formRef.current);
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    if (this.state.isCreate) {
      this.createProduct()
    } else {
      this.editProduct()
    }
  }



  onSearch(val) {
    console.log(val);
    this.setState({
      keyWord: val
    }, () => {
      this.getProduct()
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
      this.getProduct()
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
          produceName: this.state.record.produceName,
          produceType: this.state.record.produceType,
          price: this.state.record.price,
          produceCoding: this.state.record.produceCoding,
          number: this.state.record.number,
          createTime: this.state.record.createTime,
          employeeCreate: this.state.record.employeeCreate,
          employeeResponsible: this.state.record.employeeResponsible,
          produceIntroduce: this.state.record.produceIntroduce,
          putaway: this.state.record.putaway,
          specification: this.state.record.specification,
          updatetime: this.state.record.updatetime
        })
      }
    }, 100);

  };
  setEditProVisible() {
    this.setState({
      editProVisible: !this.state.visible
    })
  };
  setEditProCancel() {
    this.setState({
      editProVisible: false
    })
  }

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
          <span style={{ fontSize: '18px' }}>产品管理</span>
          <Search placeholder='请输入产品名称' style={{ width: '200px' }} onSearch={this.onSearch}
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建产品</Button>
            <Modal
              maskStyle={{ backgroundColor: "#fff" }}
              visible={this.state.visible}
              title={this.state.isCreate ? '新建产品' : '编辑产品'}
              okText="确认"
              cancelText="取消"
              onCancel={this.onCancel}
              onOk={this.submit}
              bodyStyle={{ height: 350, overflowY: 'auto' }}
            >
              <Form
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                  modifier: 'public',
                }}
                //绑定
                ref={this.formRef}
              >
                <div>
                  <Form.Item
                    name="produceName"
                    label="产品名称"
                    rules={[
                      {
                        required: true,
                        message: '产品名称不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    style={{ width: 200 }}
                    name="produceType"
                    label="产品类别"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}
                  >
                    <Input  ></Input>
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="produceCoding"
                    label="产品编码"
                    rules={[
                      {
                        required: true,
                        message: '产品编码不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="putaway"
                    label="是否上架"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}
                  >
                    <Select style={{ width: 200 }} >
                      <Option value='上架'>上架</Option>
                      <Option value='下架'>下架</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    style={{ width: 184 }}
                    name="specification"
                    label="产品规格"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}
                  >
                    <Select  >
                      <Option value='大'>大</Option>
                      <Option value='中'>中</Option>
                      <Option value='小'>小</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    style={{ width: 200 }}
                    name="price"
                    label="价格"
                  >
                    <Input value='0' />
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="number"
                    label="库存数量"
                    rules={[
                      {
                        required: true,
                        message: '库存数量不能为空',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ width: 200 }}
                    name="produceIntroduce"
                    label="产品介绍"
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
              console.log(this.state.tableArr);
            }}
          >
          </div  >

          <div >
            <div>
              <ConfigProvider locale={zhCN}>
                <Table
                  columns={Data.columns}
                  dataSource={this.state.tableArr}
                  scroll={{ x: 1500, y: 300 }}
                  pagination={{ pageSize: this.state.pagination.limit }}

                  //点击行显示表格行信息
                  onRow={(record) => ({
                    onClick: () => {
                      console.log(record);
                      this.setState({
                        drawerVisible: true,
                        record: record,
                        drawerTitle: record.produceName
                      })
                    },
                  })}

                />
              </ConfigProvider>
              <Drawer
                title={this.state.drawerTitle}
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={this.state.drawerVisible}
                getContainer={false}
                width={'50vw'}
                destroyOnClose={true}


              >
                <div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }}>


                    <Button type='primary' size={'small'}
                      onClick={() => {
                        this.setVisible()
                        this.setState({
                          isCreate: false,
                          formTitle: '新建产品'

                        })
                      }}

                    >编辑</Button>


                    <Dropdown overlay={this.dropdownMenu} placement="bottomLeft" trigger={['click']} >
                      <Button type='default' size={'small'} style={{ marginLeft: '10px' }}>更多</Button>
                    </Dropdown>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: "30vw", padding: '0 30px 30px' }}>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>产品类别</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.produceType}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>产品单位</span>
                      <span style={{ fontSize: 14 }}>只/辆/千克</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>产品价格</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.price ? this.state.record.price : 'none'}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: "column", height: '5vw', alignItems: 'left', justifyContent: 'space-evenly' }}>
                      <span style={{ fontSize: 12, color: '#777' }}>产品编码</span>
                      <span style={{ fontSize: 14 }}>{this.state.record.produceCoding}</span>
                    </div>

                  </div>

                  <div>
                    <Tabs defaultActiveKey="1" >
                      <TabPane tab="基本信息" key="1">
                        <div>

                          <div style={{ marginBottom: '20px' }}>
                            <span></span>
                            <span>基本信息</span>
                          </div>

                          <div className='pro-info'>
                            <div>
                              <div>
                                <div>产品名称</div>
                                <div>{this.state.record.produceName}</div>
                              </div>
                              <div>
                                <div>产品编码</div>
                                <div>{this.state.record.produceCoding}</div>
                              </div>
                              <div>
                                <div>规格</div>
                                <div>{this.state.record.specification}</div>
                              </div>
                              <div>
                                <div>库存数量</div>
                                <div>{this.state.record.number}</div>
                              </div>
                              <div>
                                <div>创建人</div>
                                <div>{this.state.record.employeeCreate}</div>
                              </div>
                              <div>
                                <div>创建时间</div>
                                <div>{this.state.record.createTime}</div>
                              </div>
                            </div>

                            <div>
                              <div>
                                <div>产品类别</div>
                                <div>{this.state.record.produceType}</div>
                              </div>
                              <div>
                                <div>是否上架</div>
                                <div>{this.state.record.putaway}</div>
                              </div>
                              <div>
                                <div>价格</div>
                                <div>{this.state.record.price}</div>
                              </div>
                              <div>
                                <div>产品介绍</div>
                                <div>{this.state.record.produceIntroduce}</div>
                              </div>
                              <div>
                                <div>更新时间</div>
                                <div>{this.state.record.updatetime}</div>
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
            <div style={{ position: 'absolute', bottom: '30px', right: '20px' }}>
              <ConfigProvider locale={zhCN}>
                <Pagination showQuickJumper
                  showSizeChanger
                  responsive={true}
                  size={'small'}
                  defaultPageSize={10}
                  showTotal={total => `共 ${total} 项`} defaultCurrent={1} total={this.state.pagination.total} style={{ marginLeft: '20PX' }} onChange={this.onChange} />
              </ConfigProvider>
            </div>

          </div>
        </div>



      </div >
    );
  }
}

export default ProductTable;



