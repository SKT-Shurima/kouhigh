<template>
	<div class="wrap" v-if='Object.keys(userInfo).length'>
		<div class="container">
			<ul>
				<li class="portrait" style='padding:0px;'>
					<div style="width: 28px;height: 28px;margin:0px auto 12px;;">
						<a href="personCenter.html">
							<img :src="userInfo.portrait" style="width:100%;height: 100%;" v-if='userInfo.portrait'>
							<img src="../../static/img/common/portraitSmall.jpg" style="width:100%;height: 100%;" v-else>
						</a>
					</div>
				</li>
				<li @click='kf'>
					<div>
						<img src="../../static/img/common/kf.png" height="22" width="22">
					</div>
					<div>联系客服</div>
				</li>
				<li>
					<dl>
						<dt class="single-col">
							<img src="../../static/img/common/shoppingCar.png" height="22" width="22">
						</dt>
						<dd>
							<div class="single-col">
								购物车
							</div>
							<div style="margin-top:10px;">
								<span class='bg-primary' style="padding: 0px 4px;border-radius: 8px;">0</span>
							</div>
						</dd>
					</dl>
				</li>
				<li>
					<div class="single-col">
						<img src="../../static/img/common/counpon.png" height="22" width="22">
					</div>
					<div class="single-col">优惠券</div>
				</li>
				<li>
					<div class="single-col">
						<img src="../../static/img/common/col.png" height="22" width="22">
					</div>
					<div>收藏</div>
				</li>
				<li class="code-box">
					<div class="single-col">
						<img src="../../static/img/common/qrcode.png" height="22" width="22">
					</div>
					<div>扫码下载APP</div>
					<dl class="code-img">
						<dt>
							<div class="android"></div>
							<div>android</div>
						</dt>
						<dd>
							<div class="ios"></div>
							<div>ios</div>
						</dd>
					</dl>
				</li>
			</ul>
			<dl class="bg-primary back-top" @click='gotoTop'>
				<dt>
					<img src="../../static/img/common/backTop.png" height="32" width="32">
				</dt>
				<dd class="single-col">
					回顶部
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				kfInfo: {
		        	qq:"",
		        	weixin: ""
		        }
			}
		},
		props:{
			userInfo: {
				type: Object,
				required: true,
				default: function(){
					return {}
				}
			}
		},
		methods:{
			gotoTop(acceleration,stime){
			   acceleration = acceleration || 0.1;
			   stime = stime || 100;
			   let x1 = 0;
			   let y1 = 0;
			   let x2 = 0;
			   let y2 = 0;
			   let x3 = 0;
			   let y3 = 0; 
			   if (document.documentElement) {
			       x1 = document.documentElement.scrollLeft || 0;
			       y1 = document.documentElement.scrollTop || 0;
			   }
			   if (document.body) {
			       x2 = document.body.scrollLeft || 0;
			       y2 = document.body.scrollTop || 0;
			   }
			   x3 = window.scrollX || 0;
			   y3 = window.scrollY || 0;
			 
			   // 滚动条到页面顶部的水平距离
			   let x = Math.max(x1, Math.max(x2, x3));
			   // 滚动条到页面顶部的垂直距离
			   let y = Math.max(y1, Math.max(y2, y3));
			 
			   // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
			   let speeding = 1 + acceleration;
			   window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
			 
			   // 如果距离不为零, 继续调用函数
			   if(x > 0 || y > 0) {
			       window.setTimeout(this.gotoTop(acceleration,stime), stime);
			   }
			},
			check(view){
				window.open(`myOrder.html#${view}`);
			},
			kf(){
		        let qq = this.kfInfo.qq ;
		        window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
	      	}
		},
		mounted(){
			this.$nextTick(()=>{
				
			})
		}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		position: fixed;
		right: 0px;
		top: 0px;
		bottom: 0px;
		z-index: 100;
		margin: auto;
		width: 40px;
		height: 100%;
		background-color: rgba(0,0,0,0.8);
	}
	.container{
		height: 100%;
		color: #fff;
		text-align: center;
		position: relative;
		top: 18%;
		.single-col{
			width: 20px;
		}
		.single-col,dt,dd{
			margin: 0px auto;
		}
		img{
			margin-bottom: 12px;
		}
		ul{
			margin:0px 6px ;
			li{
				cursor: pointer;
				padding: 16px 2px;
				border-bottom: 1px solid #555;
			}
		}
		.back-top{
			width: 40px;
			height: 110px;
			padding: 10px 0px;
			margin-top: 30px;
			cursor: pointer;
		}
	}
	.portrait{
		img{
			border-radius: 50%;
		}
	}
	.code-box{
		position: relative;
	}
	.code-box:hover .code-img{
		display: block;
	}
	.code-img{
		display: none;
		position: absolute;
		bottom: 0px;
		right: 40px;
		padding: 10px;
		border: 1px solid #c71724;
		color: #000;
		dt{
			margin-bottom: 10px;
		}
		.android,.ios{
			width: 80px;
			height: 80px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		.android{
			background-image: url(../../static/img/common/appCode.png);
		}
		.ios{
			background-image: url(../../static/img/common/appCode.png);
		}
	}
</style>