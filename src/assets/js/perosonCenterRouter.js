import Vue from 'vue';
import Router from 'vue-router';

import baseInfo from '../../components/personCenter/BaseInfo';
import orderList from  '../../components/personCenter/OrderList';
import editAddress from '../../components/personCenter/EditAddress';
import addBank from '../../components/personCenter/AddBank';
import userInfo from '../../components/personCenter/UserInfo';
import colGoods from '../../components/personCenter/ColGoods';
import myShopping from '../../components/personCenter/MyShopping';
import footmark from '../../components/personCenter/FootMark';
import myCounpon from '../../components/personCenter/MyCounpon';
import shoppingAdvice from '../../components/personCenter/ShoppingAdvice';
import tenants from '../../components/personCenter/Tenants';
import editPortrait from '../../components/personCenter/EditPortrait';


Vue.use(Router)

export default new Router({
  routes: [{
        path: '/',
        component: baseInfo,
        children: [{
                name: 'waitPayFor2',
                path: '/',
                component: orderList
            },{
                name: 'waitSend2',
                path: '/baseInfo_waitSend',
                component: orderList
            },{
                name: 'waitGet2',
                path: '/baseInfo_waitGet',
                component: orderList
            },{
                name: 'waitComment2',
                path: '/baseInfo_waitComment',
                component: orderList
            },{
                name: 'afterSale2',
                path: '/baseInfo_afterSale',
                component: orderList
            }
        ]
    },{
        name: 'allOrder1',
        path: '/allOrder',
        component: orderList
    },{
        name: 'waitPayFor1',
        path: '/waitPayFor',
        component: orderList
    },{
        name: 'waitSend1',
        path: '/waitSend',
        component: orderList
    },{
        name: 'waitGet1',
        path: '/waitGet',
        component: orderList
    },{
        name: 'waitComment1',
        path: '/waitComment',
        component: orderList
    },{
        name: 'afterSale1',
        path: '/afterSale',
        component: orderList
    },{
        path: '/editAddress',
        component: editAddress
    },{
        path: '/addBank',
        component: addBank
    },{
        path: '/userInfo',
        component: userInfo
    },{
        path: '/colGoods',
        component: colGoods
    },{
        path: '/myShopping',
        component: myShopping
    },{
        path: '/footmark',
        component: footmark
    },{
        path: '/myCounpon',
        component: myCounpon
    },{
        path: '/shoppingAdvice',
        component: shoppingAdvice
    },{
        path: '/tenants',
        component: tenants
    },{
        path: '/editPortrait',
        component: editPortrait
    }
  ]
})
