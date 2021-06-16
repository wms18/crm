import { Table,Pagination  } from 'antd';
import 'antd/dist/antd.css';
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
    for (let i = 0; i < 30; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            department: '总公司',
            role:'超级管理员',
            position: '经理',
            delete:<i className="system_delete fa fa-trash-o" aria-hidden="true"></i>,
        });
    }
    return(
        <div>
            <Table columns={columns}  dataSource={data}  scroll={{ y: 360 }} />
            <Pagination
                className={'pagination'}
                total={85}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条`}
            />
        </div>
    )
}
export default Tablelist
