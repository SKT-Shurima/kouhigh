<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to="/addBank">我的银行卡</router-link></h4>
		<ul class='bank-list'>
			<li class='border-f0' v-for='(item,index) in 5' :key='index'>
				<i class='icon icon-ABC'></i>
				<strong>农业银行</strong>
				<span class="color-6">{{125146415411655456|bank_filter}}</span>
			</li>
			<li class='border-primary' style="text-align: center;line-height: 30px;">
				<i class='icon icon-add-bank'></i>
				<span class='color-primary'>添加银行卡</span>
			</li>
		</ul>
	</div>
</template>
<script>
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {bank_filter} from '../../assets/js/filter';
  	export default {
    	data() {
      		return {
		      	bankList: []
      		};
    	},
    	filters: {bank_filter},
    	methods: {
    		getBank(){
    			let params = {
    				token: getCookie('token')
    			}
    			postReq('/customer/getAddress',params).then(res=>{
    				let {errcode,content,message} = res ;
            		if(errcode == 0){
						this.addressList = content.address;
					}else {
						errorInfo(errcode,message);
					}
    			})
    		}
    	},
    	created(){
        	this.$nextTick(()=>{
        	})
    	}
  	}
</script>
<style lang='scss' scoped>
	.bank-list{
		width: 724px;
		margin-top: 30px;
		li{
			float: left;
			width: 330px;
			height: 60px;
			margin-right: 30px;
			margin-bottom: 30px;
			border-radius: 5px;
			padding: 14px 20px;
		}
		strong,span{
			display: inline-block;
		}
		strong{
			font-size: 16px;
			margin: 0px 10px;
		}
	}
	.icon-ABC,.icon-CCB,.icon-CMB,.icon-OB{
		width: 30px;
		height: 30px;
		vertical-align: -9px;
	}
	.icon-ABC{
		background-image: url(../../../static/img/personCenter/ABC.png);
	}
	.icon-CCB{
		background-image: url(../../../static/img/personCenter/CCB.png);
	}
	.icon-CMB{
		background-image: url(../../../static/img/personCenter/CMB.png);
	}
	.icon-OB{
		background-image: url(../../../static/img/personCenter/OB.png);
	}
	.icon-add-bank{
		vertical-align: -4px;
		margin-right: 10px;
		background-image: url(../../../static/img/personCenter/add-bank.png);
	}
</style>