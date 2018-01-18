<template>
	<div class='wrap'>
		<h1 class='bg-f5 color-6 slide-title'>
			<i class="icon icon-c-slide"></i>
			<span>精品推荐</span>
		</h1>
		<ul v-if='goodLists.length' class='border-lt'>
			<v-good-list v-for='(item,index) in goodLists' :key='index' :good='item' :hover='true'></v-good-list>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import vGoodList from './GoodList';
	export default{
		data(){
			return{
				goodLists: []
			}
		},
		components:{
			vGoodList
		},
		
	}
</script>
<style type="text/css" lang='scss' scoped>
	.wrap{
		width: 240px;
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
</style>