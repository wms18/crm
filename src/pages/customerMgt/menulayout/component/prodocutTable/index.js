import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import { Table, Button, Select, Input, Pagination, Layout, Modal, Form, Cascader,Drawer } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import Data from "./js";


const { Option } = Select
const { Search } = Input
const { Content, Footer, Header } = Layout




const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    productName: `BSJ-1 ${i}`,
    category: `11${i}`,
    code: 3 + i,
    IsPutOnShelves: "已上架",
    quanity: '10,000,000',
    createPerson: 'jack',
    updateTime: '2021-02-11',
    createTime: '2020-09-11',
    updateTime: '2021-04-02',
    personInCharge: 'lily',
  });
}



class ProductTable extends Component {



  componentDidMount() {
    this.getProduct()
  }

  constructor(props) {
    super(props)
    this.state = {

      drawerVisible:false,

      token: window.localStorage.getItem('token'),

      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      

      currentPage: 1,
      limit: 10,
      tableArr: [],

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
  }

  getProduct() {
    //获取产品列表
    axios.get(`${base.url}/produce/getProduce?currentPage=` + this.state.currentPage + `&limit=` + this.state.limit, {
      params: {
        token: this.state.token,
        keyWord: "1"
      }
    })
      .then((res) => {
        console.log(res);
        if (!res.data.code === "SUCCESS") {

        } else {
          this.setState({
            tableArr: res.data.data.data
          })
        }
      })
  }


  createProduct() {
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    axios.post(`${base.url}/produce/create?number=` + data.number + `&price=` + data.price + `&produceCoding=` + data.produceCoding, {
      params: {
        token: this.state.token
      },
      data: {
        produceIntroduce: data.produceIntroduce,
        produceName: data.produceName,
        produceType: data.produceType,
        putaway: data.putaway,
        specification: data.specification,
      }
    })
      .then((res) => {
        console.log(res);
      })
  }



  formRef = React.createRef()
  submit() {
    // console.log(this.formRef.current)
    const data = this.formRef.current.getFieldsValue();  //拿到form表单的值
    console.log(data)
    this.createProduct()
    // this.setState({
    //   number: data.number,
    //   price: data.price,
    //   produceCoding: data.produceCoding,
    //   produceIntroduce: data.produceIntroduce,
    //   produceName: data.produceName,
    //   produceType: data.produceType,
    //   putaway: data.putaway,
    //   specification: data.specification
    // })
  }



  onClose(){
    this.setState({
      drawerVisible:false
    })
  }
  showDrawer (){
    this.setState({
      drawerVisible:true
    })
  }

  onChange(pageNumber) {
    console.log('Page: ', pageNumber);

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
          <Search placeholder='请输入产品名称' style={{ width: '200px' }}></Search>
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
                      <Option value='未上架'>未上架</Option>
                      <Option value='已上架'>已上架</Option>
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
          <div style={{ height: 20 }}>

          </div  >

          <div style={{ position: 'relative' }}>
            <div>
              <Table
                columns={Data.columns}
                dataSource={data}
                scroll={{ x: 1500, y: 300 }}
                onRow={(record) => ({
                  onClick: () => {
                    console.log(record);
                    this.setState({
                    drawerVisible:true,
                    drawerTitle:record.productName

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
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Drawer>
            </div>
            <div style={{ position: 'absolute', bottom: '-374px', right: '0px' }}>
              <ConfigProvider locale={zhCN}>
                <Pagination defaultCurrent={1} total={500} onChange={this.onChange} />
              </ConfigProvider>
            </div>

          </div>
        </div>



      </div >
    );
  }
}

export default ProductTable;



