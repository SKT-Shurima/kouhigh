<template>
	<div class="wrap">
		<div class="color-6 bg-f5 border-c opera-title">
		    <div class="check-all-icon">
	    		<i class='icon' :class="allCheck?'icon-cart-checked':'icon-cart-nocheck'" @click='allCheck=!allCheck;'></i>
		    </div>
			<ul class="top-nav">
				<li class="title-col" style="text-align:left;">全选</li>
				<li class="info-col">商品信息</li>
				<li class="normal-col">单价</li>
				<li class="normal-col">数量</li>
				<li class="normal-col">总金额</li>
				<li class="normal-col">操作</li>
			</ul>
		</div>
		<ul class="shop-list" v-if='shopList.length&&checkList.length'  >
			<li v-for='(item,sellerIndex) in shopList' :key='sellerIndex'>
				<div class="color-6 bg-f5 border-c shop-title">
				    <i class='icon' :class="checkList[sellerIndex].sellerBol?'icon-cart-checked':'icon-cart-nocheck'" @click='checkShop(sellerIndex)'></i>
				   	<span v-text='item.shop_name'></span>
				</div>
				<ul class="goods-list">
					<li class='border-c' :class="{'check-good':checkList[sellerIndex].goods[goodsIndex].goodsBol}" v-for='(goodItem,goodsIndex) in item.goods' :key='goodItem.goods_id'>
						<div class="check-item-icon">
					    	<i class='icon' :class="checkList[sellerIndex].goods[goodsIndex].goodsBol?'icon-cart-checked':'icon-cart-nocheck'" @click='checkGood(sellerIndex,goodsIndex)'></i>
					    </div>
					    <div class="goods-info">
					    	<dl class="goods-msg">
								<dt class="title-col">
									<a href="">
										<img :src="goodItem.cover">
									</a>
								</dt>
								<dd class="info-col">
									<div class="ellipsis-2 goods-name" v-text='goodItem.name'></div>
									<div class="color-6">
										<span style="margin-right:10px;">规格:{{goodItem.option_name}}</span>
									</div>
								</dd>
							</dl>
							<div class='normal-col'>
								<dl class="v-middle" v-if='goodItem.market_price' style="height: 20px;">
									<dt class='color-6' style="text-decoration: line-through;">
										${{goodItem.market_price}}
									</dt>
									<dd>${{goodItem.price}}</dd>
								</dl>
								<dl class="v-middle" v-else style="height: 20px;">
									<dd>${{goodItem.price}}</dd>
								</dl>
							</div>
							<div style='padding-top:30px;' class="normal-col">
								<div class="border-c num-btn">
									<button @click='editNum(goodItem,0)' class='bg-f5'><i class="el-icon-minus"></i></button>
										<input type="text" v-model='goodItem.quantity' @change='editNum(goodItem)'>
									<button @click='editNum(goodItem,1)' class='bg-f5'><i class="el-icon-plus"></i></button>
								</div>
							</div>
							<div class="color-primary normal-col total-amount">
								${{(goodItem.price * goodItem.quantity)}}
							</div>
							<div class="normal-col">
								<dl class="v-middle">
									<dt>
										<button @click='colAPI(goodItem.goods_id)'>移入收藏夹</button>
									</dt>
									<dd>
										<button @click='delAPI(goodItem.cart_id)'>删除</button>
									</dd>
								</dl>
							</div>
					    </div>
					</li>
				</ul>
			</li>
		</ul>
		<div class="color-6 bg-f5 border-c opera-title" style="margin-top:20px;padding-right: 0px;">
			<div class="check-all-icon">
	    		<i class='icon' :class="allCheck?'icon-cart-checked':'icon-cart-nocheck'" @click='allCheck=!allCheck;'></i>
		    </div>
			<ul class="foot-opera">
				<li>全选</li>
				<li style="cursor: pointer;" @click="delAll">删除</li>
				<li style="cursor: pointer;" @click="colAll">移入收藏夹</li>
			</ul>
			<div class="shop-info">
				<div class="check-num">
					<span>已选商品<em class='color-primary'>{{checkNum}}</em>件</span>
				</div>
				<div class="check-amount">
					<span>合计（不含运费）：<em class='color-primary'>${{totalPrice}}</em></span>
				</div>
				<div class="bg-primary settlement" @click='settlement'>
					结算
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {MessageBox} from  'element-ui';
	export default{
		data(){
			return{
				shopList: [],
				totalPrice: 0,
				checkList: [],
				allCheck: false,
				checkNum: 0,
			}
		},
		watch:{
			allCheck(){
				if (this.allCheck) {
					for(let i = 0;i<this.checkList.length;i++){
						this.checkList[i].sellerBol = true;
						for(let j =0;j<this.checkList[i].goods.length;j++){
							this.checkList[i].goods[j].goodsBol = true;
						}
					}
				}else{
					let totalCheck = 0;
					let totalIndex = 0;
					for(let i = 0 ; i<this.checkList.length;i++){
						for(let j =0;j<this.checkList[i].goods.length;j++){
							totalIndex++;
							if (this.checkList[i].goods[j].goodsBol) {
								totalCheck++;
							}
						}
					}
					if (totalIndex===totalCheck) {
						for(let i = 0;i<this.checkList.length;i++){
							this.checkList[i].sellerBol = false;
							for(let j =0;j<this.checkList[i].goods.length;j++){
								this.checkList[i].goods[j].goodsBol = false ;
							}
						}
					}
				}
				this.countTotal();
			}
		},
		methods:{
			checkShop(sellerIndex){
				this.checkList[sellerIndex].sellerBol = !this.checkList[sellerIndex].sellerBol;
				let bol;
				if (this.checkList[sellerIndex].sellerBol) {
					bol = true;
				}else{
					bol = false;
				}
				for (let i = 0; i < this.checkList[sellerIndex].goods.length; i++) {
					this.checkList[sellerIndex].goods[i].goodsBol = bol;
				}
				this.checkAll();
			},
			checkGood(sellerIndex,goodsIndex){
				let bol = this.checkList[sellerIndex].goods[goodsIndex].goodsBol;
				this.checkList[sellerIndex].goods[goodsIndex].goodsBol = !bol;
				let checkGoods = 0,goods = this.checkList[sellerIndex].goods;
				for (let i = 0; i < goods.length; i++) {
					if (goods[i].goodsBol) {
						checkGoods++;
					}
				}
				if (checkGoods==goods.length) {
					this.checkList[sellerIndex].sellerBol = true;
				}
				this.checkAll();
			},
			checkAll(){
				let checkList = this.checkList,all = 0;
				for (let i = 0; i < checkList.length; i++) {
					if (checkList[i].sellerBol) {
						all++;
					}
				}
				if (all== checkList.length) {
					this.allCheck = true;
				}else{
					this.allCheck = false;
				}
				this.countTotal();
			},
			countTotal(){
				// 查询勾选项
				let checkList = this.checkList,price=0,checkNum=0;
				for (let i = 0; i < checkList.length; i++) {
					let goods = this.shopList[i].goods;
					for(let j = 0;j < goods.length;j++){
						if (checkList[i].goods[j].goodsBol) {
							checkNum++;
							price+= (goods[j].price-0)*(goods[j].quantity-0);
						}
					}
				}
				this.checkNum = checkNum;
				this.totalPrice = price;
			},
			initCheckList(arr){
			 	this.checkList = new Array ;
			 	for(let i = 0 ;i<arr.length; i++){
			 		let sellerObj = {
			 			sellerBol: false,
			 			goods: []
			 		};
			 		for(let j = 0; j<arr[i].goods.length;j++){
			 			let goodsObj = {
			 				goodsBol: false
			 			}
			 			sellerObj.goods.push(goodsObj);
			 		}
			 		this.checkList.push(sellerObj);
			 	}
		 	},
		 	initList(mask){
			 	let params = {
					token: getCookie('token')
				};
				postReq('/cart/getCarts',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0) {
						this.shopList = content.cart;
						//  刷新初始化选择列表
						if(mask){
							this.initCheckList(this.shopList);
						}
						this.countTotal();
					}else{
						errorInfo(errcode,message);
					}
				});
			},
			editNum(item,mask){
				if(mask===1){
					item.quantity++;
				}else if(mask===0){
					item.quantity--;
				}
				if ((item.quantity-0)>(item.max_once_buy-0)) {
					item.quantity = item.max_once_buy ;
				}else if ((item.quantity-0)<1) {
					item.quantity = 1 ;
				}
				let data = {
					cart_id: item.cart_id,
					quantity: item.quantity
				}
				let arr = [];
				arr.push(data);
				let params = {
					token: getCookie('token'),
					data: JSON.stringify(arr),
				}
				postReq('/cart/editCarts',params).then(res=>{
					let {errcode,message,content} = res;
			 		if(errcode==0) {
			 			this.initList(false);
					}else{
						errorInfo(errcode,message);
					}
				})
			},
			delAll(){
				let checkList = this.checkList,ids=[];
				for (let i = 0; i < checkList.length; i++) {
					let goods = checkList[i].goods;
					for (let j = 0; j < goods.length; j++) {
						if (goods[j].goodsBol) {
							ids.push(goods[j].cart_id);
						}
					}
				}
				ids.join(',');
				this.delAPI(ids);
			},
			delAPI(ids){
				MessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
	          		confirmButtonText: '确定',
	          		cancelButtonText: '取消',
	          		type: 'warning'
	        	}).then(() => {
	        		let params  ={
	        			token: getCookie('token'),
	        			cart_ids: ids
	        		}
		         	postReq('/cart/delCarts',params).then(res=>{
			 			let {errcode,message,content} = res;
			 			if(errcode == 0) {
			 				window.location.reload();
						}else{
							errorInfo(errcode,message);
					}
			 	})
	        	}).catch(() => {});
			},
			colAll(){
				let checkList = this.checkList,ids=[];
				for (let i = 0; i < checkList.length; i++) {
					let goods = checkList[i].goods;
					for (let j = 0; j < goods.length; j++) {
						if (goods[j].goodsBol) {
							ids.push(goods[j].goods_id);
						}
					}
				}
				ids.join(',');
				this.colAPI(ids);
			},
		 	colAPI(id){
		 		let params = {
		 			token: getCookie('token'),
		 			goods_id: id
		 		}
		 		postReq('/goods/collection',params).then(res=>{
		 			let {errcode,message,content} = res ;
					if(errcode == 0) {
						window.location.reload();
					}else{						
						errorInfo(errcode,message) ;
					}
		 		})
		 	},
		 	settlement(){
			 	let totalCheck = 0 ;
			 	let params = {
			 		token: getCookie('token'),
			 		data: new Array
			 	}
			 	for(let i = 0 ;i <this.checkList.length;i++){
			 		let checkIndex = 0 ;
			 		let sellerObj = {
			 			shop_id: this.shopList[i].shop_id,
			 			goods: new Array 
			 		};
			 		for(let j = 0 ; j<this.checkList[i].goods.length;j++){
			 			if (this.checkList[i].goods[j].goodsBol) {
			 				checkIndex++;
			 				totalCheck++;
			 				let goodObj = {
			 					cart_id: this.shopList[i].goods[j].cart_id,
								goods_id: this.shopList[i].goods[j].goods_id,
								option_id: this.shopList[i].goods[j].option_id,
								quantity: this.shopList[i].goods[j].quantity + ''
			 				}
			 				sellerObj.goods.push(goodObj);
			 			}
			 		}
			 		if (checkIndex) {
			 			params.data.push(sellerObj);
			 		}
		 		}
		 		if (totalCheck) {
			 		params.data = JSON.stringify(params.data);
				 	postReq('/order/balance',params).then(res=>{
				 		let {errcode,message,content} = res ;
						if(errcode==0) {
							
						}else{
							errorInfo(errcode,message);
						}
				 	})
			 	}else{
			 		MessageBox.alert('请选择商品', '提示', {
			          	confirmButtonText: '确定'
				    });
			 	}
		 	}
		},
		created(){
			this.$nextTick(()=>{
				this.initList(true);
			})
		}
	}
</script>
<style lang='scss' scoped>
	.title-col,.info-col,.normal-col{
		float: left;
	}
	.title-col{
		width: 90px;
		text-align: left;
	}
	.info-col{
		width: 264px;
		margin-left: 20px;
		margin-right: 44px;
	}
	.normal-col{
		width: 150px;
	}
	.check-all-icon,.check-item-icon{
		float: left;
		width: 40px;
		text-align: center;
	}
	.check-all-icon{
		height: 40px;
	}
	.check-item-icon{
		height: 130px;
		line-height: 130px;	
	}
	.opera-title,.shop-title{
		overflow: hidden;
		height: 40px;
		line-height: 40px;
	}
	.shop-title{
		.icon{
			margin: 0px 12px;
		}
	}
	.top-nav,.foot-opera{
		overflow: hidden;
	}
	.top-nav{
		li{
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
	.foot-opera{
		float: left;
		width: 558px;
		li{
			float: left;
			height: 40px;
			line-height: 40px;
			margin-right: 42px;
		}
	}
	.shop-info{
		float: left;
		width: 480px;
		height: 40px;
		overflow: hidden;
		span,em{
			line-height: 40px;
			vertical-align: top;
		}
		em{
			padding:0px 4px;
			font-size: 18px;
			font-weight: 600;
		}
	}
	.check-num{
		float: left;
		width: 120px;
	}
	.check-amount{
		float: left;
		width: 230px;
	}
	.settlement{
		float: left;
		width: 130px;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		font-weight: 600;
		text-align: center;
		cursor: pointer;
		color: #fff;
	}
	.shop-list{
		margin-top: 20px;
		& > li{
			margin-bottom: 20px;
		}
	}
	.shop-name{
		width: 100%;
		height: 40px;
		padding-top: 10px;
		button{
			border-radius: 10px;
			background-color: #fff;
			outline: none;
		}
	}
	.goods-list{
		li{
			overflow: hidden;
			border-top: none;
		}
	}
	.goods-info{
		float: left;
		overflow: hidden;
		padding: 20px 18px 20px 0px;
	}
	.check-good{
		background-color: #fff0f1;
	}
	.goods-msg{
		float: left;
		width: 420px;
		overflow: hidden;
		dt{
			float: left;
			width: 90px;
			height: 90px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
		dd{
			float: left;
		}
	}
	.goods-name{
		height: 36px;
		line-height: 18px;
		margin-bottom: 18px;
	}
	.normal-col{
		height: 90px;
		text-align: center;
		position: relative;
		.v-middle{
			position: absolute;
			top: 0px;
			bottom: 0px;
			right: 0px;
			left: 0px;
			height: 40px;
			display: inline-block;
			margin: auto;
			line-height: 18px;
			button{
				background-color: transparent;
				border: none;
				outline: none;
			}
		}
	}
	.num-btn{
		display: inline-block;
		overflow: hidden;
		width: 86px;
		height: 24px;
		button{
			float: left;
			width: 22px;
			height: 22px;
			outline: none;
			border: none;
		}
		input{
			float: left;
			width: 40px;
			height: 22px;
			text-align: center;
			border-left: 1px solid  #ccc;
			border-right: 1px solid #ccc;
			border-top: none;
			border-bottom: none;
		}
	}
	.total-amount{
		line-height: 90px;
		font-weight: 600;
	}
	.icon-cart-nocheck,.icon-cart-checked{
		cursor: pointer;
	}
	.icon-cart-nocheck{
		background-image: url(../../../static/img/personCenter/no-check.png);
	}
	.icon-cart-checked{
		background-image: url(../../../static/img/personCenter/checked.png);
	}
</style>