import { Input, Space } from 'antd';
import React, {useState,useEffect} from "react";
import './mail.css'
import axios from "axios";
import base from "../../../axios/axios";
function Mail() {
    let token = window.localStorage.getItem('token')
    let [allStaff,setAllStaff] = useState([])   //所有员工
    useEffect(()=>{
        axios({
            method:'get',
            url:base.url+'/employee/getEmployeeName?token='+token,
        }).then((response)=>{
            console.log(response)
            if (response.data.code === 'ERROR'){
                alert(response.data.message)
            }else {
                setAllStaff(response.data.data.username)
            }
        }).catch((error)=>{
            alert(error)
        })
    })
    //搜索
    const { Search } = Input;
    const onSearch = value => console.log(value);
    let arr = ['员工','部门']
    let [mailIndex,setMailIndex] = useState(0)
    return(
        <div className={'mail'} style={{width:'800px',margin:'20px'}}>
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
            <div style={{margin:'20px 0'}}>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 200 }} />
            </div>
            <div className={'mailList'}>
                123
            </div>
        </div>
    )
}
export default Mail
