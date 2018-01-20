<template>
	<div class="wrap">
		<dl class="bg-f5 border-c opera">
			<dt class='color-6 tab-0' :class='{"is-click":tabIndex===0}' @mouseenter='tabIndex=0;' @mouseleave="tabIndex=''">
				<div>品牌</div>
				<dl class="brand-box" v-show='tabIndex===0' @mouseenter='tabIndex=0;' @mouseleave="tabIndex=''">
					<dt class='brand-list'>
						<span class='color-6' :class="{'no-border':(index+1)%5==0,'color-primary':item.checked}" v-for='(item,index) in brands' :key='index' @click='item.checked=!item.checked;' v-text='item.name'></span>
					</dt>
					<dd class='brand-check'>
						<ul> 
							<li v-for='(item,index) in brands' :key='index' v-show='item.checked'>
								{{item.name}}
								<i class='icon icon-del' @click='item.checked=false;'></i>
							</li>
						</ul>
						<div class='brand-btn'>
							<button class='bg-y' @click='resetBrands'>重置</button>
							<button class='bg-primary' @click='submitBrands'>确认</button>
						</div>
					</dd>
				</dl>
			</dt>
			<dt class='color-6 tab-1' :class='{"is-click":tabIndex==1}' @click='sortType(1)'>
				销量
				<img src="../../../static/img/relatedGoods/saleCountDefault.png" height="14" width="14" v-show='sale_count==0'>
				<img src="../../../static/img/relatedGoods/saleCount.png" height="14" width="14" v-show='sale_count==1'>
				<img src="../../../static/img/relatedGoods/saleCount.png" height="14" width="14" style='transfrom: rotateZ(180deg);' v-show='sale_count==2'>
			</dt>
			<dt class='color-6 tab-2' :class='{"is-click":tabIndex==2}' @click='sortType(2)'>
				价格 
				<img src="../../../static/img/relatedGoods/defaultPrice.png" height="14" width="14" v-show='price==0'>
				<img src="../../../static/img/relatedGoods/priceUp.png" height="14" width="14" v-show='price==1'>
				<img src="../../../static/img/relatedGoods/priceDown.png" height="14" width="14" v-show='price==2'>
			</dt>
			<dd class='page-opera'>
				<el-button  class='left-btn' :disabled='page-0===1' type='text' size='small' @click='prePage(0)'>
					<i class='color-6 el-icon-arrow-left'></i>
				</el-button>
				<el-button class='right-btn' :disabled='page-0 === totalPage-0||totalPage==0' type='text' size='small' @click='prePage(1)'>
					<i class='color-6 el-icon-arrow-right'></i>
				</el-button>
			</dd>
			<dd class='color-6 page-opera' style='padding-right: 16px;'>
				{{page}}/{{totalPage}}
			</dd>
		</dl>
		<div class="container">
			<div v-if='goods.length'>
				<div class='color-6 search-type' v-if='query.keyword'>
					为您找到{{goods.length}}个与“{{query.keyword}}”相关的商品：
				</div>
				<ul class="border-lt goods-list">
					<v-good-list v-for='(item,index) in goods' :good='item' :key='index'></v-good-list>
				</ul>
				<v-pagination :total-page='totalPage-0' @changePage='changePage' ref='pagination'></v-pagination>
			</div>
			<dl v-else class='no-result'>
				<dt>此商品不存在，点击反馈给我们吧。收到建议后我们会为您上架期待的产品！</dt>
				<dd>
					<button class="bg-y">我要购买</button>
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
import vGoodList from '../../common/GoodList';
import vPagination from '../../common/Pagination';
import {postReq} from '../../assets/js/api';
import {errorInfo} from '../../assets/js/check';
	export default {
		data(){
			return {
				query: {},
				tabIndex: '',
				sale_count: 0,
				price: 0,
				page: 1,
				totalPage: 1 ,// 总页数
				goods: [],
				brands: [],
				brand_ids: ''
			}
		},
		components:{
			vGoodList,vPagination
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			resetBrands(){
				let brands = this.brands;
				for(let i = 0;i<brands.length;i++){
					brands[i].checked = false;
				}
				this.brands = brands;
			},
			submitBrands(){
				let brands = this.brands,brand_ids='';
				for(let i = 0;i<brands.length;i++){
					if (brands[i].checked) {
						brand_ids+=brands[i].brand_id;
					}
				}
				this.brand_ids = brand_ids;
				this.page = 1;
				this.$refs.pagination.currentPage = 1;
				this.initList();
			},
			// 改变页数
			changePage(page){
				this.page = page;
				this.initList();
			},
			prePage(mask){
				this.$refs.pagination.changePage(mask);
			},
			sortType(mask){
				this.tabIndex = mask;
				this.page = 1;
				this.$refs.pagination.currentPage = 1;
				switch (mask) {
					case 1: 
						this.sale_count = this.sale_count?this.sale_count==1?2:1:1;
					break ;
					case 2: 
						this.price = this.price?this.price==1?2:1:1;
					break ;
				}
				this.initList();
			},
			initList(){
				let params = {
					keyword: this.query.keyword,
                    sale_count: this.sale_count,
                    price: this.price,
                    brand_ids: this.brand_ids,
                    page: this.page
				}
				postReq('/search/search',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.goods = content.goods.goods;
						this.totalPage = content.goods.total_page;
					}else {
						errorInfo(errcode,message);
					}
				})
			},
			getBrands(){
				postReq('/search/getBrands',{}).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						let brands = content.brand;
						for (let i = 0; i < brands.length; i++) {
							brands[i].checked = false;
						}
						this.brands = brands;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		},
        created(){
            this.$nextTick(()=>{
                this.query = getRequest();
                this.initList();
                this.getBrands();
            })
        }
	}
</script>
<style lang='scss' scoped>
	.opera{
		position: relative;
		height: 36px;
		dt,dd{
			text-align: center;
			cursor: pointer;
		}
		.page-opera{
			float: right;
			height: 36px;
			line-height: 36px;
		}
		.is-click{
			color: #ffa4a3;
			background-color: #fff;
		}
	}
	@for $i from 0 to 3 {
	    .tab-#{$i} {
	    	position: absolute;
		    left: $i*100px;
		    bottom: -1px;
		    height: 35px;
			line-height: 35px;
		    width: 100px;
		    border-right: 1px solid #ccc;
	    }
	}
	.search-type{
		font-size: 14px;
		line-height: 40px;
	}
	.brand-box{
		position: absolute;
		left: -1px;
		top: 35px;
		width: 418px;
		overflow: hidden;
		border: 1px solid #ccc;
		border-top: none;
		padding-top: 20px;
	}
	.brand-list{
		overflow: hidden;
		span{
			display: inline-block;
			float: left;
			width: 82px;
			line-height: 1;
			margin-bottom: 18px;
			border-right: 1px solid #ddd;
		}
		.no-border{
			border: none;
		}
	}
	.brand-check{
		padding: 12px;
		overflow: hidden;
		ul{
			width: 240px;
			float: left;
			padding-top: 5px;
			overflow: hidden;
		}
		li{
			float: left;
			position: relative;
			width: 60px;
			line-height: 24px;
			height: 24px;
			margin-right: 10px;
			margin-bottom: 10px;
			color: #000;
			background-color: #e6e6e6;
		}
		.brand-btn{
			float: left;
			button{
				width: 60px;
				height: 30px;
				line-height: 30px;
				margin-right: 10px;
				border-radius: 4px;
				color: #fff;
			}
		}
	}
	.icon-del{
		position: absolute;
	 	top: 0px;
	 	right: 0px;
	 	width: 12px;
	 	height: 12px;
	 	background-image: url(../../../static/img/common/del.png);
	}
	.left-btn,.right-btn{
		float: left;
		width: 36px;
		height: 36px;
		padding: 0px;
		margin: 0px;
		border-left: 1px solid #ccc;
	}
	.container{
		min-height: 600px;
	}
	.goods-list{
		width: 1001px;
		margin-top: 20px;
		overflow: hidden;
		li{
			float: left;
		}
	}
	.no-result{
		padding-top: 220px;
		width: 274px;
		margin: 0px auto;
		dt{
			font-size: 16px;
			line-height: 24px;
		}
		dd{
			text-align: center;
			margin-top: 50px;
		}
		button{
			width: 240px;
			height: 50px;
			font-size: 18px;
			line-height: 50px;
			border-radius: 25px;
			color: #fff;
		}
	}
</style>