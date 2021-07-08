// import react, {useState} from "react";
// import {useHistory} from "react-router";
// import './style.css'
// import {Popover, Button} from 'antd';
// import icon from './imgs/alibabaicon.jpeg'
// import {HashRouter, Link, Route} from "react-router-dom";
//
// const text = <span>Title</span>;
//
// function ReceptionTop() {
//
//
//     let [username, setusername] = useState(['dd'])
//
//     const history = useHistory()
//     const content = (
//         <div>
//             <Button
//                 onClick={() => {
//                     history.push('/')
//                 }}
//             >进入台管理页面</Button>
//         </div>
//     );
//
//     return (
//         <div className='ReceptionTop'>
//             <HashRouter>
//                 <div>
//                     <img src={icon} alt="" style={{height: '40px'}}/>
//                 </div>
//
//                 <div className='topicon'>
//                     <div>
//                         <span className='iconfont icon-diannao'></span>
//                         <Link to={'/office'}>
//                             <span>办公</span>
//                         </Link>
//
//                     </div>
//
//                     <div>
//                         <span className='iconfont icon-kehu'></span>
//                         <Link to={'/customerMgt/'}>
//                             <span>客户管理</span>
//                         </Link>
//                     </div>
//
//                     {/*<div>*/}
//                     {/*    <span className='iconfont icon-xiangmu'></span>*/}
//                     {/*    <span>项目管理</span>*/}
//                     {/*</div>*/}
//                 </div>
//                 <div>
//
//                 </div>
//                 <div>
//                     <span className='personalName'>{username}</span>
//                     <Popover placement="bottomRight" title={text} content={content} trigger="hover">
//                         <span className='iconfont icon-xiala'
//                               style={{fontSize: '15px', color: '#aaa', marginLeft: '10px'}}></span>
//                     </Popover>
//                 </div>
//             </HashRouter>
//         </div>
//     )
// }
//
// export default ReceptionTop
