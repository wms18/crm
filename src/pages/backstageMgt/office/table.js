import { useEffect, useState } from 'react'
import axios from "axios";
import base from '../../../axios/axios';
import qs from 'qs'
import { Table, Pagination, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function Tablelist(props) {
    // console.log(props.roleId)
    let [message, setMessage] = useState([])     //表格信息
    let token = window.localStorage.getItem('token')

    let [pagination, setPagination] = useState([])   //页码信息
    let [current, setCurrent] = useState('1')    //当前页
    let [limit, setLimit] = useState('10')    //每页条数
    let totals = Math.ceil(pagination.total / limit) || 0
    useEffect(() => {
        information()
    }, [props.roleId, current, pagination.total])
    //获取表格信息
    let information = () => {
        axios({
            method: 'get',
            url: base.url + '/manager/sys-manager?token=' + token,
            params: {
                classifyRoleId: 1,
                roleId: props.roleId,
                currentPage: current,
                limit: limit
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                if (response.data.data !== null) {
                    pagination = response.data.data.pagination
                    setPagination(pagination)
                    setMessage(response.data.data.data)
                } else {
                    setMessage([])
                    setPagination([])
                }
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //删除员工
    let handleDelete = (id) => {
        if (window.confirm('确定删除吗？')) {
            axios({
                method: 'post',
                url: base.url + '/manager/deleteEmployee?token=' + token,
                data: qs.stringify({
                    employeeId: id
                })
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    information()
                    alert('删除成功')
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: '部门',
            dataIndex: 'department',
            width: 150,
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: 150,
        },
        {
            title: '职位',
            dataIndex: 'position',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'delete',
            width: 150,
        },
    ];

    const data = [];
    if (message !== null) {
        for (let i = 0; i < message.length; i++) {
            data.push({
                key: i,
                name: message[i].name,
                department: message[i].department,
                role: message[i].role + '，',
                position: message[i].position,
                delete: <i className="system_delete fa fa-trash-o" aria-hidden="true" onClick={() => {
                    handleDelete(message[i].employeeId)
                }
                }></i>,
            });
        }
    }
    //改变当前页
    let handle = (page, pagesize) => {
        current = page
        setCurrent(current)
        setLimit(pagesize)
        information()
    }
    return (
        <div>
            <Table columns={columns} dataSource={data} scroll={{ y: 'calc(100vh - 400px)' }} />
            <ConfigProvider locale={zhCN}>
                <Pagination
                    className={'pagination'}
                    total={totals}
                    showSizeChanger
                    showQuickJumper
                    current={pagination.currentPage}
                    onChange={handle}
                    pagesize={pagination.limit}
                    showTotal={total => `共 ${pagination.total || 0} 条`}
                />
            </ConfigProvider>
        </div>
    )
}
export default Tablelist
