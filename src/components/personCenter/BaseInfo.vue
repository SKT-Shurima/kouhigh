<template>
	<div class="wrap">
		<div class="border-c base-info">
			<div class="bg-f5 title">
				<dl class='user-info'>
					<dt>
						<img :src="userInfo.portrait" v-if='userInfo.portrait'>
						<img src="../../../static/img/common/portraitDefault.jpg" v-else>
					</dt>
					<dd>{{userInfo.nickname}}({{userInfo.email}})</dd>
				</dl>
				<ul class='account-info'>
					<li>
						<em class='color-6'>余额</em>
						<span class='color-primary' v-text='userInfo.balance'></span>
					</li>
					<li>
						<em class='color-6'>积分</em>
						<span class='color-primary' v-text='userInfo.integral'></span>
					</li>
				</ul>
				<dl class="address">
					<dt><router-link to="/editAddress" class='color-lan'>我的收货地址</router-link></dt>
					<dd><router-link to="/addBank" class='color-lan'>绑定银行卡</router-link></dd>
				</dl>
			</div>
			<div class="shop-info">
				 <ul>
				 	<li><router-link to='/baseInfo_waitPayFor'>待付款<i class='icon-cir'>{{orderInfo.wait_pay | num_filter}}</i></router-link></li>
				 	<li><router-link to='/baseInfo_waitSend'>待发货<i class='icon-cir'>{{orderInfo.wait_send | num_filter}}</i></router-link></li>
				 	<li><router-link to='/baseInfo_waitGet'>待收货<i class='icon-cir'>{{orderInfo.wait_receive| num_filter}}</i></router-link></li>
				 	<li><router-link to='/baseInfo_waitComment'>待评价<i class='icon-cir'>{{orderInfo.wait_comment | num_filter}}</i></router-link></li>
				 	<li><router-link to='/baseInfo_afterSale'>退款/售后</router-link></li>
				 </ul>
				 <div class="color-6 last-login">
				 	上次登录时间：{{userInfo.date_last_login | dateYM}}&nbsp;{{userInfo.date_last_login | timeHM}}
				 </div>             
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import {num_filter,dateYM,timeHM} from '../../assets/js/filter';
import {MessageBox} from  'element-ui';
import userMixin from '../../assets/js/userMixin';
import vOrderList from '../../components/personCenter/OrderList';
	export default {
		data() {
		    return {
		    };
		},
		components:{
			vOrderList
		},
		filters: {
			num_filter,dateYM,timeHM
		},
		props:{
			userInfo: {
				type: Object,
				requied: true,
				default: function(){
					return {}
				}
			},
			orderInfo: {
				type: Object,
				requied: true,
				default: function(){
					return {}
				}
			}
		},
		methods:{
		    getOrders(index){
		    	
		    }
		}
	}
</script>
<style lang='scss' scoped>
	.base-info{
		width: 100%;
		margin-bottom: 30px;
	}
	.title{
		padding: 14px 40px 16px 22px;
		line-height: 50px;
		border-bottom: 1px solid #ccc;
		overflow: hidden;
	}
	.user-info{
		float: left;
		overflow: hidden;
		dt{
			float: left;
			width: 50px;
			height: 50px;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		dd{
			float: left;
			margin-left: 26px;
		}
	}
	.account-info{
		float: left;
		height: 50px;
		line-height: 50px;
		margin-left: 38px;
		overflow: hidden;
		li{
			float: left;
			width: 126px;
			em{
				vertical-align: 1px;
			}
			span{
				font-size: 16px;
				font-weight: 600;
			}
		}
	}
	.shop-info{
		padding: 26px 40px 26px 30px;
		line-height: 20px;
		text-align: center;
		overflow: hidden;
		ul{
			float: left;
			overflow: hidden;
		}
		li{
			float: left;
			width: 130px;
			cursor: pointer;
			border-right: 1px solid #ccc; 
			i{
				margin-left: 4px;
			}
		}
		li:last-child{
			border-right: none;
		}
	}
	.address,.last-login{
		float: right;
	}
	.address{
		line-height: 25px;
		cursor: pointer;
	}
</style>