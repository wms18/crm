import React from 'react'
import './style.css'
import {Modal} from 'antd'
import Menulayout from "./menulayout";
// import {ExclamationCircleOutlined} from '@ant-design/icons'；
import { createFromIconfontCN,ExclamationCircleOutlined } from '@ant-design/icons';

function RoleControl() {

        function    showDeleteConfirm(id){
        Modal.confirm({
            // title: '',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除此项目吗?',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.handleOk(id)//确认按钮的回调方法，在下面
            }
            ,
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    //删除的弹出框的确认按钮,执行删除操作
  function  handleOk(id) {
        console.log('删除');
    };

    return (
        <div>
            <Menulayout></Menulayout>

            {/* <a className={"deleteProject"} onClick={showDeleteConfirm}>删除</a> */}
        </div>
    )

}
export default RoleControl
