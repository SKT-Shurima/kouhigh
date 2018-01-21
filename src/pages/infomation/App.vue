<template>
    <div id="app">
		<v-head-slider :user-info='userInfo'></v-head-slider>
		<v-search :cart-goods='cartGoods' :cart-total='cartTotal'></v-search>
		<v-navs :navs='navs'></v-navs>
		<div class="center-box container">
			<h4 class='bread-nav'><a href="infoList.html">资讯</a>&nbsp;<i>&gt;</i>&nbsp;<a href="javascript:void(0);">首页</a></h4>
			<div class="info-detail">
				<h1 v-text='name'></h1>
				<p v-html="content"></p>
				<dl class="page">
					<dt>
					   <em>上一篇</em>
					   <span class='ellipsis-1'></span>
					</dt>
					<dd>
						<span class='ellipsis-1' style="text-align: right;"></span>
						<em>下一篇</em>
					</dd>
				</dl>
			</div>
		</div>
		<v-footer></v-footer>
  	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vSearch from '../../common/Search';
	import vNavs from '../../common/Nav';
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
    			content: "",
    			index: "",
    			name: ""
    		}
    	},
    	components:{
    		vHeadSlider,vSearch,vNavs,vFooter
    	},
    	mixins: [userMixin,shopMixin],
    	methods:{
    		changeMain(mask){
				mask ? ++this.index :--this.index ;
				let id = this.infoList[this.index].id;
				location.href = "infomation.html?ad_id=${id}";
			},
    		getInfo(){
    			let params = {
    				ad_id: this.query.ad_id
    			}
    			postReq('/mall/getAdDetail',params).then(res=>{
    				let {errcode,message,content} = res ;
					if(errcode == 0){
						this.name = content.ad.name;
						this.content = escape2Html(content.ad.content);
					}else {
						errorInfo(errcode,message);
					}
    			})
    		}
    	},
    	created(){
    		this.$nextTick(()=>{
    			this.query = getRequest();
    			this.getInfo();
    		})
    	}
    }
</script>
<style type="text/css" lang='scss' scoped>
	.container{
		margin-top: 32px;
		overflow: hidden;
	}
	.info-detail{
		text-align: center;
	}
	.page{
		margin-top: 100px;
		overflow: hidden;
		span{
			display: inline-block;
		}
		em{
			vertical-align: top;
			margin: 0px 10px;
		}
		span{
			width: 150px;
			color: #005b9a;
		}
		dt,dd{
			cursor: pointer;
		}
		dt{
			float: left;
		}
		dd{
			float: right;
		}
	}
</style>
