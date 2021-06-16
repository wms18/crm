import { react } from "module";
import './style.css'
import { Popover, Button } from 'antd';
import icon from './imgs/alibabaicon.jpeg'

const text = <span>Title</span>;
const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
function ReceptionTop() {
    return (
        <div className='ReceptionTop'>
            <div>
                <img src={icon} alt="" style={{ height: '40px' }} />
            </div>

            <div className='topicon'>
                <div  >
                    <span className='iconfont icon-diannao'></span>
                    <span >办公</span>
                </div>

                <div>
                    <span className='iconfont icon-kehu'></span>
                    <span >客户管理</span>
                </div>

                <div>
                    <span className='iconfont icon-xiangmu'></span>
                    <span>项目管理</span>
                </div>

            </div>
            <div>

            </div>
            <div>
                <span className='personalName'>dd</span>
                <Popover placement="bottomRight" title={text} content={content} trigger="hover">
                    <span className='iconfont icon-up'   ></span>
                </Popover>
            </div>
        </div>
    )
}

export default ReceptionTop