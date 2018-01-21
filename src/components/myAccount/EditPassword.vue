<template>
	<div class="wrap">
		<h4 class='bread-nav'><a href="personCenter.html">我的KouHigh</a>&nbsp;<i>&gt;</i>&nbsp;<a href="javascript:void(0);">账户安全</a>&nbsp;<i>&gt;</i>&nbsp;<a href="javascript:void(0);">修改密码</a></h4>
		<div class="container">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='right' style="margin-top: 30px;">
				<div>
					<el-form-item label="当前邮箱">
						{{userInfo.email}}
					</el-form-item>
					<el-form-item label="邮箱验证码" prop="verify_code">
					    <el-input v-model="ruleForm.verify_code" style='width:178px;'></el-input>
					    <el-button type='text' style='float: right;width:110px;padding: 13px;background-color: #ffc732;color: #fff;' @click='send_code' v-text='send_btn' :disabled='time>=0'></el-button>
					</el-form-item>
					<el-form-item label="当前密码" prop="password">
					    <el-input type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="npassword">
					    <el-input type="password" v-model="ruleForm.npassword"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="confirm_password">
					    <el-input type="password" v-model="ruleForm.confirm_password"></el-input>
					</el-form-item>
				</div>
				<div style="width:300px;margin:20px 100px 70px;">
				    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.verify_code&&ruleForm.password&&ruleForm.npassword&&ruleForm.confirm_password)' >确定</el-button>
				</div>	  
			</el-form>
		</div>
	</div>
</template>
<script >
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {MessageBox} from  'element-ui';
	export default{
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
	        	} else if (value !== this.ruleForm.npassword) {
	          		callback(new Error('两次输入密码不一致!'));
	        	} else {
	          		callback();
	        	}	
	      	};
			return{
				ruleForm:{
					verify_code: "",
					password: "",
					npassword: "",
					confirm_password: ""
				},
				rules: {
		          	verify_code: [
		            	{message: '请输入验证码', trigger: 'blur' }
		          	],
		          	password: [
		          		{message: '请输入旧密码', trigger: 'blur' }
		          	],
		          	npassword: [
		            	{validator: validatePass, trigger: 'blur' }
		          	],
		          	confirm_password: [
		            	{validator: validatePass2, trigger: 'blur' }
		          	]
		        },
		        time: -1 ,
		        total_time: 60, 
		        send_btn: '发送验证码'
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
		methods:{
			send_code(){
	      		let timestamp = parseInt(new Date().getTime()/1000),sign=`email=${this.userInfo.email}&t=4&timestamp=${timestamp}&type=1&verify=com.pinet.spore`;
	      		let params = {
	      			timestamp: timestamp,
					sign: hex_md5(sign),
					email: this.userInfo.email,
					type: 7
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
		      			errorInfo(errcode,message);
		      		}
		      	})
		    },
		    submitForm(formName) {
	        	this.$refs[formName].validate((valid) => {
	          		if (valid) {
	          			let params = this.ruleForm;
	          			params.email = this.userInfo.email;
	          			params.token = getCookie('token');
	            		postReq('/customer/changePwd',params).then(res=>{
	            			let {errcode,message} = res ;
	            			if(errcode == 0){
	            				delCookie('token');		
			            		MessageBox.alert('密码修改成功，重新登录', '提示', {
						          	confirmButtonText: '确定',
						          	callback: action => {
							            location.href= 'login.html'
							        }    
								});	
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
	.container{
		width: 400px;
		margin: 0px auto;
	}
</style>