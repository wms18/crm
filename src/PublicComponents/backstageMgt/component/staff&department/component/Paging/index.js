// import React from 'react';
// import { Pagination } from 'antd';

// function Paging() {
//     function onChange(pageNumber) {
//         console.log('Page: ', pageNumber);
//     }

//     return (
//         <div>
//             <Pagination
//                 total={85}
//                 showSizeChanger
//                 showQuickJumper
//                 showTotal={total => `共 ${total} 条`}
//             />
//         </div>
//     )
// }
// export default Paging



import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: 'left',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'John',
                value: 'John',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 150,
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'Address',
                children: [
                    {
                        title: 'Street',
                        dataIndex: 'street',
                        key: 'street',
                        width: 150,
                    },
                    {
                        title: 'Block',
                        children: [
                            {
                                title: 'Building',
                                dataIndex: 'building',
                                key: 'building',
                                width: 100,
                            },
                            {
                                title: 'Door No.',
                                dataIndex: 'number',
                                key: 'number',
                                width: 100,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'Company',
        children: [
            {
                title: 'Company Address',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
                width: 200,
            },
            {
                title: 'Company Name',
                dataIndex: 'companyName',
                key: 'companyName',
            },
        ],
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
        fixed: 'right',
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
    });
}


function Paging() {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                size="middle"
                scroll={{ x: 'calc(700px + 50%)', y: 240 }}
            />
        </div>
    )
}

export default Paging;