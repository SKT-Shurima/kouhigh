<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to="/userInfo">用户信息</router-link></h4>
		<div class='person-info'>
			<el-row>
				<el-col :span='2' style='line-height:180px;'>头像</el-col>
				<el-col :span='6' :offset="1">
					<router-link to="/editPortrait">
						<img v-if="userInfo.portrait" :src="userInfo.portrait" class="portrait">
						<img v-else src="../../../static/img/personCenter/no-portrait.png" class="portrait">
					</router-link>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2' style='line-height:30px;'>用户名</el-col>
				<el-col :span='6' :offset="1">
					<el-input v-model='nickname' size='small'></el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2' style='line-height:30px;'>出生日期</el-col>
				<el-col :span='6' :offset="1">
					<el-date-picker
				      v-model="birthday"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions" size='small' style='width:100%'
				      @change='changBirthday'>
				    </el-date-picker>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span='2' style='line-height:20px;'>性别</el-col>
				<el-col :span='6' :offset="1" style='line-height: 20px;'>
					<el-radio class="radio" v-model="sex" label="1">男</el-radio>
		  			<el-radio class="radio" v-model="sex" label="2">女</el-radio>
				</el-col>
			</el-row>
			<el-row style="padding-top: 20px;">
			    <el-col :span='2'>&nbsp;</el-col>
				<el-col :span='6'>
					 <el-button type='primary' size="small" @click='save'>保存</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
  	export default {
    	data() {
      		return {
      			pickerOptions: {
		          	disabledDate(time) {
		            	return time.getTime() > Date.now();
		          	}
		        },
      			nickname: '',
      			sex: '',
      			birthday: '',
      			editIndex: 0,
      			editNum: 0
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
    	watch:{
    		userInfo: {
    			handler(newVal,oldVal){
    				this.nickname = newVal.nickname;
    				this.birthday = newVal.birthday*1000;
    				this.sex = newVal.sex;
    			}
    		}
    	},
    	methods: {
    		changBirthday(){
	 			let birthday = this.birthday;
	 			if (typeof birthday === 'object') {
	 				this.birthday = this.birthday.getTime();
	 			}
	 		},
	 		commonAPI(type){
	 			let params={token: getCookie('token')},api = '';
	 			switch (type){
	 				case 1:
	 					api = '/customer/changeNickname';
	 					params.nickname = this.nickname;
	 				break;
	 				case 2:
	 					api = '/customer/changeBirthday';
	 					params.birthday = parseInt(this.birthday/1000);
	 				break;
	 				case 3:
	 					api = '/customer/changeSex';
	 					params.sex = this.sex;
	 				break;
	 			}
	 			postReq(api,params).then(res=>{
        			let {errcode,content,message} = res ;
        			if(errcode == 0){
        				this.editIndex++;
						if (this.editIndex===this.editNum) {
							window.location.reload();
						}
					}else {
						errorInfo(errcode,message);
					}
       			})
	 		},
    		save(){
    			if (this.nickname!==this.userInfo.nickname) {
    				this.editNum++;
    				this.commonAPI(1);
    			}
    			if (this.birthday!==this.userInfo.birthday*1000) {
    				this.editNum++;
    				this.commonAPI(2);
    			}
    			if (this.sex!==this.userInfo.sex) {
    				this.editNum++;
    				this.commonAPI(3);
    			}
    		}
    	},
    	created(){
        	this.$nextTick(()=>{
        	})
    	}
  	}
</script>
<style lang='scss' scoped>
	.person-info{
		margin-top: 30px;
		.el-row{
			margin-bottom: 20px;
			.portrait{
				width:178px;
				height:178px;
				cursor: pointer;
				margin-left: 12px;
			}
		}
		.el-row{
			margin-bottom: 20px;
			.el-col-2{
				text-align: right;
			}
			.el-col-6{
				margin-left: 12px;
			}
			img{
				width: 120px;
				height: 120px;
			}
			button{
			    width: 94px;
			}
		}
	}
</style>