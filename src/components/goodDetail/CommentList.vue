<template>
	<div>
		 <el-tabs type="border-card" :value="'1'" style='box-shadow: none;' @tab-click='tabClick'>
		  	<el-tab-pane label="商品详情"></el-tab-pane>
		 	<el-tab-pane label="商品评价">
		 		<div class="eval-info">
			 		<dl class='eval-rate'>
			 			<dt class='color-primary' style='font-size:40px;font-weight:600;line-height:60px;'>
			 				{{1*100}}%
			 			</dt>
			 			<dd>好评率</dd>
			 		</dl>
		 			<div class="eval-score">
						<el-row>
	 				   		<el-col :span='5' class='color-6'>
	 				   			好评（{{comments_count.positive_count}}）
	 				   		</el-col>
	 				   		<el-col :span='18' :offset='1' class='bg-e'>
	 				   			<span class='bg-primary' :style="{'width': p}"></span>
	 				   		</el-col>
	 				   </el-row>
	 				   <el-row>
	 				   		<el-col :span='5' class='color-6'>
	 				   			中评（{{comments_count.moderate_count}}）
	 				   		</el-col>
	 				   		<el-col :span='18' :offset='1' class='bg-e'>
	 				   			<span class='bg-y' :style="{'width': m}"></span>
	 				   		</el-col>
	 				   </el-row>
	 				   <el-row>
	 				   		<el-col :span='5' class='color-6'>
	 				   			差评（{{comments_count.negative_count}}）
	 				   		</el-col>
	 				   		<el-col :span='18' :offset='1' class='bg-e'>
	 				   			<span class='bg-low' :style="{'width': n}"></span>
	 				   		</el-col>
	 				   </el-row>
		 			</div>
		 		</div></el-tab-pane>
		</el-tabs>
		<ul v-if='commentList.length'>
	 		<li v-for='(item,index) in commentList' class="eval-box">
	 			<dl>
	 				<dt>
	 					<div class="avatar">
	 						<img :src="item.portrait">
	 					</div>
	 					<div v-text='item.nickname' class="name"></div>
	 				</dt>
	 				<dd>
	 					<p v-text='item.content' class="eval-container"></p>
	 					<ul class="eval-img-list">
	 						<li v-for='(imgItem,imgIndex) in item.images' @click='item.current_img=imgItem;item.currentIndex=imgIndex;' :class='{"eval-img-checked":item.currentIndex===imgIndex}'>
	 							<img :src="imgItem">
	 						</li>
	 					</ul>
	 					<div class="eval-big-img" v-show='item.current_img'>
	 						<img :src="item.current_img">
	 					</div>
	 					<div class="eval-msg">
	 						<div class="time">
	 							<span>
		 							{{item.date_add|dateYM}}&nbsp;{{item.date_add|timeHM}}
		 						</span>
		 						<strong>
		 							规格：{{item.option_name}}
		 						</strong>
		 					</div>
	 					</div>
	 				</dd>
	 			</dl>
	 		</li>
	 	</ul>
 		<v-pagination :total-page='totalPage-0' @changePage='changePage' ref='pagination'></v-pagination>
	</div>
</template>
<script type="text/javascript">
	import vPagination from '../../common/Pagination';
	import {dateYM,timeHM} from '../../assets/js/filter';
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
 	export default {
		data(){
			return{
				page: 1,
				totalPage: 1,
				commentList: [],
				comments_count: {},
				p: '0%',
				m: '0%',
				n: '0%',
				query: {}
			}
		},
		props: {
			tabIndex:{
				type: Number,
				default: 0
			}
		},
		filters: {
			dateYM,timeHM
		},
		components: {
			vPagination
		},
		methods: {
			tabClick(tab){
				this.$parent.tabIndex = tab.index-0;
			},
			// 改变页数
			changePage(page){
				this.page = page;
				this.getCommentList();
			},
			getCommentList(){
    			let params = {
    				token: getCookie('token'),
    				goods_id: this.query.goods_id,
    				page: this.page,
    				is_pic: ''
    			}
    			postReq('/goods/getComments',params).then(res=>{
    				let {errcode,message,content} = res ;
					if(errcode == 0){
						let comment = content.commnet.comment;
						for (let i = 0; i < comment.length; i++) {
							comment[i].current_img = '';
							comment[i].currentIndex = '';
						}
						this.commentList = comment;
						this.totalPage = content.commnet.pageSize;
						this.comments_count = content.commnet.comments_count;
						this.p = this.comments_count.positive_count/this.comments_count.total_count*100 +'%';
						this.m = this.comments_count.moderate_count/this.comments_count.total_count*100 +'%';
						this.n = this.comments_count.negative_count/this.comments_count.total_count*100 +'%';
						
					}else {
						errorInfo(errcode,message);
					}
    			})
    		}
		},
		mounted(){
			this.$nextTick(()=>{
				this.query = getRequest();
				this.getCommentList();
			})
		}
	}
</script>
v-for='(i,index) in num.toString().length'
<style type="text/css" lang='scss' scoped>
	.eval-info{
		overflow: hidden;
		padding: 0px 20px;
	}
	.eval-rate{
		float: left;
		width: 240px;
		text-align: center;
	}
	.eval-score{
		float: left;
		width: 320px;
		padding-top: 8px;
		.el-row{
			margin-bottom: 10px;
		}
		.el-col-18{
			position: relative;
			height: 12px;
			margin-top: 2px;
			span{
				display: inline-block;
				position: absolute;
				left: 0px;
				top: 0px;
				height: 12px;
			}
		}
	}
	.bg-low{
		background-color: #7ddeef;
	}
	/*评论*/
	.eval-box{
		padding: 26px 0px;
		border-bottom: 1px solid #ccc;
		dl{
			overflow: hidden;
		}
		dt{
			float: left;
			width: 100px;
			text-align: center;
			line-height: 20px;
			.avatar{
				width: 50px;
				height: 50px;
				margin: 0px auto;
				img{
					width: 100%;
					height: 100%;
					border-radius: 50%
				}
			}
			.name{
				margin-top: 4px;
			}
		}
		dd{
			float: left;
			width: 870px;
		}
	}
	.eval-container{
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 18px;
	}
	.eval-img-list{
		margin-bottom: 18px;
		padding-bottom: 10px;
		overflow: hidden;
		li{
			float: left;
			width: 40px;
			height: 40px;
			margin-right: 10px;
			padding: 0px;
			cursor: pointer;
			border: 2px solid transparent;
		}
		img{
			width: 100%;
			height: 100%;
		}
		.eval-img-checked{
			border: 2px solid #c71724;
		}
	}
	.eval-big-img{
		width: 230px;
		height: 230px;
		border: 1px solid  #ccc;
		margin-bottom: 10px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.eval-msg{
		overflow: hidden;
		color: #999;
		.time{
			float: left;
			strong{
				font-weight: 400;
				margin-left: 30px;
			}
		}
		.more{
			float: right;
			button{
				color: #2c82d3;
				padding: 2px 6px;
				background-color: transparent;
				outline: none;
				border: none;
				img{
					vertical-align: -2px;
				}
			}
			button:last-child{
				color: #999;
			}
		}
		.is-userful{
			color: #c71724;
			border: 1px solid #c71724;
			border-radius: 4px;
		}
		.canscel-userful{
			color: #999;
			border: 1px solid #999;
			border-radius: 4px;
		}
	}
	/*追加评论*/
	.add-eval{
		margin-top: 24px;
		ul{
			border-bottom: 1px dashed #ccc;
		}
		li{
			padding: 18px 38px 10px 12px;
			border-top: 1px dashed #ccc;
		}
		.add-con{
			font-size: 14px;
			line-height: 20px;
			span{
				color: #0176ac;
			}
		}
		.seller-reply{
			color: #c71724;
		}
		.add-time{
			overflow: hidden;
			span{
				float: right;
				line-height: 36px;
				color: #999;
			}
		}
	}
</style>