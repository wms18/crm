const  Data={
    columns : [
        {
          width: 100,
          title: '产品名称',
          dataIndex: 'productName',
          key:'productName',
          fixed: 'left',
          sorter: {
            compare: (a, b) => a.productName - b.productName,
            multiple: 3,
            key:''
          },
        },
        {
          title: '产品类别',
          width: 100,
          dataIndex: 'category',
          key:'1',
          sorter: {
            compare: (a, b) => a.category - b.category,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '产品编码',
          dataIndex: 'code',
          key:'2',
          sorter: {
            compare: (a, b) => a.code - b.code,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '是否上架',
          dataIndex: 'IsPutOnShelves',
          key:'3',
          sorter: {
            compare: (a, b) => a.IsPutOnShelves - b.IsPutOnShelves,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '产品价格',
          dataIndex: 'price',
          key:'4',
          sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '库存数量',
          dataIndex: 'quanity',
          key:'5',
          sorter: {
            compare: (a, b) => a.quanity - b.quanity,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '创建人',
          dataIndex: 'createPerson',
          key:'6',
          sorter: {
            compare: (a, b) => a.createPerson - b.createPerson,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '更新时间',
          dataIndex: 'updateTime',
          key:'7',
          sorter: {
            compare: (a, b) => a.updateTime - b.updateTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '创建时间',
          dataIndex: 'createTime',
          key:'8',
          sorter: {
            compare: (a, b) => a.createTime - b.createTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '更新时间',
          dataIndex: 'updateTime',
          key:'9',
          sorter: {
            compare: (a, b) => a.updateTime - b.updateTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '负责人',
          dataIndex: 'personInCharge',
          key:'personInCharge',
          fixed:'right',
          sorter: {
            compare: (a, b) => a.personInCharge - b.personInCharge,
            multiple: 3,
          },
        },
      ],
    
      options : [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ]
}

export default Data