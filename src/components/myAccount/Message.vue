<template>
	<div class="wrap">
		<h4 class='bread-nav'><a href="personCenter.html">我的KouHigh</a>&nbsp;<i>&gt;</i>&nbsp;<a href="myAccount.html#/message">消息</a></h4>
		<div class="container">
			<div v-if="true">
				<ul>
					<li class="border-d">
						<dl>
							<dt class="bg-f5 order-title">
								<strong>订单消息</strong>
								<span style="margin-left: 40px;">您的订单有新的状态</span>
								<em class="color-6" style="float: right;">{{1515551215151|time_filter}}</em>
							</dt>
							<dd class="order-info">
								<div class="good-cover">
									<img src="http://static.strongmall.net/upload/goods/2017_08_09/11769d7c0662fc7425c9a1b66bfde0a2a15d5f00.jpg?imageView2/2/w/400/h/400" class="good-img">
								</div>
								<dl class="good-info">
									<dt class="color-6">订单号：12345</dt>
									<dd>卖家已发货</dd>
								</dl>
								<div class="good-opera">
									<el-button size="small" type="primary">去看看</el-button>
								</div>
							</dd>
						</dl>
					</li>
				</ul>
				<v-pagination :total-page='totalPage-0' @changePage='changePage' ref='pagination'></v-pagination>
			</div>
			<div v-else class="no-content">
				暂无消息
			</div>
		</div>
	</div>
</template>
<script >
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {time_filter} from '../../assets/js/filter';
	import {MessageBox} from  'element-ui';
	import vPagination from '../../common/Pagination';
	export default{
		data(){
			return{
				orderList: [],
				page: 1,
				totalPage: 1
			}
		},
		filters: {time_filter},
		components:{
			vPagination
		},
		methods:{
			changePage(page){
				this.page = page;
				this.getList();
			},
			getList(){
	      		let params = {
	      			token: getCookie('token'),
	      			page: this.page
		      	};
		      	postReq('/message/getOrderMessage',params).then( res=>{
		      		let {errcode,message,content} = res ;
		      		if (errcode == 0) {
		      			this.orderList = content;
		      		} else {
		      			errorInfo(errcode,message);
		      		}
		      	})
		    }
		},
		created(){
			this.$nextTick(()=>{
				this.getList();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.container{
		width: 1080px;
		margin: 30px auto;
	}
	.order-title{
		height: 40px;
		line-height: 40px;
		padding: 0px 24px;
		border-bottom: 1px solid #ddd;
		overflow: hidden ;
	}
	.order-info{
		padding: 20px 24px;
		overflow: hidden;
	}
	.good-cover,.good-info{
		float: left;
	}
	.good-cover{
		width: 90px;
		height: 90px;
	}
	.good-info{
		margin-left: 56px;
		padding: 10px 0px;
		line-height: 20px;
	}
	.good-opera{
		float: right;
		margin-top: 30px;
	}
</style>