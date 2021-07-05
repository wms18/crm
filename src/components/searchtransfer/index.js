import React, { useState } from 'react';
import { Transfer, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
import axios from 'axios';
import { useEffect } from 'react';
import base from '../../axios/axios';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `标题${i + 1}`,
    description: `内容${i + 1}`,
  });
}

const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);



const Searchtransfer = (props) => {
  let [mockData, setMockData] = useState([])
  let [dep, setDep] = useState()
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    console.log(props);
    props.dep ? getDep() : getEmployee()
    props.dep ? setDep(true) : setDep(false)
  }, [props])

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  //获得所有部门
  function getDep() {
    axios({
      method: 'get',
      url: `${base.url}/employee/getAllDepartment`,   //获取业绩指标
      params: {
        token: token
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      })
  }
  //获得所有员工
  function getEmployee() {
    axios({
      method: 'get',
      url: `${base.url}/employee/getEmployee`,   //获取业绩指标
      params: {
        token: token
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      })
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Transfer
        dataSource={mockData}
        titles={dep ? ['部门', '已选择部门'] : ['员工', '已选择员工']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        // onScroll={onScroll}
        render={item => item.title}
      />
    </ConfigProvider>
  );
};

export default Searchtransfer;