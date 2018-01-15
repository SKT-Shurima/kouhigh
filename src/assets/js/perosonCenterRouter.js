import Vue from 'vue'
import Router from 'vue-router'
import userInfo  from 'components/personCenter/UserInfo';
import deposit  from 'components/personCenter/Deposit';
import balanceDetail from 'components/personCenter/BalanceDetail';
import withdraw from 'components/personCenter/Withdraw';
import currentBid from 'components/personCenter/CurrentBid';
import bidding from 'components/personCenter/Bidding';
import waitAudit from 'components/personCenter/WaitAudit';
import waitPay from 'components/personCenter/WaitPay';
import waitDeal from 'components/personCenter/WaitDeal';
import dealed from 'components/personCenter/Dealed';
import historyBid from 'components/personCenter/HistoryBid';
import editPassword from 'components/personCenter/EditPassword';
import helpCenter from 'components/personCenter/HelpCenter';
import aboutUs from 'components/personCenter/AboutUs';
import protocol from 'components/personCenter/Protocol';
import options from 'components/personCenter/Options';

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: userInfo
    },{
        path: '/userInfo',
        component: userInfo
    },{
        path: '/deposit',
        component: deposit
    },{
        path: '/balanceDetail',
        component: balanceDetail
    },{
        path: '/withdraw',
        component: withdraw
    },{
        path: '/currentBid',
        component: currentBid
    },{
        path: '/bidding',
        component: bidding
    },{
        path: '/waitAudit',
        component: waitAudit
    },{
        path: '/waitPay',
        component: waitPay
    },{
        path: '/waitDeal',
        component: waitDeal
    },{
        path: '/dealed',
        component: dealed
    },{
        path: '/historyBid',
        component: historyBid
    },{
        path: '/editPassword',
        component: editPassword
    },{
        path: '/helpCenter',
        component: helpCenter
    },{
        path: '/aboutUs',
        component: aboutUs
    },{
        path: '/protocol',
        component: protocol
    },{
        path: '/options',
        component: options
    }
  ]
})
