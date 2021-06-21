import React, { Component } from 'react'
import { Table, Button } from 'antd';
import './style.css'
import Paging from '../Paging';
import base from '../../../../../../axios/axios'
import axios from 'axios'
import qs from 'qs'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
    width: 100,

  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 150,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 100
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200
  },
  {
    title: '部门',
    dataIndex: 'department',
    width: 100
  },
  {
    title: '岗位',
    dataIndex: 'role',
    width: 200
  },
  {
    title: '直属上级',
    dataIndex: 'superEmployee',
    width: 100
  },

];

class sdTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: true,
    data: []
  };

  componentDidMount() {
    this.getEmployee()
    console.log(`${base.url}/employee/getEmployee`);
  }


  getEmployee = () => {
    axios.get(`${base.url}/employee/getEmployee?token=` + window.localStorage.getItem('token'))
      .then((res) => {
        console.log(res);
        if (res.data.code === 'ERROR') {

        } else {
          this.setState({
            data: res.data.data.data,
            loading: false
          })
        }
      })
      .catch((error) => {
        console.log(error);
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
        {
          this.state.loading ?
            <div style={{ display: 'flex' }}>
              <Spin indicator={antIcon} style={{ flex: 1 }} />
            </div>
            :
            <Table rowSelecftion={rowSelection} columns={columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ x: 400 }} />
        }
      </div>
    );
  }
}

export default sdTable;