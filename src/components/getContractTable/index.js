import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import { Input, Modal, Table, Button, Spin, Select, Menu, Dropdown, Form, message, ConfigProvider } from 'antd'
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import Data from './js'
import zhCN from 'antd/es/locale/zh_CN';

// import GetCustomer from '../getCustomer'

const { Search } = Input
// const { Option } = Select


function GetContractTable(props) {



    const [selectionType, setSelectionType] = useState('radio');

    let [token, setToken] = useState(window.localStorage.getItem('token'))
    let [keyWord, setKeyWord] = useState('')
    let [tableArr, setTableArr] = useState([])
    let [pagination, setPagination] = useState([])
    let [visible, setVisible] = useState(false)
    let [currentPage, setCurrentPage] = useState(1)
    let [limit, setLimit] = useState(10)
    let [keyword, setKeyword] = useState('')
    // let [selectedRowKeys, setSelectedRowKeys] = useState([])
    let [record, setRecord] = useState([])
    let [arr, setArr] = useState([])
    let [arrTags, setArrTags] = useState('')
    let [tags, setTags] = useState(undefined)
    let [selectedRowKeys] = useState([])
    let [visibleLoading, setVisibleLoading] = useState('block')
    let [visibleTable, setVisibleTable] = useState('none')
    let [modalProVisible, setModalProVisible] = useState(false)
    let [selectedRows, setSelectedRows] = useState([])
    let [selectTags, setSelectTags] = useState([])
    let [hasBizOpp, setHasBizOpp] = useState(true)
    let [customerID, setCustomerID] = useState()
    let [hasData, setHasData] = useState(false)

    useEffect(() => {
        console.log(props);
        if (props.id) {
            setCustomerID(props.id)
            setHasBizOpp(false)
            // visibleLoading()
        } else {
            // setCustomerID(props.id)
            setHasBizOpp(true)
        }
    }, [props])

    useEffect(() => {
        console.log('加载');
        getContract(customerID)
    }, [customerID])

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />





    // useEffect(() => {
    // }, [])


    const rowSelection = {
        selectionType: 'radio',
        hideDefaultSelections: true, // 去掉全选
        onChange: (selectedRowKeys, selectedRows) => {

            console.log(selectedRows);
            selectedRows = selectedRows
            setSelectedRows(selectedRows)

            let arr = []
            selectedRows.map((item) => {
                arr.push(item.contractName)
                return arr
            })
            arrTags = arr
            setArrTags(arr)

        },
    };

    function addProductItem(val) {
        // selectTags = val
        // setSelectTags(selectTags)
    }

    function sendContractCoding(selectedRows) {
        // tags = arrTags
        // setTags(tags)

        props.methods(selectedRows)
    }


    function getContract(id) {
        //获取合同列表
        axios({
            method: 'get',
            url: `${base.url}/client/getContract`,
            params: {
                token: token,
                clientId: id,
                // keyword: keyword,
                // currentPage: currentPage,
                // limit: limit
            }
        })

            .then((res) => {
                console.log(res);
                if (res.data.code === "ERROR") {

                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)
                    arr = []
                    setArr(arr)

                } else {
                    if (res.data.data.length == 0) {
                        hasData = true
                        setHasData(hasData)
                    }
                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)
                    console.log('合同信息存在')
                    arr = []
                    setArr(arr)
                    let temp = [...arr]  //解構對象，再set,不让指向同一内存地址导致Table组件不更新    
                    res.data.data.map((item, index) => {
                        temp.push({
                            key: (index + 1).toString(),
                            id: item.id,
                            contractCoding: item.contractCoding,
                            contractName: item.contractName,
                            clientName: item.clientName,
                            contractPrice: item.contractPrice,
                            orderTime: item.orderTime,
                            createTime: item.createTime,
                        })
                        // setArr(temp)
                        setArr(temp)
                    })



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
            .catch((res) => {
                arr = []
                setArr(arr)
            })
    }

    function validateServiceName(rule, value, callback) {
        console.log(value)
        // this.setState({
        //    onlyName: value 
        // },()=>{
        //     this.nameChange(callback)
        // })
    }


    return (


        <div style={{ position: 'relative', height: '40px' }} >
            <Select
                placeholder='+添加'
                disabled={hasBizOpp}
                dropdownClassName="hiddenDropdown"
                mode='tags'
                value={tags}
                allowClear={true}
                onClear={() => {
                    arrTags = ''
                    setArrTags(arrTags)
                    tags = undefined
                    setTags(tags)
                    // selectedRows = ''
                    // setSelectedRows(selectedRows)
                    sendContractCoding()
                }}

                style={{ position: 'absolute', right: '0px' }} style={{ width: 184 }}

                onClick={() => {
                    console.log(arr);
                    if (hasBizOpp) {

                    } else {
                        setModalProVisible(true)

                    }
                }} >添加产品</Select>
            <Modal
                destroyOnClose={true}
                mask={false}
                title={'合同'}
                visible={modalProVisible}
                width={600}
                bodyStyle={{ height: 350, position: 'relative' }}

                // height={500}
                // style={{height:500}}
                style={{ position: "absolute", right: 10 }}
                okText="保存"
                cancelText="取消"
                onOk={() => {
                    setModalProVisible(false)
                    // sendBizOppID()
                    tags = arrTags
                    setTags(tags)
                    console.log(tags);
                    sendContractCoding(selectedRows)
                }}
                onCancel={() => { setModalProVisible(false) }}

            >
                <div style={{ textAlign: 'center', padding: '0px 0px  15px 0' }}>
                    <Search style={{ width: '200px' }} placeholder='请输入合同名称' ></Search>
                </div>
                <Spin style={{ display: visibleLoading }} indicator={antIcon} />

                <ConfigProvider locale={zhCN}>
                    <Table
                        style={{ display: visibleTable }}
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection
                        }}

                        columns={Data.columns}
                        dataSource={arr}
                        scroll={{ y: 130 }}
                        // style={{  height: 200 }}

                        //点击行显示表格行信息
                        onRow={(record) => ({
                            onClick: () => {
                                console.log(record);
                                record = record
                                setRecord(record)
                            },
                        })}

                    />
                </ConfigProvider>

                <div style={{ position: 'absolute', bottom: '20px' }} >
                    <Button type='primary' style={{ marginRight: '20px' }}
                        onClick={() => {
                            console.log(1);
                            if (currentPage == 1) {
                                message.warning('已是第一页')
                            }
                        }}
                        disabled={hasData}
                    >上一页</Button>
                    <Button type='default'
                        onClick={() => {
                            console.log(1);
                            if (currentPage == pagination.totalPage) {
                                message.warning('已是最后一页')
                            }
                        }}
                        disabled={hasData}
                    >下一页</Button>
                </div>

            </Modal>



        </div>

    )


}



export default GetContractTable