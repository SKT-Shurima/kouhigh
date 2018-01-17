<template>
	<div>
		<div class="title">
			<a href="">
				<img src="" class='good-img'>
			</a>
		</div>
		<div class='border-lt container'>
			<dl class="border-rb main-good">
				<dt>
					<div class='main-cover'>
						<img src="http://static.strongmall.net/upload/banner/2017_12_14/dc08d71c21c99b845ea4030080dc5ea3ebdbca5e.jpg" class='good-img'>
					</div>
					<div class="ellipsis-2 main-info">
						圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技
					</div>
					<div class='main-price'>
						<span class='color-primary'>$1000</span>
						<em class='color-6'>$1200</em>
					</div>
				</dt>
				<dd class='bg-start main-opera'>
					<div class='main-time'>{{3600-nowTime|countTime}}<em>后结束</em></span></div>
					<div  class='main-btn'>
						<button class='bg-y time-btn'>立即抢购</button>
					</div>
				</dd>
			</dl>
			<ul class='good-list'>
				<li class='border-rb' v-for='(item,index) in 12' :key='index'>
					<dl>
						<dt class='good-cover'>
							<img src="http://static.strongmall.net/upload/banner/2017_12_14/dc08d71c21c99b845ea4030080dc5ea3ebdbca5e.jpg" class='good-img'>
						</dt>
						<dd>
							<div class='ellipsis-2 good-info'>
								圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技
							</div>
							<div class='good-price'>
								<span class='color-primary'>$1000</span>
								<strong class='color-6'>4656</strong>
							</div>
							<div class='color-6' style='text-decoration: line-through;'>$15223</div>
						</dd>
					</dl>
					<div class='bg-primary good-opera'>
						<span>{{3600-nowTime|countTime}}<em>后结束</em></span>
		 				<a href="">
		 					<button class='bg-y time-btn'>立即抢购</button>
		 				</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {countTime} from '../../assets/js/filter';
	export  default {
		data(){
			return{
				nowTime: 0
			}
		},
		props:{
			content: {
				type: Object,
				required: true,
				default: function(){
					return {
						goods: [],
						icon: '',
						name: ''
					}
				}
			}
		},
		filters: {
			countTime
		},
		mounted(){
			this.$nextTick(()=>{
				setInterval(()=>{
					this.nowTime++;
				},1000)
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.title{
		height: 60px;
	}
	.container{
		overflow: hidden;
	}
	.main-good,.good-list{
		float: left;
		height: 498px;
	}
	.main-good{
		width: 310px;
		padding: 20px;
	}
	.main-cover{
		width: 270px;
		height: 270px;
		text-align: center;
	}
	.main-info{
		margin: 10px 0px;
	    line-height: 20px;
	    height: 40px;
	    font-size: 14px;
	}
	.main-price,.good-price{
		overflow: hidden;
		span{
			float: left;
			font-size: 16px;
		}
		em{
			float: right;
			text-decoration: line-through;
		}
		strong{
			float: right;
		}
	}
	.main-opera{
		height: 100px;
		text-align: center;
		margin-top: 10px;
	}
	.main-time{
		font-size: 28px;
		padding: 10px 0px;
		color: #fff;
		em{
			font-size: 12px;
			margin-left: 10px;
		}
	}
	.main-btn{
		.time-btn{
			width: 120px;
			height: 32px;
			font-size: 18px;
		}
	}
	.good-list{
		width: 936px;
		overflow: hidden;
		li{
			float: left;
			width: 312px;
			padding: 10px;
		}
		dl{
			overflow: hidden;
		}
		dt,dd{
			float: left;
		}
		dd{
			width: 168px;
    		margin-left: 10px;
		}
	}
	.good-cover{
		width: 92px;
		height: 92px;
	}
	.good-info{
		line-height: 20px;
		height: 40px;
		font-size: 14px;
	}
	.good-price{
		margin: 8px 0px;
	}
	.good-opera{
		margin-top: 11px;
		height: 40px;
		line-height: 40px;
		padding: 0px 10px;
		color: #fff;
		span{
			float: left;
			font-size: 16px;
		}
		em{
			font-size: 14px;
			margin-left: 10px;
		}
		a{
			float: right;
		}
	}
	.time-btn{
		width: 76px;
		height: 28px;
		border-radius: 14px;
		color: #fff;
	}
</style>