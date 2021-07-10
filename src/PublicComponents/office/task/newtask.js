import React, {useState, useEffect} from "react";
import {Button, ConfigProvider, DatePicker, Form, Popover, Input, Modal, Space, Tree, TreeSelect} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import './newtask.css'
import LinkBusiness from "./link";
import axios from "axios";
import base from "../../../axios/axios";

let clients; // 空Map
let mans;
let businesss;
let contracts;
let initIdsObj = {
    clients,
    mans,
    businesss,
    contracts,
}

function NewTask(props) {
    const [form] = Form.useForm();
    let token = window.localStorage.getItem('token')
    let arrPrior = ['高', '中', '低', '无']   //优先级
    let [prior, setPrior] = useState('') //优先级
    let [taskItem, setTaskItem] = useState('')   //任务名称
    let [allStaff, setAllStaff] = useState([])   //所有员工
    let [idsObj, setIdsObj] = useState(initIdsObj)   // 4个ids
    let [man, setMan] = useState([])//负责人
    let [textArea, setTextArea] = useState('')   //任务描述
    let [time, setTime] = useState([])   //时间
    let [timeValue, setTimeValue] = useState([null, null])   //时间
    let [data, setData] = useState('')
    const {Search} = Input;
    let [searchMan, setSearchMan] = useState('')
    const onSearch = value => {
        console.log(value);
        searchMan = value
        setSearchMan(searchMan)
    }
    //参与人
    useEffect(() => {
        all()
    }, [])
    let all = () => {
        axios({
            method: 'get',
            url: base.url + '/employee/getEmployeeName?token=' + token,
        }).then((response) => {
            console.log(response)
            if (response.data.code === 'ERROR') {
                alert(response.data.message)
            } else {
                setAllStaff(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //关联业务
    //关联业务模块
    const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

    const showBusinessModal = () => {
        setIsBusinessModalVisible(true);
    };
    //备注
    const {TextArea} = Input;
    //参与人
    const {SHOW_PARENT} = TreeSelect;
    let treeData = [];
    for (let i = 0; i < allStaff.length; i++) {
        treeData.push({
            title: <span><img style={{width: '15px', height: '15px', marginRight: '10px'}} src={allStaff[i].avatar}
                              alt=""/>{allStaff[i].username}</span>,
            value: allStaff[i].id,
        })
    }
let onChange1 = (value) => {
    console.log('onChange ',value);
    // setMan(value)
};
const tProps = {
    treeData,
    value: man,
    bordered: true,
    onChange: onChange1,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择',
    style: {
        width: '100%',
    },
};
//开始时间，结束时间
const {RangePicker} = DatePicker;
let onChangeTime = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    timeValue = value
    setTimeValue(timeValue)
    time = dateString
    setTime(time)
}

let onOk = (value) => {
    console.log('onOk: ', value);
}
//输入框
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
//优先级
let handlePrior = (item) => {
    prior = item
    setPrior(prior)
    console.log(prior)
}
//任务名称
let handleTask = (task) => {
    setTaskItem(task)
    console.log(task)
}
//任务描述
let handleText = (value) => {
    textArea = value
    setTextArea(textArea)
    console.log(textArea)
}
const treeData1 = []
for (let i = 0; i < allStaff.length; i++) {
    if (searchMan !== ''){
        if (searchMan === allStaff[i].username){
            treeData1.push({
                title: <span><img style={{width: '15px', height: '15px', marginRight: '10px'}} src={allStaff[i].avatar}
                                  alt=""/>{allStaff[i].username}</span>,
                key: allStaff[i].id,
                value: allStaff[i].username
            })
        }
    }else {
        treeData1.push({
            title: <span><img style={{width: '15px', height: '15px', marginRight: '10px'}} src={allStaff[i].avatar}
                              alt=""/>{allStaff[i].username}</span>,
            key: allStaff[i].id,
            value: allStaff[i].username
        })
    }

}
let [manValue,setManValue] = useState([])
const [checkedKeys, setCheckedKeys] = useState([]);
const onCheck = (checkedKeysValue,value ) => {
    manValue =  value.checkedNodes.map((ele, index) => {
        return ele.value
    })
    // console.log(checkedKeysValue)
    setManValue(manValue)
    setCheckedKeys(checkedKeysValue);
    setMan(checkedKeysValue)
};
const contentLabel = (
    <div className={'contentLabel'}>
        <div style={{width: '220px', height: '300px', border: '1px solid #ddd', padding: '10px'}}>
            <Search placeholder="搜索员工" onSearch={onSearch} style={{width: 200, marginBottom: '20px'}}/>
            <Tree
                checkable
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                treeData={treeData1}
                height={200}
            />
        </div>
    </div>
);

return (
    <>
        <div>
            {/*输入内容*/}
            <div className={'newtask'}>
                <div>
                    <Form
                        form={form}
                        {...layout}
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="任务名称"
                            name="username"
                            style={{width: '350px'}}
                            rules={[
                                {
                                    required: true,
                                    message: '主题不能为空',
                                },
                            ]}
                        >
                            <Input value={taskItem} onChange={(e) => {
                                handleTask(e.target.value)
                            }}/>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    {/*参与人*/}
                    <div style={{margin: '4px 0 6px 0', fontSize: '13px'}}>
                        <span>负责人</span>
                    </div>
                    {/*<TreeSelect {...tProps} style={{width: '253px'}}/>*/}

                        <span >
                            <Popover content={contentLabel} arrowPointAtCenter={true}
                                     title="选择员工" trigger="click">
                                <Input style={{width:'253px'}} value={manValue} placeholder="请选择员工" />
                            </Popover>
                        </span>

                </div>
            </div>
            {/*时间*/}
            <div style={{margin: '20px 0 5px 0'}}>
                <span style={{fontSize: '14px'}}>*开始时间</span>
                <span style={{float: 'right', fontSize: '14px'}}>*结束时间</span>
            </div>
            <Space direction="vertical" size={12}>
                <ConfigProvider locale={zhCN}>
                    <RangePicker
                        value={timeValue}
                        bordered={false}
                        showTime={{format: 'HH:mm'}}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChangeTime}
                        onOk={onOk}
                        style={{width: '183%', padding: '5px 0 10px 0'}}
                    />
                </ConfigProvider>
            </Space>

            <div>
                <span style={{fontSize: '14px'}}>优先级</span>
            </div>
            <div className={'class'}>
                {arrPrior.map((item, index) => {
                    return (
                        <span key={index}
                              className={prior === item ? 'class activeColor' : ''}
                              onClick={() => {
                                  handlePrior(item)
                              }}>{item}</span>
                    )
                })}
            </div>

            <div style={{margin: '20px 0'}}>
                <span style={{fontSize: '14px'}}> 任务描述</span>
            </div>
            <TextArea rows={4} value={textArea} placeholder={'请输入内容'} onChange={(e) => {
                handleText(e.target.value)
            }}/>
            <div style={{margin: '20px 0 0 0', color: '#3E84E9'}}>
                <Button type="primary" onClick={showBusinessModal} style={{cursor: 'pointer'}}>
                    关联业务
                </Button>
                <Modal title="关联业务模块"
                       width={800}
                       bordered={true}
                       bodyStyle={{padding: 0}}
                       maskClosable={false}
                       maskStyle={{backgroundColor: '#fff'}}
                       keyboard={false}
                       visible={isBusinessModalVisible}
                       footer={null}
                       closable={false}
                       onCancel={() => {
                           setIsBusinessModalVisible(false);
                       }}>
                    <LinkBusiness onOk={(value) => {
                        console.log("孙子传给儿子的值", value)
                        setIdsObj(value || initIdsObj)
                        setIsBusinessModalVisible(false);
                    }}/>
                </Modal>
            </div>
        </div>
        <div className={"ok-button"}>
            <Button style={{marginRight: '20px'}} onClick={() => {
                props.onCancel()
                setPrior("")
                setTaskItem("")
                setMan([])
                setTextArea("")
                setTime("")
                setIdsObj(initIdsObj)
                setTimeValue([null, null])
                form.setFieldsValue({"username": ""}) // 清空任务名称
                setManValue([])
                setCheckedKeys([])
            }}>取消</Button>
            <Button type={"primary"} onClick={() => {
                props.handleMessage(data = ({
                    prior: prior,
                    taskItem: taskItem,
                    man: man,
                    textArea: textArea,
                    time: time,
                    ...idsObj,
                }))
                setPrior("")
                setTaskItem("")
                setMan([])
                setTextArea("")
                setTime("")
                setIdsObj(initIdsObj)
                setTimeValue([null, null])
                form.setFieldsValue({"username": ""}) // 清空任务名称
                setManValue([])
                setCheckedKeys([])
            }}>确定</Button>
        </div>
    </>
)
}

export default NewTask
