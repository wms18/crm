import React from 'react';
import './style.css'
import {Button} from 'antd'
import icon from './imgs/alibabaicon.jpeg'

function Top() {
    return(
        <div className='top'>
                <div className='left'>
                        <img  src={icon}  />
                        <span>系统设置</span>
                </div>
                <div  className='button'>
                        <Button size={'large'}  type='primary'>返回首页</Button>
                        <Button size={'large'} >退出系统</Button>
                </div>
        </div>
    )
}
export default Top;