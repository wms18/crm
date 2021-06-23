//引入react jsx写法的必须
import React from 'react';
//引入需要用到的页面组件
import BackstageMgt from '../PublicComponents/backstageMgt';
import CustomerMgt from '../PublicComponents/customerMgt';
//引入一些模块
import { HashRouter as Router, Route} from "react-router-dom";
import Homepage from '../PublicComponents/backstageMgt/component/homepage';
import StaffDep from '../PublicComponents/backstageMgt/component/staff&department';
import SystemMgt from '../PublicComponents/backstageMgt/component/rolecontrol/component/jurisdiction/system/components/systemMgt';
import Office from '../PublicComponents/backstageMgt/component/rolecontrol/component/jurisdiction/office/office';
import Customer from '../PublicComponents/backstageMgt/component/rolecontrol/component/jurisdiction/customer/customer';
import Project from '../PublicComponents/backstageMgt/component/rolecontrol/component/jurisdiction/project/project';

import Dashboaedlayout from '../PublicComponents/customerMgt/menulayout/component/dashboardlayout';
import Clue from '../PublicComponents/customerMgt/menulayout/component/clue';
import ProductTable from '../PublicComponents/customerMgt/menulayout/component/prodocutTable';

const routes = [
    {
        path: '/',
        component: BackstageMgt,
        exact: true,
        children:[
            {
                path: '/homepage',
                component: Homepage
            },
            {
                path: '/StaffDep',
                component: StaffDep
            },
            {
                path: '/system',
                component: SystemMgt
            },
            {
                path: '/office',
                component: Office
            },
            {
                path: '/customer',
                component: Customer
            },
            {
                path: '/homepage',
                component: Homepage
            },
            {
                path: '/project',
                component: Project
            },
            {
                path: '/homepage/',
                component: Homepage
            },
        ]
    },
    {
        path: '/customerMgt',
        component: CustomerMgt,
        children: [
            {
                path: '/customerMgt/',
                component: Dashboaedlayout
            },
            {
                path: '/customerMgt/clue',
                component: Clue
            },
            {
                path: '/customerMgt/product',
                component: ProductTable
            }
        ]
    },
];




export {routes}
