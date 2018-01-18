<template>
	<div class='wrap'>
		<h1 class='bg-f5 color-6 slide-title'>
			<i class="icon icon-c-slide"></i>
			<span>猜你喜欢</span>
			<em style="float: right;">
				换一组<i class="icon icon-fresh" @click='initList'></i>
			</em>
		</h1>
		<ul v-if='likeLists.length' class='border-lt guess-list'>
			<v-good-list v-for='(item,index) in likeLists' :key='index' :good='item' :hover='true'></v-good-list>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import vGoodList from './GoodList';
	import {postReq} from '../assets/js/api';
	import {errorInfo} from '../assets/js/check';
	export default{
		data(){
			return{
				likeLists: []
			}
		},
		components:{
			vGoodList
		},
		methods:{
			initList(){
				postReq('/goods/getLikeGoods',{}).then(res=>{
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
				this.initList();
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.wrap{
		padding-top: 50px;
		clear: both;
	}
	.slide-title{
		font-size: 16px;
		margin-bottom: 10px;
		overflow: hidden;
		height: 40px;
    	line-height: 40px;
    	font-weight: 400;
    	padding: 0px 10px;
	}
	.icon-fresh{
		width: 18px;
		height: 18px;
		cursor: pointer;
		vertical-align: -4px;
    	margin-left: 4px;
		background-image: url(../../static/img/common/fresh.png);
	}
	.guess-list{
		overflow: hidden;
		li{
			float: left;
		}
	}
</style>