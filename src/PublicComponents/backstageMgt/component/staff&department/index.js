import React, {Component} from 'react';
import './style.css'
import SdTable from "./component/sdtable";
import { Layout, Menu, Button, Input, Image, Space, Select, TreeSelect, Modal,Form,Cascader } from 'antd';
import SdContent from "./component/sdcontent";
import Alertform from './component/alertform';
import Paging from './component/Paging';


import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
    AudioOutlined
} from '@ant-design/icons';

const {Search} = Input;
const {Option} = Select;


const {SubMenu} = Menu
const {Header, Sider, Content} = Layout;
const toggle = () => {
    this.setState({
        collapsed: !this.state.collapsed,
    });
};

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);


const onSearch = value => console.log(value);

const handleChange = value => console.log(`selected ${value}`)

class StaffDep extends Component {


    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            visible: false,
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
        }
        this.onChange = this.onChange.bind(this)
        this.setVisible = this.setVisible.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onCreate = this.onCreate.bind(this)
    }


    onChange(pageNumber) {
        console.log('Page: ', pageNumber);

    }

    setVisible() {
        this.setState({
            visible: !this.state.visible
        })
    };

    onCancel() {
        this.setState({
            visible: false
        })
    }

    onCreate(values) {
        console.log('Received values of form: ', values);
        this.setState({
            visible: false
        })
    }




    render() {
        return (
            <div style={{border: '1px  black'}}>
                <div style={{padding: 30, fontSize: 18}}>
                    ?????????????????????
                </div>
                <div style={{padding: '0 30px 0',display:'flex',justifyContent:'space-between',}}>
                    <div style={{backgroundColor: '#fff',  border: '1px  yellow'}}>
                        <SdContent></SdContent>
                    </div>

                    <div style={{ border: '1px  blue'}}>
                        <div style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px'
                        }}>
                            <div>
                                <Search placeholder='??????????????????' style={{width: 200}}></Search>
                            </div>

                            <div style={{fontSize: '15px'}}>
                                ??????:&nbsp;<Select placeholder='?????????' style={{width: 200}}>
                                <Option value='??????'>??????</Option>
                                <Option value='??????'>??????</Option>
                                <Option value='?????????'>?????????</Option>
                            </Select>
                            </div>
                            <div>
                                <Button type='primary'
                                        onClick={this.setVisible}
                                >????????????</Button>
                                <Modal
                                    visible={this.state.visible}
                                    title="????????????"
                                    okText="??????"
                                    cancelText="??????"
                                    onCancel={this.onCancel}
                                    onOk={() => {
                                    }}
                                >

                                    <Form
                                        layout="vertical"
                                        name="form_in_modal"
                                        initialValues={{
                                            modifier: 'public',
                                        }}
                                    >
                                        <div>
                                            <Form.Item
                                                name="productName"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '????????????????????????',
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item

                                                name="productCategory"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '',
                                                    },
                                                ]}
                                            >
                                                <Cascader placeholder="??????"/>
                                            </Form.Item>
                                        </div>


                                        <div>
                                            <Form.Item
                                                name="productStockQty"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '????????????????????????',
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="isPutShelves"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '',
                                                    },
                                                ]}
                                            >
                                                <Select style={{width: 200}}>
                                                    <Option value='?????????'>?????????</Option>
                                                    <Option value='?????????'>?????????</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div>
                                            <Form.Item
                                                style={{width: 184}}
                                                name="productSize"
                                                label="??????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '',
                                                    },
                                                ]}
                                            >
                                                <Select>
                                                    <Option value='???'>???</Option>
                                                    <Option value='???'>???</Option>
                                                    <Option value='???'>???</Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                style={{width: 200}}
                                                name="productPrice"
                                                label="??????"
                                            >
                                                <Input value='0'/>
                                            </Form.Item>
                                        </div>


                                        <div>
                                            <Form.Item
                                                name="productStockQty"
                                                label="????????????"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '????????????????????????',
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>

                                        </div>
                                    </Form>
                                </Modal>


                            </div>

                        </div>
                        <div style={{backgroundColor: '#fff', width: '63vw', border: '1px  green'}}>
                            <SdTable></SdTable>
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

export default StaffDep
