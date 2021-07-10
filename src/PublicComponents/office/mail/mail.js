import { Input, Space } from 'antd';
import React, { useState, useEffect } from "react";
import './mail.css'
import axios from "axios";
import base from "../../../axios/axios";
function Mail(props) {
    let token = window.localStorage.getItem('token')
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [searchStaff, setSearchStaff] = useState('')   //搜索员工
    useEffect(() => {
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
        staff()
    }, [searchStaff])
    const { Search } = Input;

    let staff = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployee?token=' + token,
            params: {
                keyword: searchStaff
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                console.log(response.data.message)
            } else {
                if (response.data.data){
                    allStaff = response.data.data.data
                    console.log(allStaff)
                    setAllStaff(allStaff)
                }else {
                    allStaff = []
                    console.log(allStaff)
                    setAllStaff(allStaff)
                }

            }
        }).catch((error) => {
            alert(error)
        })
    }
    //搜索
    const onSearch = (value) => {
        searchStaff = value
        setSearchStaff(searchStaff)
    };
    let arr = ['员工']
    let [mailIndex, setMailIndex] = useState(0)
    return (
        <div className={'mail'} style={{ width: '930px', marginTop: '60px' }}>
            <div className={'mailTop'}>
                {arr.map((item, index) => {
                    return (
                        <span className={index === mailIndex ? 'mailActive mailSp' : 'mailSp'}
                            onClick={() => {
                                setMailIndex(index)
                            }}
                            key={index}>{item}</span>
                    )
                })}
            </div>
            <div style={{ margin: '20px 20px' }}>
                <Search placeholder="搜索员工"
                    size="large"
                    allowClear
                    onSearch={onSearch} style={{ width: 200 }} />
            </div>
            <div className={'mailList'}>
                {allStaff === null?'':allStaff.map((item, index) => {
                    return (
                        <div key={index} className={'mailInformation'}>
                            <div>名字：{item.username}</div>
                            <div style={{width:'60%'}}>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <span style={{ marginRight: '20px' }}>职位：{item.position}</span>
                                    <span>手机号：{item.phone}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Mail
