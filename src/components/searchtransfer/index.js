import React, { useState } from 'react';
import { Transfer, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
import axios from 'axios';
import { useEffect } from 'react';
import base from '../../axios/axios';




const Searchtransfer = (props) => {


  let [dep, setDep] = useState()
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [targetKeys, setTargetKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  let [mockData, setMockData] = useState([])
  let [nextTargetKeys, setNextTargetKeys] = useState([])

  useEffect(() => {

    console.log(props);
    props.dep ? getDep() : getEmployee()
    props.dep ? setDep(true) : setDep(false)
  }, [])

  const onChange = (nextTargetKeys, direction, moveKeys) => {

    //
    console.log('选中的员工id:', nextTargetKeys);
    nextTargetKeys=nextTargetKeys
    setNextTargetKeys(nextTargetKeys)

    // if()
    if (nextTargetKeys.length > 0) {
      props.dep ? props.getDepId({ type: 'dep', arr: nextTargetKeys })
        :
        props.getEmpId({ type: 'emp', arr: nextTargetKeys })
    }

    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {
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
        if (res.data.code == 'ERROR') {

        } else {
          let arr = []
          res.data.data ?
            res.data.data.map((item) => {
              arr.push({
                key: item.id.toString(),
                title: item.name,
              });
              return arr

            })
            :
            arr = []
          mockData = arr
          setMockData(arr)
          console.log(mockData);
          let initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
          initialTargetKeys = initialTargetKeys
          setTargetKeys(initialTargetKeys)


        }
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
        if (res.data.code == 'ERROR') {

        } else {
          let arr = []
          res.data.data.data.map((item) => {
            arr.push({
              key: item.id.toString(),
              title: item.username,
            });
            return arr
          })
          mockData = arr
          setMockData(arr)
          console.log(mockData);
          let initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
          initialTargetKeys = initialTargetKeys
          setTargetKeys(initialTargetKeys)



        }
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