<template>
	<div style='margin-top:20px;' v-if='Object.keys(goods).length'>
		<div class="center-box" style="height:532px;">
			<dl class="goods-info">
				<dt>
					<v-magnifying-glass :currentImg='goods.cover' :col='goods.collection'></v-magnifying-glass>
				</dt>
				<dd class='imgs-box'>
					<div class='bg-f5 left-btn'  @click='scrollIndex?--scrollIndex:""'>
						<button :class='{"btn-disable":!scrollIndex}'>
							<i class='el-icon-caret-left color-9'></i>
						</button>
					</div>
					<div class="img-list">
						<ul :style='{transform: "translateX("+(-120*scrollIndex)+"px)",width:76*goods.images.length+"px"}'>
							<li v-for='(item,index) in goods.images' @click='imgIndex=index;goods.cover=item;' :class='{"is-check":imgIndex===index}'> 
								<img :src="item">
							</li>
						</ul>
					</div>
					<div class='bg-f5 right-btn' @click='goods.images.length-5>scrollIndex?++scrollIndex:""'>
						<button :class='{"btn-disable":(goods.images.length-5<=scrollIndex)}'>
							<i class='el-icon-caret-right color-9'></i>
						</button>
					</div>
				</dd>
			</dl>
			<div class="shop-info">
				<div class="color-3 title">{{goods.name}}</div>
				<!-- 倒计时相关 -->
				<div class='special-box' v-if='false' :class='payBol===false&&addBol===true?"start-bg":payBol&&addBol?"end-bg":"over-bg"'>
					<img src="../../../static/detailImg/snapup.png" height="32" width="109">
					<span v-show='special.date_start*1000>nowTime'>此商品<i>{{(special.date_start*1000-nowTime)|countdown}}</i>后开始抢购，请提前加入购物车！</span>
					<span v-show='special.date_start*1000<=nowTime&&special.date_end*1000>=nowTime'>此商品正在参加抢购，<i>{{(special.date_end*1000-nowTime)|countdown}}</i>后结束，请尽快购买！</span>
					<span v-show='special.date_end*1000<nowTime'>本次抢购已结束，期待下次！</span>
				</div>
				<dl>
					<dt class="bg-f9 price-info">
						<div style="float: left; width: 420px;">
							<el-row>
								<el-col :span='4' class='color-6'>原价</el-col>
								<el-col :span='20' style='text-decoration: line-through;'>
									${{goods.market_price}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='4' class='color-6' style='padding-top: 16px;'>KouHigh价</el-col>
								<el-col :span='20' class='color-primary'>
									$<span style="font-size:30px;margin-left:4px;">{{salePrice}}</span>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='4' class='color-6'>会员</el-col>
								<el-col :span='20'>
									<ul>
										<li>可使用&nbsp;{{goods.integral}}&nbsp;积分</li>
									</ul>
								</el-col>
							</el-row>
						</div>
						<div class="total-eval">
							<div style="margin-bottom: 16px;">
								<span class='color-6'>销量</span>
								<em class='color-primary'>{{goods.sale_count}}</em>
							</div>
							<div>
								<i class='icon icon-view'></i>
								<em class='color-primary'>{{goods.click_count}}</em>
							</div>
						</div>
					</dt>
					<dd class="choose-info">
						<el-row v-for='(specsItem,specsIndex) in specs' :key='specsIndex'>
							<el-col :span='4'>{{specsItem.name}}</el-col>
							<el-col :span='20' class='choose-btn'>
								<button class='btn-base' :class='{"icon-checked": specsItem.checkIndex==index}' @click='specsItem.checkIndex=index;' v-for='(item,index) in specsItem.items' :key='item.id'>{{item.name}}</button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span='4'>数量</el-col>
							<el-col :span='20' class='choose-num'>
								<button class='bg-f5 border' @click='changeNum(0)'><i class="el-icon-minus"></i></button>
									<input type="text" name="" v-model='numInput'>
								<button class='bg-f5' @click='changeNum(1)'><i class="el-icon-plus"></i></button>
								<em style="line-height:28px;margin-left:10px;">件</em>
								<span style="line-height: 28px;margin-left: 20px;">(库存{{stock}}件)</span>
							</el-col>
						</el-row>
					</dd>
					<dd class='buy-btn'>
						<el-button type='primary'  @click='shopping(0)'>立即购买</el-button>
						<el-button type='text' style='background-color: #ffbd54;' @click='shopping(1)'>加入购物车</el-button>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
	import vMagnifyingGlass from './MagnifyingGlass'
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {MessageBox} from  'element-ui';
	export default{
		data(){
			return {
				scrollIndex: 0,
				imgIndex: 0,
				numInput: 1,
				stock: 0,
				salePrice: 0,
				option_id: ''
			}
		},
		props:{
			goods: {
				type: Object,
				default: function() {
		          return {};
		        }
			},
			specs: {
				type: Array,
				default: function() {
		          return [];
		        }
			},
			comment: {
				type: Object,
				default: function() {
		          return {};
		        }
			}
		},
		components:{
			vMagnifyingGlass
		},
		watch: {
			//  监测当前展示图片
			scrollIndex(){
				if (this.scrollIndex<0) {
					this.scrollIndex = 0;
				}else if (this.scrollIndex>this.goods.images.length-1) {
					this.scrollIndex = this.goods.images.length-1 ;
				} 
				this.currentImg = this.goods.images[this.scrollIndex] ;
			},
			//  监测选中类型值的变化 更改库存信息
			specs: {
				handler(){
					let arr = this.specs;
					let specs= '';
					for(let i = 0;i<arr.length;i++){
						let index = arr[i].checkIndex;
						specs += arr[i].items[index].id +"_";
					}
					specs = specs.substr(0,specs.length-1);
					let options  = this.goods.options;
					for(let j = 0 ; j< options.length;j++){
						if (options[j].specs === specs) {
							this.stock = options[j].stock ;
							this.salePrice = options[j].price ;
							this.option_id = options[j].id ;
						}
					}
				},
				deep: true
			},
			 //  监测数量框的数据变化
			 numInput(){
			 	let reg = /^\d+$/g;
			 	if (!reg.test(this.numInput)) {
			 		this.numInput = 1 ;
			 	}else if (this.numInput-0>this.stock-0) {
			 		this.numInput = this.stock;
			 	}
			 },
			 // 监测库存量的数据变化
			 stock(){
			 	if (this.numInput-0>this.stock-0) {
			 		this.numInput = this.stock;
			 	}
			 }
			},
		methods: {
			changeNum(mask){
				if (mask) {
					this.numInput++;
					if (this.numInput>this.stock) {
						this.numInput = this.stock;
					}
				}else {
					this.numInput-- ;
					if (this.numInput<1) {
						this.numInput=1;
					}
				}
			},
			shopping(type){
				let token = getCookie('token');
				if (!token) {
					errorInfo(-99,"请先登录");
					return false;
				}
				type?this.addShopCar():this.settlement();
			},
			addShopCar(){
				let params = {
					token: getCookie('token'),
					goods_id: this.goods.goods_id,
					option_id: this.option_id,
					quantity: this.numInput
				}
				postReq('/cart/addCart',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						MessageBox.alert(message, '提示', {
				            confirmButtonText: '确定',
				            callback: action => {
				                window.location.reload();
				            }
				        });
					}else {
						errorInfo(errcode,message);
					}
				})
			},
			settlement(){
				let params = {
			 		token: getCookie('token'),
			 		data: [{
			 			shop_id: this.goods.shop_id,
			 			goods: [{
		 					goods_id: this.goods.goods_id,
							option_id: this.option_id,
							quantity: this.numInput
		 				}]
			 		}]
			 	}
			 	params.data = JSON.stringify(params.data);
			 	postReq('/order/balance',params).then(res=>{
			 		let {errcode,message,content} = res ;
					if(errcode==0) {
						console.log(1)
					}else{
						errorInfo(errcode,message) ;
					}
			 	})
			}		
		},
		created() {
			this.$nextTick(()=>{
	        })
		}
	}
</script>

<style lang='scss' scoped>
  	.goods-info{
  		float: left;
		width: 420px;
		dt{
			width: 100%;
			img{
				width: 100%;
				height: 420px;
			}
		}
		dd{
			margin-top: 30px;
			overflow: hidden;
		}
	}
	.img-list{
		float: left;
		width: 374px;
		margin-top: 6px;
		overflow: hidden;
		ul{
			transition: all .3s;
		}
		li{
			float: left;
			width: 70px;
			height: 70px;
			margin-right: 6px;
			border: 2px solid transparent;
		}
		img{
			width: 66px;
			height: 66px;
			cursor: pointer;
		}
		li:last-child{
			margin-right: 0px;
		}
		.is-check{
			border: 2px solid #ffa4a3;
		}
	}
	.imgs-box{
		overflow: hidden;
	}
	.left-btn,.right-btn{
		float: left;
		text-align: center;
		button{
			width: 20px;
			height: 80px;
			padding: 0px;
		}
		i{
			font-size: 20px;
			line-height: 80px;
		}
	}
  	.shop-info{
  		float: left;
  		width: 570px;
  		margin: 0px 30px;
  		.title{
  			margin-top: -6px;
  			font-size: 16px;
  			font-weight: 600;
  			line-height: 28px;
  			margin-bottom: 10px;
  		}
  		.el-row{
			margin-bottom: 16px;
		}
  	}
	.special-box{
		width: 100%;
		height: 60px;
		padding: 14px 22px;
		span{
			margin-left: 20px;
			vertical-align: -8px;
			font-size: 14px;
			color: #fff;
		}	
		i{
			margin: 0px 6px; 
			color: #fff336;
		}
	}
	.price-info{
		padding: 20px 30px;
		overflow: hidden;
	}
	.total-eval{
		width: 80px;
		float: right;
		text-align: right;
		em{
			font-size: 14px;
			font-weight: 600;
		}
	}
	.icon-view{
		margin-right: 4px;
		background-image: url('../../../static/img/goodDetail/view.png');
	}
	.choose-info{
		padding: 16px 30px;
		width: 420px;
	}
	.choose-btn{
		overflow: hidden;
		button{
			float: left;
			padding: 0px 20px;
			line-height: 26px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
	.choose-num{
		button,input{
			float: left;
			border: 1px solid #aaa;
			text-align: center;
		}
	    button{
	     	width: 28px;
	     	line-height: 24px;
	    }
     	input{
     		width: 50px;
     		height: 28px;
     		margin: 0px -1px;
     	}
	}	
	.buy-btn{
		float: left;
		margin-top: 40px;
		margin-left: 58px;         
		.el-button{
			width: 160px;
			height: 40px;
			margin-right: 10px;
			color: #fff;
		}
	}
</style>