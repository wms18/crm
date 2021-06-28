import {ConfigProvider, Input, Space, Table, Pagination, Button} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React, {useState, useEffect} from "react";
import axios from "axios";
import base from "../../../axios/axios";

function LinkBusiness(props) {
    let arr = ['客户', '联系人', '商机', '合同']

    let token = window.localStorage.getItem('token')
    let [activeIndex1, setActiveIndex1] = useState(0)  //关联业务
    const {Search} = Input;
    let [client, setClient] = useState([])   //客户
    let [pagination, setPagination] = useState('')   //分页
    let [current, setCurrent] = useState('1') //当前页
    let [clientId, setClientId] = useState('')   //客户id
    let [taskMan, setTaskMan] = useState([])     //联系人
    let [currentMan, setCurrentMan] = useState('1')  //联系人当前页
    let [paginationMan, setPaginationMan] = useState('')   //分页
    let [manId, setManId] = useState('') //联系人id
    let [taskBusiness, setTaskBusiness] = useState([])     //商机
    let [currentBusiness, setCurrentBusiness] = useState('1')  //商机当前页
    let [paginationBusiness, setPaginationBusiness] = useState('')   //分页
    let [businessId, setBusinessId] = useState('')   //商机id
    let [taskContract, setTaskContract] = useState([])     //合同
    let [currentContract, setCurrentContract] = useState('1')  //合同当前页
    let [paginationContract, setPaginationContract] = useState('')   //分页
    let [contractId, setContractId] = useState('')   //合同id
    let [search, setSearch] = useState('')   //搜索内容
    const onSearch = value => {
        console.log(value);
        search = value
        setSearch(search)
    }
    useEffect(() => {
        taskclient()
    }, [search])
    //客户
    let taskclient = () => {
        console.log(search)
        axios({
            method: 'get',
            url: base.url + '/client/getClient?token=' + token,
            params: {
                currentPage: current,
                keyword: search,
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                client = response.data.data.data
                setClient(client)
                setPagination(response.data.data.pagination)
            }
        }).catch((error) => {
            alert(error)
        })
    }
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
            width: 160,
            dataIndex: 'time',
            key: '0',
        },
        {
            title: '最后跟进时间',
            dataIndex: 'time1',
            key: '1',
            width: 160,
        },
        {
            title: '创建时间',
            dataIndex: 'time2',
            key: '2',
            width: 160,
        },
    ];
    let [selectedRowKeys, setSelectedRowKeys] = useState([])
    let onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
        clientId = selectedRowKeys
        setClientId(clientId)
    };
    const rowSelection = {
        onChange: onSelectChange,
        selectedRowKeys:[...clientId],
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
    for (let i = 0; i < client.length; i++) {
        data.push({
            key: client[i].id,
            name: client[i].clientName,
            time: client[i].nextTalkTime,
            time1: client[i].updateTime,
            time2: client[i].createTime,
        });
    }
    let onChangeClient = (page) => {
        current = page
        setCurrent(current)
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
    let [selectedRowKeysMan, setSelectedRowKeysMan] = useState([])
    let onSelectChangeMan = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysMan(selectedRowKeys)
        manId = selectedRowKeys
        setManId(manId)
    };
    const rowSelectionMan = {
        selectedRowKeysMan,
        onChange: onSelectChangeMan,
        selectedRowKeys:[...manId],
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const dataMan = [];
    for (let i = 0; i < taskMan.length; i++) {
        dataMan.push({
            key: taskMan[i].id,
            name: taskMan[i].clientName,
            phone: taskMan[i].phone,
            people: taskMan[i].decision,
            post: taskMan[i].role,
        });
    }
    let onChangeMan = (page) => {
        currentMan = page
        setCurrentMan(currentMan)
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
    let [selectedRowKeysBusiness, setSelectedRowKeysBusiness] = useState([])
    let onSelectChangeBusiness = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysBusiness(selectedRowKeys)
        setBusinessId(selectedRowKeys)
        businessId = selectedRowKeys
        setBusinessId(businessId)
    };
    const rowSelectionBusiness = {
        selectedRowKeysBusiness,
        onChange: onSelectChangeBusiness,
        selectedRowKeys:[...businessId],
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const dataBusiness = [];
    for (let i = 0; i < taskBusiness.length; i++) {
        dataBusiness.push({
            key: taskBusiness[i].commercialOpportunityId,
            name: taskBusiness[i].name,
            num: taskBusiness[i].totalPrice,
            name1: taskBusiness[i].clientName,
            name2: taskBusiness[i].commercialStatusGroup,
            name3: taskBusiness[i].commercialStage,
        });
    }
    let onChangeBusiness = (page) => {
        currentBusiness = page
        setCurrentBusiness(currentBusiness)
    }
    //关联业务模块 合同表格
    const columnsContract = [
        {
            title: '合同编号',
            width: 120,
            dataIndex: 'name',
            key: '0',
            fixed: 'left',
        },
        {
            title: '合同名称',
            width: 180,
            dataIndex: 'name1',
            key: '1',
        },
        {
            title: '客户名称',
            dataIndex: 'name2',
            key: '2',
            width: 120,
        },
        {
            title: '合同金额',
            dataIndex: 'name3',
            key: '3',
            width: 150,
        },
        {
            title: '开始日期',
            dataIndex: 'time',
            key: '4',
            width: 180,
        },
        {
            title: '结束日期',
            dataIndex: 'time1',
            key: '5',
            width: 180,
        },
    ];
    let [selectedRowKeysContract, setSelectedRowKeysContract] = useState([])
    let onSelectChangeContract = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysContract(selectedRowKeys)
        contractId = selectedRowKeys
        setContractId(contractId)
    };
    const rowSelectionContract = {
        selectedRowKeysContract,
        onChange: onSelectChangeContract,
        selectedRowKeys:[...contractId],
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    const dataContract = [];
    for (let i = 0; i < taskContract.length; i++) {
        dataContract.push({
            key: taskContract[i].id,
            name: taskContract[i].contractCoding,
            name1: taskContract[i].contractName,
            name2: taskContract[i].clientName,
            name3: taskContract[i].contractPrice,
            time: taskContract[i].createTime,
            time1: taskContract[i].orderTime,
        });
    }
    let onChangeContract = (page) => {
        currentContract = page
        setCurrentContract(currentContract)
    }
    let getInformation = (num) => {
        if (num === 0) {
            taskclient()
        } else if (num === 1) {
            axios({
                method: 'get',
                url: base.url + '/linkman/all',
                params: {
                    keyword: search,
                    token: token,
                    currentPage: currentMan
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    setTaskMan(response.data.data.data)
                    setPaginationMan(response.data.data.pagination)
                }
            }).catch((error) => {
                alert(error)
            })
        } else if (num === 2) {
            axios({
                method: 'get',
                url: base.url + '/commercialOpportunity/all',
                params: {
                    token: token,
                    currentPage: currentBusiness,
                    keyword: search,
                }
            }).then((response) => {
                // console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    taskBusiness = response.data.data.data
                    setTaskBusiness(taskBusiness)
                    setPaginationBusiness(response.data.data.pagination)
                }
            }).catch((error) => {
                alert(error)
            })
        } else if (num === 3) {
            axios({
                method: 'get',
                url: base.url + '/contract/getContract',
                params: {
                    token: token,
                    currentPage: currentContract,
                    keyword: search,
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    taskContract = response.data.data.data
                    setTaskContract(taskContract)
                    setPaginationContract(response.data.data.pagination)
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    return (
        <div className={'bus'}>
            <div className={'business'}>
                {arr.map((item, index) => {
                    return (
                        <div className={index === activeIndex1 ? 'active1' : ''}
                             onClick={() => {
                                 setActiveIndex1(index)
                                 getInformation(index)
                             }}
                             key={index}>{item}</div>
                    )
                })}
            </div>

            <div className={'business1'}>
                <div className={'businessTop'}>
                    <div>
                        <Space direction="vertical">
                            <Search onSearch={onSearch} style={{width: 200, height: '30px', overflow: 'hidden'}}/>
                        </Space>
                    </div>
                    <div>
                        <button className={'businessBtn'}>新建</button>
                    </div>
                </div>
                {/*客户*/}
                <div className={activeIndex1 === 0 ? "" : 'hidden'} style={{width: '675px', height: '350px',}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelection} columns={columns} dataSource={data}
                               scroll={{x: 150, y: 235}}/>
                        <Pagination defaultCurrent={1} total={pagination.totalPage} onChange={onChangeClient}
                                    style={{position: 'absolute', bottom: '65px'}}/>
                    </ConfigProvider>
                </div>
                {/*联系人*/}
                <div className={activeIndex1 === 1 ? "" : 'hidden'} style={{width: '675px', height: '350px'}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelectionMan} columns={columnsMan} dataSource={dataMan}
                               scroll={{x: 150, y: 235}}/>
                        <Pagination defaultCurrent={1} total={paginationMan.total} onChange={onChangeMan}
                                    style={{position: 'absolute', bottom: '65px'}}/>
                    </ConfigProvider>
                </div>
                {/*商机*/}
                <div className={activeIndex1 === 2 ? "" : 'hidden'} style={{width: '675px', height: '350px'}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelectionBusiness} columns={columnsBusiness}
                               dataSource={dataBusiness} scroll={{x: 150, y: 235}}/>
                        <Pagination defaultCurrent={1} total={paginationBusiness.total} onChange={onChangeBusiness}
                                    style={{position: 'absolute', bottom: '65px'}}/>
                    </ConfigProvider>
                </div>
                {/*合同*/}
                <div className={activeIndex1 === 3 ? "" : 'hidden'} style={{width: '675px', height: '350px'}}>
                    <ConfigProvider locale={zhCN}>
                        <Table bordered={true} rowSelection={rowSelectionContract} columns={columnsContract}
                               dataSource={dataContract} scroll={{x: 150, y: 235}}/>
                        <Pagination defaultCurrent={1} total={paginationContract.total} onChange={onChangeContract}
                                    style={{position: 'absolute', bottom: '65px'}}/>
                    </ConfigProvider>
                </div>
                <div className={"ok-button"}>
                    <Button type={"primary"} onClick={() => {
                        let ids = {
                            clientId: clientId,
                            manId: manId,
                            businessId: businessId,
                            contractId: contractId,
                        }
                        props.onOk(ids)
                        setClientId("")
                        setManId("")
                        setBusinessId("")
                        setContractId("")
                    }}>确定</Button>
                </div>
            </div>

        </div>
    )
}

export default LinkBusiness
