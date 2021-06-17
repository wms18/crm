import React, { useState } from 'react'
import './style.css'
import { Button, Avatar, Card } from 'antd'
import InfoEdit from './components/infoEdit'
import ChangePwd from './components/changePwd'

function PersonalInfo() {

    let [userinfo, setusername] = useState({
        name: 'dd',
        mobile: '1800000000',
        dep: '业务人员',
        superior: '销售经理',
        sex: '男',
        email: '898572515@qq.com',
        post: '业务'
    })
    return (
        <div className='personalinfoMain'>

            {/* 按钮部分 */}
            <div>
                <div style={{ textAlign: 'right' }} className='perinfoBtn'>
                <ChangePwd></ChangePwd>
                    {/* <Button type='primary'  >修改密码</Button> */}
                    {/* <Button type='primary'>编辑</Button> */}
                    <InfoEdit></InfoEdit>
                    <Button type='primary' style={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }}>返回</Button>
                </div>
            </div>

            {/* 头像部分 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: "0 80px 30px" }}>
                <div style={{ marginRight: '25px' }}>
                    <Avatar style={{ color: 'white', backgroundColor: '#2486e4', width: '100px', height: '100px', fontSize: '35px', textAlign: 'center', lineHeight: '100px' }}>{userinfo.name}</Avatar>
                </div>
                <div>
                    <div>
                        <span style={{ fontSize: '25px' }}>{userinfo.name}</span>
                    </div>
                    <div>
                        <span>部门：<span>{userinfo.dep}</span></span>&nbsp;&nbsp;<span>职务：<span></span></span>
                    </div>
                </div>
            </div>

            {/* 第三部分 */}
            <div className='perinfoRow3'>
                <Card title="基本信息" style={{ width: 700 ,margin:'0 auto'}}>
                    <div>
                        <div>
                            <span>姓名</span>
                            <span>{userinfo.name}</span>
                        </div>
                        <div>
                            <span>性别</span>
                            <span>{userinfo.sex}</span>
                        </div>

                    </div>

                    <div>
                        <div>
                            <span>手机号(登录名)</span>
                            <span>{userinfo.mobile}</span>
                        </div>
                        <div>
                            <span>邮箱</span>
                            <span>{userinfo.email}</span>
                        </div>

                    </div>

                    <div>
                        <div>
                            <span>部门</span>
                            <span>{userinfo.dep}</span>
                        </div>
                        <div>
                            <span>岗位</span>
                            <span>{userinfo.post}</span>
                        </div>


                    </div>
                    <div>
                        <div>
                            <span>直属上级</span>
                            <span>{userinfo.superior}</span>
                        </div>


                    </div>
                </Card>
            </div >

        </div >

    )
}

export default PersonalInfo;