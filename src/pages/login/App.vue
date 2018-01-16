<template>
	<div>
		<v-head-slider :user-nav='false' :user-info='userInfo'></v-head-slider>
		<div class='logo-wrap'>
			<div class='center-box'>
				<div id='logo' onclick='_back()'></div>
			</div>
		</div>
		<div class="login-wrap">
			<div class="bg" :style="{backgroundImage: `url(${adImage})`}"></div>
			<div class="content-layout">
				<a :href="adParams" class="cd"></a>
				<div class="login-box">
					<dl class="border-input mar-b">
						<dt>
							<img src="../../../static/img/login/usname.jpg" height="16" width="14" alt="username">
						</dt>
						<dd>
							<input type="text" name="username" v-model='username'/>
						</dd>
					</dl>
					<dl class="border-input mar-b">
						<dt>
							<img src="../../../static/img/login/pw.jpg" height="16" width="14" alt="password">
						</dt>
						<dd>
							<input type="password" name="passwd" v-model='passwd'/>
						</dd>
					</dl>
					<div style="overflow:hidden;padding-bottom: 30px;">
						<dl class="border-input" style="width:180px;float:left;">
							<dt>
								<img src="../../../static/img/login/code.jpg" height="16" width="14" alt="verify_code">
							</dt>
							<dd>
								<input type="text" v-model='verify_code' @keyup.enter='loginFn'/>
							</dd>
						</dl>
						<div class="vertify-box">
							<img :src="imgSrc" @click='initToken'>
							<el-button type='text' size='mini' @click='initToken'>看不清楚？换一张</el-button>
						</div>
					</div>
					<div class="select-box">
						<el-checkbox  v-model='remember'>记住密码</el-checkbox>
						<div style="float: right;">
							<a href="forgetPassword.html" style="color:#000;">忘记密码</a>
							<a href="reg.html" style="color: #f24450;margin-left:10px;">免费注册</a>
						</div>
					</div>
					<div class="login-btn">
						<el-button type='primary' @click='loginFn' :disabled='!(username&&passwd&&verify_code)'>登录</el-button>
					</div>
					<div class="cooperation">
						<div class="title-slider color-9" style="font-size:12px;">使用合作账号登录</div>
						<div class="partners">
							<a href="https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=101408899&redirect_uri=http%3A%2F%2Fshuaibo.zertone1.com%2Fweb%2FcustomerAction%2FqqWebLogin">
								<img src='../../../static/img/login/facebook.png' height="30" width="30" alt="facebook">
							</a>
							<a href="https://graph.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=101408899&redirect_uri=http%3A%2F%2Fshuaibo.zertone1.com%2Fweb%2FcustomerAction%2FqqWebLogin">
								<img src='../../../static/img/login/weixin.png' height="30" width="30" alt="facebook">
							</a>
							<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx06db8000a8ef09e3&redirect_uri=http%3A%2F%2Fshuaibo.zertone1.com%2Fweb%2FcustomerAction%2FwebWeixinLogin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect 
	"><img src="../../../static/img/login/weibo.png" height="30" width="30" alt="weibo"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-base-footer></v-base-footer>
	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vBaseFooter from '../../common/BaseFooter';
	import userMixin from '../../assets/js/userMixin';
	export default {
		data(){
			return {
				username: '',
				passwd: '',
				verify_code: '',
				remember: true,
				token: '',
				imgSrc: "",
				adImage: "http://static.strongmall.net/upload/ad/2017_10_30/14e67bb469a46b0627d74b424698707f4b535b13.jpg?imageView2/2/w/1920/h/600",
				adParams: ""
			}
		},
		components: {
			vHeadSlider,vBaseFooter
		},
		mixins: [userMixin],
		methods:{
			loginFn(){
				let params = {
					oauth: 'Web',
					param: this.username,
					passwd: this.passwd,
					verify_code: this.verify_code,
					token: this.token
				};
				login(params).then(res=>{
					let {errcode,message,content} = res;
					if (errcode !== 0) {
						MessageBox.alert(message, '提示', {
				          	confirmButtonText: '确定'
				        });
				        this.initToken() ;
					} else {
						//  判断是否记住密码
						let accountInfo ;
						if(this.remember){
							let username = base64encode(utf16to8(this.username));
							let passwd = base64encode(utf16to8(this.passwd));
							accountInfo = username + "&" + passwd;  
							setCookie('accountInfo',accountInfo,7*24);  
						}else {
							let hasUserInfo = getCookie('accountInfo');
							if (hasUserInfo) {
								delCookie('accountInfo');
							}
						}
						setCookie('access_token',content.access_token,2);
						var lastUrl =  document.referrer ;
						if (window.history.length>1&&lastUrl.indexOf("module")>=0) {
							if (lastUrl.indexOf('reg')>=0) {
								location.href = 'index.html' ;
							} else {
								window.history.go(-1);
							}
						}else{
							location.href = 'index.html' ;
						}
					}
				})
			},
			// 看不清，点击之后换一张
			initToken(){
				createToken().then(res=>{
					let {errcode,message,content} = res;
					if (errcode !== 0) {

					} else {
						this.token = content.token;
						this.imgSrc = `${base}/customerAction/createVerify?token=${this.token}`;
						
					}
				})
			},
			initAd(){
				let params = {
					t: "5"
				}
				getLoginAd(params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode !== 0){
						errorInfo(errcode,message) ;
					}else {
						this.adImage = content.ads[0].image ;
						this.adParams = content.ads[0].link ;
					}
				})
			}
			
		},
		mounted(){
			this.$nextTick(()=>{
				return;
				this.initToken();
				let accountInfo = getCookie('accountInfo');
				if (accountInfo) {
					accountInfo = accountInfo.split("&");
					this.username = utf8to16(base64decode(accountInfo[0]));
					this.passwd = utf8to16(base64decode(accountInfo[1]));
				}
				this.initAd();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.login-wrap{
		position: relative;
		margin-top: 4px;
	} 
	.bg{
	    position: absolute;
	    z-index: 9;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 600px;
	    min-width: 1250px;
	    background-repeat: no-repeat;
	    background-size: cover;
	    background-position: center center;
	}
	.logo-wrap{
		height: 130px;
		background-color: #fff;
	}
	.content-layout{
	    width: 1200px;
	    margin: 0 auto;
	    overflow: hidden;
	    position: relative;
	    height: 600px;
	    z-index: 999;
	}
    .login-box{
	    position: absolute;
	    top: 70px;
	    right: 0px;
	    width: 372px;
	    height: 420px;
	    padding: 38px 36px 0px;
	    border-radius: 4px;
	    background-color: #fff;
	    .mar-b{
	    	margin-bottom: 20px;
	    }
	    .border-input{
	    	border-radius: 4px;
	    	border: 1px solid #ccc;
	    }
	    dl{
	    	height: 36px;
	    	position: relative;
	    }
    	dt{
			width: 32px;
			height: 36px;
			text-align: center;
			line-height: 34px;
			position: absolute;
			left: 0px;
			top: 0px;
    	}
    	dd{
    		width: 100%;
    		height: 36px;
    		position: absolute;
    		padding-left: 32px;
    		padding-right: 2px;
    		top: 0px;
    		left: 0px;
    		input{
    			border: none;
    			width: 100%;
    			height: 32px;
    			outline: none;
    		}
    	}
	}
    .vertify-box{
    	width: 108px;
    	height: 36px;
    	float: right;
    	position: relative;
    	img{
    		width: 106px;
    		height: 34px;
    		border: 1px solid #ccc;
    		border-radius: 4px;
    		cursor: pointer;
    	}
    	.el-button{
    		position: absolute;
    		top: 36px;
    		line-height: 20px;
    	}
    }
    .select-box{
    	width: 100%;
    	height: 36px;
    	line-height: 36px;
    	font-size: 14px;
    	overflow: hidden;
		.el-checkbox{
			float: left;
		}
    }
	.login-btn{
		width: 100%;
		margin-top: 16px;
		margin-bottom: 40px;
		.el-button{
			width: 100%;
		}
	}
	.cooperation{
		width: 260px;
		margin: 0px auto;
		.title-text{
			width: 110px;
			padding: 0px 6px;
		}
		.partners{
			width: 160px;
			height: 30px;
			margin: 10px auto 0px;
			overflow: hidden;
			text-align: center;
			img{
				padding-left: 10px;
				padding-right: 10px;
				cursor: pointer;
			}
		}
	}	
	.cd{
		display: block;
		position: absolute;
		top: 78px;
		left: 78px;
		width: 630px;
		height: 440px;
	}
</style>