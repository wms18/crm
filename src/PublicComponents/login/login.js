import img from './login.jpg'
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {useState,useEffect} from 'react'
import axios from "axios";
import qs from 'qs';
import base from "../../axios/axios";
import './login.css'
function Login(props) {

    let [phone, setPhone] = useState('')
    let [password, setPassword] = useState('')
    useEffect(()=>{
        if (window.localStorage.getItem('token')){
            props.history.push('/customerMgt/')
        }
    },[])
    //登录
    let handle = () => {
        axios({
            method: "post",
            url: base.url+'/employee/login',
            data: qs.stringify({
                phone: phone,
                password: password,
            })
        }).then((response) => {
            // console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('登录成功')
                window.localStorage.setItem('token',response.data.data.token)
                props.history.push('/office')
            }
        }).catch((error) => {
            alert(error)
        })
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className={'view'}>

            <div className={'login_img'}>
                <img src={img} className={'login'} alt=""/>
            </div>
            <div className={'login_right'}>
                <div>
                    <div className={'welcome'}>
                        <span>卓越CRM欢迎您</span>
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的账号!',
                                },
                            ]}
                        >
                            <Input
                                style={{height: '40px'}}
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder="请输入账号"
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                            ]}
                        >
                            <Input.Password
                                style={{height: '40px'}}
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="请输入密码"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{color: '#999', fontSize: '12px'}}> 记住账号</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <div>
                            </div>
                            <Button
                                style={{width: '400px', height: '40px'}}
                                type="primary" htmlType="submit"
                                className="login-form-button"
                                onClick={handle}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
