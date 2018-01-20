<template>
	<div>
		<div class="search-wrap center-box">
			<div id='logo' onclick='_back()'></div>
			<div class="search-box">
				<div class="border-primary search-form">
					<form id="searchForm" name="searchForm" method="get" action="relatedGoods.html">
						<input type="text" name="keyword"  autocomplete="off" id="key" accesskey="s" class="search-text" v-model='searchWord'>
						<input type='submit' class="bg-primary search-btn" value="搜索" />
                    </form>
				</div>
				<div class="hot-words">
					<span class='color-primary' style="padding-left: 10px;">大家都在搜</span>
					<a href='' class='color-6' v-for='item in hots'>{{item}}</a>
				</div>
			</div>
			 <div class="border-primary color-primary shopping-cart" @mouseenter='cartBol=true' @mouseleave='cartBol=false'>
				<a href="">
					<i class="icon icon-shopping"></i>
					我的购物车
					<span  class='bg-primary cart-btn'>{{cartGoods.length|num_filter}}</span>
				</a>
				<div class="cart-box border-c" v-show='cartBol' @mouseenter='cartBol=true' @mouseleave='cartBol=false'>
				    <div class="shop-list-box" v-if='cartGoods.length'>
				    	<ul class="shop-list">
							<li v-for='(item,index) in cartGoods' :key='index'>
								<dl class="goods-info">
									<dt>
										<a href="goodsDetail.html?goods_id=${item.goods_id}">
											<img :src="item.cover" class='good-img'>
										</a>
									</dt>
									<dd>
										<div class="ellipsis-1 color-6 show-info" v-text='item.name'></div>
										<div class="sell-info">
											<span>${{item.price}}</span><i class='icon icon-remove' @click="remove(item.cart_id)"></i>
										</div>
									</dd>
								</dl>
							</li>
						</ul>
						<dl class="check-cart">
							<dt style="overflow: hidden;padding:6px 10px;">
								<span style="float:left;" class='color-6'>共<i class='color-primary' v-text='cartGoods.length'></i>件商品</span>
								<em style="float:right;">合计<i class='color-primary'>${{cartTotal}}</i></em>
							</dt>
							<dd>
								<button class='bg-y account-btn'>
									<a href="myOrder.html#vip3">去购物车结算</a>
								</button>
							</dd>
						</dl>
				    </div>
					<div class="no-cart" v-else>
				   		暂无商品
				   	</div>
				</div>
			 </div> 
		</div>
	</div>
</template>
<script>
	import {postReq} from '../assets/js/api';
	import {errorInfo} from '../assets/js/check';
	import {num_filter} from '../assets/js/filter';
	import {MessageBox} from  'element-ui';
	export default{
		data(){
			return{
				cartBol: false,
				searchWord: '',
				hots: []
			}
		},
		filters: {
			num_filter
		},
		props: {
			cartGoods: {
				type: Array,
				required: true,
				default: function(){
					return []
				}
			},
			cartTotal: {
				type: Number,
				default: 0
			}
		},
		methods:{
			remove(id){
				MessageBox.confirm('是否删除该商品?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		            let params ={
						token: getCookie('token'),
						cart_ids: id
					}
					postReq('/cart/delCarts',params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode == 0){
							this.$parent.getCart();
						}else {
							errorInfo(errcode,message);
						}
					})
		        }).catch(() => {});
			},
			getHots(){
				postReq('/search/getHotSearch',{}).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.hots = content.hot;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getHots();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.search-wrap{
		height: 130px;
	}
	.search-box{
		width: 520px;
		float: left;
		margin-top: 32px;
		margin-left: 120px;
	}
	.search-form{
	    height: 40px;
	    width: 492px;
	}
	 #searchForm{
    	overflow: hidden;
    	.search-text{
			float: left;
			font-size: 14px;
			padding: 5px;
			width: 412px;
			height: 38px;
			line-height: 38px;
			border: none;
			outline: none;
		}
		.search-btn{
			float: left;
		    color: #fff;
		    font-size: 14px;
		    font-weight: 700;
		    width: 78px;
		    height: 38px;
		    border: none;
		    margin: 0px;
		}
    }
	.hot-words{
		margin: 0px;
		padding: 6px 0px;
		overflow: hidden;
		a,span{
			float: left;
			padding-left: 20px;
			cursor: pointer;
		}
	}
	.icon-shopping{
		width: 20px;
		height: 20px;
		vertical-align: -5px;
		background-image: url(../../static/img/common/shopping.png);
	}
	.icon-remove{
		float: right;
		width: 20px;
		height: 20px;
		cursor: pointer;
		background-image: url(../../static/img/common/remove.png);
	}
	.shopping-cart{
		position: relative;
		width: 150px;
		height: 36px;
		margin-top: 32px;
		padding-top: 6px;
		text-align: center;
		float: right;
		.cart-btn{
			vertical-align: super;
		    border-radius: 8px;
		    padding: 0px 4px;
			color: #fff;
		}
	}
	.cart-box{
		position: relative;
		width: 210px;
		max-height: 300px;
		overflow-x: hidden;
		overflow-y: scroll;
	    top: 5px;
	    left: -1px;
	    background: #fff;
		.no-cart,.shop-list{
			overflow: hidden;
			width: 200px;
			padding: 0px 10px;
			background-color: #fff;
		}
		.no-cart{
			height: 56px;
			line-height: 56px;
			text-align: center;
		}
	}
	.shop-list-box{
	    padding-bottom: 20px;
		.check-cart{
			height: 72px;
			line-height: 30px;
			overflow: hidden;
			background-color: #fff;
		}
	}
	.shop-list{
		li{
			width: 100%;
			height: 60px;
			padding: 10px 0px;
			border-bottom: 1px solid #ccc;
		}
		.goods-info{
			overflow: hidden;
			dt{
				float: left;
				width: 36px;
				height: 36px;
				cursor: pointer;
			}
			dd{
				float: left;
				width: 132px;
				margin-left: 10px;
			}
		}
		.show-info{
			line-height: 14px;
			height: 14px;
			font-size: 14px;
			text-align: left;
		}
		.sell-info{
			overflow: hidden;
			margin-top: 6px;
			span{
				float: left;
			}
			em{
				float: right;
			}
			em:hover{
				cursor: pointer;
				color: #ffa4a3;
			}
		}
	}
	.account-btn{
		display: inline-block;
		width: 110px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		a{
			color: #fff;
		}
	}
</style>