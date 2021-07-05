import React, {useState} from "react";
import Newjournal from "../../journal/newjournal";
import Newapproval from "../../approval/newapproval";
import NewTask from "../../task/newtask";
import NewSchedule from "../../calendar/newSchedule";
import {Modal} from "antd";
import Newnotice from "../../notice/newnotice";
import {Link}   from 'react-router-dom'
import axios from "axios";
import base from "../../../../axios/axios";

function Creat() {
    let token = window.localStorage.getItem('token')
    // //写日志
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const journalOk = () => {
        setIsModalVisible(false);
    };

    const journalCancel = () => {
        setIsModalVisible(false);
    };
    //审批
    const [isModalVisibleApproval, setIsModalVisibleApproval] = useState(false);

    const showModalApproval = () => {
        setIsModalVisibleApproval(true);
    };
    const handleOkApproval = () => {
        setIsModalVisibleApproval(false);
    };

    const handleCancelApproval = () => {
        setIsModalVisibleApproval(false);
    };
    //任务
    const [isModalVisibleTask, setIsModalVisibleTask] = useState(false);

    const showModalTask = () => {
        setIsModalVisibleTask(true);
    };
    const handleOkTask = () => {
        setIsModalVisibleTask(false);
    };

    const handleCancelTask = () => {
        setIsModalVisibleTask(false);
    };
    //任务
    let [data, setData] = useState('')
    let handleMessage = (value) => {
        data = value
        setData(data)
        console.log("子传给父的值", value)
        setIsModalVisible(false)
        axios({
            method: 'post',
            url: base.url + '/task/add',
            params: {
                token: token,
            },
            data: {
                beginTime: data.time[0],
                content: data.textArea,
                employeeIds: data.man,
                endTime: data.time[1],
                prior: data.prior,
                taskName: data.taskItem,
                business: {
                    1: data.clients,
                    2: data.mans,
                    3: data.businesss,
                    4: data.contracts,
                }
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                alert('新建任务成功')
                setIsModalVisibleTask(false);
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //日程
    const [isModalVisibleSchedule, setIsModalVisibleSchedule] = useState(false);

    const showModalSchedule = () => {
        setIsModalVisibleSchedule(true);
    };
    const handleOkSchedule = () => {
        setIsModalVisibleSchedule(false);
    };

    const handleCancelSchedule = () => {
        setIsModalVisibleSchedule(false);
    };
    //公告
    let newContent=''
    let time=[]
    let notice=''
    let messages={
        newContent:newContent,
        time:time,
        notice:notice
    }
    let [mesObj,setMesObj] = useState(messages)
    const [isModalVisibleNotice, setIsModalVisibleNotice] = useState(false);

    const showModalNotice = () => {
        setIsModalVisibleNotice(true);
    };
    const handleOkNotice = () => {
        setIsModalVisibleNotice(false);
    };

    const handleCancelNotice = () => {
        setIsModalVisibleNotice(false);
    };
    //新建公告
    let handleNotice = () =>{
        axios({
            method:'post',
            url:base.url+'/notice/create',
            params:{
                token:token,
                beginTime: mesObj.time[0],
                endTime: mesObj.time[1],
                content:mesObj.notice,
                title:mesObj.newContent
            }
        }).then((response)=>{
            console.log(response)
            if (response.data.code === 'ERROR'){
                alert(response.data.message)
            }else {
                alert('新建成功')
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    return (
        <div>
            <div className={'journal'}>
                <span>
                     <div onClick={showModal}>日志</div>
                    <Modal title="写日志"
                           maskStyle={{backgroundColor: '#fff'}}
                           visible={isModalVisible}
                           cancelText={'取消'}
                           okText={'提交'}
                           onOk={journalOk}
                           width={600}
                           footer={null}
                           bodyStyle={{height: '600px',}}
                           onCancel={journalCancel}>
                        <Newjournal onCancel={journalCancel}  onOk={journalOk}/>
                    </Modal>
                </span>
                <span>
                     <div onClick={showModalApproval}>审批</div>
                    <Modal title="新建审批"
                           width={800}
                           maskStyle={{backgroundColor: '#fff'}}
                           visible={isModalVisibleApproval}
                           footer={null}
                           onOk={handleOkApproval} onCancel={handleCancelApproval}>
                        <Newapproval onCancel={()=>{
                            setIsModalVisibleApproval(false);
                        }} onOk={()=>{
                            setIsModalVisibleApproval(false);
                        }}/>
                    </Modal>
                </span>
                <span>
                     <div onClick={showModalTask}>任务</div>
                    <Modal title="新建任务"
                           width={700}
                           footer={null}
                           maskStyle={{backgroundColor: '#fff'}}
                           visible={isModalVisibleTask}
                           onOk={handleOkTask}
                           onCancel={handleCancelTask}>
                        <NewTask  handleMessage={handleMessage} onCancel={handleCancelTask}/>
                    </Modal>
                </span>
                <span>
                     <div onClick={showModalSchedule}>日程</div>
                    <Modal title="新建日程"
                           width={700}
                           footer={null}
                           maskStyle={{backgroundColor: '#fff'}}
                           visible={isModalVisibleSchedule}
                           onOk={handleOkSchedule}
                           onCancel={handleCancelSchedule}>
                        <NewSchedule onCancel={handleCancelSchedule}  onOk={handleOkSchedule}/>
                    </Modal>
                </span>
                <span>
                     <div onClick={showModalNotice}>公告</div>
                    <Modal title="新建公告"
                           width={700}
                           footer={null}
                           maskStyle={{backgroundColor: '#fff'}}
                           visible={isModalVisibleNotice}
                           onOk={handleOkNotice}
                           onCancel={handleCancelNotice}>
                        <Newnotice onOk={(value)=>{
                            console.log(value)
                            mesObj = value
                            setMesObj(mesObj)
                            handleNotice()
                            setIsModalVisibleNotice(false);
                        }} onCancel={()=>{
                            setIsModalVisibleNotice(false);
                        }}/>
                    </Modal>
                </span>
            </div>
        </div>
    )
}

export default Creat
