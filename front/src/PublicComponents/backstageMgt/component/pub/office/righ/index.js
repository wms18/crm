import {ConfigProvider,Card,Modal,Button,Form,Input} from 'antd';
import {Calendar, Select, Radio, Col, Row, Typography} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import React from "react";

function Index() {
    //主题
    const layout = {
        labelCol: {
            span: 8,
            offset: 100,
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
    //创建
    const [visible, setVisible] = React.useState(true);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    const showModal = () => {
        // setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    function onPanelChange(value, mode) {
        console.log(value, mode);
    }

    return (
        <div className={'index'}>
            <Card title="任务" style={{width: '370px', height: '300px', marginBottom: "20px"}}>
                <div className={'index1'}>
                    <div className={'index2'}>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                        <div><input type="checkbox"/> <span>Card content</span></div>
                    </div>
                </div>
            </Card>

            <div className="site-calendar-customize-header-wrapper">
                <ConfigProvider locale={zhCN}>
                    <Calendar
                        fullscreen={false}
                        headerRender={({value, type, onChange, onTypeChange}) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];

                            const current = value.clone();
                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                                current.month(i);
                                months.push(localeData.monthsShort(current));
                            }

                            for (let index = start; index < end; index++) {
                                monthOptions.push(
                                    <Select.Option className="month-item" key={`${index}`}>
                                        {months[index]}
                                    </Select.Option>,
                                );
                            }
                            const month = value.month();

                            const year = value.year();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                                options.push(
                                    <Select.Option key={i} value={i} className="year-item">
                                        {i}
                                    </Select.Option>,
                                );
                            }
                            return (
                                <div style={{padding: 8}}>
                                    <Typography.Title style={{fontSize: '16px', fontWeight: 500}}>日程 <span
                                        className={'index_sp'}>
                                        {/*创建*/}
                                        <Button type="primary" onClick={showModal}>
                                           +创建
                                          </Button>
                                          <Modal
                                              title="创建日程"
                                              visible={visible}
                                              onOk={handleOk}
                                              confirmLoading={confirmLoading}
                                              onCancel={handleCancel}
                                              width={'700px'}
                                          >

                                              <Form
                                                  layout="vertical"
                                                  labelAlign={'left'}
                                                  {...layout}
                                                  name="basic"
                                                  initialValues={{
                                                      remember: true,
                                                  }}
                                                  onFinish={onFinish}
                                                  onFinishFailed={onFinishFailed}
                                              >
                                                  <Form.Item
                                                      label="主题"
                                                      name="item"
                                                      rules={[
                                                          {
                                                              required: true,
                                                              message: '请输入内容',
                                                          },
                                                      ]}
                                                  >
                                                    <Input placeholder={'请输入内容'}/>
                                                  </Form.Item>
                                                  </Form>
                                          </Modal>
                                    </span></Typography.Title>

                                    <Row gutter={8}>
                                        <Col>
                                            <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)}
                                                         value={type}>
                                                <Radio.Button value="month">月</Radio.Button>
                                                <Radio.Button value="year">年</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                onChange={newYear => {
                                                    const now = value.clone().year(newYear);
                                                    onChange(now);
                                                }}
                                                value={String(year)}
                                            >
                                                {options}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                value={String(month)}
                                                onChange={selectedMonth => {
                                                    const newValue = value.clone();
                                                    newValue.month(parseInt(selectedMonth, 10));
                                                    onChange(newValue);
                                                }}
                                            >
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }}
                        onPanelChange={onPanelChange}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}

export default Index
