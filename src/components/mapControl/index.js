// import react, { useState } from 'react'
// import { Map, APILoader, Marker } from '@uiw/react-amap';
// import { Input, } from 'antd'
// import { Select } from 'antd';
// import jsonp from 'fetch-jsonp';
// import querystring from 'querystring';
// import fetchJsonp from 'fetch-jsonp'
// import AMap from 'AMap'
// import { useEffect } from 'react';




// const { Option } = Select;

// function MapControl(props) {
//     const [show, setShow] = useState(true);


//     let [data, setData] = useState([])
//     let [value, setValue] = useState(undefined)
//     let [address, setAddress] = useState('')
//     let [addrCenter, setAddrCenter] = useState([116.480766, 39.932931])


//     useEffect(() => {

//         //编辑时,调用地图组件,需显示已有的地址
//         console.log(props.detailAddr);
//         if (props.detailAddr) {
//             value = props.detailAddr
//             setValue(value)
//             address = props.detailAddr
//             setAddress(props.detailAddr)
//         }
      
//     }, [props.detailAddr])

//     let timeout;
//     let currentValue;
//     function fetch(value, callback) {
//         if (timeout) {
//             clearTimeout(timeout);
//             timeout = null;
//         }
//         currentValue = value;

//         function fake() {

//             var position = new AMap.LngLat(113.6596, 34.697547);//标准写法var position = new AMap.LngLat(116, 39);//标准写法

//             var map = new AMap.Map('gd-map', {
//                 viewMode: '2D',
//                 pitch: 50,
//                 zoom: 11,
//                 center: [113.6596, 34.697547]
//                 // center: position
//             });


//             AMap.plugin('AMap.Autocomplete', function () {
//                 // 实例化Autocomplete
//                 var autoOptions = {
//                     //city 限定城市，默认全国
//                     city: '全国'
//                 }
//                 var autoComplete = new AMap.Autocomplete(autoOptions);
//                 autoComplete.search(value, function (status, result) {
//                     // 搜索成功时，result即是对应的匹配数据
//                     console.log(status);
//                     console.log(result);
//                     // locRS = result.tips
//                     // setLocRS(result)
//                     // console.log(locRS);
//                     if (currentValue === value) {
//                         // const { result } = d;
//                         let data = [];
//                         result.tips ?
//                             result.tips.forEach(item => {
//                                 data.push({
//                                     adcode: item.adcode,
//                                     address: item.district + item.address + item.name,
//                                     location: item.location
//                                     // text: r[0],
//                                 });
//                             })
//                             :
//                             data = [];
//                         console.log(data);
//                         callback(data);
//                     }



//                 })
//             })



//         }

//         timeout = setTimeout(fake, 300);
//     }


//     function getAddr(e) {
//         console.log(e.target.value);
//     }
//     function handleSearch(value) {
//         if (value) {
//             fetch(value, data => setData(data));
//         } else {
//             setData([]);
//         }
//     };


//     function handleChange(value) {
//         address = value
//         setAddress(address)
//         console.log(value);
//         value = value
//         setValue(value);
//         // props.method?props.method(value):console.log()
//         props.method(value)


//     };
//     const options = data.map(item => <Option key={item.adcode} value={item.address}  >{item.address}</Option>);
//     return (

//         <div>
//             <Select
//                 showSearch
//                 value={value}
//                 placeholder={props.placeholder}
//                 style={props.style}
//                 defaultActiveFirstOption={false}
//                 showArrow={false}
//                 filterOption={false}
//                 onSearch={handleSearch}
//                 onChange={handleChange}
//                 notFoundContent={null}
//                 style={{ width: 220, marginBottom: '10px' }}
//             >
//                 {options}
//             </Select>
//             <div class style={{ width: 220, height: 100, marginBottom: '10px' }}>
//                 <APILoader akay="521aa38413f6fa4205189eaf5bf2c1db">
//                     <Map />
//                 </APILoader>
//             </div>
//             <Input value={address} onChange={getAddr} readOnly ></Input>
//         </div>

//     )

// }

// export default MapControl;





