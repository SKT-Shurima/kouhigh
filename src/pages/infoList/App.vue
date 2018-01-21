<template>
    <div id="app">
		<v-head-slider :user-info='userInfo'></v-head-slider>
		<v-search :cart-goods='cartGoods' :cart-total='cartTotal'></v-search>
		<v-navs :navs='navs'></v-navs>
		<div class="center-box container">
			<div class="info-title"><i class="icon icon-info"></i>资讯</div>
			<div v-if='infoList.length'>
				<ul class="info-list">
			 		<li v-for='(item,index) in infoList' :key='index'>
			 			<dl>
			 				<dt>
			 					<img :src="item.image" class="good-img">
			 				</dt>
			 				<dd>
			 					<h2 v-text='item.name'></h2>
			 					<p>{{item.mini_content}}<a :href="`infomation.html?ad_id=${item.ad_id}`" class="color-primary" style="margin-left:10px;">查看详情&nbsp;&gt;&gt;</a></p>
			 				</dd>
			 			</dl>
			 		</li>
			 	</ul>
			 	<v-pagination :total-page='totalPage-0' @changePage='changePage' ref='pagination'></v-pagination>
			</div>
			<div v-else class="no-content">
				暂无资讯
			</div>
		</div>
		<v-footer></v-footer>
  	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vSearch from '../../common/Search';
	import vNavs from '../../common/Nav';
	import vPagination from '../../common/Pagination';
	import vFooter from  '../../common/Footer';
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import userMixin from '../../assets/js/userMixin';
	import shopMixin from '../../assets/js/shopMixin';
    export default {
    	data(){
    		return{
    			navs: [
    				{
    					link: 'index.html',
    					name: '返回首页'
    				}
    			],
    			infoList: [],
    			page: 1,
				totalPage: 1
    		}
    	},
    	components:{
    		vHeadSlider,vSearch,vNavs,vPagination,vFooter
    	},
    	mixins: [userMixin,shopMixin],
    	methods:{
    		changePage(page){
				this.page = page;
				this.getList();
			},
    		getList(){
    			let params = {
    				page: this.page
    			}
    			postReq('/mall/getAds',params).then(res=>{
    				let {errcode,message,content} = res ;
					if(errcode == 0){
						this.infoList = content.ad.ad;
						this.totalPage = content.ad.total_page;
					}else {
						errorInfo(errcode,message);
					}
    			})
    		}
    	},
    	created(){
    		this.$nextTick(()=>{
    			this.getList()
    		})
    	}
    }
</script>
<style type="text/css" lang='scss' scoped>
	.container{
		margin-top: 32px;
		overflow: hidden;
	}
	.info-title{
		font-size: 18px;
		line-height: 28px;
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
	}
	.icon-info{
		width: 28px;
		height: 28px;
		margin-right: 10px;
		background-image: url(../../../static/img/common/info.png);
	}
	.info-list{
		margin-top: 20px;
		li{
			padding: 28px 20px;
			border-bottom: 1px solid #f1f1f1;
		}
		dl{
			overflow: hidden;
		}
		dt,dd{
			float: left;
		}
		dt{
			width: 200px;
			height: 120px;
		}
		dd{
			margin-left: 20px;
			width: 980px;
			h2{
				overflow: hidden;
				span{
					float: right;
					font-size: 14px;
				}
			}
			p{
				margin-top: 20px;
				line-height: 24px;
				color: #000;
				text-indent: 2em;
			}
		}
	}
</style>
