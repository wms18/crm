import react, { useState } from 'react'
import { Map, APILoader, Marker } from '@uiw/react-amap';
import { Input, } from 'antd'
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import fetchJsonp from 'fetch-jsonp'



const { Option } = Select;

function MapControl(props) {
    const [show, setShow] = useState(true);


    let [data, setData] = useState([])
    let [value, setValue] = useState(undefined)


    let timeout;
    let currentValue;
    function fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const str = querystring.encode({
                code: 'utf-8',
                q: value,
            });
            jsonp(`https://suggest.taobao.com/sug?${str}`)
                .then(response => response.json())
                .then(d => {
                    if (currentValue === value) {
                        const { result } = d;
                        const data = [];
                        result.forEach(r => {
                            data.push({
                                value: r[0],
                                text: r[0],
                            });
                        });
                        callback(data);
                    }
                });
        }

        timeout = setTimeout(fake, 300);
    }
    function handleSearch(value) {
        if (value) {
            fetch(value, data => setData(data));
        } else {
            setData([]);
        }
    };


    function handleChange(value) {
        setValue(value);
    };
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (

        // <div>
        //     <button onClick={() => setShow(!show)}>
        //         {show ? '隐藏' : '显示'}
        //     </button>
        //     <div style={{ width: '100%', height: '300px' }}>
        //         <Map zoom={4}>
        //             <Marker visiable={show} title="北京市" position={new AMap.LngLat(116.405285, 39.904989)} />
        //             <Marker visiable={show} title="天津市" position={new AMap.LngLat(117.190182, 39.125596)} />
        //             <Marker visiable={show} title="河北省" position={new AMap.LngLat(114.502461, 38.045474)} />
        //             <Marker visiable={show} title="山西省" position={new AMap.LngLat(112.549248, 37.857014)} />
        //             <Marker visiable={show} title="内蒙古自治区" position={new AMap.LngLat(111.670801, 40.818311)} />
        //             <Marker visiable={show} title="辽宁省" position={new AMap.LngLat(123.429096, 41.796767)} />
        //             <Marker visiable={show} title="吉林省" position={new AMap.LngLat(125.3245, 43.886841)} />
        //             <Marker visiable={show} title="黑龙江省" position={new AMap.LngLat(126.642464, 45.756967)} />
        //             <Marker visiable={show} title="上海市" position={new AMap.LngLat(121.472644, 31.231706)} />
        //             <Marker visiable={show} title="江苏省" position={new AMap.LngLat(118.767413, 32.041544)} />
        //             <Marker visiable={show} title="浙江省" position={new AMap.LngLat(120.153576, 30.287459)} />
        //             <Marker visiable={show} title="安徽省" position={new AMap.LngLat(117.283042, 31.86119)} />
        //             <Marker visiable={show} title="福建省" position={new AMap.LngLat(119.306239, 26.075302)} />
        //             <Marker visiable={show} title="江西省" position={new AMap.LngLat(115.892151, 28.676493)} />
        //             <Marker visiable={show} title="山东省" position={new AMap.LngLat(117.000923, 36.675807)} />
        //             <Marker visiable={show} title="河南省" position={new AMap.LngLat(113.665412, 34.757975)} />
        //             <Marker visiable={show} title="湖北省" position={new AMap.LngLat(114.298572, 30.584355)} />
        //             <Marker visiable={show} title="湖南省" position={new AMap.LngLat(112.982279, 28.19409)} />
        //             <Marker visiable={show} title="广东省" position={new AMap.LngLat(113.280637, 23.125178)} />
        //             <Marker visiable={show} title="广西壮族自治区" position={new AMap.LngLat(108.320004, 22.82402)} />
        //             <Marker visiable={show} title="海南省" position={new AMap.LngLat(110.33119, 20.031971)} />
        //             <Marker visiable={show} title="重庆市" position={new AMap.LngLat(106.504962, 29.533155)} />
        //             <Marker visiable={show} title="四川省" position={new AMap.LngLat(104.065735, 30.659462)} />
        //             <Marker visiable={show} title="贵州省" position={new AMap.LngLat(106.713478, 26.578343)} />
        //             <Marker visiable={show} title="云南省" position={new AMap.LngLat(102.712251, 25.040609)} />
        //             <Marker visiable={show} title="西藏自治区" position={new AMap.LngLat(91.132212, 29.660361)} />
        //             <Marker visiable={show} title="陕西省" position={new AMap.LngLat(108.948024, 34.263161)} />
        //             <Marker visiable={show} title="甘肃省" position={new AMap.LngLat(103.823557, 36.058039)} />
        //             <Marker visiable={show} title="青海省" position={new AMap.LngLat(101.778916, 36.623178)} />
        //             <Marker visiable={show} title="宁夏回族自治区" position={new AMap.LngLat(106.278179, 38.46637)} />
        //             <Marker visiable={show} title="新疆维吾尔自治区" position={new AMap.LngLat(87.617733, 43.792818)} />
        //             <Marker visiable={show} title="台湾省" position={new AMap.LngLat(121.509062, 25.044332)} />
        //             <Marker visiable={show} title="香港特別行政區" position={new AMap.LngLat(114.173355, 22.320048)} />
        //             <Marker visiable={show} title="澳門特別行政區" position={new AMap.LngLat(113.54909, 22.198951)} />
        //         </Map>
        //     </div>
        // </div>
        <div>
            <Select
                showSearch
                value={value}
                placeholder={props.placeholder}
                style={props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                style={{ width: 184, marginBottom: '10px' }}
            >
                {options}
            </Select>
            <div class style={{ width: 184, height: 100, marginBottom: '10px' }}>
                <APILoader akay="521aa38413f6fa4205189eaf5bf2c1db">
                    <Map />
                </APILoader>
            </div>
            <Input></Input>
        </div>

    )

}

export default MapControl;





// class SearchInput extends React.Component {
//     state = {
//         
//     };


//     render() {
//         return (

//     );
//     }
// }

// ReactDOM.render(<SearchInput placeholder="input search text" style={{ width: 200 }} />, mountNode);