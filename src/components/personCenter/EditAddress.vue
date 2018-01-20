<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to=''>收货地址管理</router-link></h4>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position='right' class='person-edit-form'>
			<div>
				<div class="color-primary bread-title">新增收货地址</div>
				<el-form-item label="收货人姓名">
				    <el-input style='width:131px;' v-model="ruleForm.first_name" size='small' placeholder="名"></el-input>
				    <el-input style='width:124px;margin-left: 10px;' v-model="ruleForm.last_name" size='small' placeholder="姓"></el-input>
				</el-form-item>
				<el-form-item label="地址1">
				    <el-input v-model="ruleForm.address1" size='small'></el-input>
				</el-form-item>
				<el-form-item label="地址1">
				    <el-input v-model="ruleForm.address2" size='small'></el-input>
				</el-form-item>
				<el-form-item label="城市">
				    <el-input v-model="ruleForm.city" size='small'></el-input>
				</el-form-item>
				<el-form-item label="州">
				    <el-select v-model="ruleForm.state" size='small' placeholder="请选择">
					    <el-option
					      v-for="(item,index) in states"
					      :key="index"
					      :label="item"
					      :value="item">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="邮编">
				    <el-input v-model="ruleForm.zipcode" size='small'></el-input>
				</el-form-item>
				<el-form-item label="电话" prop='phone'>
				    <el-input v-model="ruleForm.phone" size='small'></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
				    <el-input v-model="ruleForm.email" size='small'></el-input>
				</el-form-item>
				<el-form-item>
				  	<el-checkbox v-model='setDefault'>设为默认收货地址</el-checkbox>
				</el-form-item>
			</div>
			<div style="width:300px;margin:20px 100px 70px;">
			    <el-button type="primary" @click="submitForm('ruleForm')" style='width:178px;' :disabled='!(ruleForm.first_name&&ruleForm.last_name&&ruleForm.address1&&ruleForm.address2&&ruleForm.phone&&ruleForm.state&&ruleForm.city&&ruleForm.email&&ruleForm.zipcode)' >保存</el-button>
			</div>	  
		</el-form>
		<div class="address-list">
			<div class="color-primary title" style="margin-bottom:20px;">
				已经保存了{{addressList.length}}条地址，还可以保存{{20-addressList.length}}条地址
			</div>
			<ul v-if='addressList.length'>
				<li v-for= '(item,index) in addressList' class='border-c' :class='{"border-primary":item.status==="1"}' :key='item.address_id'>
					<dl>
						<dt>
							<span v-text='item.name' class='ellipsis-1' style="display:inline-block;max-width: 240px;"></span>
							<strong v-text='item.phone' style='margin-left: 20px;'></strong>
							<em class='bg-y default-address' v-show='item.status==="1"'>默认地址</em>
						</dt>
						<dd class="ellipsis-1 address-info">
						    {{item.address1}},{{item.address2}},{{item.city}},{{item.state}}
						</dd>
						<dd>
							<em>邮编：{{item.zipcode}}</em>
							<span class="edit">
								<button class="color-lan" @click='ruleForm=addressList[index]'>修改</button>
								<i class='color-9'>|</i>
								<button class='color-lan' @click='removeAddress(item.address_id)'>删除</button>
							</span>
						</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {postReq} from '../../assets/js/api';
	import {errorInfo} from '../../assets/js/check';
	import {MessageBox} from  'element-ui';
  	export default {
    	data() {
	     	// 手机验证
    	 	var checkPhone = (rule, value, callback) => {
    	 		if (value === ''){
    	 			callback(new Error('请输入手机号'));
    	 		} else {
    	 			let reg = /^1[3|4|5|7|8][0-9]\d{8}$/ ;
		        	if ( !reg.test(value)) {
		          		callback(new Error('请输入正确手机号'));
		        	} else{
		        		callback();
		        	}
    	 		}
	      	};
      		return {
		      	setDefault: true,
		      	addressList: [],
		      	states: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","innesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jeresy ","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","SouthCarolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
		       	ruleForm: {
			        last_name: "",
					first_name: "",
					state: "",
					city: "",
					address1: "",
					address2: "",
					zipcode: "",
					phone: "",
					email: "",
					status: ""
		   		},
        		rules: {
          			phone: [
            			{ required: false, validator: checkPhone, trigger: 'blur' }
          			]
        		}
      		};
    	},
    	methods: {
    		getAddress(){
    			let params = {
    				token: getCookie('token')
    			}
    			postReq('/customer/getAddress',params).then(res=>{
    				let {errcode,content,message} = res ;
            		if(errcode == 0){
						this.addressList = content.address;
					}else {
						errorInfo(errcode,message);
					}
    			})
    		},
    		removeAddress(id){
    			MessageBox.confirm('是否删除该地址?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {
		            let params = {
	    				token: getCookie('token'),
	    				address_id: id
	    			}
	    			postReq('/customer/delAddress',params).then(res=>{
	    				let {errcode,message} = res ;
	            		if(errcode == 0){
							this.getAddress();
						}else {
							errorInfo(errcode,message);
						}
	    			})
		        }).catch(() => {});
    		},
      		submitForm(formName) {
	        	this.$refs[formName].validate((valid) => {
	          		if (valid) {
	            		let params = this.ruleForm;
	            		params.token = getCookie('token');
	            		params.status = this.setDefault?'1':'0';
	            		postReq('/customer/saveAddress',params).then(res=>{
	            			let {errcode,message} = res ;
	            			if(errcode == 0){
								window.location.reload();
							}else {
								errorInfo(errcode,message);
							}
	           			})
	          		} 
	        	});
        	}
    	},
    	created(){
        	this.$nextTick(()=>{
        		this.getAddress();
        	})
    	}
  	}
</script>
<style lang='scss' scoped>
	.address-list{
		ul{
			overflow: hidden;
		}
		li{
			float: left;
			width: 490px;
			padding: 20px;
			margin-right: 14px;
			margin-bottom: 16px;
		}
		dt{
			font-size: 14px;
			font-weight: 600;
			em{
				float: right;
			}
		}
		.address-info{
			padding: 10px 0px;
		}
	}
	.default-address{
		display: inline-block;
		width: 80px;
		line-height: 28px;
		text-align: center;
		border-radius: 14px;
		color: #fff;
	}
	.edit{
		float: right;
		button{
			background: transparent;
		}
	}
</style>