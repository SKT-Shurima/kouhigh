<template>
	<div>
		<div v-if='goods.length'>
			<ul class="border-lt goods-list">
				<li class="border-rb info-list" v-for='(good,index) in goods' :key='index'>
					<dl  @click='goodDetail'>
						<dt>
							<img :src="good.cover">
							<div class='opera'>
								<span style="border-right: 1px solid #ccc;" @click.stop='addShopCar(good.goods_id)'>加入购物车</span>
								<span @click.stop='delCol(good.collection_id)'>删除</span>
							</div>
						</dt>
						<dd>
							<div class="ellipsis-2 sell-info" v-text='good.name'></div>
							<div class="price-info">
								<span class='color-primary'>
									${{good.price}}
								</span>
								<em class='color-9'>
									{{good.sale_count}}人付款
								</em>
							</div>
						</dd>
					</dl>
				</li>
			</ul>
			<v-pagination :total-page='totalPage-0' @changePage='changePage' ref='pagination'></v-pagination>
		</div>
		<div class='no-content' v-else>
			暂无商品收藏
		</div>
	</div>
</template>
<script type="text/javascript">
	import vPagination from '../../common/Pagination';
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {MessageBox} from  'element-ui';
	export default {
		data(){
			return{
				goods: [],
				page: 1,
				totalPage: 1
			}
		},
		components:{
			vPagination
		},
		methods:{
			changePage(page){
				this.page = page;
				this.initList();
			},
			goodDetail(id){
				window.open(`goodDetail.html?goods_id=${id}`) ;
			},
			addShopCar(id){
				let params = {
					token: getCookie('token'),
					goods_id: id,
					option_id: 0,
					quantity: 1
				}
				postReq('/cart/addCart',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						MessageBox.alert(message, '提示', {
				            confirmButtonText: '确定'
				        });
					}else {
						errorInfo(errcode,message);
					}
				})
			},	
			delCol(id){
				MessageBox.confirm('是否删除该收藏?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		            let params = {
						token: getCookie('token'),
						collection_ids: id
					}
					postReq('/customer/delCollections',params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode == 0){
							this.initList();
						}else {
							errorInfo(errcode,message);
						}
					})
		        }).catch(() => {});
			},
			initList(){
				let params = {
					token: getCookie('token'),
					page: this.page
				}
				postReq('/customer/getCollections',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.goods = content.collection.collection;
						this.totalPage = content.collection.total_page;
						if (this.page>1&&!this.goods.length) {
							this.page--;
							this.$pagination.currentPage = this.page;
							this.initList();
						}
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		},
		created(){
			this.$nextTick(()=>{
				this.initList();
			})
		}
	} 
</script>
<style type="text/css" lang='scss' scoped>
	.goods-list{
		width: 1076px;
		overflow: hidden;
	}
	.info-list{
		float: left;
		width: 215px;
		cursor: pointer;
		dl{
			padding: 14px;
			cursor: pointer;
		}
		dt{
			position: relative;
			border: 2px solid transparent;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		dt:hover{
			border-color: #ffa4a3;
			.opera{
				bottom: 0px;
			}
		}
		dd{
			width: 100%;
			overflow: hidden;
		}
		.sell-info{
			height: 36px;
		    line-height: 18px;
		    margin-top: 10px;
		}
		/*价格信息*/
		.price-info{
			margin-top: 6px;
			span{
				font-size: 18px;
			}
			em{
				margin-top: 4px;
				float: right;
			}
		}
	}
	.opera{
		position: absolute;
		left: 0px;
		bottom: -30px;
		width: 100%;
		transition: all .3s;
		span{
			display: inline-block;
			float: left;
			width: 90px;
			line-height: 30px;
			text-align: center;
			background: rgba(255,164,163,.5);
			color: #fff;
		}
	}
</style>