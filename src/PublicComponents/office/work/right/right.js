import './right.css'
import {Checkbox, Row, Col, Card, ConfigProvider} from 'antd';
import {Calendar, Select, Radio, Typography} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function MenuRight() {
    //任务
    let onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    //日程
    let onPanelChange = (value, mode) => {
        console.log(value, mode);
    }
    return (
        <div className={'middle_right'}>
            <Card title="任务" style={{width: '370px', height: '300px', marginBottom: '20px'}}>
                <div className={'right_one'}>
                    <div className={'right_two'}>
                        <Checkbox.Group style={{width: '100%'}} onChange={onChange}>
                            <Row className={'right_row'}>
                                <Col span={18}>
                                    <Checkbox value="A">A</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="B">B</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="C">C</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="D">D</Checkbox>
                                </Col>
                                <Col span={18}>
                                    <Checkbox value="E">E</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
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
                                    <div className={'right_calendar'}>
                                        <span>日程</span>
                                        <span style={{color:'#3E84E9'}}>+创建</span>
                                    </div>

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

export default MenuRight
