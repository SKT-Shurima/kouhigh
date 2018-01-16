<template>
	<ul class="coupons" v-if='couponsList.length'>
		<li v-for='(item,index) in couponsList' :key='index'>
			<dl>
				<dt>
					<i>￥</i>
					<span v-text='item.amount-0'></span>
				</dt>
				<dd>
					<div class="title">优惠券</div>
					<div class="limit">满{{item.limit-0}}使用</div>
				</dd>
			</dl>
			<div class="btn">
				<button class='color-primary' @click='receve(item.coupon_id)' type='text'>
					立即领取
				</button>
			</div>
		</li>
	</ul>
</template>
<script>
import {postReq} from '../../assets/js/api';
import {errorInfo} from '../../assets/js/check';
import {MessageBox} from  'element-ui';
	export default {
		data(){
			return {
				couponsList: [],
				params: {}
			}
		},
		props:{
			seller_id: {
				type: String
			}
		},
		methods:{
			receve(id){
				let  token  = getCookie('token');
				if (token) {
					let params = {
						token: token,
						coupon_id: id
					}
					postReq('/coupon/receveCoupon',params).then(res=>{
						let {errcode,message,content} = res ;
						if(errcode == 0){
							MessageBox.alert(message, '提示', {
					          	confirmButtonText: '确定',
					          	type: 'success'
						    });
							this.getCoupon();
						}else {
							errorInfo(errcode,message) ;
						}
					})
				}else{
					MessageBox.confirm('请先登录', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
				        location.href='login.html' ;
			        }).catch(() => {
			            return false;          
			        });
				}
				
			},
			getCoupon(){
				postReq('/coupon/getCoupons',{}).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.couponsList = content.coupon;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getCoupon();
			})
		}
	}
</script>
<style lang='scss' scoped>
	.coupons{
		width: 220px;
		margin-left: 10px;
		margin-bottom: 70px;
		li{
			width: 220px;
			height: 116px;
			margin-bottom: 10px; 
			border-radius: 8px;
			padding: 0px 20px;    
			background: -webkit-linear-gradient(left,#fdd6ab,#fea5a1); 
		}
		dl{
			overflow: hidden;
			padding: 12px 0px;
			border-bottom: 1px dashed #fff;
			color: #fff;
		}
		dt,dd{
			float: left;
		}
		dt{
			i{
				font-size: 16px;
				vertical-align: top;
			}
			span{
				font-size: 36px;
				line-height: 36px;
			}
		}
		dd{
			width: 88px;
			margin-left: 8px;
			line-height: 26px;
			text-align: center;
			.title{
				font-size: 22px;
			}
			.limit{
				font-size: 16px;
			}
		}
		.btn{
			margin: 10px 0px;
			text-align: center;
			button{
				width: 108px;
				height: 20px;
				line-height: 20px;
				font-size: 16px;
				border-radius: 10px;
				padding: 0px;
				background-color: #fff;
			}
		}
	}
</style>