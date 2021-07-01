import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import { Input, Modal, Table, Button, Spin, Select, Menu, Dropdown, Form } from 'antd'
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import Data from './js'

const { Search } = Input
const { Option } = Select


function GetCustomer(props) {


    const [selectionType, setSelectionType] = useState('radio');

    let [token, setToken] = useState(window.localStorage.getItem('token'))
    let [keyWord, setKeyWord] = useState('')
    let [tableArr, setTableArr] = useState([])
    let [pagination, setPagination] = useState('')
    let [visible, setVisible] = useState(false)
    let [currentPage, setCurrentPage] = useState(1)
    let [limit, setLimit] = useState(10)
    let [keyword, setKeyword] = useState('')
    // let [selectedRowKeys, setSelectedRowKeys] = useState([])
    let [record, setRecord] = useState([])
    let [arr, setArr] = useState([])
    let [arrTags, setArrTags] = useState('')
    let [tags, setTags] = useState('')
    let [selectedRowKeys, setSelectedRowKeys] = useState([])
    let [visibleLoading, setVisibleLoading] = useState('block')
    let [visibleTable, setVisibleTable] = useState('none')
    let [modalProVisible, setModalProVisible] = useState(false)
    let [selectedRows, setSelectedRows] = useState([])
    let [selectTags, setSelectTags] = useState([])



    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />





    useEffect(() => {
        // console.log(props);
        getCustomer()
    }, [])


    const rowSelection = {
        selectionType: 'radio',
        hideDefaultSelections: true, // 去掉全选
        onChange: (selectedRowKeys, selectedRows) => {

            selectedRows = selectedRows
            setSelectedRows(selectedRows)
            
            let arr = []
            selectedRows.map((item) => {
                arr.push(item.clientName)
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

    function sendCustomerID(val) {
        tags = arrTags
        setTags(tags)

        props.methods(selectedRows)
        // props.getProduct(selectedRows)
    }


    function getCustomer() {
        //获取客户列表
        axios({
            method: 'get',
            url: `${base.url}/client/getClient`,
            params: {
                token: token,
                keyword: keyword,
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
                            clientName: item.clientName,
                            nextTalkTime: item.nextTalkTime,
                            updateTime: item.updateTime,
                            createTime: item.createTime,
                        })

                        // arr.push({...item,key:index+1})


                    })
                    // arr=res.data.data.data


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

    function validateServiceName(rule, value, callback) {
        console.log(value)
        // this.setState({
        //    onlyName: value 
        // },()=>{
        //     this.nameChange(callback)
        // })
    }
   

    return (
        <Form.Item
            // name="clientId"
            label="客户名称"
            rules={[
                {
                    required: true,
                    message: '客户姓名不能为空',
                },
            ]}
        >

            <div style={{ position: 'relative', height: '40px' }} >
                <Select
                    dropdownClassName="hiddenDropdown"
                    mode='tags'
                    value={tags}
                    allowClear={true}
                    onClear={() => {
                        tags = ''
                        setTags(tags)
                    }}

                    style={{ position: 'absolute', right: '0px' }} style={{ width: 184 }} onClick={() => { setModalProVisible(true) }} >添加产品</Select>
                <Modal
                    mask={false}
                    title={'客户'}
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
                        sendCustomerID()
                    }}
                    onCancel={() => { setModalProVisible(false) }}

                >
                    <div style={{ textAlign:'center', padding: '0px 0px  15px 0' }}>
                        <Search style={{ width: '200px' }} placeholder='请输入客户名称' ></Search>
                    </div>
                    <Spin style={{ display: visibleLoading }} indicator={antIcon} />
                    <Table
                        style={{ display: visibleTable }}
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection
                        }}

                        columns={Data.columns}
                        dataSource={arr}
                        scroll={{ y: 250 }}
                        style={{  height: 250 }}
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
                    <div style={{ position: 'absolute', bottom: '20px' }} >
                        <Button type='primary' style={{ marginRight: '20px' }}  >上一页</Button>
                        <Button type='default' >下一页</Button>
                    </div>

                </Modal>



            </div>
        </Form.Item>
    )


}



export default GetCustomer