<template>
	<div>
		<div class="title">
			<a href="">
				<img src="" class='good-img'>
			</a>
		</div>
		<div class='border-lt container'>
			<dl class="border-rb main-good">
				<dt style="padding: 20px 20px 0px;" class='border-bottom'>
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
				<dd>
					<dl class='good-list'>
						<dt class='good-cover'>
							<img src="http://static.strongmall.net/upload/banner/2017_12_14/dc08d71c21c99b845ea4030080dc5ea3ebdbca5e.jpg" class='good-img'>
						</dt>
						<dd class='good-info'>
							<div class='ellipsis-2' style="height: 40px;">
								圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技
							</div>
							<div class='good-price'>
								<span class='color-primary'>$1000</span>
								<em class='color-6'>{{}}人付款</em>
							</div>
						</dd>
					</dl>
				</dd>
			</dl>
			<ul class='good-s'>
				<li class='border-rb' v-for='(item,index) in 4' :key='index'>
					<dl class='good-list'>
						<dt class='good-cover'>
							<img src="http://static.strongmall.net/upload/banner/2017_12_14/dc08d71c21c99b845ea4030080dc5ea3ebdbca5e.jpg" class='good-img'>
						</dt>
						<dd class='good-info'>
							<div class='ellipsis-2' style="height: 40px;">
								圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技
							</div>
							<div class='good-price'>
								<span class='color-primary'>$1000</span>
								<em class='color-6'>{{}}人付款</em>
							</div>
						</dd>
					</dl>
				</li>
			</ul>
			<ul class='good-b'>
				<li class="border-rb" v-for='(item,index) in 6'>
					<dl>
						<dt class='cover-b'>
							<img src="http://static.strongmall.net/upload/banner/2017_12_14/dc08d71c21c99b845ea4030080dc5ea3ebdbca5e.jpg" class='good-img'>
						</dt>
						<dd class='ellipsis-2 info-b'>
							圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技圆周率网络科技
						</dd>
					</dl>
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
	.main-good{
		float: left;
		height: 498px;
	}
	.main-good{
		width: 310px;
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
	.main-price{
		margin-bottom: 3px;
	}
	.main-price{
		overflow: hidden;
		span{
			float: left;
			font-size: 16px;
		}
		em{
			float: right;
			text-decoration: line-through;
		}
	}
	.good-list{
		overflow: hidden;
		padding: 16px;
	}
	.good-cover{
		float: left;
		width: 92px;
		height: 92px;
	}
	.good-info{
		float: left;
		width: 166px;
		line-height: 20px;
		font-size: 14px;
    	margin-left: 10px;
	}
	.good-price{
		overflow: hidden;
		margin-top: 30px;
		span{
			float: left;
			font-size: 16px;
		}
		em{
			float: right;
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.good-s{
		float: left;
		width: 312px;
	}
	.good-b{
		float: left;
		width: 626px;
		li{
			float: left;
			width: 208px;
			padding: 10px;
		}
	}
	.cover-b{
		width: 180px;
		height: 180px;
	}
	.info-b{
		font-size: 14px;
		line-height: 20px;
		height: 40px;
		margin: 6px 0px 3px;
	}
</style>