import {useState} from 'react'
import {Avatar, Image} from 'antd';
import avatar from '../../image/3.jpg'
import {ScheduleOutlined} from '@ant-design/icons';

function Middle() {
    let arr = ['全部', '日志', '审批', '任务', '日程', '公告']
    let [active, setActive] = useState(0)
    return (

        <div className={'middle'}>
            <div className={'middle_sp'}>
                {arr.map((item, index) => {
                    return (
                        <span key={index}
                              className={active === index ? 'active' : ''}
                              onClick={() => {
                                  setActive(index)
                              }}
                        >{item}</span>
                    )
                })}
            </div>
            <div className={'message'}>
                <div className={'middle_mes'}>
                    <div>
                        <div className={'avatar'}>
                            <Avatar
                                src={<Image src={avatar}/>}
                            />
                        </div>
                        <div className={'one'}>
                            <div>
                                <span>一个好人</span>
                                <span className={'one_person'}>新建了任务</span>
                            </div>
                            <span className={'one_time'}>时间</span>
                        </div>
                    </div>
                    <div>
                        <ScheduleOutlined className="icons-list"/>
                        <span>任务</span>
                    </div>
                </div>
                <div className={'middle_image'}></div>
            </div>
        </div>
    )
}

export default Middle
