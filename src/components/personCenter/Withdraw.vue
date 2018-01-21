<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to='withdraw'>提现</router-link></h4>
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" label-position='right' class='person-edit-form' style="margin-left: 0px;">
			<div>
				<el-form-item label="提现金额">
				    <el-input v-model="ruleForm.account" size='small'></el-input>
				</el-form-item>
				<dl style="padding-left: 100px;">
					<dt class='color-6' style="line-height: 30px;">当前可提现金额：${{userInfo.balance}}</dt>
					<dd>
						<el-checkbox size='small' v-model='withdrawAll'>全部提现</el-checkbox>
					</dd>
				</dl>
			</div>
			<div style="width:300px;margin:20px 100px 70px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!ruleForm.account' >确定</el-button>
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
					account: ""
				},
				withdrawAll: false
			}
		},
		props: {
			userInfo: {
				type: Object,
				required: true,
				default: function(){
					return {}
				}
			}
		},
		watch: {
			withdrawAll:{
				handler(newVal,oldVal){
					if (newVal) {
						this.ruleForm.account = this.userInfo.balance;
					}
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