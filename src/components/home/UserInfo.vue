<template>
	<div class="wrap">
		<div class="info-box">
			<dl>
				<dt>
					<img :src="userInfo.portrait" v-if='userInfo.portrait'>
					<img src="../../../static/img/common/portraitBig.jpg" v-else>
				</dt>
				<dd v-if='!Object.keys(userInfo).length'>Hi,您好！</dd>
				<dd v-else>Hi,{{userInfo.nickname}}</dd>
			</dl>
			<div class="bg-f2 btn-box" v-if='!Object.keys(userInfo).length'>
				<div>
					<a href="login.html">
						<el-button type='text' size='small'>登录</el-button>
					</a>
				</div>
				<div>
					<a href="reg.html">
						<el-button type='text' size='small'>注册新用户</el-button>
					</a>
				</div>
			</div>
			<div class="info" v-else>
				<el-row class='info-money'>
					<el-col :span='12'>
						<div class="color-primary" v-text='userInfo.balance'></div>
						<div>余额</div>
					</el-col>
					<el-col :span='12'>
						<div class="color-primary" v-text='userInfo.integral'></div>
						<div>积分</div>
					</el-col>
				</el-row>
				<el-row>
					<div class="info-title">
						<span>
							<img src="../../../static/img/index/order.png" height="16" width="16">
							我的订单
						</span>
						<a href=''>
						    售后<img src="../../../static/img/common/left.png" height="10" width="5" alt="">
						</a>
					</div>
					<el-row class='order-menu'>
						<el-col :span='6' >
						    <a href=''>待付款</a>
							<i class="icon-cir">{{orderInfo.wait_pay | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<a href=''>待发货</a>
							<i class="icon-cir">{{orderInfo.wait_send | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<a href=''>待收货</a>
							<i class="icon-cir">{{orderInfo.wait_receive | num_filter}}</i>
						</el-col>
						<el-col :span='6'>
							<a href=''>待评价</a>
							<i class="icon-cir">{{orderInfo.wait_comment | num_filter}}</i>
						</el-col>
					</el-row>
				</el-row>
			</div>
		</div>
		<div>
			<div class="info-title">
				<span>
					<img src="../../../static/img/index/message.png" height="16" width="16">
					优惠快讯
				</span>
				<a href='infoList.html'>
					更多<img src="../../../static/img/common/left.png" height="10" width="5" alt="">
				</a>
			</div>
			<ul class="msg-list">
				<li class='ellipsis-1' v-for='(item,index) in ad' :key='index'>
					<a :href="`infomation.html?ad_id=${item.ad_id}`" class='color-6' v-text='item.name'></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {num_filter} from '../../assets/js/filter';
	export default{
		filters: {
			num_filter
		},
		props:{
			userInfo: {
				type: Object,
				required: true,
				default: function(){
					return {}
				}
			},
			orderInfo: {
				type: Object,
				required: true,
				default: function(){
					return {}
				}
			},
			ad: {
				type: Array,
				required: true,
				default: function(){
					return []
				}
			}
		},
		methods:{
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 250px;
	}
	.info-box{
		height: 240px;
		dl{
		    height: 118px;
		    margin-top: 12px;
		    padding-top: 10px;
		    padding-bottom: 10px;
		    cursor: pointer;
		}
		dt{
			width: 70px;
			margin: 0px auto;
			img{
				width: 70px;
				height: 70px;
				border-radius: 50%;
			}
		}
		dd{
			text-align: center;
			font-size: 14px;
			margin-top: 10px;
		}
	}
	.btn-box{
		height: 124px;
		text-align: center;
		padding-top: 12px;
		padding-bottom: 24px;
		div{
			margin-top: 14px;
			.el-button{
				width: 130px;
				border: 1px solid #ffa4a3;
			}
		}
	}
	.info{
		height: 124px;
	}
	.info-money{
		height: 44px;
		padding-top: 4px;
		text-align: center;
	}
	.order-menu{
		padding: 0px 12px;
		.el-col-6{
			cursor: pointer;
		}
		a,i{
			float: left;
		}
	}
	.msg-list{
		height: 200px;
		padding: 0px 20px;
		overflow: hidden;
		li{
			line-height: 20px;
			overflow: hidden; 
            cursor: pointer;
		}
		li:last-child{
			border-bottom: none;
		}
	}
	.info-title{
		width: 100%;
		height: 48px;
		line-height: 48px;
		font-size: 14px;
		padding: 0px 16px;
		span{
			float: left;
			font-weight: 600;
		}
		a,em{
			float: right;
			cursor: pointer;
			color: #666;
			img{
				margin-left: 6px;
			}
		}
	}
</style>