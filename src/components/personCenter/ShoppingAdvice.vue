<template>
	<div class="wrap">
		<h4 class="title">购买建议</h4>
		<el-form :model="ruleForm"  ref="ruleForm" label-width="80px" label-position='left' class='person-edit-form'>
			<div>
				<div class="color-primary bread-title">填写建议</div>
				<el-form-item label="商品名称">
				    <el-input v-model="ruleForm.name" size='small'></el-input>
				</el-form-item>
				<el-form-item label="您的建议">
				    <el-input
					  	type="textarea"
					  	v-model='ruleForm.content'
					  	:autosize="{ minRows: 2, maxRows: 4}"
					  	placeholder="请输入内容">
					</el-input>
				</el-form-item>
				<el-form-item label="添加图片">
				    <el-upload
					class="upload-box"
					action="https://upload.qiniup.com"
				    :on-success="uploadSuccess"
				    :before-upload="beforeUpload"
					:file-list="picList"
					:on-remove="delPic"
					:data='form'
					list-type="picture">
			    		<el-button size="small" type="primary">选择文件</el-button>
			    		<div class="color-6">
			    			最多*张，每张图片大小不超过***，支持jpg，png格式
			    		</div>
					</el-upload>
				</el-form-item>
			</div>
			<div style="width:300px;margin:20px 100px 70px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.name&&ruleForm.content)'>保存</el-button>
			</div>	  
		</el-form>
	</div>
</template>
<script>
import {postReq} from '../../assets/js/api';
import {errorInfo} from '../../assets/js/check';
	export default{
		data(){
			return{
				ruleForm: {
					name: '',
					content: ''
		   		},
		   		form: {
      				"Content-Type": "application/octet-stream",
                    "token": ''
      			},
      			picList: []
			}
		},
		methods:{
			getqnauth(){
    			postReq('/upload/getUploadToken',{}).then(res=>{
					let {errcode,content,message} = res ;
	        		if(errcode == 0){
						setCookie('qnauth',content.token,2);
						setCookie('qndomain',content.domain,2);
						this.form.token = content.token;
					}else {
						errorInfo(errcode,message);
					}
				})
    		},
			beforeUpload(file){
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
			delPic(file, fileList) {
		        this.picList = new Array ;
		    },
			uploadSuccess (res, file, fileList) {
	    	}
		},
		created(){
        	this.$nextTick(()=>{
        		this.form.token = getCookie('qnauth');
        		this.domain = getCookie('qndomain');
        		if (!this.form.token||!this.domain) {
        			this.getqnauth();
        		}
        	})
    	}
	}
</script>
<style lang='scss' scoped>
	.wrap{
		width: 1080px;
	}
	.title{
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		margin-bottom: 16px;
		border-bottom: 1px solid #ccc;
	}
</style>