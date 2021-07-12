import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import { Input, Modal, Table, Button, Spin, Select, Menu, Dropdown, Form, message } from 'antd'
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import Data from './js'
import GetCustomer from '../getCustomer'

const { Search } = Input
const { Option } = Select


function GetBizOppTable(props) {
    useEffect(() => {
        console.log(props.id);
        if (props.id) {
            setCustomerID(props.id)
            setHasBizOpp(false)


        } else {
            console.log('不存在');
            setHasBizOpp(true)
        }


        // console.log("props.linkBizOpp", props.linkBizOpp)
        // if (!props.linkBizOpp) {
        //     hasBizOpp = false
        //     setHasBizOpp(hasBizOpp)
        // } else {
        //     tags = props.linkBizOpp.name
        //     setTags(tags)
        //     hasBizOpp = true
        //     setHasBizOpp(hasBizOpp)
        // }


    }, [props])


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


    useEffect(() => {
        console.log('加载');
        getBizOpp(customerID)
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
                arr.push(item.name)
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

    function sendBizOppID() {
        // tags = arrTags
        // setTags(tags)

        props.methods(selectedRows)
    }


    function getBizOpp(id) {
        //获取商机列表
        axios({
            method: 'get',
            url: `${base.url}/client/getCommercialOpportunity`,
            params: {
                token: token,
                clientId: id
                // keyword: keyword,
                // currentPage: currentPage,
                // limit: limit
            }
        })

            .then((res) => {
                console.log(res);
                if (res.data.code == "ERROR") {

                    visibleLoading = 'none'
                    setVisibleLoading(visibleLoading)
                    visibleTable = 'block'
                    setVisibleTable(visibleTable)
                    arr = []
                    setArr(arr)

                } else {
                    arr = []
                    setArr(arr)
                    let temp=[...arr]  //解構對象，再set,不让指向同一内存地址导致Table组件不更新    

                    res.data.data?
                    res.data.data.map((item, index) => {
                        temp.push({
                            key: (index + 1).toString(),
                            id: item.commercialOpportunityId,
                            clientName: item.clientName,
                            commercialStage: item.commercialStage,
                            commercialStatusGroup: item.commercialStatusGroup,
                            name: item.name,
                            totalPrice: item.totalPrice,
                        })
                            // setArr(temp)
                            setArr(temp)
                    })
                    :
                    console.log('');



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
        <div>

            <Form.Item
                // name="clientId"
                label="商机名称"
                rules={[
                    {
                        required: true,
                        message: '商机姓名不能为空',
                    },
                ]}
            >

                <div style={{ position: 'relative', height: '40px' }} >
                    <Select
                        placeholder='+添加'
                        disabled={hasBizOpp}
                        dropdownClassName="hiddenDropdown"
                        mode='tags'
                        value={tags}
                        allowClear={true}
                        onClear={() => {
                            arrTags=''
                            setArrTags(arrTags)
                            tags = undefined
                            setTags(tags)
                            // selectedRows = ''
                            // setSelectedRows(selectedRows)
                            sendBizOppID()
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
                        title={'商机'}
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
                            sendBizOppID()
                            tags = arrTags
                            setTags(tags)
                            console.log(tags);
                        }}
                        onCancel={() => { setModalProVisible(false) }}

                    >
                        <div style={{ textAlign: 'center', padding: '0px 0px  15px 0' }}>
                            <Search style={{ width: '200px' }} placeholder='请输入商机名称' ></Search>
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
                        <div style={{ position: 'absolute', bottom: '20px' }} >
                            <Button type='primary' style={{ marginRight: '20px' }}
                                onClick={() => {
                                    console.log(1);
                                    if (currentPage == 1) {
                                        message.warning('已是第一页')
                                    }
                                }}
                            >上一页</Button>
                            <Button type='default'
                                onClick={() => {
                                    console.log(1);
                                    if (currentPage == pagination.totalPage) {
                                        message.warning('已是最后一页')
                                    }
                                }}
                            >下一页</Button>
                        </div>

                    </Modal>



                </div>
            </Form.Item>
            {/* <GetCustomer name   ></GetCustomer> */}
        </div>

    )


}



export default GetBizOppTable