import React from 'react';
import './style.css'
import { Button } from 'antd'
import icon from './imgs/alibabaicon.jpeg'
import { useHistory,withRouter } from 'react-router-dom'
// import { HashRouter, Link, Route } from 'react-router-dom'
import { Popconfirm, message } from 'antd';
function BackstageTop(props) {
    function confirm(e) {
        console.log(e);
        message.success('退出成功');
        window.localStorage.setItem('token','')
        props.history.push('/')
    }

    function cancel(e) {
        console.log(e);
        message.error('取消退出');
    }
        const history = useHistory()
        function push() {
                history.push('/customerMgt/')
        }
        return (
                <div className='top'>
                        <div className='left'>
                                <img src={icon} />
                                <span>系统设置</span>
                        </div>
                        <div className='button'>
                                <Button size={'large'} type='primary'
                                        onClick={push}
                                >
                                        返回首页
                                </Button>
                            <Popconfirm
                                title="确定退出吗?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button size={'large'}>退出系统</Button>
                            </Popconfirm>,
                        </div>
                </div>
        )
}
export default withRouter(BackstageTop);
