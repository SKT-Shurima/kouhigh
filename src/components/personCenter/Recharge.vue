<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to='/money'>资金管理</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to='/recharge'>充值</router-link></h4>
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" label-position='right' class='person-edit-form' style="margin-left: 0px;">
			<div>
				<el-form-item label="充值金额">
				    <el-input v-model="ruleForm.account" size='small'></el-input>
				</el-form-item>
				<el-form-item label="付款方式">
					<div>
						<el-radio class="radio" v-model="ruleForm.radio" label="4"><span style='font-size:12px;'>支付宝支付</span></el-radio>
	  					<el-radio class="radio" v-model="ruleForm.radio" label="5"><span style='font-size:12px;'>微信支付</span></el-radio>
					</div>
					<div>
						<el-radio class="radio" v-model="ruleForm.radio" label="4"><span style='font-size:12px;'>Paypal</span></el-radio>
	  					<el-radio class="radio" v-model="ruleForm.radio" label="5"><span style='font-size:12px;'>银行卡</span></el-radio>
					</div>
				</el-form-item>
			</div>
			<div style="width:300px;margin:20px 100px 70px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.account&&ruleForm.radio)' >保存</el-button>
			</div>	  
		</el-form>
	</div>
</template>
<script >
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	export default{
		data(){
			return{
				ruleForm:{
					radio: "4",
					account: ""
				}
			}
		},
		methods:{
		    submitForm(formName) {
	        	this.$refs[formName].validate((valid) => {
	          		if (valid) {
	            		postReq('',params).then(res=>{
	            			let {errcode,message} = res ;
	            			if(errcode == 0){
							}else {
								errorInfo(errcode,message);
							}
	           			})
	          		} 
	        	});
        	}
		}
	}
</script>
<style lang='scss' scoped>
	
</style>