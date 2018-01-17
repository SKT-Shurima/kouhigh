<template>
	<dl class="info-box">
	 	<dt>
	 		<button @click='tabIndex=1' :class='{"tab-checked":tabIndex==0}' >商品详情</button>
	 		<button @click='tabIndex=2' :class='{"tab-checked":tabIndex==1}'>评价（{{120}}）</button>
	 	</dt>
	 	<dd>
	 		<!-- 产品参数 -->
	 		<div class="color-9 details-con" v-show='tabIndex==0'>
	 			<div class="details-title">
		 			产品参数
		 		</div>
		 		<ul class="productInfo">
		 			<li>
                        
                    </li>
		 		</ul>
	 		</div>
	 		<div class="eval-con" v-show='tabIndex==1'>
	 			<div class="eval-rate" style="text-align: center;">
	 				好评率
	 			</div>
	 			<div style="font-size:60px;font-weight:600;color:#c71724;" class="eval-rate">
	 				{{1*100}}%
	 			</div>
	 			<div class="eval-info">
						<el-row>
 				   		<el-col :span='10'>
 				   			好评（{{10}}）
 				   		</el-col>
 				   		<el-col :span='14'>
 				   			
 				   		</el-col>
 				   </el-row>
 				   <el-row>
 				   		<el-col :span='10'>
 				   			中评（{{20}}）
 				   		</el-col>
 				   		<el-col :span='14'>
 				   		</el-col>
 				   </el-row>
 				   <el-row>
 				   		<el-col :span='10'>
 				   			差评（{{30}}）
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
		props:{
			tabIndex: Number,
			default: 0
		}
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
	.tab-checked{
		color: #c71724;
		background-color: #fff;
		border-right: 1px solid #ccc;
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