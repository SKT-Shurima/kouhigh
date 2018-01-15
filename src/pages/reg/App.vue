<template>
	<div>
		<v-head-slider></v-head-slider>
		<div class='logo-wrap'>
			<div class='center-box'>
				<div class='logo'></div>
			</div>
		</div>
		<div class="login-wrap bg-f7">
			<div class="reg-wrap">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class='form-box' label-position='left'>
					<div class="reg-box">
						<div class="title">注册信息</div>
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
						<el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;'>注册</el-button>
						<span style="margin-left:10px;">已有账号？<a class='color-primary' href="login.html">请登录</a></span>
					</div>	  
				</el-form>
			</div>
		</div>
		<v-base-footer></v-base-footer>
	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vBaseFooter from '../../common/BaseFooter';
	import {MessageBox} from  'element-ui'
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
		            phone: '',
		            verify_code: '',
		            passwd: '',
		            confirm_passwd: "",
		            email: '',
		            share_code: '',
        		},
		        rules: {
		          	email: [
		            	{ type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
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
		components: {
			vHeadSlider,vBaseFooter
		},
		methods:{
			send_code(){
		      	if (this.ruleForm.email === '') {
		      		MessageBox.alert('请输入注册邮箱', '提示', {
			          confirmButtonText: '确定'
			        });
		      	} else {
		      		let params = {
			      	};
			      	// 请求发送验证码
			      	fun(params).then( res=>{
			      		let {errcode,message} = res ;
			      		if (errcode !== 0) {
			      		    MessageBox.alert(message, '提示', {
					          confirmButtonText: '确定'
						    });
			      		} else {
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
			      		}
			      	})
		      	}
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			            let params = {
			            };
			            // 注册接口
			            reg(params).then(res=>{
			            	let {errcode,content,message} = res ;
			            	if (errcode !== 0 ) {
			            		MessageBox.alert(message, '提示', {
						          	confirmButtonText: '确定'
							    });
			            	} else {
			            		setCookie('access_token',content.access_token,2);
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
<style lang='scss' scoped>
	.logo-wrap{
		height: 130px;
		background-color: #fff;
	}
	.title{
		font-size: 20px;
		text-align: center;
		font-weight: 600;
		margin-bottom: 30px;
	}
	.reg-wrap{
		padding: 20px;
	}
    .reg-box{
    	width: 400px;
    	margin: 0px auto;
    	padding-top: 40px;
    	color: #000;
    }
    .form-box{
		width: 900px;
		height: 540px;
		margin: 0px auto;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 1px 1px 4px 4px #eee;
	}
    .indent{
    	text-indent: 15px;
    }
    .referees-box{
		width: 500px;
		margin: 0px auto;
    	padding-top: 40px;
    	padding-bottom: 40px;
    	padding-left: 56px;
    	padding-right: 56px;
    	color: #000;
		border: 1px solid #f24450;
	}
	.reg-btn{
		width:500px;
		margin:50px auto;
		padding-left:156px;
	}
</style>