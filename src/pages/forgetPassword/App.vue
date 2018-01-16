<template>
	<div>
		<v-head-slider :user-nav='false' :user-info='userInfo'></v-head-slider>
		<div class='logo-wrap'>
			<div class='center-box'>
				<div id='logo' onclick='_back()'></div>
			</div>
		</div>
		<div class="reg-wrap bg-f7">
			<div class="reg-box">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class='form-box' label-position='left'>
					<div>
						<div class="color-primary title">找回密码</div>
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
					<div style="padding-left: 98px;">
						<i class='icon' :class="checkBol?'icon-check':'icon-uncheck'" @click='checkBol=!checkBol'></i><span class="color-6">我已同意<em class='color-lan'>《孢子商城用户协议》</em></span>
					</div>
					<div class="reg-btn">
						<el-button type="primary" :disabled='!(ruleForm.email&&ruleForm.passwd&&ruleForm.confirm_passwd&&ruleForm.verify_code&&checkBol)' @click="submitForm('ruleForm')" style='width:178px;'>确定</el-button>
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
	import {postReq} from '../../assets/js/api';
	import {MessageBox} from  'element-ui';
	import userMixin from '../../assets/js/userMixin';
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
				checkBol: true,
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
		components: {
			vHeadSlider,vBaseFooter
		},
		mixins: [userMixin],
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
						type: 2
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
							email: this.ruleForm.email,
							verify_code: this.ruleForm.verify_code,
							password: this.ruleForm.passwd
			            };
			            // 注册接口
			            postReq('/customer/forgetPwdEmail',params).then(res=>{
			            	let {errcode,content,message} = res ;
			            	if (errcode == 0 ) {
			            		delCookie('token');
			            		sessionStorage.customer = '';
			            		MessageBox.alert('密码修改成功，重新登录', '提示', {
						          	confirmButtonText: '确定',
						          	callback: action => {
							            location.href= 'login.html'
							        }    
								});	
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
   		padding-top: 20px;
   	}
   	.reg-box{
   		width: 900px;
		height: 540px;
		margin: 0px auto;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 1px 1px 4px 4px #eee;
   	}
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
	.icon-check,.icon-uncheck{
		margin-right: 10px;
		cursor: pointer;
	}
	.icon-check{
		background-image: url(../../../static/img/login/check.png);
	}
	.icon-uncheck{
		background-image: url(../../../static/img/login/uncheck.png);
	}
</style>