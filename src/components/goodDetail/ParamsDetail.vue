<template>
	<div>
		 <el-tabs type="border-card" style='box-shadow: none;' @tab-click='tabClick'>
		  	<el-tab-pane label="商品详情">
				<div class='color-9 details-con'>
		 			<div class="details-title">
			 			产品参数
			 		</div>
			 		<ul class="productInfo">
			 			<li v-for='item in goodParams'>
	                        {{item.name}}：{{item.value}}
	                    </li>
			 		</ul>
		 		</div>
		  	</el-tab-pane>
		 	<el-tab-pane label="商品详情">商品评价</el-tab-pane>
		</el-tabs>
		 <p v-html='description' style='padding: 50px 20px;
	    text-align: center;'></p>
	</div>
</template>
<script type="text/javascript">
	export default{
		props: {
			description:{
				type: String,
				default: ''
			},
			tabIndex:{
				type: Number,
				default: 0
			},
			goodParams: {
				type: Array,
				default: function(){
					return []
				}
			}
		},
		methods: {
			tabClick(tab){
				this.$parent.tabIndex = tab.index-0;
			}
		}
	}
</script>
<style type="text/css" lang='scss'>
	.details-con{
		ul{
			width: 672px;
			padding-left: 12px;
			overflow: hidden;
		}
		li {
			float: left;
			line-height: 30px;
			width: 210px;
			margin-right: 10px;
			.el-row{
				margin: 0px;
			}
		}
	}
	.details-title{
		line-height: 24px;
		font-weight: 600;
		padding-left: 12px;
		margin-bottom: 10px;
	}
</style>