import { Table,Pagination,ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
function Tablelist() {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: '部门',
            dataIndex: 'department',
            width: 150,
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: 150,
        },
        {
            title: '职位',
            dataIndex: 'position',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'delete',
            width: 150,
        },
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            department: '总公司',
            role:'超级管理员',
            position: '经理',
            delete:<i className="system_delete fa fa-trash-o" aria-hidden="true"></i>
        });
    }
    return(
        <div>
            <Table columns={columns}  dataSource={data}  scroll={{ y:'calc(100vh - 400px)'  }} />
            <ConfigProvider locale={zhCN}>
            <Pagination
                className={'pagination'}
                total={85}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条`}
            />
            </ConfigProvider>
        </div>
    )
}
export default Tablelist
