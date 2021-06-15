import React, {Component} from 'react';
import { Spin, Alert } from 'antd';
class Loading extends Component {
    render() {
        return (
            <div  className={'sss'} >
                <Spin tip="等待中...">
                    <Alert
                        message="十二日"
                        description="十二日的夏天"
                        type="info"
                    />
                </Spin>,
            </div>
        );
    }
}

export default Loading;



