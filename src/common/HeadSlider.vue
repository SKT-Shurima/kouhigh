<template>
	<div class="bg-f7 head-wrap">
		<dl class='head-box center-box'>
			<dt class='color-6' v-if='Object.keys(userInfo).length'>
				Hi,{{userInfo.nickname}}
			</dt>
			<dt v-else>
				<a href="login.html" class='color-6'>[登录]</a>
				<a href="reg.html" class='color-6'>[免费注册]</a>
			</dt>
			<dd>
				<div class="nav-item" v-show='userNav'><a href="personCenter.html" class='color-6'>我的订单</a><em class='color-9'>|</em></div>
				<div class='nav-item col-wrap' v-show='userNav'  @mouseenter='followBol=true' @mouseleave='followBol=false'>
					<a href="javascript:void(0)" class='color-6'>我的收藏<i class='icon icon-down'></i></a><em class='color-9'>|</em>
					<div class='border-f0 col-list' @mouseenter='followBol=true' @mouseleave='followBol=false' v-show='followBol'>
						<div v-if='collection.length'>
							<ul>
								<li v-for='(item,index) in collection' :key='index'>
									<dl>
										<dt>
											<img src="itme.cover" class='good-img'>
										</dt>
										<dd>
											<div class='ellipsis-1 color-6 good-info'>{{item.name}}</div>
											<div class='good-price'>
												<span class='color-primary'>${{item.price}}</span>
												<i class='icon'></i>
											</div>
										</dd>
									</dl>
								</li>
							</ul>
							<div class='check-col'>
								<a href="" class='color-6'>
									查看全部收藏<i class='icon icon-left' style="transform: rotateZ(-90deg)"></i>
								</a>
							</div>
						</div>
						<div class='no-col' v-else>
							暂无收藏商品
						</div>
					</div>
				</div>
				<div class='nav-item col-wrap'  @mouseenter='serviceBol=true' @mouseleave='serviceBol=false'>
					<a href="javascript:void(0)" class='color-6'>客户服务<i class='icon icon-down'></i></a><em class='color-9'>|</em>
					<ul class='border-f0 service-list' @mouseenter='serviceBol=true' @mouseleave='serviceBol=false' v-show='serviceBol'>
						<li><a href="" class='color-6'>销售客服</a></li>
						<li><a href="" class='color-6'>购买建议</a></li>
					</ul>
				</div>
				<div class='nav-item col-wrap'  @mouseenter='codeBol=true' @mouseleave='codeBol=false'>
					<a href="javascript:void(0)" class='color-6'><i class='icon icon-phone'></i>手机Kouhigh</a><em class='color-9'>|</em>
					<div class='border-f0 appcode-wrap' @mouseenter='codeBol=true' @mouseleave='codeBol=false' v-show='codeBol'>
						<div class='app-code'></div>
						<div class='color-6' style="line-height:20px;font-size: 12px;">扫一扫下载 KouHigh App</div>
					</div>
				</div>
			</dd>
		</dl>
	</div>
</template>
<script type="text/javascript">
	import {postReq} from '../assets/js/api';
	export default {
		data(){
			return{
				collection: [],
				followBol: false,
				serviceBol: false,
				codeBol: false
			}
		},
		props:{
			userNav: {
				type: Boolean,
				default: true
			},
			userInfo: {
				type: Object,
				required: true,
				default: function(){
					return {}
				}
			}
		},
		methods:{
			getCol(){
				let params = {
					token: getCookie('token'),
					page: 1
				}
				postReq('/customer/getCollections',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.collection = content.collection;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let token = getCookie('token');
				if (token) {
					this.getCol();
				}
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.head-wrap{
		position: relative;
	    z-index: 100;
		height: 30px;
		line-height: 30px;
	    border-bottom: 1px solid #eee;
	    font-size: 14px;
	}
	.head-box{
		dt{
			float: left;
		}
		dd{
			float: right;
			a{
				padding: 0px 10px;
			}
		}
	}
	.nav-item{
		float: left;
		font-size: 14px;
	}
	.icon-down{
		width: 10px;
		height: 10px;
		margin-left: 6px;
		background-image: url(../../static/img/common/down.png);
		transition: all .3s;
	}
	.icon-phone{
		background-image: url(../../static/img/common/phone.png);
	}
	.col-wrap{
		position: relative;
	}
	.col-wrap:hover{
		background-color: #fff;
	}
	.col-wrap:hover .icon-down{
		transform: rotateZ(-180deg);
	}
	.col-list,.service-list,.appcode-wrap{
		position: absolute;
		left: 0px;
		z-index: 10;
		overflow-x: hidden;
		overflow-y: scroll;
		background-color: #fff;
	}
	.col-list{
		width: 204px;
		max-height: 500px;
		dl{
			overflow: hidden;
			padding: 10px;
		}
		dt{
			float: left;
			width: 36px;
			height: 36px;
		}
		dd{
			float: left;
		    margin-left: 10px;
		    width: 118px;
		    line-height: 20px;
		}
		div{
			height: 30px;
		}
	}
	.check-col{
		line-height: 40px;
		text-align: right;
		margin: 0px 10px;
		border-top: 1px solid #f0f0f0;
	}
	.good-price{
		overflow: hidden;
		span{
			float: left;
		}
		i{
			float: right;
		}
	}
	.service-list{
		width: 80px;
		line-height: 30px;
		height: 60px;
		text-align: center;
		overflow: hidden;
	}
	.no-col{
		padding: 0px 10px;
		line-height: 40px;
	}
	.appcode-wrap{
		width: 166px;
		padding: 10px;
		overflow: hidden;
		text-align: center;
	}
	.app-code{
		width: 110px;
		height: 110px;
		margin: 0px auto;
		background: url(../../static/img/common/appCode.png) no-repeat;
		background-size: cover;
	}
</style>