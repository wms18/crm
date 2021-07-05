import { Input, Space } from 'antd';
import React, {useState,useEffect} from "react";
import './mail.css'
import axios from "axios";
import base from "../../../axios/axios";
function Mail() {
    let token = window.localStorage.getItem('token')
    let [allStaff,setAllStaff] = useState([])   //所有员工
    let [searchStaff,setSearchStaff] = useState('')   //搜索员工
    useEffect(()=>{
        staff()
    },[searchStaff])
    const { Search } = Input;

    let staff= ()=>{
        console.log(searchStaff)
        axios({
            method:'get',
            url:base.url+'/employee/getEmployee?token='+token,
            params:{
                keyword:searchStaff
            }
        }).then((response)=>{
            console.log(response)
            if (response.data.code === 'ERROR'){
                alert(response.data.message)
            }else {
                setAllStaff(response.data.data.data)
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    //搜索
    const onSearch = (value) => {
        searchStaff=value
        setSearchStaff(searchStaff)
        console.log(value)};
        // staff()
    let arr = ['员工']
    let [mailIndex,setMailIndex] = useState(0)
    return(
        <div className={'mail'} style={{width:'930px',margin:'20px'}}>
            <div className={'mailTop'}>
                {arr.map((item,index)=>{
                    return(
                        <span className={index === mailIndex?'mailActive mailSp':'mailSp'}
                              onClick={()=>{
                                  setMailIndex(index)
                              }}
                              key={index}>{item}</span>
                    )
                })}
            </div>
            <div style={{margin:'20px 20px'}}>
                <Search placeholder="搜索员工"
                        size="large"
                        allowClear
                        onSearch={onSearch} style={{ width: 200 }} />
            </div>
            <div className={'mailList'}>
                {allStaff.map((item,index)=>{
                    return(
                        <div key={index} className={'mailInformation'}>
                            <div>名字：{item.username}</div>
                            <div>
                                <span style={{marginRight:'20px'}}>职位：{item.position}</span>
                                <span>手机号：{item.phone}</span>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
export default Mail
