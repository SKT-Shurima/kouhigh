<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class='form-box' label-position='left'>
		<div>
			<div class="color-primary title">注册信息</div>
			  <el-form-item label="注册邮箱" prop="email">
			    <el-input v-model="ruleForm.email"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="verify_code">
			    <el-input v-model="ruleForm.verify_code" style='width:178px;'></el-input>
			    <el-button type='primary' style='float: right;width:110px;padding:10px;text-align:center;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
			  </el-form-item>
			  <el-form-item label="设置密码" prop="passwd">
			    <el-input v-model="ruleForm.passwd" type="password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="confirm_passwd">
			    <el-input v-model="ruleForm.confirm_passwd" type='password'></el-input>
			  </el-form-item>
		</div>
		<div class="reg-btn">
			<el-button type="primary" :disabled='!(ruleForm.email&&ruleForm.passwd&&ruleForm.confirm_passwd&&ruleForm.verify_code)' @click="submitForm('ruleForm')" style='width:178px;'>注册</el-button>
			<span style="margin-left:10px;">已有账号？<a class='color-primary' href="login.html">请登录</a></span>
		</div>	  
	</el-form>
</template>
<script>
	import {MessageBox} from  'element-ui';
	import {postReq} from '../../assets/js/api';
	export default {
		data(){
			// 密码验证
	      	var validatePass = (rule, value, callback) => {
	         	if (value === '') {
	          		callback(new Error('请输入密码'));
	        	} else if(value.length<6){
	        		callback(new Error('密码长度至少六位'));
	        	}else{
	        		callback();
	        	}
	      	};
	      	// 确认密码验证
	      	var validatePass2 = (rule, value, callback) => {
	        	if (value === '') {
	          		callback(new Error('请再次输入密码'));
	        	} else if (value !== this.ruleForm.passwd) {
	          		callback(new Error('两次输入密码不一致!'));
	        	} else {
	          		callback();
	        	}	
	      	};
			return {
				ruleForm: {
		            verify_code: '',
		            passwd: '',
		            confirm_passwd: "",
		            email: '',
        		},
		        rules: {
		          	email: [
		            	{ required: true,type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
		          	],
		          	verify_code: [
		            	{ required: true, message: '请输入验证码', trigger: 'blur' }
		          	],
		          	passwd: [
		            	{ required: true, validator: validatePass, trigger: 'blur' }
		          	],
		          	confirm_passwd: [
		            	{ required: true, validator: validatePass2, trigger: 'blur' }
		          	]
		        },
		        time: -1 ,
		        total_time: 60, 
		        send_btn: '发送验证码'
			}
		},
		methods:{
			send_code(){
		      	if (this.ruleForm.email === '') {
		      		MessageBox.alert('请输入注册邮箱', '提示', {
			          confirmButtonText: '确定'
			        });
		      	} else {
		      		let timestamp = parseInt(new Date().getTime()/1000),sign=`email=${this.ruleForm.email}&t=4&timestamp=${timestamp}&type=1&verify=com.pinet.spore`;
		      		let params = {
		      			timestamp: timestamp,
						sign: hex_md5(sign),
						email: this.ruleForm.email,
						type: 1
			      	};
			      	// 请求发送验证码
			      	postReq('/sms/sendEmailCode',params).then( res=>{
			      		let {errcode,message} = res ;
			      		if (errcode == 0) {
			      			//  倒计时
			      			this.time = this.total_time ;
			      			let timer = setInterval(()=>{
					      		this.time--;
					      		this.send_btn = this.time + 's后重新发送';
					      		if (this.time < 0) {
					      			this.time = -1;
					      			this.send_btn = '发送验证码';
					      			clearInterval(timer);
					      		}
					      	},1000)
			      		} else {
			      			MessageBox.alert(message, '提示', {
					           confirmButtonText: '确定'
						    });
			      		}
			      	})
		      	}
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			            let params = {
							oauth: 'email',
							account: this.ruleForm.email,
							verify_code: this.ruleForm.verify_code,
							password: this.ruleForm.passwd
			            };
			            // 注册接口
			            postReq('/customer/register',params).then(res=>{
			            	let {errcode,content,message} = res ;
			            	if (errcode == 0 ) {
			            		this.$parent.currentview = 'vRegSuccess';
			            		sessionStorage.customer = JSON.stringify(content.customer);
			            		setCookie('token',content.customer.token,2);
			            	} else {
			            		MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定'
							    });
			            	}
			            })
			        } else {
			            MessageBox.alert('请完成必填信息', '提示', {
					          confirmButtonText: '确定'
					        });
			            return false;
			        }
		        });
		    }
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.form-box{
		width: 400px;
    	margin: 0px auto;
    	padding: 50px;
    	color: #000;
	}
	.title{
		font-size: 20px;
		text-align: center;
		font-weight: 600;
		margin-bottom: 30px;
	}
	.reg-btn{
		width:500px;
		margin:50px auto;
		padding-left: 100px;
	}
</style>