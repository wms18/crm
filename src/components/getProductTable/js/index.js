const Data = {
  columns: [
    {
      width: 100,
      title: '产品名称',
      dataIndex: 'produceName',
     
    },
    {
      title: '产品类别',
      width: 100,
      dataIndex: 'produceType',
     
    },


    {
      width: 100,
      title: '产品价格',
      dataIndex: 'price',
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