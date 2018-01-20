<template>
    <div id="app">
		<v-head-slider :user-info='userInfo'></v-head-slider>
		<v-search :cart-goods='cartGoods' :cart-total='cartTotal'></v-search>
		<v-navs :navs='navs'></v-navs>
		<v-good-info :goods='goods' :comment='comment' :specs='specs'></v-good-info>
		<div class="center-box container">
			<div class='slider-box'>
				<v-coupon :hot-lists='hot'></v-coupon>
				<v-hot-sale :hot-lists='hot'></v-hot-sale>
			</div>
			<div class='content-box'>
				<v-params-detail :description='description' :good-params='goods.params' :tab-index='tabIndex' v-show='!tabIndex'></v-params-detail>
				<v-comment-list v-show='tabIndex'></v-comment-list>
			</div>
			<v-guess-like></v-guess-like>
		</div>
		<v-footer></v-footer>
  	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vSearch from '../../common/Search';
	import vNavs from '../../common/Nav';
	import vGoodInfo from '../../components/goodDetail/GoodInfo';
	import vCoupon from '../../components/goodDetail/Coupons';
	import vHotSale from '../../components/goodDetail/HotSale';
	import vGoodParams from '../../components/goodDetail/GoodParams';
	import vParamsDetail from '../../components/goodDetail/ParamsDetail'
	import vCommentList from '../../components/goodDetail/CommentList';
	import vGuessLike from '../../common/GuessLike';
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
    					name: '首页'
    				},{
    					link: '',
    					name: '分类名称'
    				}
    			],
    			goods: {},
    			comment: {},
    			like: [],
    			hot: [],
    			coupon: [],
    			tabIndex: 0,
    			description: '',
    			query: {},
    			specs: []
    		}
    	},
    	components:{
    		vHeadSlider,vSearch,vNavs,vGoodInfo,vCoupon,vGoodParams,vHotSale,vGuessLike,vParamsDetail,vCommentList,vFooter
    	},
    	mixins: [userMixin,shopMixin],
    	methods:{
    		getDetail(){
    			let params = {
    				token: getCookie('token'),
    				goods_id: this.query.goods_id
    			}
    			postReq('/goods/getGoodsDetail',params).then(res=>{
    				let {errcode,message,content} = res ;
					if(errcode == 0){
						this.goods = content.goods;
						this.description = escape2Html(content.goods.description);
						this.coupon = content.coupon;
						this.comment = content.comment;
						this.hot = content.hot;
						content.goods.specs = JSON.stringify(content.goods.specs)
						if (content.goods.specs) {
							let specs = JSON.parse(content.goods.specs);
							for (let i = 0; i < specs.length; i++) {
								specs[i].checkIndex = 0;
							}
							this.specs = specs;
						}
					}else {
						errorInfo(errcode,message);
					}
    			})
    		}
    	},
    	created(){
    		this.$nextTick(()=>{
    			this.query = getRequest();
    			this.getDetail();
    		})
    	}
    }
</script>
<style type="text/css" lang='scss' scoped>
	.container{
		margin-top: 32px;
		overflow: hidden;
	}
	.slider-box{
		float: left; 
		width: 250px;
	}
	/*内容区域*/
	.content-box{
		width: 1000px;
		float: left;
		overflow: hidden;
	}
</style>
