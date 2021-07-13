import {Input, Modal, TreeSelect, Button} from "antd";
import React, {useState,useEffect} from "react";
import axios from "axios";
import base from "../../../axios/axios";
import qs from 'qs'

function Newjournal(props) {
    let [date, setDate] = useState('')   //今日工作内容
    let [next, setNext] = useState('')   //明日工作内容
    let [selectStaff, setSelectStaff] = useState([]) //选择员工
    let [problem, setProblem] = useState('') //问题
    let token = window.localStorage.getItem('token')
    let dateArr = ['日报', '周报', '月报']
    let [dateActive, setDateActive] = useState(0)    //日报
    let [allStaff, setAllStaff] = useState([])   //所有员工
    const {TextArea} = Input;
    const {SHOW_PARENT} = TreeSelect;
    useEffect(() => {
        all()
    }, [])
    //写日志
    const [isModalVisible, setIsModalVisible] = useState(false);

    const journalOk = () => {
        if (date === '' || next === '' || selectStaff.length === 0) {
            alert('请输入内容')
        } else {
            axios({
                method: 'post',
                url: base.url + '/log/create',
                data: qs.stringify({
                    token: token,
                    contentType: dateActive+1,
                    employeeIds: selectStaff,
                    nextContent: next,
                    problem: problem,
                    thisContent: date,
                })
            }).then((response) => {
                console.log(response)
                if (response.data.code === 'ERROR') {
                    alert(response.data.message)
                } else {
                    setSelectStaff([])
                    setDateActive(0)
                    setNext('')
                    setProblem('')
                    setDate('')
                    props.onOk()
                }
            }).catch((error) => {
                alert(error)
            })
        }
        setIsModalVisible(false);
    };

    const journalCancel = () => {
        setSelectStaff([])
        setDateActive(0)
        setNext('')
        setProblem('')
        setDate('')
        setIsModalVisible(false);
    };
    //所有员工
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token
        }).then((response) => {
            console.log(response)
            setAllStaff(response.data.data)
        }).catch((error) => {
            alert(error)
        })
    }
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
    //今日工作内容
    let handleDate = (value) => {
        console.log(value)
        date = value
        setDate(date)
    }
    //明日工作内容
    let handleNext = (value) => {
        console.log(value)
        next = value
        setNext(next)
    }
    //问题
    let handleProblem = (value) => {
        console.log(value)
        problem = value
        setProblem(problem)
    }

    return (
        <div>
            <div>
                <div style={{
                    height: '50px',
                    lineHeight: '50px',
                    borderBottom: '1px solid #ddd',
                    padding: '0 10px',
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
                    <div className={dateActive === 0 ? 'date' : 'hidden'}>
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
                    <div className={'ok-button'}>
                        <Button style={{marginRight:'20px'}} onClick={()=>{
                            props.onCancel()
                            journalCancel()
                        }}>取消</Button>
                        <Button type={"primary"} onClick={()=>{

                            journalOk()
                        }}>提交</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newjournal
