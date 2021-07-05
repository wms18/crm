import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import { Input, Modal, Table, Button, Popover, Spin, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import Data from './js'
import userEvent from '@testing-library/user-event'



function GetProductTable(props) {


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
    let [arr, setArr] = useState([])
    let [selectedRowKeys, setSelectedRowKeys] = useState([])
    let [visibleLoading, setVisibleLoading] = useState('block')
    let [visibleTable, setVisibleTable] = useState('none')
    let [modalProVisible, setModalProVisible] = useState(false)
    let [selectedRows, setSelectedRows] = useState([])
    let [selectTags, setSelectTags] = useState([])



    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />





    useEffect(() => {
        getProduct()
    }, [])


    const rowSelection = {
        hideDefaultSelections: true, // 去掉全选
        onChange: (selectedRowKeys, selectedRows) => {
            selectedRows = selectedRows
            setSelectedRows(selectedRows)

            let arr = []
            selectedRows.map((item) => {
                arr.push(item.produceName)
                return arr
            })
            addProductItem(arr)

        },
    };

    function addProductItem(val) {
        selectTags = val
        setSelectTags(selectTags)
    }

    function sendProduct() {
        props.getProduct(selectedRows)
    }


    function getContractLinkProduct() {   //获取在新建回款时关联的产品表


        axios({
            method: 'get',
            url: `${base.url}/contract/getLinkProduce`,
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
                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)
                } else {

                    res.data.data.data.map((item, index) => {
                        arr.push({
                            key: (index + 1).toString(),
                            id: item.id,
                            produceName: item.produceName,
                            produceType: item.produceType,
                            price: item.price,

                        })
                        // arr.push({...item,key:index+1})
                        return arr
                    })
                    // arr=res.data.data.data
                    setArr(arr)

                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)


                    // console.log(arr);
                    // tableArr = arr
                    // setTableArr(tableArr)
                    // pagination = res.data.data.pagination
                    // setPagination(pagination)
                }
            })
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
                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)
                } else {

                    res.data.data.data.map((item, index) => {
                        arr.push({
                            key: (index + 1).toString(),
                            id: item.id,
                            produceName: item.produceName,
                            produceType: item.produceType,
                            price: item.price,

                        })
                        // arr.push({...item,key:index+1})
                        return arr
                    })
                    // arr=res.data.data.data
                    setArr(arr)

                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)


                    // console.log(arr);
                    // tableArr = arr
                    // setTableArr(tableArr)
                    // pagination = res.data.data.pagination
                    // setPagination(pagination)
                }
            })
    }



    return (
        <div style={{ position: 'relative', height: '40px' }} >
            <Button style={{ position: 'absolute', right: '0px' }} type='primary' size={'small'} onClick={() => { setModalProVisible(true) }} >添加产品</Button>
            <Modal
                mask={false}
                title={'产品'}
                visible={modalProVisible}
                width={600}
                bodyStyle={{ height: 300 }}
                // height={500}
                // style={{height:500}}
                style={{ position: "absolute", right: 10 }}
                okText="保存"
                cancelText="取消"
                onOk={() => {
                    setModalProVisible(false)
                    sendProduct()
                }}
                onCancel={() => { setModalProVisible(false) }}
            // footer={[
            //   <Button onClick={this.setModalProVisible} type='primary'>保存</Button>,
            //   <Button onClick={this.setModalProVisible} type='default'>取消</Button>
            // ]}
            >
                <Spin style={{ display: visibleLoading }} indicator={antIcon} />
               

                    <Table
                        style={{ display: visibleTable }}
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

                    />
            </Modal>



        </div>
    )


}



export default GetProductTable