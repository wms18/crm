import React, { useState } from 'react'
import { Layout, Menu, Button, Input, Image, Popover } from 'antd';
import icon from '../../imgs/alibabaicon.jpeg';


function DelPopover(params) {


    const content = (
        <span
            className='iconfont icon-jinzhi'
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => {
                isimg = true
                setisimg(isimg)
                imgsrc = ''
                setimgsrc(imgsrc)
            }}
        >
        </span>

    );


    let [imgsrc, setimgsrc] = useState(icon)

    let [isimg, setisimg] = useState(false)
    return (
        <div>
            {/* {
                this.props.hidden ? null : (
                    <div>
                        <Popover placement='rightTop' content={content} trigger='hover' overlayClassName='delIcon' style={{ hidden: isimg }} >
                            <Image
                                width={auto}
                                height={60}
                                width={120}
                                src={imgsrc}
                            />
                        </Popover>
                    </div>
                )
            } */}
        </div>
    )
}
export default DelPopover

