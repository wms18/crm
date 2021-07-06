import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import base from '../../axios/axios'
import { Select, Row, Checkbox } from 'antd'
const { Option } = Select

class GetEmployee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            prevPropName: '',
            employeeArr: '',
            token: window.localStorage.getItem('token'),
            checkDiabled: false,
            id: '',  //員工id
            empName: ''
        }

        this.onChange = this.onChange.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        //该方法内禁止访问this
        if (props.name !== state.name) {
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                name: props.name,
                prevPropName: props.name

            }
        }
        //不需要更新状态，返回null
        return null
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.name) {
    //         // 做一些需要this.props的事
    //         console.log(this.props.name);
    //     }
    // }

    componentDidMount() {
        // console.log(this.getDerivedStateFromProps());
        this.getEmployeeName()

        this.setState({ empName: this.props.empResponseName ? this.props.empResponseName : '' })
    }


    onChange(key, value) {
        console.log(value);
        // this.transValue(value)
        this.props.contentCreate ? this.props.contentCreate(Number(value.key)) : this.props.contentResponsible(Number(value.key))
        this.setState({
            id: value.key,
            empName: value.value

        }, () => {

        })

    }


    transValue(val) {
        console.log(val);
        this.props.contentCreate ? this.props.contentCreate(val) : this.props.contentResponsible(val)
    }

    getEmployeeName() {
        axios.get(`${base.url}/employee/getEmployeeName`, {
            params: {
                token: this.state.token
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.code === 'ERROR') {

                } else {
                    this.setState({
                        employeeArr: res.data.data
                    })
                }
            })
            .catch((res) => {
                console.log(res);
            })
    }

    render() {
        return (
            <Select
                value={this.state.empName}
                showArrow={true}
                showSearch={true}
                style={{ width: 184 }}
                // mode='tags'
                optionLabelProp="value"
                onChange={this.onChange}
                defaultValue={this.props.name}
            >
                {this.state.employeeArr.length > 0 ? this.state.employeeArr.map((item, index) => {
                    return (
                        <Option key={item.id} value={item.username}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div >
                                    {item.arr ?
                                        (<img src={item.arr} style={{ display: "inline-block", width: '20px', height: '20px', borderRadius: '100%', marginRight: '10px' }} />)
                                        :
                                        (<span style={{
                                            display: 'inline-block',
                                            width: '25px', height: '25px', borderRadius: '50%', backgroundColor: '#2486e4', color: '#fff',
                                            textAlign: 'center',
                                            lineHeight: '20px',
                                            fontSize: '12px',
                                            marginRight: '10px'

                                        }} >{item.username.slice(0, 2)} </span>)

                                    }
                                    <span style={{ display: 'inline' }}>{item.username}</span>
                                </div>
                            </div>
                        </Option>
                    )
                }) : ''}
            </Select>
        )
    }
}
export default GetEmployee;


