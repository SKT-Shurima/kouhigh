<template>
	<div class="wrap">
		<h4 class='bread-nav'><router-link to='/'>我的KouHigh</router-link>&nbsp;<i>&gt;</i>&nbsp;<router-link to='/money'>资金管理</router-link></h4>
		<dl class="amount-info">
			<dt><span>账户余额</span><em class='ellipsis-1 color-primary'>${{userInfo.balance}}</em>
			</dt>
			<dd>
				<button class="border-primary"><router-link to="recharge" class="color-primary">充值</router-link></button>
				<button class="border-primary color-primary"><router-link to="withdraw" class="color-primary">提现</router-link></button>
				<button class="border-primary"><router-link to="" class="color-primary">积分明细</router-link></button>
			</dd>
		</dl>
		<div class="color-6 bg-f5 person-account-title">
	 		<i class="icon-square"></i>
	 		<span style="vertical-align: 4px;">资金明细</span>
	 	</div>
	 	<div v-if='financeList.length'>
	 		<ul class="money-list">
		 		<li v-for='(item,index) in financeList' :key="index">
		 			<el-row>
		 				<el-col :span='4'>
		 					{{item.date_add|dateymd}}
		 				</el-col>
		 				<el-col :span='4'>
		 					<span :class='{"color-primary":item.title-0<0}'>{{item.title}}</span>
		 				</el-col>
		 				<el-col :span='16'>
		 					{{item.comments}}
		 				</el-col>
		 			</el-row>
		 		</li>
		 	</ul>
		 	<v-pagination :total-page='totalPage-0' @changePage='changePage' ref='pagination'></v-pagination>
	 	</div>
	 	<div v-else style='font-size:16px;margin-top: 16px;'>
			暂无资金明细
		</div>
	</div>
</template>
<script>
import vPagination from '../../common/Pagination';
import {dateymd} from '../../assets/js/filter';
import {postReq} from '../../assets/js/api';
import {errorInfo} from '../../assets/js/check';
  	export default {
    	data() {
     	 	return {
		      	page: 1,
				totalPage: 1,
		      	financeList: []
      		};
    	},
    	filters:{
			dateymd
		},
   		components:{
			vPagination
		},
		props:{
			userInfo:{
				type: Object,
				required: true,
				default: function(){
					return {}
				}
			}
		},
    	methods: {
			initList(){
				let params  ={
					access_token: getCookie('access_token'),
					page: this.page
				}
				finance(params).then(res=>{
					let {errcode,message,content,pageSize} = res ;
					if(errcode == 0){
						this.financeList = content;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
    },
    created(){
        this.$nextTick(()=>{
        	// this.initList();
        })
    }
  }
</script>
<style lang='scss' scoped>
	.amount-info{
		overflow: hidden;
		padding: 46px 0px;
		dt,dd{
			float: left;
		}
		dt{
			width: 330px;
			height: 36px;
			line-height: 36px;
			span{
				padding-left: 20px;
				padding-right: 10px;
				vertical-align: top;
			}
			em{
				font-size: 28px;
				font-weight: 600;
			}
		}
		dd{
		    width: 700px;
		    text-align: right;
		}
		button{
			display: inline-block;
			width: 92px;
			line-height: 30px;
			margin-left: 10px;
			text-align: center;
	    	border-radius: 15px;
	    	background-color: transparent;
	    }
	    button:hover{
			background-color: #ffa4a3;
			a{
				color: #fff;
			}
	    }
	}
	.money-list{
		width: 840px;
		margin-left: 20px;
		margin-top: 10px;
		li{
			height: 40px;
			line-height: 40px;
		}
		.el-col-4{
			span{
				font-weight: 600;
				color: #008903;
			}
			.color-primary{
				color: #c71724;
			}
		}
	}
</style>