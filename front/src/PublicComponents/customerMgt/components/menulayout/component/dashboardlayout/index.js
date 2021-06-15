import { Layout, Button, Select } from 'antd';
import React from 'react';
import './style.css';
import Alertmodal from '../../../Alertmodal'
import { AlignCenterOutlined, HomeOutlined } from '@ant-design/icons';
import Topleft from './component/topleft'
import Toprightt from './component/topright'
import Footleft from './component/footleft'
import Footright from './component/footright'
const { Header, Content, Footer, } = Layout;
const { Option } = Select;


function Dashboaedlayout() {
    return (
        <Layout className="site-layout" style={{ marginLeft: 130 }}>

            <Header className="site-layout-background" style={{ padding: 0 }} >
                <div>
                    <HomeOutlined style={{ fontSize: 30, color: '#FD8F70' }} />
                    <span>本人及下属</span>
                    <span>|</span>
                    <Alertmodal   name='切换' ></Alertmodal>
                    <Select defaultValue="本年" style={{ width: 200 }} onChange={''}>
                        <Option value="today">今天</Option>
                        <Option value="yesterday">昨天</Option>
                        <Option value="thisweek">本周</Option>
                        <Option value="lastweek">上周</Option>
                        <Option value="thismonth">本月</Option>
                        <Option value="lastmonth">上月</Option>
                        <Option value="thisseason">本季</Option>
                        <Option value="lastseason">上季</Option>
                        <Option value="thisyear">本年</Option>
                        <Option value="lastyear">去年</Option>
                    </Select>

                </div>
                <div>
                    <Button icon={<AlignCenterOutlined />} size={'large'} >数据查重</Button>
                </div>
            </Header>

            <Content style={{ overflow: 'initial' }}>
                <div className="site-layout-background2" style={{}}>
                    <div>

                        <div>
                       < Topleft></Topleft>
                        </div>

                        <div>
                        <Toprightt></Toprightt>
                        </div>

                    </div>

                    <div>

                        <div>
                        <Footleft></Footleft>
                        </div>

                        <div>
                        <Footright></Footright>
                        </div>
                        
                    </div>

                </div>
            </Content>

            {/* <Footer >
                <div className='footer'>

                </div>
                </Footer> */}

        </Layout>
    )

}

export default Dashboaedlayout;

