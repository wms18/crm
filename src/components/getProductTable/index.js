import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import { Input, Modal, Table, Button, Popover } from 'antd'
import Data from './js'
import userEvent from '@testing-library/user-event'


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
]; // row

const rowSelection = {
    hideDefaultSelections: true, // 去掉全选
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        // selectedRowKeys=selectedRowKeys
    },
    // getCheckboxProps: (record) => ({
    //     disabled: record.name === 'Disabled User',
    //     // Column configuration not to be checked
    //     name: record.name,
    // }),
};


function GetProductTable() {

    const [selectionType, setSelectionType] = useState('checkbox');

    let [token, setToken] = useState(window.localStorage.getItem('token'))
    let [keyWord, setKeyWord] = useState('')
    let [tableArr, setTableArr] = useState([])
    let [pagination, setPagination] = useState('')
    let [visible, setVisible] = useState(false)
    let [currentPage, setCurrentPage] = useState(1)
    let [limit, setLimit] = useState(10)
    // let [selectedRowKeys, setSelectedRowKeys] = useState([])
    let [record, setRecord] = useState([])
    let [arr, setArr] = useState([
        // { key: "1", produceName: "压缩饼干", produceType: "食品", price: 1 },
        // { key: "2", produceName: "SKII神仙水", produceType: "护肤品", price: 2000 },
        // { key: "3", produceName: "马自达3", produceType: "汽车", price: 1300000 },
        // { key: "4", produceName: "名爵6", produceType: "汽车", price: 90000 }
    ])
    let [selectedRowKeys,setSelectedRowKeys]=useState([])





    useEffect(() => {
        getProduct()
    }, [])




    function changeVisible() {
        visible = !visible
            (visible)
    }

    function getProduct() {
        //获取产品列表
        axios({
            method: 'get',
            url: `${base.url}/produce/getProduce`,
            params: {
                token: token,
                keyWord: keyWord,
                currentPage: currentPage,
                limit: limit
            }
        })

            .then((res) => {
                console.log(res);
                if (res.data.code === "ERROR") {

                } else {

                    res.data.data.data.map((item, index) => {
                        arr.push({
                            key: item.id.toString(),
                            produceName: item.produceName,
                            produceType: item.produceType,
                            price: item.price
                        })
                        return arr
                    })
                    // arr=res.data.data.data
                    setArr(arr)
                    console.log(arr);


                    // console.log(arr);
                    // tableArr = arr
                    // setTableArr(tableArr)
                    // pagination = res.data.data.pagination
                    // setPagination(pagination)
                }
            })
    }



    return (
        <div>
            <div onClick={() => {
                console.log(arr);
            }}>
                11
            </div>
            {arr.length > 0 ? (
                <Table
                    rowSelection={rowSelection}
                    columns={Data.columns}
                    dataSource={arr}
                    // scroll={{ x: 300, y: 200 }}
                    // style={{ width: 200, height: 150 }}
                    pagination={{ pageSize: pagination.limit }}

                    //点击行显示表格行信息
                    onRow={(record) => ({
                        onClick: () => {
                            console.log(record);
                            record = record
                            setRecord(record)
                        },
                    })}

                />)
                :
                ''
            }

        </div>
    )


}



export default GetProductTable