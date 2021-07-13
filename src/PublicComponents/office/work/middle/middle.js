import avatar from './3.jpg'
import {ProfileOutlined, ScheduleOutlined,ClearOutlined,CarryOutOutlined,MailOutlined} from '@ant-design/icons';
import './middle.css'
import React, {useEffect, useState} from 'react';
import {Avatar, Image,Spin} from 'antd';
import MenuRight from "../right/right";
import base from "../../../../axios/axios";
import axios from "axios";
import {connect} from "react-redux";
const mapStateToProps = state =>{
    return state
}
function Middle(props) {
    let state = props.state
    let token = window.localStorage.getItem('token')
    let arr = ['全部', '日志', '审批', '任务', '日程', '公告']
    let [active, setActive] = useState(0)
    let [listLogDtoList, setListLogDtoList] = useState([]) //日志列表
    let [listNotice, setListNotice] = useState([]) //公告列表
    let [listTask, setListTask] = useState([]) //任务列表
    let [listSchedule, setListSchedule] = useState([])   //日程列表
    let [listApprove, setListApprove] = useState([]) //审批列表
    let [spin,setSpin] = useState(true)
    useEffect(() => {
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
        all()
    }, [active, state])
    //全部
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/workbench/all?token=' + token
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                console.log(response.data.message)
            } else {
                if (active===0){
                    listLogDtoList = response.data.data.logDtoList
                    setListLogDtoList(listLogDtoList)
                    listNotice = response.data.data.noticeDtoList
                    setListNotice(listNotice)
                    listTask = response.data.data.taskDtoList
                    setListTask(listTask)
                    listSchedule = response.data.data.scheduleDtoList
                    setListSchedule(listSchedule)
                    listApprove = response.data.data.approveDtoList
                    setListApprove(listApprove)
                }else if(active===1){
                    listLogDtoList = response.data.data.logDtoList
                    setListLogDtoList(listLogDtoList)
                    setListNotice([])
                    setListTask([])
                    setListSchedule([])
                    setListApprove([])
                }else if(active===2){
                    listApprove = response.data.data.approveDtoList
                    setListApprove(listApprove)
                    setListLogDtoList([])
                    setListNotice([])
                    setListTask([])
                    setListSchedule([])
                }else if(active===3){
                    listTask = response.data.data.taskDtoList
                    setListTask(listTask)
                    setListLogDtoList([])
                    setListNotice([])
                    setListSchedule([])
                    setListApprove([])
                }else if (active===4){
                    listSchedule = response.data.data.scheduleDtoList
                    setListSchedule(listSchedule)
                    setListLogDtoList([])
                    setListNotice([])
                    setListApprove([])
                    setListTask([])
                }else {
                    listNotice = response.data.data.noticeDtoList
                    setListNotice(listNotice)
                    setListLogDtoList([])
                    setListApprove([])
                    setListTask([])
                    setListSchedule([])

                }
                setSpin(false)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <div style={{width:'1192px'}}>
            <div className={'middle'}>
                <div className={'middle_sp'}>

                    {arr.map((item, index) => {
                        return (
                            <span key={index}
                                  className={active === index ? 'active' : ''}
                                  onClick={() => {
                                      active = index
                                      setActive(index)
                                  }}
                            >{item}</span>
                        )
                    })}
                </div>
                <div className={'middle_one'}>
                    <div className={'middle_two'}>
                        {/*日志*/}
                        {spin === true? <div style={{width:'800px',height:'500px',textAlign:'center',lineHeight:'500px'}}><Spin></Spin> </div>:
                            <div>
                        {listLogDtoList === null ? '' : listLogDtoList.map((item, index) => {
                            return (
                                <div key={index} className={'message'}>
                                    <div className={'middle_mes'}>
                                        <div>
                                            <div className={'avatar'}>
                                                <Avatar
                                                    src={<Image src={item.user.avatar}/>}
                                                />
                                            </div>
                                            <div className={'one'}>
                                                <div>
                                                    <span>{item.user.username}</span>
                                                    <span className={'one_person'}>新建了日志</span>
                                                </div>
                                                <span className={'one_time'}>{item.createTime}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <ProfileOutlined className="icons-list"/>
                                            <span>日志</span>
                                        </div>
                                    </div>
                                    <div className={'middle_content'} style={{color:'#3E84E9'}}>{item.thisContent}</div>
                                </div>
                            )
                        })}
                        {/*公告*/}
                        {listNotice === null ? '' : listNotice.map((item, index) => {
                            return (
                                <div key={index} className={'message'}>
                                    <div className={'middle_mes'}>
                                        <div>
                                            <div className={'avatar'}>
                                                <Avatar
                                                    src={<Image src={item.employee.avatar}/>}
                                                />
                                            </div>
                                            <div className={'one'}>
                                                <div>
                                                    <span>{item.employee.username}</span>
                                                    <span className={'one_person'}>新建了公告</span>
                                                </div>
                                                <span className={'one_time'}>{item.createTime}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <MailOutlined className="icons-list"/>
                                            <span>公告</span>
                                        </div>
                                    </div>
                                    <div className={'middle_content'} style={{color:'#3E84E9'}}>{item.content}</div>
                                </div>
                            )
                        })}
                        {/*任务*/}
                        {listTask === null ? '' : listTask.map((item, index) => {
                            return (
                                <div key={index} className={'message'}>
                                    <div className={'middle_mes'}>
                                        <div>
                                            <div className={'avatar'}>
                                                <Avatar
                                                    src={<Image src={item.employees[0].avatar}/>}
                                                />
                                            </div>
                                            <div className={'one'}>
                                                <div>
                                                    <span>{item.employees[0].username}</span>
                                                    <span className={'one_person'}>新建了任务</span>
                                                </div>
                                                <span className={'one_time'}>{item.createTime}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <CarryOutOutlined className="icons-list"/>
                                            <span>任务</span>
                                        </div>
                                    </div>
                                    <div className={'middle_content'} style={{color:'#3E84E9'}}>{item.taskName}</div>
                                </div>
                            )
                        })}
                        {/*日程*/}
                        {listSchedule === null ? '' : listSchedule.map((item, index) => {
                            return (
                                <div key={index} className={'message'}>
                                    <div className={'middle_mes'}>
                                        <div>
                                            <div className={'avatar'}>
                                                <Avatar
                                                    src={<Image src={item.employees[0].avatar}/>}
                                                />
                                            </div>
                                            <div className={'one'}>
                                                <div>
                                                    <span>{item.name}</span>
                                                    <span className={'one_person'}>新建了日程</span>
                                                </div>
                                                <span className={'one_time'}>{item.createTime}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <ScheduleOutlined className="icons-list"/>
                                            <span>日程</span>
                                        </div>
                                    </div>
                                    <div className={'middle_content'} style={{color:'#3E84E9'}}>{item.content}</div>
                                </div>
                            )
                        })}
                        {/*审批*/}
                        {listApprove === null ? '' : listApprove.map((item, index) => {
                            return (
                                <div key={index} className={'message'}>
                                    <div className={'middle_mes'}>
                                        <div>
                                            <div className={'avatar'}>
                                                <Avatar
                                                    src={<Image src={item.avatar}/>}
                                                />
                                            </div>
                                            <div className={'one'}>
                                                <div>
                                                    <span>{item.employeeName}</span>
                                                    <span className={'one_person'}>新建了审批</span>
                                                </div>
                                                <span className={'one_time'}>{item.createTime}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <ClearOutlined className="icons-list"/>
                                            <span>审批</span>
                                        </div>
                                    </div>
                                    <div className={'middle_content'} style={{color:'#3E84E9'}}>{item.content}</div>
                                </div>
                            )
                        })}
                            </div>}

                    </div>

                </div>
            </div>
            <div style={{float: 'right'}}>
                <MenuRight onHandle={(value)=>{
                    all()
                }}></MenuRight>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Middle)
