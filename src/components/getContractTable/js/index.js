const Data = {
  columns: [
    {
      width: 100,
      title: '合同编号',
      dataIndex: 'contractCoding',
      key:'1',
     
    },
    {
      title: '合同名称',
      width: 100,
      dataIndex: 'contractName',
      key:'2'
     
    },


    {
      width: 100,
      title: '客户姓名',
      dataIndex: 'clientName',
      key:'3'
    },
    {
      width: 100,
      title: '合同金额',
      dataIndex: 'contractPrice',
      key:'4'
    },
    {
      width: 100,
      title: '下单时间',
      dataIndex: 'orderTime',
      key:'5'
    },
    {
      width: 100,
      title: '创建时间',
      dataIndex: 'createTime',
      key:'6'
    },

  ],

  options: [
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