<template>
	<div>
		<h1 class="slide-title color-9">
			<i class="icon icon-c-slide"></i>
			<span>热销排行</span>
			<i class="icon icon-c-slide" style="transform: rotateZ(180deg);"></i>
		</h1>
		<ul v-if='hotLists.length' class='border-lt'>
			<v-good-list v-for='(item,index) in hotLists' :key='index' :good='item' ></v-good-list>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import vGoodList from '../../common/GoodList';
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	export default{
		data(){
			return{
				hotLists: []
			}
		},
		components:{
			vGoodList
		},
		created(){
			this.$nextTick(()=>{
				postReq('/goods/getHotGoods',{}).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.hotLists = content.hot;
					}else {
						errorInfo(errcode,message);
					}
				})
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.slide-title{
		font-size: 16px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>