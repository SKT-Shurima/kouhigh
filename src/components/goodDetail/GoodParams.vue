<template>
	<dl class="info-box">
	 	<dt>
	 		<button @click='infoTabIndex=1' :class='{"info-tab-checked":infoTabIndex===1}' >商品详情</button>
	 		<button @click='infoTabIndex=2' :class='{"info-tab-checked":infoTabIndex===2}'>评价（{{deliveryInfo.goodsInfo.goods.comment.total}}）</button>
	 	</dt>
	 	<dd>
	 		<!-- 产品参数 -->
	 		<div class="color-9 details-con" v-show='infoTabIndex===1'>
	 			<div class="details-title">
		 			产品参数
		 		</div>
		 		<ul class="productInfo">
		 			<li v-for='item in deliveryInfo.goodsInfo.goods.params'>
                        
                    </li>
		 		</ul>
	 		</div>
	 		<div class="eval-con" v-show='infoTabIndex===2'>
	 			<div class="eval-rate" style="text-align: center;">
	 				好评率
	 			</div>
	 			<div style="font-size:60px;font-weight:600;color:#c71724;" class="eval-rate">
	 				{{deliveryInfo.goodsInfo.goods.comment.praise_rate*100}}%
	 			</div>
	 			<div class="eval-info">
						<el-row>
 				   		<el-col :span='10'>
 				   			好评（{{(comment.goods_comment-0).toFixed(1)}}）
 				   		</el-col>
 				   		<el-col :span='14'>
 				   			
 				   		</el-col>
 				   </el-row>
 				   <el-row>
 				   		<el-col :span='10'>
 				   			中评（{{(comment.service_comment-0).toFixed(1)}}）
 				   		</el-col>
 				   		<el-col :span='14'>
 				   		</el-col>
 				   </el-row>
 				   <el-row>
 				   		<el-col :span='10'>
 				   			差评（{{(comment.logistics_comment-0).toFixed(1)}}）
 				   		</el-col>
 				   		<el-col :span='14'>
 				   		</el-col>
 				   </el-row>
	 			</div>
	 		</div>
	 	</dd>
	 </dl>
</template>
<script type="text/javascript">
	export default{

	}
</script>
<style type="text/css" lang='scss' scoped>
	.info-box{
		width: 100%;
		border: 1px solid #ccc;
		dt{
			line-height: 36px;
			border-bottom: 1px solid #ccc;
			background-color: #f5f5f5;
			button{
				width: 100px;
				height: 36px;
				text-align: center;
				color: #999;
				background-color: transparent;
				border: none;
				border: 1px solid transparent;
				outline: none;
			}
		   button:first-child{
		   		border-right: 1px solid #ccc;
		   }
		}
		dd{
			padding: 10px;
		}
	}
	.info-tab-checked{
		color: #c71724;
		background-color: #fff;
		border-right: 1px solid #ccc;
	}
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
	.eval-con{
		overflow: hidden;
	}
	.eval-rate{
		float: left;
		width: 90px;
		height: 100px;
		line-height: 100px;
	}
	.eval-info{
		float: left;
		width: 240px;
		padding: 10px 0px;
		margin-left: 90px;
		.el-row{
			line-height: 28px;
		}
	}
</style>