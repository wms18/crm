import './task.css'
import {Input, Space} from 'antd';
import {Modal, Button, Drawer, Checkbox, Select} from 'antd';
import {useState} from "react";
import NewTask from "./newtask";
import '../calendar/calendar.css'

function Task() {
    //抽屉
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    //多选框
    let onChangeCheckbox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    const {Search} = Input;
    //下拉菜单
    const {Option} = Select;
    let handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    //搜索任务
    const onSearch = value => console.log(value);
    //对话框
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <div className={'taskContent'}>
                <div className={'taskTop'}>
                    <span className={'taskSp'}>我的任务</span>
                    <span>
                        <Button type="primary" onClick={showModal}>
                            新建任务
                        </Button>
                        <Modal title="新建任务"
                               visible={isModalVisible}
                               cancelText={'取消'}
                               okText={'确定'}
                               onOk={handleOk}
                               width={700}
                               onCancel={handleCancel}>
                            <NewTask></NewTask>

                        </Modal>
                    </span>
                </div>
                <div style={{padding: '0 20px'}}>
                    <Space direction="vertical">
                        <Search placeholder="搜索任务名称" size={'large'} onSearch={onSearch}
                                style={{width: 400, margin: "20px 0"}}/>
                    </Space>
                    <div className={'taskDropdown'}>
                        <span>
                            <span className={'taskAll'}>任务类型</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChange}>
                            <Option value="全部">全部</Option>
                            <Option value="我负责的">我负责的</Option>
                            <Option value="我创建的">我创建的</Option>
                            <Option value="我参与的">我参与的</Option>
                        </Select>
                        </span>
                        <span>
                            <span className={'taskAll'}>优先级</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChange}>
                            <Option value="全部">全部</Option>
                            <Option value="高">高</Option>
                            <Option value="中">中</Option>
                            <Option value="低">低</Option>
                            <Option value="无">无</Option>
                        </Select>
                        </span>
                        <span>
                            <span className={'taskAll'}>截止时间</span>
                        <Select defaultValue="全部" style={{width: 120}} onChange={handleChange}>
                            <Option value="全部">全部</Option>
                            <Option value="今天到期">今天到期</Option>
                            <Option value="明天到期">明天到期</Option>
                            <Option value="一周到期">一周到期</Option>
                            <Option value="一个月到期">一个月到期</Option>
                        </Select>
                        </span>
                    </div>
                </div>
                <div style={{padding: '30px 20px 0 20px'}}>
                    <div>
                        <div className={'taskCheckbox'} onClick={showDrawer}>
                            <Checkbox onChange={onChangeCheckbox}>Checkbox</Checkbox>
                            <span>6-23截止 <span className={'taskAvatar'}>111</span></span>
                        </div>
                        <Drawer
                            title="Basic Drawer"
                            placement="right"
                            closable={true}
                            onClose={onClose}
                            visible={visible}
                            width={930}
                        >
                            <div className={''}>
                                <div><Checkbox onChange={onChangeCheckbox}>Checkbox</Checkbox></div>
                                <div><span>负责人：<span>123</span></span></div>
                            </div>


                        </Drawer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
