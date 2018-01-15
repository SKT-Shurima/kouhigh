<template>
	<div class="wrap">
		<dl class="bg-f5 border-c opera">
			<dt class='color-6' :class='{"is-click":tabIndex==0}' @click='tabIndex=0'>品牌</dt>
			<dt class='color-6' :class='{"is-click":tabIndex==1}' @click='tabIndex=1'>
				销量
				<img src="../../../static/img/relatedGoods/saleCountDefault.png" height="14" width="14" v-show='saleIndex==0'>
				<img src="../../../static/img/relatedGoods/saleCount.png" height="14" width="14" v-show='saleIndex==1'>
				<img src="../../../static/img/relatedGoods/saleCount.png" height="14" width="14" style='transfrom: rotateZ(180deg);' v-show='saleIndex==2'>
			</dt>
			<dt class='color-6' :class='{"is-click":tabIndex==2}' @click='tabIndex=2'>
				价格 
				<img src="../../../static/img/relatedGoods/defaultPrice.png" height="14" width="14" v-show='priceIndex==0'>
				<img src="../../../static/img/relatedGoods/priceUp.png" height="14" width="14" v-show='priceIndex==1'>
				<img src="../../../static/img/relatedGoods/priceDown.png" height="14" width="14" v-show='priceIndex==2'>
			</dt>
			<dd>
				<el-button  class='left-btn' :disabled='params.page-0===1' type='text' size='small' @click='page(1)'>
					<i class='color-6 el-icon-arrow-left'></i>
				</el-button>
				<el-button class='right-btn' :disabled='params.page-0 === pagesize-0' type='text' size='small' @click='page(0)'>
					<i class='color-6 el-icon-arrow-right'></i>
				</el-button>
			</dd>
			<dd class='color-6' style='padding-right: 16px;'>
				{{params.page}}/{{pagesize}}
			</dd>
		</dl>
		<ul class="border-lt goods-list" v-if='goods.length'>
			<v-good-list :good='item' :hover='true' v-for='(item,index) in goods'></v-good-list>
		</ul>
		<div v-else class="no-result">
		</div>
		<pagination :pagesize='pagesize' @changePage='changePage' ref='pagination'></pagination>
	</div>
</template>
<script>
import vGoodList from '../../common/GoodList';
import {goodsList} from '../../assets/js/api';
import {postReq} from '../../assets/js/api';
import {errorInfo} from '../../assets/js/check';
import vPagination from '../../common/Pagination';
	export default {
		data(){
			return {
				query: {},
				tabIndex: 0,
				saleIndex: 0,
				priceIndex: 0,
				pagesize: 1 ,// 总页数
				params: {
					keyword: '洗发液',
                    sale_count: 0,
                    price: 0,
                    brand_ids: '',
                    page: 1
				},
				goods: []
			}
		},
		components:{
			vGoodList,vPagination
		},
		methods:{
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			// 改变页数
			changePage(page){
				this.params.page = page + "" ;
				this.initList();
			},
			page(mask){
				this.$refs.pagination.changePage(mask);
			},
			sortType(mask){
				switch (mask) {
					case 'all': 
						this.tabIndex = 1;
						this.priceIndex = 0 ;
						this.timeIndex = 0 ; 
					break ;
					case 'sale_count': 
						this.tabIndex = 2;
						this.priceIndex = 0 ;
						this.timeIndex = 0 ; 
						this.params['sort'] = mask+" desc";
					break ;
					case 'comments_count':
						this.tabIndex = 3;
						this.priceIndex = 0 ;
						this.timeIndex = 0 ;  
						this.params['sort'] = mask+" desc";
					break ;
					case 'shop_price':
						this.tabIndex = null ;
						this.timeIndex = 0 ;
						this.priceIndex++;
						this.priceIndex = this.priceIndex > 2 ? 1 : this.priceIndex ;
						mask += this.priceIndex === 1? ' asc' : this.priceIndex===2 ? ' desc' : '' ; 
						this.params['sort'] = mask;
					break ;
					case 'date_on_sale': 
						this.tabIndex = null ;
						this.priceIndex = 0 ;
						this.timeIndex++ ; 
						this.timeIndex = this.timeIndex > 2 ?1 : this.timeIndex ;
						mask += this.timeIndex === 1 ? ' asc': this.timeIndex === 2 ?' desc' :"" ;
						this.params['sort'] = mask;
					break ;
				}
				this.initList();
			},
			initList(){
				postReq('/search/search',this.params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.goods = content.goods_list ;
						
					}else {
						errorInfo(errcode,message);
					}
				})
			},
			getList(){
                postReq('/search/search',params).then(res=>{
                    let {errcode,message,content} = res ;
                    if(errcode == 0){
                        this.likeLists = content.like;
                    }else {
                        errorInfo(errcode,message);
                    }
                })
            }
		},
        created(){
            this.$nextTick(()=>{
                this.query = getRequest();
            })
        }
	}
</script>
<style lang='scss' scoped>
	.opera{
		overflow: hidden;
		dt,dd{
			text-align: center;
			height: 36px;
			line-height: 36px;
			cursor: pointer;
		}
		dt{
			float: left;
			padding: 0px 24px;
			border-right: 1px solid #ccc;
		}
		dd{
			float: right;
		}
		.is-click{
			color: #ffa4a3;
			background-color: #fff;
		}
	}
	.left-btn,.right-btn{
		float: left;
		width: 36px;
		height: 36px;
		padding: 0px;
		margin: 0px;
		border-left: 1px solid #ccc;
	}
	.goods-list{
		width: 1001px;
		margin-top: 20px;
		overflow: hidden;
		li{
			float: left;
		}
	}
	.info-list{
		float: left;
		width: 250px;
		height: 330px;
		padding: 14px;
		cursor: pointer;
	}
	.no-result{
		margin-top: 20px;
		color: #c71724;
	}
</style>