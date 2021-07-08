import react, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import './style.css'
import { Popover, Button } from 'antd';
import icon from './imgs/alibabaicon.jpeg'
import { Link } from "react-router-dom";
import { Popconfirm, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from "axios";
import base from "../../axios/axios";

const text = <span>Title</span>;

function ReceptionTop (props) {
    let token=window.localStorage.getItem('token')
    let [avatar,setAvatar] = useState('')
    useEffect(()=>{
        axios({
            method:'get',
            url:base.url+'/employee/whoami?token='+token,
        }).then((response)=>{
            console.log(response);
            if(response.data.code==='SUCCESS'){
                avatar=response.data.data.avatar
                setAvatar(avatar)
            }
        }).catch((error)=>{
            alert(error)
        })
    },[])
    //退出登錄
    let  confirm=(e)=> {
        console.log(e);
        message.success('退出成功');
        history.push("/")
        window.localStorage.setItem('token','')

    }

    let cancel = (e) => {
        console.log(e);
        message.error('您已取消');
    }


    let [username, setusername] = useState(['dd'])

    const history = useHistory()
    const content = (
        <div>
            <div>
                <Link to={'/person'}>
                    <div className='personCenter' >
                        <UserOutlined />
                        <span> 个人中心</span>
                    </div>

                </Link>
            </div>
            <div>
                <Link>
                    <div className='personCenter'>
                        <Popconfirm
                            title="确定退出吗"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                             <i class="fa fa-sign-out" aria-hidden="true"></i>
                            <span style={{ marginLeft: '6px' }}>退出登录</span>
                        </Popconfirm>

                    </div>
                </Link>
            </div>
            <Link to={'/back'}>
                <Button type={"primary"}
                // onClick={() => {
                //     history.push('/back')
                // }}
                >进入后台管理页面</Button>
            </Link>
        </div>

    );

    return (
        <div className='ReceptionTop'>
            <div>
                <img src={icon} alt="" style={{ height: '40px' }} />
            </div>

            <div className='topicon'>
                <div>
                    <span className='iconfont icon-diannao'></span>
                    <Link to={'/office'}>
                        <span>办公</span>
                    </Link>
                </div>

                <div>
                    <span className='iconfont icon-kehu'></span>
                    <Link to={'/customerMgt/'}>
                        <span>客户管理</span>
                    </Link>
                </div>

                {/*<div>*/}
                {/*    <span className='iconfont icon-xiangmu'></span>*/}
                {/*    <span>项目管理</span>*/}
                {/*</div>*/}

            </div>
            <div>

            </div>
            <div>
                {/* <span className='personalName'>{username}</span> */}
                <img src={avatar} className='personalName'/>
                <Popover placement="bottomRight" content={content} trigger="hover">
                    <span className='iconfont icon-xiala'
                        style={{ fontSize: '15px', color: '#aaa', marginLeft: '10px' }}></span>
                </Popover>
            </div>
        </div>
    )
}

export default ReceptionTop
