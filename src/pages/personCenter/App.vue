<template>
    <div id="app">
		<v-head-slider :user-info='userInfo'></v-head-slider>
		<v-person-center-nav :user-info='userInfo'></v-person-center-nav>
		<div class="center-box container">
			<div class="border-d slider">
				<div class="bg-f5 title">订单中心</div>
				<ul>
					<li class='color-6' v-for='(item,index) in orderList'>
						<router-link :to='item.link'>
							<i></i>{{item.name}}
						</router-link>
					</li>
				</ul>
				<div class="bg-f5 title">
					会员中心
				</div>
				<ul>
					<li class='color-6' v-for='(item,index) in  vipList'>
						<router-link :to='item.link'>
							<i></i>{{item.name}}
						</router-link>
					</li>
				</ul>
			</div>
			<div class='component-view'>
				<router-view :user-info='userInfo' :order-info='orderInfo'></router-view>
			</div>
		</div>
		<v-footer></v-footer>
  	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vPersonCenterNav from '../../common/PersonCenterNav';
	import vFooter from  '../../common/Footer';
	import userMixin from '../../assets/js/userMixin';
	import {MessageBox} from  'element-ui';
    export default {
    	data(){
    		return{
    			orderList: [{
    				name: '我的订单',
    				link: 'allOrder'
		        },{
		        	name: '待付款订单',
		        	link: 'waitPayFor'
		        },{
		        	name: '待发货订单',
		        	link: 'waitSend'
		        },{
		        	name: '待收货订单',
		        	link: 'waitGet'
		        },{
		        	name: '待评价订单',
		        	link: 'waitComment'
		        },{
		        	name: '售后处理订单',
		        	link: 'afterSale'
		        }],
    			vipList: [{
    				name: '用户信息',
    				link: 'userInfo'
    			},{
    				name: '商品收藏',
    				link: 'colGoods'
    			},{
    				name: '我的购物车',
    				link: 'myShopping'
    			},{
    				name: '我的足迹',
    				link: 'footmark'
    			},{
    				name: '我的优惠券',
    				link: 'myCounpon'
    			},{
    				name: '购买建议',
    				link: 'shoppingAdvice'
    			},{
    				name: '资金管理',
    				link: 'tenants'
    			}]
    		}
    	},
    	components:{
    		vHeadSlider,vPersonCenterNav,vFooter
    	},
    	mixins: [userMixin],
    	created(){
    		this.$nextTick(()=>{
    			let token = getCookie('token');
    			if (!token) {
    				MessageBox.alert('请先登录', '提示', {
			            confirmButtonText: '确定',
			            callback: action => {
			                window.location.href = 'login.html';
			            }
			        });
    			}
    		})
    	}
    }
</script>
<style type="text/css" lang='scss' scoped>
	.container{
		margin-top: 30px;
		overflow: hidden;
	}
  	.slider{
		float: left;
		width: 150px;
		line-height: 40px;
		div{
			font-size: 14px;
			font-weight: 600;
			padding-left: 24px;
			margin-top: -1px;
			border-top: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
		}
		li{
			padding-left: 16px;
			cursor: pointer;
			i{
				display: inline-block;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				margin-right: 10px;
				background-color: #aaa ;
			}
			a{
				color: #666;
			}
		}
		.router-link-active{
			color: #ffa4a3;
			i{
				background-color: #ffa4a3;
			}
		}
	}
	.component-view{
	    float: left;
	    width: 1080px;
	    margin-left: 20px;
	    overflow: hidden;
	}
</style>
