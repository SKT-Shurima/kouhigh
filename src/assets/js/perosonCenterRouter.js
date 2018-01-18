import Vue from 'vue';
import Router from 'vue-router';

import baseInfo from '../../components/personCenter/BaseInfo';
import orderList from  '../../components/personCenter/OrderList';

Vue.use(Router)

export default new Router({
  routes: [{
        path: '/',
        component: baseInfo
    },{
        path: '/allOrder',
        component: orderList
    },{
        path: '/waitPayFor',
        component: orderList
    },{
        path: '/waitSend',
        component: orderList
    },{
        path: '/waitGet',
        component: orderList
    },{
        path: '/waitComment',
        component: orderList
    },{
        path: '/afterSale',
        component: orderList
    }
  ]
})
