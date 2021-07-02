const Data = {
  columns: [
    {
      width: 100,
      title: '商机名称',
      dataIndex: 'name',
      key:'1',
     
    },
    {
      title: '客户名称',
      width: 100,
      dataIndex: 'clientName',
      key:'2'
     
    },


    {
      width: 100,
      title: '商机状态',
      dataIndex: 'commercialStage',
      key:'3'
    },
    {
      width: 100,
      title: '商机状态组',
      dataIndex: 'commercialStatusGroup',
      key:'4'
    },
    {
      width: 100,
      title: '商机金额',
      dataIndex: 'totalPrice',
      key:'5'
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