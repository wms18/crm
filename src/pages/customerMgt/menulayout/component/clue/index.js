import React, { Component } from "react";
import axios from 'axios';
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
import { Table, Button, Select, Input, Pagination, Layout, Modal, Form, Cascader } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd' 

const { Option } = Select
const { Search } = Input
const { Content, Footer, Header } = Layout

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];


const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    customerName: `Edward King ${i}`,
    contact: `Edward Dau ${i}`,
    phone1: 199000 + i,
    phone2: 199000 + i,
    sourcesOfClues:"展销会",
    businessType:'线下订单',
    productPrice: 100+ i,
    customerLevel:'C',
    remarks:'——',
    department:'业务部们',
    updateTime:'2021-04-11',
    createTime:'2021-02-21',
    personInCharge:'Jack',
    followUpRecord:'——',
  });
}

const columns = [
  {
    width: 100,
    title: '客户名称',
    dataIndex: 'customerName',
    fixed: 'left',
    key:'customerName',
    sorter: {
      compare: (a, b) => a.customerName - b.customerName,
      multiple: 3,
    },
  },
  {
    title: '联系人',
    width: 100,
    dataIndex: 'contact',
    key:'contact',
    fixed: 'left',
    sorter: {
      compare: (a, b) => a.contact - b.contact,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '电话1',
    dataIndex: 'phone1',
    key:"1",
    sorter: {
      compare: (a, b) => a.phone1 - b.phone1,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '电话2',
    key:"2",
    dataIndex: 'phone2',
    sorter: {
      compare: (a, b) => a.phone2 - b.phone2,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '线索来源',
    key:"3",
    dataIndex: 'sourcesOfClues',
    sorter: {
      compare: (a, b) => a.sourcesOfClues - b.sourcesOfClues,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '业务类型',
    key:"4",
    dataIndex: 'businessType',
    sorter: {
      compare: (a, b) => a.businessType - b.businessType,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '产品报价',
    dataIndex: 'productPrice',
    key:"5",
    sorter: {
      compare: (a, b) => a.productPrice - b.productPrice,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '客户等级',
    dataIndex: 'customerLevel',
    key:"6",
    sorter: {
      compare: (a, b) => a.customerLevel - b.customerLevel,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '备注',
    dataIndex: 'remarks',
    key:"7",
    sorter: {
      compare: (a, b) => a.remarks - b.remarks,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '部门',
    dataIndex: 'department',
    key:"8",
    sorter: {
      compare: (a, b) => a.department - b.department,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '更新时间',
    dataIndex: 'updateTime',
    key:"9",
    sorter: {
      compare: (a, b) => a.updateTime - b.updateTime,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key:"10",
    sorter: {
      compare: (a, b) => a.createTime - b.createTime,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '负责人',
    dataIndex: 'personInCharge',
    fiexed:'right',
    key:"personInCharge",
    sorter: {
      compare: (a, b) => a.personInCharge - b.personInCharge,
      multiple: 3,
    },
  },
  {
    width: 100,
    title: '跟进记录',
    dataIndex: 'followUpRecord',
    fixed: 'right',
    sorter: {
      compare: (a, b) => a.followUpRecord - b.followUpRecord,
      multiple: 3,
    },
  },
];

class Clue extends Component {



  componentDidMount() {

    axios.post(`${base.url}/employee/login?password=` + 123456 + `&phone=` + 18888888888, {
    })
      .then((res) => {
        if (res.data.code === "SUCCESS") {
          window.localStorage.setItem('token', res.data.data.token)

          //获取产品列表
          axios.get(`${base.url}/produce/getProduce?currentPage=1&limit=10`, {
            params: {
              token: res.data.data.token,
              keyWord: "1"
            }
          })
            .then((res) => {
              console.log(res);
            })
        }

      })
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
    this.onChange = this.onChange.bind(this)
    this.setVisible = this.setVisible.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
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
          <span style={{ fontSize: '18px' }}>线索管理</span>
          <Search placeholder='请输入线索名称' style={{ width: '200px' }}></Search>
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
              onOk={() => { }}
            >

              <Form
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                  modifier: 'public',
                }}
              >
                <div>
                  <Form.Item
                    name="productName"
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

                    name="productCategory"
                    label="产品类别"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                    ]}
                  >
                    <Cascader options={options} placeholder="默认" />
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="productStockQty"
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
                    name="isPutShelves"
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
                    name="productSize"
                    label="规格"
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
                    name="productPrice"
                    label="价格"
                  >
                    <Input value='0' />
                  </Form.Item>
                </div>


                <div>
                  <Form.Item
                    name="productStockQty"
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
                // onChange={(page) => this.pageChange(page)}
                columns={columns}
                dataSource={data}
                scroll={{ x: 1500, y: 300 }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-374px', right: '0px' }}>
              <ConfigProvider locale={zhCN}>
                <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />
              </ConfigProvider>
            </div>

          </div>
        </div>



      </div >
    );
  }
}

export default Clue;



