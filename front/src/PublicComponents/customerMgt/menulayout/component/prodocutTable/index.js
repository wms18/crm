import { Table, Button } from 'antd';
import React, { Component } from "react";
import './style.css'
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 3+i,
    address: `London, Park Lane no. ${i}`,
  });
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
      sorter: {
        compare: (a, b) => a.address - b.address,
        multiple: 3,
      },
    },
  },
];

class ProductTable extends Component {


  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={50} scroll={{ x: 900, y: 300 }} />
      </div>
    );
  }
}

export default ProductTable;


// import React, { Component } from "react";
// import { Table, Button } from 'antd';

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

// class ProductTable extends React.Component {
//   state = {
//     selectedRowKeys: [], // Check here to configure the default column
//     loading: false,
//   };

//   start = () => {
//     this.setState({ loading: true });
//     // ajax request after empty completing
//     setTimeout(() => {
//       this.setState({
//         selectedRowKeys: [],
//         loading: false,
//       });
//     }, 1000);
//   };

//   onSelectChange = selectedRowKeys => {
//     console.log('selectedRowKeys changed: ', selectedRowKeys);
//     this.setState({ selectedRowKeys });
//   };

//   render() {
//     const { loading, selectedRowKeys } = this.state;
//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.onSelectChange,
//     };
//     const hasSelected = selectedRowKeys.length > 0;
//     return (
//       <div>
//         <div style={{ marginBottom: 16 }}>
//           <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
//             Reload
//           </Button>
//           <span style={{ marginLeft: 8 }}>
//             {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//           </span>
//         </div>
//         <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
//       </div>
//     );
//   }
// }


// export default ProductTable