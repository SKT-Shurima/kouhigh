<template>
	<div>
		<div class="search-wrap center-box">
			<div class="logo">
				<a href="index.html"></a>
			</div>
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
					<img src="" height="14" width="14" style="vertical-align:-2px;">
					我的购物车
				</a>
			 </div> 
		</div>
	</div>
</template>
<script>
	import {postReq} from '../assets/js/api';
	import {errorRes} from '../assets/js/check';
	export default{
		data(){
			return{
				cartBol: false,
				searchWord: '',
				hots: []
			}
		},
		methods:{
			getHots(){
				postReq('/search/getHotSearch',{}).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.hots = content.hot;
					}else {
						errorRes(errcode,message);
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
			background-color: #f24450;
		}
	}
	.cart-box{
		position: relative;
		.no-cart,.shop-list{
			overflow: hidden;
			width: 240px;
			padding: 0px 14px;
			background-color: #fff;
		}
		.no-cart{
			position: absolute;
			right: -1px;
			top: 8px;
			height: 56px;
			line-height: 56px;
			text-align: center;
		}
	}
	.shop-list-box{
		position: absolute;
		top: 8px;
		right: -1px;
		overflow-y: scroll;
		z-index: 100;
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
			height: 80px;
			padding: 10px 0px;
			border-bottom: 1px solid #ccc;
		}
		.goods-info{
			width: 100%;
			height: 80px;
			overflow: hidden;
			dt{
				float: left;
				width: 60px;
				height: 60px;
				img{
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
			}
			dd{
				float: left;
				width: 136px;
				height: 60px;
				margin-left: 10px;
				color: #000;
			}
		}
		.show-info{
			line-height: 18px;
			height: 36px;
			overflow: hidden;
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
</style>