<template>
	<div class="wrap">
		<div class="border-c base-info">
			<div class="bg-f5 title">
				<dl class='user-info'>
					<dt>
						<img :src="userInfo.avater" v-if='userInfo.avater'>
						<img src="../../../static/img/common/avaterDefault.jpg" v-else>
					</dt>
					<dd>{{userInfo.nickname}}({{userInfo.real_phone}})</dd>
				</dl>
				<ul class='account-info'>
					<li>
						<em class='color-6'>余额</em>
						<span class='color-primary'>3000</span>
					</li>
					<li>
						<em class='color-6'>积分</em>
						<span class='color-primary'>400</span>
					</li>
				</ul>
				<dl class="color-lan address">
					<dt>我的收货地址</dt>
					<dd>绑定银行卡</dd>
				</dl>
			</div>
			<div class="shop-info">
				 <ul>
				 	<li @click='getOrders(1)'>待付款<i class='bg-primary'>{{7 | num_filter}}</i></li>
				 	<li @click='getOrders(2)'>待发货<i class='bg-primary'>{{8 | num_filter}}</i></li>
				 	<li @click='getOrders(3)'>待收货<i class='bg-primary'>{{9| num_filter}}</i></li>
				 	<li @click='getOrders(4)'>待评价<i class='bg-primary'>{{10 | num_filter}}</i></li>
				 	<li @click='getOrders(5)'>退款/售后</li>
				 </ul>
				 <div class="color-6 last-login">
				 	上次登录时间：{{1500000000 | dateYM}}&nbsp;{{1500000000 | timeHM}}
				 </div>             
			</div>
		</div>
		<!-- <order-list ref='orderList'></order-list> -->
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
		        userInfo: {}
		    };
		},
		components:{
			vOrderList
		},
		filters: {
			num_filter,dateYM,timeHM
		},
		mixins: [userMixin],
		methods:{
		    getOrders(index){
		    	
		    }
		},
		created(){
			this.$nextTick(()=>{
				let token = getCookie('token');
				if (!token) {
				    window.history.back();
				}
			})
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
				padding: 0px 4px;
				border-radius: 8px;
				color: #fff;
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