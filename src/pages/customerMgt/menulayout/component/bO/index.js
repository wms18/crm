import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import { Table, Button, Select, Input, Pagination, Layout, Modal, Form, Drawer, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import Data from "./js/index";


const { Option } = Select
const { Search } = Input
const { Content, Footer, Header } = Layout

class Bo extends Component {

  componentDidMount() {
    this.getProduct()
  }

  constructor(props) {
    super(props)
    this.state = {

      drawerVisible: false,

      token: window.localStorage.getItem('token'),

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,

      pagination:'',
      currentPage: 1,
      limit: 10,
      tableArr: '',

      // 表格行点击时产品信息
      record: "",

      // 搜素产品名称
      keyWord:'',
      

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
    this.getProduct = this.getProduct.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSearch = this.onSearch.bind(this)
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
        if (!res.data.code === "SUCCESS") {

        } else {
          this.setState({
            tableArr: res.data.data.data,
            pagination:res.data.data.pagination
          })
        }
      })
  }


  createProduct() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    if (data.number == undefined || data.produceCoding == undefined
      || data.putaway == undefined || data.specification == undefined || data.produceType == undefined || data.produceName == undefined
      | data.number.includes(' ') || data.produceCoding.includes(' ')
      || data.putaway.includes(' ') || data.specification.includes(' ') || data.produceType.includes(' ') || data.produceName.includes(' ')
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



  formRef = React.createRef()
  submit() {

    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.createProduct()

  }


  onSearch(val){
    console.log(val);
    this.setState({
      keyWord:val
    },()=>{
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
      limit:pageSize    
    }, () => {      //setstate异步回调箭头函数
      this.getProduct()
    })



  }

  setVisible() {
    this.setState({
      visible: !this.state.visible
    })
  };

  onCancel() {
    this.setState({
      visible: false
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
          <span style={{ fontSize: '18px' }}>产品管理</span>
          <Search placeholder='请输入产品名称' style={{ width: '200px' }}   onSearch={this.onSearch}   
            allowClear
          ></Search>
          <div>
            <Button type='primary'
              onClick={this.setVisible}
            >新建产品</Button>
            <Modal
              visible={this.state.visible}
              title="新建产品"
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
                    <Input></Input>
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
          onClick={()=>{
            console.log(this.state.tableArr);
          }}
          >
                      按时到达的
          </div  >

          <div style={{ position: 'relative' }}>
            <div>
              <Table
                columns={Data.columns}
                dataSource={this.state.tableArr}
                scroll={{ x: 1500, y: 300 }}
                pagination={{pageSize:this.state.pagination.limit}}
                onRow={(record) => ({
                  onClick: () => {
                    console.log(record);
                    this.setState({
                      drawerVisible: true,
                      record: record,
                      drawerTitle: record.productName

                    })
                  },
                })}

              />
              <Drawer
                title={this.state.drawerTitle}
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.drawerVisible}
              >
                <div>
                  <div>
                    <span>产品类别</span>
                    <span>产品单位</span>
                    <span>产品价格</span>
                    <span>产品编码</span>
                  </div>
                  <div>
                    <span>{this.state.record.category}</span>
                    <span>只/辆/千克</span>
                    <span>{this.state.record.price}</span>
                    <span>{this.state.record.code}</span>
                  </div>
                </div>


              </Drawer>
            </div>
            <div style={{ position: 'absolute', bottom: '-374px', right: '0px'}}>
              <ConfigProvider locale={zhCN}>
                <Pagination  showQuickJumper    
                defaultPageSize={10}
                showTotal={total => `共 ${total} 项`}  defaultCurrent={1} total={this.state.pagination.total}  style={{marginLeft:'20PX'}}  onChange={this.onChange} />
              </ConfigProvider>
            </div>

          </div>
        </div>



      </div >
    );
  }
}

export default Bo;



