<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to="/userInfo">用户信息</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to="/userInfo">修改头像</router-link></h4>
		<div class='upload-wrap'>
			<div class="upload">
				<el-upload
				    class="avatar-uploader"
				    action="https://upload.qiniup.com"
				    :show-file-list="false"
				    :on-success="handleSuccess"
        			:before-upload="beforeUpload"
        			:data="form">
				    <el-button size='small' type='text'>
						<img src="../../../static/img/personCenter/upload.png" height="12" width="12">上传图片
					</el-button>
				</el-upload>
			</div>
			<div class="color-9 tips">
				仅支持JPG、PNG格式，且大小不能超过2MB
			</div>
			<div class="show-portrait">
				<div class="default-portrait">
					<img :src="userInfo.portrait" v-if='userInfo.portrait'>
					<img src="../../../static/img/common/portraitDefault.jpg" height="250" width="250" v-else>
				</div>
				<dl class="big-portrait">
					<dt>
						<img :src="userInfo.portrait" v-if='userInfo.portrait'>
						<img src="../../../static/img/common/portraitBig.jpg" height="150" width="150" v-else>
					</dt>
					<dd class='color-6'>150px × 150px</dd>
				</dl>
				<dl class="small-portrait">
					<dt>
						<img :src="userInfo.portrait" v-if='userInfo.portrait'>
						<img src="../../../static/img/common/portraitSmall.jpg" height="50" width="50" v-else>
					</dt>
					<dd>
						50px × 50px
					</dd>
				</dl>
			</div>
		</div>
		<el-row style="padding-top: 20px;margin-left: 20px;">
		    <el-col :span='12'>
		    	<el-button type='primary' size="small" @click='save'>保存</el-button>
		    </el-col>
			<el-col :span='12'>
				 <el-button type='text' size="small"><router-link to='' class='color-6'>取消</router-link></el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
  	export default {
    	data() {
      		return {
      			portrait: "",
      			domain: '',
      			form: {
      				"Content-Type": "application/octet-stream",
                    "token": ''
      			}
      		};
    	},
    	props:{
    		userInfo: {
    			type: Object,
    			require: true,
    			default: function(){
    				return {}
    			}
    		}
    	},
    	methods: {
    		getQnToken(){
    			postReq('/upload/getUploadToken',{}).then(res=>{
					let {errcode,content,message} = res ;
	        		if(errcode == 0){
						setCookie('qntoken',content.token,2);
						setCookie('qndomain',content.domain,2);
						this.form.token = content.token;
					}else {
						errorInfo(errcode,message);
					}
				})
    		},
    		handleSuccess (res, file, fileList) {
    			this.portrait = res.key;
    			this.userInfo.portrait = `http://${this.domain}/${res.key}`;
    		},
        	beforeUpload (file) {
      	    	const isJPG = file.type === 'image/jpeg'||'image.png';
	        	const isLt2M = file.size / 1024 / 1024 < 2;
	        	if (!isJPG) {
	            	Message.error('上传头像图片只能是 JPG / PNG格式!');
	       		}
	        	if (!isLt2M) {
	            	Message.error('上传头像图片大小不能超过 2MB!');
	        	}
	        	return isJPG && isLt2M;
    		},
    		save(){
		    	let params = {
		    		access_token: getCookie('access_token'),
		    		portrait: this.portrait
		    	}
		    	postReq('/customer/changePortrait',params).then(res=>{
    				let {errcode,message} = res ;
            		if(errcode == 0){
						this.getAddress();
					}else {
						errorInfo(errcode,message);
					}
    			})
		    }
    	},
    	created(){
        	this.$nextTick(()=>{
        		this.form.token = getCookie('qntoken');
        		this.domain = getCookie('qndomain');
        		if (!this.form.token||!this.domain) {
        			this.getQnToken();
        		}
        	})
    	}
  	}
</script>
<style lang='scss' scoped>
	.upload-wrap{
		margin-left: 20px;
		margin-top: 30px;
	}
	.upload,.tips{
		width: 250px;
		text-align: center;
	}
	.upload{
		.el-button{
			width: 120px;
			color: #000;
			border: 1px solid #ccc;
			img{
				vertical-align: top;
				margin-right: 6px;
			}
		}
	}
	.tips{
		line-height: 56px;
		color: #999;
	}
	.show-portrait{
		width: 680px;
		overflow: hidden;
		div,dl{
			float: left;
		}
		dd{
			height: 36px;
			line-height: 36px;
		}
	}
	.default-portrait{
		width: 310px;
		height: 250px;
		padding-right: 60px;
		border-right: 1px solid #ccc;
		img{
			width: 250px;
			height: 250px;
		}
	}
	.big-portrait{
		width: 270px;
		height: 250px;
		text-align: center;
		padding-top: 50px;
		img{
			width: 150px;
			height: 150px;
			border-radius: 50%;
		}
	}
	.small-portrait{
		width: 90px;
		height: 250px;
		text-align: center;
		padding-top: 100px;
		img{
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
	}
	.el-row{
		width: 250px;
		.el-button{
			width: 94px;
			border: 1px solid #ccc;
		}
	}
</style>