import React ,{component} from 'react'

import "./style.css"

import { Drawer, Button } from 'antd';
import Alerttable from './component/alerttable';
class Customer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="site-drawer-render-in-current-wrapper">
        <div style={{ marginTop: 16 }}>
          <Button type="primary" onClick={this.showDrawer} style={{width:180}}>
            Open
          </Button>
        </div>
        <Drawer
          title="客户"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: 'absolute'}}
          width={'100vw'}
          closable={true}
        >
         <Alerttable></Alerttable>
        </Drawer>
      </div>
    );
  }
}

export default Customer