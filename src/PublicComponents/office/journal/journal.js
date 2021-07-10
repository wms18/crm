import {Button, ConfigProvider, Select, TreeSelect, DatePicker, Modal, Input,} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import React, {useState, useEffect} from "react";
import './journal.css'
import base from "../../../axios/axios";
import axios from "axios";
import qs from 'qs'
function Journal(props) {
    let token = window.localStorage.getItem('token')
    let dateArr = ['日报', '周报', '月报']
    let [dateActive, setDateActive] = useState(0)    //日报
    let [date, setDate] = useState('')   //今日工作内容
    let arr = ['全部', '我发出的', '我收到的']
    let [approveIndex, setApproveIndex] = useState(0)    //arr
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [allType, setAllType] = useState(0) //类型
    let [staffId, setStaffId] = useState('') //发起人ID
    let [time, setTime] = useState('')   //时间
    let [journalList, setJournalList] = useState([]) //日志列表
    let [hiddenComment, setHiddenComment] = useState(true)//评论
    let [taskText, setTaskText] = useState('')   //评论
    const {SHOW_PARENT} = TreeSelect;
    let [next,setNext] = useState('')   //明日工作内容
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    let [problem,setProblem] = useState('') //问题

    useEffect(() => {
        if (!window.localStorage.getItem('token')){
            props.history.push('/')
            return
        }
        all()
        allJournal()
    }, [approveIndex])
    //选择员工
    const treeData = [];
    for (let j = 0; j < allStaff.length; j++) {
        treeData.push({
            title:<span><img style={{width:'15px',height:'15px',marginRight:'10px'}} src={allStaff[j].avatar} alt=""/>{allStaff[j].username}</span>  ,
            value: allStaff[j].id,
        })
    }
    let onChangeStaff = value => {
        console.log('onChange ', value);
        selectStaff = value
        setSelectStaff(selectStaff)
    };
    const tProps = {
        allowClear: true,
        treeData,
        value: selectStaff,
        onChange: onChangeStaff,
        treeCheckable: true,
        multiple: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '请选择员工',
        style: {
            width: '100%',
        },
    };

    //评论内容
    let handleText = (value) => {
        taskText = value
        setTaskText(taskText)
    }
    const {TextArea} = Input;
    //保存
    let taskAddCommentOk = (id) => {
        setHiddenComment(!hiddenComment)
        if (taskText !== '') {
            axios({
                method: 'post',
                url: base.url + '/log/reply',
                params: {
                    token: token,
                    content: taskText,
                    logId: id,
                }
            }).then((response) => {
                console.log(response)
                setTaskText('')
                allJournal()
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //回复
    let taskAddComment = () => {
        setHiddenComment(!hiddenComment)
        setTaskText('')
    }
    //取消
    let taskAddCommentCancle = () => {
        setHiddenComment(!hiddenComment)
        setTaskText('')
    }
    //写日志


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (date === '' || next === '' || selectStaff.length === 0){
            alert('请输入内容')
        }else {
            axios({
                method:'post',
                url:base.url+'/log/create',
                data:qs.stringify({
                    token:token,
                    contentType:dateActive+1,
                    employeeIds:selectStaff,
                    nextContent:next,
                    problem:problem,
                    thisContent:date,
                })
            }).then((response)=>{
                console.log(response)
                if (response.data.code === 'ERROR'){
                    alert(response.data.message)
                }else {
                    setSelectStaff([])
                    setDateActive(0)
                    setNext('')
                    setProblem('')
                    setDate('')
                    allJournal()
                }
            }).catch((error)=>{
                alert(error)
            })
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setSelectStaff([])
        setDateActive(0)
        setNext('')
        setProblem('')
        setDate('')
        allJournal()
        setIsModalVisible(false);
    };
    //日志列表
    let allJournal = () => {
        axios({
            method: 'get',
            url: base.url + '/log/loglist',
            params: {
                token: token,
                contentType: allType,
                range: approveIndex,
                employeeId: staffId,
                date: time,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                journalList = response.data.data
                setJournalList(journalList)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //所有员工
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token
        }).then((response) => {
            console.log(response)
            if (response.data.code==='SUCCESS'){
                setAllStaff(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }

    //发起人
    const {Option} = Select;
    let handleChange = (value) => {
        console.log(`selected ${value}`);
        staffId = value
        setStaffId(staffId)
        allJournal()
    }
    //提交时间
    let onChange = (date, dateString) => {
        console.log(date, dateString);
        time = dateString
        setTime(time)
        allJournal()
    }
    //类型
    let handleType = (value) => {
        console.log(`selected ${value}`);
        allType = value
        setAllType(value)
        allJournal()
    }
    //删除日志
    let deleteJournal = (id) => {
        if (window.confirm('确定删除吗')) {
            axios({
                method: 'DELETE',
                url: base.url + '/log/delete',
                params: {
                    token: token,
                    logId: id
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'SUCCESS') {
                    allJournal()
                    alert('删除成功')
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //删除评论
    let deletecomment = (id) => {
        if (window.confirm('确定删除吗')) {
            axios({
                method: 'DELETE',
                url: base.url + '/log/delete',
                params: {
                    token: token,
                    logId: id
                }
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'SUCCESS') {
                    allJournal()
                    alert('删除成功')
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    //今日工作内容
    let handleDate = (value) => {
        console.log(value)
        date = value
        setDate(date)
    }
    //明日工作内容
    let handleNext = (value) =>{
        console.log(value)
        next = value
        setNext(next)
    }
    //问题
    let handleProblem = (value) =>{
        console.log(value)
        problem = value
        setProblem(problem)
    }
    return (
        <div className={'journalCont'}>
            <div className={'journalTop'}>
                <div className={'journalTopSp'} style={{width: '50%'}}>
                    {arr.map((item, index) => {
                        return (
                            <span key={index}
                                  className={approveIndex === index ? 'journalActive journalSp' : 'journalSp'}
                                  onClick={() => {
                                      setApproveIndex(index)
                                  }}
                            >{item}</span>
                        )
                    })}
                </div>
                <div style={{width: '20%', textAlign: 'right'}}>
                    <Button type="primary" onClick={showModal}>
                        写日志
                    </Button>
                    <Modal title="写日志"
                           visible={isModalVisible}
                           maskStyle={{backgroundColor: '#fff'}}
                           cancelText={'取消'}
                           okText={'提交'}
                           onOk={handleOk}
                           width={600}
                           bodyStyle={{height: '520px',}}
                           onCancel={handleCancel}>
                        <div style={{
                            height: '50px',
                            lineHeight: '50px',
                            borderBottom: '1px solid #ddd',
                            padding: '0 10px'
                        }}>
                            <div className={'dateSp'}>
                                {dateArr.map((item, index) => {
                                    return (
                                        <span key={index}
                                              className={index === dateActive ? 'journalActive' : ''}
                                              onClick={() => {
                                                  setDateActive(index)
                                              }}
                                        >{item}</span>
                                    )
                                })}
                            </div>
                            <div className={dateActive  === 0 ? 'date' : 'hidden'}>
                                <div className={'date1'}>
                                    <div style={{width: '98%'}}>
                                        <span>今日工作内容：</span>
                                        <TextArea rows={4}
                                                  value={date}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleDate(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{width: '98%'}}>
                                        <span>明日工作内容：</span>
                                        <TextArea rows={4}
                                                  value={next}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleNext(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{width: '98%'}}>
                                        <span>遇到的问题：</span>
                                        <TextArea rows={4}
                                                  value={problem}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleProblem(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{lineHeight: '30px'}}>
                                        <span>发送给谁:</span>
                                        <TreeSelect {...tProps} />
                                    </div>
                                </div>
                            </div>
                            <div className={dateActive === 1 ? 'date' : 'hidden'}>
                                <div className={'date1'}>
                                    <div style={{width: '98%'}}>
                                        <span>本周工作内容：</span>
                                        <TextArea rows={4}
                                                  value={date}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleDate(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{width: '98%'}}>
                                        <span>下周工作内容：</span>
                                        <TextArea rows={4}
                                                  value={next}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleNext(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{width: '98%'}}>
                                        <span>遇到的问题：</span>
                                        <TextArea rows={4}
                                                  value={problem}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleProblem(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{lineHeight: '30px'}}>
                                        <span>发送给谁:</span>
                                        <TreeSelect {...tProps} />
                                    </div>
                                </div>
                            </div>
                            <div className={dateActive === 2 ? 'date' : 'hidden'}>
                                <div className={'date1'}>
                                    <div style={{width: '98%'}}>
                                        <span>本月工作内容：</span>
                                        <TextArea rows={4}
                                                  value={date}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleDate(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{width: '98%'}}>
                                        <span>下月工作内容：</span>
                                        <TextArea rows={4}
                                                  value={next}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleNext(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{width: '98%'}}>
                                        <span>遇到的问题：</span>
                                        <TextArea rows={4}
                                                  value={problem}
                                                  placeholder={'请输入内容'}
                                                  onChange={(e) => {
                                                      handleProblem(e.target.value)
                                                  }}/>
                                    </div>
                                    <div style={{lineHeight: '30px'}}>
                                        <span>发送给谁:</span>
                                        <TreeSelect {...tProps} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className={'journalSelect'} style={{margin: '20px 0'}}>
                <div className={approveIndex === 1?'hidden':''}>
                    <span >发起人</span>
                    <Select defaultValue="请选择" style={{width: 120, margin: '0 10px'}}
                            onChange={handleChange} allowClear>
                        {allStaff.map((item, index) => {
                            return (
                                <Option key={index}
                                        value={item.id}>{item.username}</Option>
                            )
                        })}
                    </Select>
                </div>
                <div>
                    <span style={{margin: '0 10px'}}>提交时间</span>
                    <ConfigProvider locale={zhCN}>
                        <DatePicker onChange={onChange}/>
                    </ConfigProvider>
                </div>
                <div>
                    <span>类型</span>
                    <Select defaultValue="全部" style={{width: 120, margin: '0 20px',}}
                            onChange={handleType} allowClear>
                        <Option value="0">全部</Option>
                        <Option value="1">日报</Option>
                        <Option value="2">周报</Option>
                        <Option value="3">月报</Option>
                    </Select>
                </div>

            </div>
            <div className={'journalFoot'}>
                <div className={'journalFoot1'}>
                    {journalList.map((item, index) => {
                        return (
                            <div key={index} className={'journalInfor'}>
                                <div className={'taskReply'}>
                                    <div>
                                    <span>
                                        <img style={{width: '30px', height: '30px', borderRadius: '50%'}}
                                             src={item.user.avatar} alt=""/>
                                    </span>
                                        <span style={{margin: '0 20px'}}>{item.user.username}</span>
                                        <span>{item.createTime}</span>
                                    </div>
                                    <div>
                                <span onClick={() => {
                                    deleteJournal(item.id)
                                }}>删除</span>
                                    </div>
                                </div>
                                <div className={item.contentType === 1? '':'hidden'}>
                                    <div className={item.thisContent===''?'hidden':'journalText'}>今日工作内容：{item.thisContent}</div>
                                    <div className={item.nextContent===''?'hidden':'journalText'}>明日工作内容：{item.nextContent}</div>
                                    <div className={item.problem===''?'hidden':'journalText'}>遇到的问题：{item.problem}</div>
                                </div>
                                <div className={item.contentType === 2? '':'hidden'}>
                                    <div className={item.thisContent===''?'hidden':'journalText'}>本周工作内容：{item.thisContent}</div>
                                    <div className={item.nextContent===''?'hidden':'journalText'}>下周工作内容：{item.nextContent}</div>
                                    <div className={item.problem===''?'hidden':'journalText'}>遇到的问题：{item.problem}</div>
                                </div>
                                <div className={item.contentType === 3? '':'hidden'}>
                                    <div className={item.thisContent===''?'hidden':'journalText'}>本月工作内容：{item.thisContent}</div>
                                    <div className={item.nextContent===''?'hidden':'journalText'}>下月工作内容：{item.nextContent}</div>
                                    <div className={item.problem===''?'hidden':'journalText'}>遇到的问题：{item.problem}</div>
                                </div>
                                {item.reply.map((item, index) => {
                                    return (
                                        <div key={index} style={{marginLeft:'50px'}}>
                                            <div className={'taskReply'}>
                                                <div>
                                            <span>
                                                <img style={{width: '30px', height: '30px', borderRadius: '50%'}}
                                                     src={item.user.avatar} alt=""/>
                                            </span>
                                                    <span style={{margin: '0 20px'}}>{item.user.username}</span>
                                                    <span>{item.createTime}</span>
                                                </div>
                                                <div>
                                            <span onClick={() => {
                                                deletecomment(item.id)
                                            }}>删除</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={'journalText'}>{item.content}</div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <Button type={"primary"} onClick={taskAddComment}>回复</Button>
                                <div className={hiddenComment === true ? 'hidden' : ''} style={{margin: '10px 0'}}>
                                    <TextArea rows={4} value={taskText} onChange={(e) => {
                                        handleText(e.target.value)
                                    }}/>
                                    <div style={{margin: '10px 0'}}>
                                        <Button type="primary" style={{marginRight: '20px'}}
                                                onClick={() => {
                                                    taskAddCommentOk(item.id)
                                                }}>保存</Button>
                                        <Button onClick={taskAddCommentCancle}>取消</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>
        </div>
    )
}

export default Journal
