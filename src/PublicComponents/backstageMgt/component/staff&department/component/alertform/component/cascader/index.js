import  React from  'react';
import './style.css'
import { Cascader } from 'antd';


function SelectCascader() {
    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
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
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                },
            ],
        },
    ];

    function handleAreaClick(e, label, option) {
        e.stopPropagation();
        console.log('clicked', label, option);
    }

    // const displayRender = (labels, selectedOptions) =>
    //     labels.map((label, i) => {
    //         const option = selectedOptions[i];
    //         if (i === labels.length - 1) {
    //             return (
    //                 <span key={option.value}>
    //       {label} (<a onClick={e => handleAreaClick(e, label, option)}>{option.code}</a>)
    //     </span>
    //             );
    //         }
    //         return <span key={option.value}>{label} / </span>;
    //     });

    return(
        <div>
            <Cascader
                options={options}
                defaultValue={['请选择']}
                // displayRender={displayRender}
                style={{ width: '100%' }}
            />
        </div>
    )
}

export  default  SelectCascader;




