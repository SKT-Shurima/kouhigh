import Vue from 'vue';
import Router from 'vue-router';

import editPassword from '../../components/myAccount/EditPassword';
import message from  '../../components/myAccount/Message';


Vue.use(Router)

export default new Router({
  routes: [{
        path: '/',
        component: editPassword,
    },{
        path: '/message',
        component: message,
    }]
})
