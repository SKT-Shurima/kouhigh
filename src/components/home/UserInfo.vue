<template>
	<div class="wrap">
		<div class="info-box">
			<dl>
				<dt>
					<img src="../../../static/img/common/avaterDefault.jpg" v-if='false'>
					<img src="" v-else>
				</dt>
				<dd>
					<span>Hi,您好！{{}}</span>
				</dd>
			</dl>
			<div class="bg-f2 btn-box" v-if='false'>
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
						<div class="color-primary">100</div>
						<div>余额</div>
					</el-col>
					<el-col :span='12'>
						<div class="color-primary">200</div>
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
							<i class="bg-primary">{{1}}</i>
						</el-col>
						<el-col :span='6'>
							<a href=''>待发货</a>
							<i class="bg-primary">{{2}}</i>
						</el-col>
						<el-col :span='6'>
							<a href=''>待收货</a>
							<i class="bg-primary">{{3}}</i>
						</el-col>
						<el-col :span='6'>
							<a href=''>待评价</a>
							<i class="bg-primary">{{4}}</i>
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
				<a href=''>
					更多<img src="../../../static/img/common/left.png" height="10" width="5" alt="">
				</a>
			</div>
			<ul class="msg-list">
				<li class='ellipsis-1 color-6' v-for='(item,index) in 10' :key='index'>
					圆周率网路
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
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
		a{
			float: left;
		}
		i{
			float: left;
			height: 12px;
			line-height: 12px;
			padding: 0px 3px;
			border-radius: 6px;
			margin-top: 2px;
			text-align: center;
			color: #fff;
			background-color: #ffa4a3;
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