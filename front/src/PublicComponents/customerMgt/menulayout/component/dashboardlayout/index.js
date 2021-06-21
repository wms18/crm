import { Layout, Button, Select } from 'antd';
import React from 'react';
import './style.css';
import Alertmodal from '../../../components/Alertmodal'
import { AlignCenterOutlined, HomeOutlined } from '@ant-design/icons';
import Topleft from './component/topleft'
import Toprightt from './component/topright'
import Footleft from './component/footleft'
import Footright from './component/footright'
const { Header, Content, Footer, } = Layout;
const { Option } = Select;


function Dashboaedlayout() {
    return (
        <div>
            <div style={{ display: 'flex' ,justifyContent:'space-between',marginBottom:'10px',backgroundColor:'#f5f6f9',padding:'24px'}}>
                <div style={{display:'flex',alignItems:'center',width:'360px',justifyContent:'space-between'}}>
                    <span >本人及下属</span>
                    <span  >|</span>
                    <Alertmodal    name='切换' ></Alertmodal>
                    <Select  defaultValue="本年" style={{ width: 200 }} onChange={''}>
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
                    <Button icon={<AlignCenterOutlined />} width={100}  style={{backgroundColor:'#3e84e9',color:'#fff'}} >数据查重</Button>
                </div>
            </div>


            <div className="site-layout-background2" style={{    padding: 24}}>
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

        </div>

    )

}

export default Dashboaedlayout;

