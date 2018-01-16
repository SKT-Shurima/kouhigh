<template>
	<dl  class="reg-success">
		<dt></dt>
		<dd>注册成功，{{time}}s后自动返回商城首页</dd>
		<dd>
			<el-button type="primary" style='width:140px;'>
				<a href="index.html" style="color:#fff;">立即返回</a>	
			</el-button>
		</dd>
	</dl>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				time: 5
			}
		},
		mounted(){
			this.$nextTick(()=>{
				setInterval(()=>{
					this.time--;
					if (this.time<=0) {
						window.location.href = 'index.html';
					}
				},1000)
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.reg-success{
		width: 300px;
		text-align: center;
		margin: 0px auto;
		padding: 30px 0px;
		dt{
			width: 250px;
			height: 250px;
			margin: 0px auto 50px;
			background: url(../../../static/img/login/success.png) no-repeat;
			background-size: cover;
		}
		dd{
			font-size: 16px;
			line-height: 40px;
		}
	}
</style>	