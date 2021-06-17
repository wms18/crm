import React, { useState } from 'react';
import { Modal, Button,Input ,Select} from 'antd';
import './style.css'
const  {Option} = Select


function InfoEdit(params) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [userinfo, setusername] = useState({
        name: 'dd',
        mobile: '1800000000',
        dep: '业务人员',
        superior: '销售经理',
        sex: '男',
        email: '898572515@qq.com',
        post: '业务'
    })
    let [usersex,setusersex]=useState(['男'])

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleChange=(value)=>{
        setusersex(value)
        // console.log(1);
    }
  
        return(
            <div   style={{marginLeft:'20px',display:'inline-block'}}>  
            <Button type="primary" onClick={showModal} >
              编辑
            </Button>
            <Modal title="编辑资料" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <span>姓名</span>
                    <span>邮箱</span>
                </div>
                <div>
                    <Input value={userinfo.name}  ></Input>
                    <Input value={userinfo.email}  ></Input>
                </div>
                <div>
                    <span>性别</span>
                    <span>手机号(登录名)</span>
                </div>
                <div>
                    <Select value={usersex}  style={{width:200,height:30}}   onChange={handleChange} >
                        <Option  value='男'>男</Option>
                        <Option  value='女'>女</Option>
                    </Select>
                    <Input prefix={userinfo.mobile}  disabled  style={{width:200,height:30}}></Input>
                </div>
            </Modal>
          </div>
        )
}
export default InfoEdit;




