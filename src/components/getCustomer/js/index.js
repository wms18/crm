const Data = {
  columns: [
    {
      width: 100,
      title: '客户名称',
      dataIndex: 'clientName',
      key:'1',
     
    },
    {
      title: '下次联系时间',
      width: 100,
      dataIndex: 'nextTalkTime',
      key:'2'
     
    },


    {
      width: 100,
      title: '更新时间',
      dataIndex: 'updateTime',
      key:'3'
    },
    {
      width: 100,
      title: '创建时间',
      dataIndex: 'createTime',
      key:'3'
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