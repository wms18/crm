import React, { useState,useEffect } from 'react'
import './style.css'
import { Button, Avatar, Card } from 'antd'
import InfoEdit from './components/infoEdit'
import ChangePwd from './components/changePwd'
import axios from 'axios'
import base from '../../axios/axios'
function PersonalInfo(props) {
    let token=window.localStorage.getItem('token')
    let [user,setUser] = useState('')
    useEffect(()=>{
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
        all()
    },[])
    let all = () =>{
        axios({
            method:'get',
            url:base.url+'/employee/whoami?token='+token
        }).then((response)=>{
            console.log(response);
            if(response.data.code==='SUCCESS'){
                setUser(response.data.data)
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    return (
        <div className='personalinfoMain'>

            {/* 按钮部分 */}
            <div>
                <div style={{ textAlign: 'right' }} className='perinfoBtn'>
                <ChangePwd></ChangePwd>
                    {/* <Button type='primary'  >修改密码</Button> */}
                    {/* <Button type='primary'>编辑</Button> */}
                    <InfoEdit onOk={(value)=>{
                        console.log(value)
                        all()
                    }}></InfoEdit>
                    <Button type='primary' style={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }} onClick={()=>{
                        props.history.push('/customerMgt/')
                    }}>返回</Button>
                </div>
            </div>

            {/* 头像部分 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: "0 80px 30px" }}>
                <div style={{ marginRight: '25px' }}>
                    <img src={user.avatar} style={{ width: '100px', height: '100px', fontSize: '35px', textAlign: 'center', lineHeight: '100px' }}/>
                </div>
                <div>
                    <div>
                        <span style={{ fontSize: '25px' }}>{user.username}</span>
                    </div>
                    <div>
                        <span>部门：<span>{user.department}</span></span>&nbsp;&nbsp;<span>职务：<span>{user.position}</span></span>
                    </div>
                </div>
            </div>

            {/* 第三部分 */}
            <div className='perinfoRow3'>
                <Card title="基本信息" style={{ width: 700 ,margin:'0 auto'}}>
                    <div>
                        <div>
                            <span>姓名</span>
                            <span>{user.username}</span>
                        </div>
                        <div>
                            <span>性别</span>
                            <span>{user.sex}</span>
                        </div>

                    </div>

                    <div>
                        <div>
                            <span>手机号(登录名)</span>
                            <span>{user.phone}</span>
                        </div>
                        <div>
                            <span>邮箱</span>
                            <span>{user.email}</span>
                        </div>

                    </div>

                    <div>
                        <div>
                            <span>部门</span>
                            <span>{user.department}</span>
                        </div>
                        <div>
                            <span>岗位</span>
                            <span>{user.position}</span>
                        </div>


                    </div>
                    <div>
                        {/* <div>
                            <span>直属上级</span>
                            <span>{userinfo.superior}</span>
                        </div> */}


                    </div>
                </Card>
            </div >

        </div >

    )
}

export default PersonalInfo;
