import {ConfigProvider, Input, Space, Table,Pagination } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React, {useState,useEffect} from "react";
import axios from "axios";
import base from "../../../axios/axios";
function LinkBusiness() {
    let arr = ['客户', '联系人', '商机', '合同']
    let token  = window.localStorage.getItem('token')
    let [activeIndex1, setActiveIndex1] = useState(0)  //关联业务
    const {Search} = Input;
    const onSearch = value => console.log(value);
    useEffect(()=>{
        axios({
            method:'get',
            url:base.url+'/schedule/getBusinessType?token='+token
        }).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            alert(error)
        })
    })
    //关联业务模块 客户表格
    const columns = [
        {
            title: '客户名称',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '下次联系时间',
            width: 120,
            dataIndex: 'time',
            key: '0',
        },
        {
            title: '最后跟进时间',
            dataIndex: 'time1',
            key: '1',
            width: 120,
        },
        {
            title: '创建时间',
            dataIndex: 'time2',
            key: '2',
            width: 150,
        },
    ];
    let [selectedRowKeys,setSelectedRowKeys] = useState([])
    let onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: '奇数行',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
            {
                key: 'even',
                text: '偶数行',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
        ],
    };
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            time: '2021-6-23',
            time1: '2021-6-23',
            time2: '2021-6-23',
        });
    }
    //关联业务模块 联系人表格
    const columnsMan = [
        {
            title: '客户姓名',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '手机',
            width: 120,
            dataIndex: 'phone',
            key: '0',
        },
        {
            title: '是否关键决策人',
            dataIndex: 'people',
            key: '1',
            width: 120,
        },
        {
            title: '职务',
            dataIndex: 'post',
            key: '2',
            width: 150,
        },
    ];
    let [selectedRowKeysMan,setSelectedRowKeysMan] = useState([])
    let onSelectChangeMan = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysMan(selectedRowKeys)
    };
    const rowSelectionMan = {
        selectedRowKeysMan,
        onChange: onSelectChangeMan,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const dataMan = [];
    for (let i = 0; i < 100; i++) {
        dataMan.push({
            key: i,
            name: `Edrward ${i}`,
            phone: '13085503836',
            people: '是',
            post: '经理',
        });
    }
    //关联业务模块 商机表格
    const columnsBusiness = [
        {
            title: '商机名称',
            width: 120,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '商机金额',
            width: 120,
            dataIndex: 'num',
            key: '0',
        },
        {
            title: '客户名称',
            dataIndex: 'name1',
            key: '1',
            width: 120,
        },
        {
            title: '商机状态组',
            dataIndex: 'name2',
            key: '2',
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'name3',
            key: '3',
            width: 150,
        },
    ];
    let [selectedRowKeysBusiness,setSelectedRowKeysBusiness] = useState([])
    let onSelectChangeBusiness = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysBusiness(selectedRowKeys)
    };
    const rowSelectionBusiness = {
        selectedRowKeysBusiness,
        onChange: onSelectChangeBusiness,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const dataBusiness = [];
    for (let i = 0; i < 100; i++) {
        dataBusiness.push({
            key: i,
            name: `Edrward ${i}`,
            num: '100',
            name1: '132',
            name2: '系统默认',
            name3:'需求分析'
        });
    }
    //关联业务模块 合同表格
    const columnsContract = [
        {
            title: '合同编号',
            width: 120,
            dataIndex: 'name1',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '合同名称',
            width: 120,
            dataIndex: 'name2',
            key: '0',
        },
        {
            title: '客户名称',
            dataIndex: 'name3',
            key: '1',
            width: 120,
        },
        {
            title: '合同金额',
            dataIndex: 'name4',
            key: '2',
            width: 150,
        },
        {
            title: '开始日期',
            dataIndex: 'time',
            key: '3',
            width: 150,
        },
        {
            title: '结束日期',
            dataIndex: 'time1',
            key: '4',
            width: 150,
        },
    ];
    let [selectedRowKeysContract,setSelectedRowKeysContract] = useState([])
    let onSelectChangeContract = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysContract(selectedRowKeys)
    };
    const rowSelectionContract = {
        selectedRowKeysContract,
        onChange: onSelectChangeBusiness,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const dataContract = [];
    for (let i = 0; i < 100; i++) {
        dataContract.push({
            key: i,
            name: `Edrward ${i}`,
            name1: '100',
            name2: '132',
            name3: '系统默认',
            name4:'需求分析',
            time:'2021-6-24',
            time1:'2021-7-24'
        });
    }
    return(
        <div className={'bus'}>
            <div className={'business'}>
                {arr.map((item, index) => {
                    return (
                        <div  className={index === activeIndex1 ? 'active1' : ''}
                              onClick={() => {
                                  setActiveIndex1(index)
                              }}
                              key={index}>{item}</div>
                    )
                })}
            </div>

            <div className={'business1'}>
                <div className={'businessTop'}>
                    <div>
                        <Space direction="vertical">
                            <Search  onSearch={onSearch} style={{width: 200,height:'30px',overflow:'hidden'}}/>
                        </Space>
                    </div>
                    <div>
                        <button className={'businessBtn'}>新建</button>
                    </div>
                </div>
                {/*客户*/}
                <div className={activeIndex1 === 0?"": 'hidden'} style={{width: '675px',height:'300px',}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 150, y: 200 }} />
                        <Pagination defaultCurrent={1} total={50} style={{position:'absolute',bottom:'65px'}} />
                    </ConfigProvider>
                </div>
                {/*联系人*/}
                <div className={activeIndex1 === 1?"": 'hidden'} style={{width: '675px',height:'300px'}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelectionMan} columns={columnsMan} dataSource={dataMan} scroll={{ x: 150, y: 200 }} />
                        <Pagination defaultCurrent={1} total={50} style={{position:'absolute',bottom:'65px'}} />
                    </ConfigProvider>
                </div>
                {/*商机*/}
                <div className={activeIndex1 === 2?"": 'hidden'} style={{width: '675px',height:'300px'}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true}  rowSelection={rowSelectionBusiness} columns={columnsBusiness} dataSource={dataBusiness} scroll={{ x: 150, y: 200 }} />
                        <Pagination defaultCurrent={1} total={50} style={{position:'absolute',bottom:'65px'}} />
                    </ConfigProvider>
                </div>
                {/*合同*/}
                <div className={activeIndex1 === 3?"": 'hidden'} style={{width: '675px',height:'300px'}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelectionContract} columns={columnsContract} dataSource={dataContract} scroll={{ x: 150, y: 200 }} />
                        <Pagination defaultCurrent={1} total={50} style={{position:'absolute',bottom:'65px'}} />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
}
export default LinkBusiness
