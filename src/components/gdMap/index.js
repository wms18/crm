// import React, { useState } from "react"
// import Example from "./map"
// import { Select } from 'antd'
// import { Map, APILoader, Marker } from '@uiw/react-amap';
// import Demo from "./exampleMap";
// import AMap from 'AMap'
// import { useEffect } from "react";
// const { Option } = Select

// function GdMap() {

//     let [value, setValue] = useState('')
//     let [keyword, setKeyword] = useState()
//     let [locRS, setLocRS] = useState([])

//     function SearchAdd(val) {
//         // console.log(e.target.value);
//         // setValue(e.target.value)
//         console.log(val);
//         keyword = val
//         setKeyword(keyword)

//     }
//     useEffect(() => {
//         var map = new AMap.Map('gd-map', {
//             viewMode: '2D',
//             pitch: 50,
//             zoom: 11,
//             center: [113.6596, 34.697547]
//         });
//         AMap.plugin('AMap.Autocomplete', function () {
//             // 实例化Autocomplete
//             var autoOptions = {
//                 //city 限定城市，默认全国
//                 city: '全国'
//             }
//             var autoComplete = new AMap.Autocomplete(autoOptions);
//             autoComplete.search(keyword, function (status, result) {
//                 // 搜索成功时，result即是对应的匹配数据
//                 console.log(status);
//                 console.log(result);
//                 locRS = result.tips
//                 setLocRS(result)
//                 console.log(locRS);


//             })
//         })
//     })
//     // const options = data.map(d => <Option key={d.value}>{d.text}</Option>);

//     // const options = locRS ? locRS.map(item => <Option key={item.adcode} >{item.district + item.address + item.name} </Option>) : ''
//     return (
//         <div>
//             <div style={{ marginBottom: 10 }}>

//                 <Select
//                     showSearch
//                     value={value}
//                     defaultActiveFirstOption={false}
//                     showArrow={false}
//                     filterOption={false}
//                     onSearch={SearchAdd}
//                     // onChange={handleChange}
//                     // onChange={SearchAdd}
//                     notFoundContent={null}
//                     style={{ width: 184, marginBottom: '10px' }}
//                 >
//                     {/* {options} */}
//                 </Select>
//                 {/* <input type="text" id='Search' onChange={SearchAdd} /> */}
//             </div>
//             <div id='gd-map' style={{ width: 184, height: 100, marginBottom: '10px' }}>
//                 {/* <APILoader akay="521aa38413f6fa4205189eaf5bf2c1db">
//                 <Map></Map>
//             </APILoader> */}
//             </div>

//             <input type="text" value={value} />

//         </div>

//     )
// }

// export default GdMap;