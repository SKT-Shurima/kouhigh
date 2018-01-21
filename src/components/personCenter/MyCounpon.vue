<template>
	<div class="wrap">
		<h4 class="title">我的优惠券</h4>
		<ul class="coupons-list-box" v-if='couponsList.length'>
			<li v-for='(item,index) in couponsList' :class='{"no-marigin-r":(index+1)%3===0}' class="coupons-list">
				<div class="info">
					<dl class="bg-primary limit" :class="item.able?'bg-primary':'bg-c'">
						<dt>$<em>{{Math.floor(item.amount-0)}}</em></dt>
						<dd>满{{Math.floor(item.limit-0)}}可用</dd>
					</dl>
					<ul>
						<li style="font-weight:600;font-size:14px;">{{item.name}}</li>
						<li class="color-6">发行方：{{item.issuer}}</li>
						<li class="color-6">有效时间：{{item.date_start|dateymdPoint}}-{{item.date_end|dateymdPoint}}</li>
					</ul>
				</div>
				<div class="color-6 opera">
					<span v-if='item.able'>进店看看</span>
					<span @click="delCoupon(item.coupon_id)">删除优惠券</span>
				</div>
			</li>
		</ul>
		<div v-else style='font-size:16px;'>
			暂无优惠券
		</div>
	</div>
</template>
<script >
import {dateymdPoint} from '../../assets/js/filter';
import {postReq} from '../../assets/js/api';
import {errorInfo} from '../../assets/js/check';
	export default{
		data(){
			return{
				couponsList: []
			}
		},
		filters:{
			dateymdPoint
		},
		methods:{
			initList(){
				let params  ={
					token: getCookie('token')
				}
				postReq('/customer/getCoupons',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						function initCoupons(arr,bol){
							for (let i = 0; i < arr.length; i++) {
								arr[i].able = bol
							}
							return arr;
						}
						this.couponsList = initCoupons(content.coupon.usable_coupons,true).concat(initCoupons(content.coupon.unusable_coupons,false));
					}else {
						errorInfo(errcode,message);
					}
				})
			},
			delCoupon(id){
				MessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
	          		confirmButtonText: '确定',
	          		cancelButtonText: '取消',
	          		type: 'warning'
	        	}).then(() => {
	        		let params  ={
	        			token: getCookie('token')
	        		}
	        		return;
		         	postReq('',params).then(res=>{
			 			let {errcode,message,content} = res;
			 			if(errcode == 0) {
			 				window.location.reload();
						}else{
							errorInfo(errcode,message);
					}
			 	})
	        	}).catch(() => {});
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.initList();
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
	.coupons-list-box{
		width: 100%;
		overflow: hidden;
	}
	.coupons-list{
		float: left;
		width: 350px;
		margin-right: 15px;
		margin-top: 12px;
	}
	.info{
		width: 100%;
		height: 120px;
		text-align: center;
		box-shadow: 0px 0px 2px 2px #f0f0f0;
		ul{
			float: left;
			width: 230px;
			padding: 18px;
		}
		li{
			line-height: 28px;
		}
	}
	.limit{
		float: left;
	    width: 120px;
	    height: 120px;
	    padding: 20px 10px;
	    color: #fff;
    	dt{
    		font-size: 14px;
    		line-height: 40px;
    		em{
    			font-size: 34px;
    			font-weight: 600;
    			margin-left: 6px;
    			vertical-align: sub;
    		}
    	}
    	dd{
    		text-align: center;
	    	font-size: 16px;
	    	font-weight: 600;
    	}
	}
	.no-marigin-r{
		margin-right: 0px;
	}
	.opera{
		line-height: 50px;
		span{
			display: inline-block;
			padding: 0px 12px;
		}
	}
</style>