<template>
	<div class="bg-primary nav-box">
		<div class="center-box">
			<div class="mylogo">
				<router-link to='/'>我的KouHigh</router-link>
			</div>
			<div class="nav-title">
				<ul class="nav-list">
					<li><a href="index.html">KouHigh首页</a></li>
					<li>
						<div @mouseenter='accountListBol=true' @mouseleave='accountListBol=false;'>账户安全</div>
						<ul class='bg-primary account-options' v-show='accountListBol' @mouseleave='accountListBol=false' @mouseenter='accountListBol=true'>
							<li><a href="myAccount.html" class="account-link">修改密码</a></li>
						</ul>
					</li>
					<li><a href="myAccount.html#/message">消息<i class="icon-cir" v-text='message_count' v-if="message_count-0" style="margin-left: 6px;"></i></a></li>
				</ul>
			</div>
			<div class="search-box">
				<input class='border-d' type="text" name="" v-model='searchInput' @keyup.enter='search'>
				<button class='color-6 border-d' @click='search'>搜索</button> 
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {MessageBox} from  'element-ui'
	import {postReq} from '../assets/js/api';
	import {errorInfo} from '../assets/js/check';
	export default {
		data(){
			return{
				accountListBol: false,
				searchInput: '',
				message_count: ""
			}
		},
		methods:{
			search(){
	    		let keyword = this.searchInput ;
	    		keyword = keyword.trim();
	    		if (keyword) {
	    			window.open(`relatedGoods.html?keyword=${keyword}`);
	    		}else {
	    			MessageBox.alert('请输入关键字', '提示', {
			          	confirmButtonText: '确定'
				    });
	    		}
	    	}
		},
		created(){
			this.$nextTick(()=>{
				let params = {
					token: getCookie('token')
				}
				postReq('/message/getUnreadMessageCount',params).then(res=>{
					let {errcode,content,message} = res ;
		      		if (errcode == 0) {
		      			this.message_count = content.message_count;
		      		} else {
		      			errorInfo(errorInfo,message);
		      		}
				})
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.nav-box{
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #fff;
	}
	.mylogo{
		float: left;
		width: 200px;
		font-size: 28px;
		cursor: pointer;
		a{
			color: #fff;
		}
	}
	.nav-title{
		float: left;
	}
	.nav-list{
		margin-left: 80px;
		li{
			float: left;
			position: relative;
			cursor: pointer;
			font-size: 16px;
			font-weight: 600;
			width: 120px;
			text-align: center;
			color: #fff;
		}
		a{
			display: inline-block;
			width: 100%;
			color: #fff;
		}
		.account-link:hover{
			color: #ffa4a3;
		}
	}
	.account-options{
		position: absolute;
		left: 0px; 
		z-index: 10;
		overflow: hidden;
		li{
			height: 40px;
			line-height: 40px;
			font-weight: 400;
		}
		li:hover{
			background-color: #fff;
			color: #ffa4a3;
		}
	}
	.search-box{
		float: right;
		width: 310px;
		height: 28px;
		line-height: 28px;
		margin-top: 16px;
		margin-right: 20px;
		overflow: hidden;
		input{
			float: left;
			width: 250px;
			height: 28px;
		}
		button{
			float: left;
			width: 60px;
			height: 28px;
			text-align: center;
			background-color: #eee;
		}
	}
</style>