const  Data={
    columns : [
        {
          width: 100,
          title: '产品名称',
          dataIndex: 'produceName',
          key:'produceName',
          fixed: 'left',
          sorter: {
            compare: (a, b) => a.produceName - b.produceName,
            multiple: 3,
            key:''
          },
        },
        {
          title: '产品类别',
          width: 100,
          dataIndex: 'produceType',
          key:'1',
          sorter: {
            compare: (a, b) => a.produceType - b.produceType,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '产品编码',
          dataIndex: 'produceCoding',
          key:'2',
          sorter: {
            compare: (a, b) => a.produceCoding - b.produceCoding,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '是否上架',
          dataIndex: 'putaway',
          key:'3',
          sorter: {
            compare: (a, b) => a.putaway - b.putaway,
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
          title: '产品描述',
          dataIndex: 'specification',
          key:'5',
          sorter: {
            compare: (a, b) => a.specification - b.specification,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '库存数量',
          dataIndex: 'number',
          key:'6',
          sorter: {
            compare: (a, b) => a.number - b.number,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '创建人',
          dataIndex: 'employeeCreate',
          key:'7',
          sorter: {
            compare: (a, b) => a.createPerson - b.createPerson,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '更新时间',
          dataIndex: 'updatetime',
          key:'8',
          sorter: {
            compare: (a, b) => a.updateTime - b.updateTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '创建时间',
          dataIndex: 'createTime',
          key:'9',
          sorter: {
            compare: (a, b) => a.createTime - b.createTime,
            multiple: 3,
          },
        },
        {
          width: 100,
          title: '负责人',
          dataIndex: 'employeeResponsible',
          key:'employeeResponsible',
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