import { Table, Button } from 'antd';
import axios from 'axios';
import React, { Component } from "react";
import base from '../../../../../axios/axios';
import qs from 'qs'
import './style.css'
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 3 + i,
    address: `London, Park Lane no. ${i}`,
  });
}

const columns = [
  {
    width:100,
    title: '产品名称',
    dataIndex: 'productName',
    sorter: {
      compare: (a, b) => a.productName - b.productName,
      multiple: 3,
    },
  },
  {
    title: '产品类别',
    width:100,
    dataIndex: 'category',
    sorter: {
      compare: (a, b) => a.category - b.category,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '产品编码',
    dataIndex: 'code',
    sorter: {
      compare: (a, b) => a.code - b.code,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '是否上架',
    dataIndex: 'IsPutOnShelves',
    sorter: {
      compare: (a, b) => a.IsPutOnShelves - b.IsPutOnShelves,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '产品价格',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '库存数量',
    dataIndex: 'quanity',
    sorter: {
      compare: (a, b) => a.quanity - b.quanity,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '创建人',
    dataIndex: 'createPerson',
    sorter: {
      compare: (a, b) => a.createPerson - b.createPerson,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: {
      compare: (a, b) => a.updateTime - b.updateTime,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: {
      compare: (a, b) => a.createTime - b.createTime,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: {
      compare: (a, b) => a.updateTime - b.updateTime,
      multiple: 3,
    },
  },
  {
    width:100,
    title: '负责人',
    dataIndex: 'personInCharge',
    sorter: {
      compare: (a, b) => a.personInCharge - b.personInCharge,
      multiple: 3,
    },
  },
];

class ProductTable extends Component {

  componentDidMount() {

    axios.post(`${base.url}/employee/login?password=` + 123456 + `&phone=` + 18888888888, {
    })
      .then((res) => {
        if (res.data.code === "SUCCESS") {
          window.localStorage.setItem('token', res.data.data.token)

          //获取产品列表
          axios.get(`${base.url}/produce/getProduce?currentPage=1&limit=10`, {
            params:{
             token: res.data.data.token,
             keyWord :"1"
            }
          })
            .then((res) => {
              console.log(res);
            })
        }

      })
  }


  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data}   pagination={{ pageSize: 50 }} scroll={{ x: 900, y: 300 }} />
      </div>
    );
  }
}

export default ProductTable;



