<template>
	<div class="bg-primary">
		<dl class='center-box nav-box'>
			<dt class='cate-list'>
				<div @mouseenter='listConBol=true;' @mouseleave="listConBol=cateShow?true:false;">全部商品分类</div>
				<ul class="con-list" @mouseenter="listBol=true;listConBol=true" @mouseleave="listBol=false;listConBol=false;listIndex='';" v-show='listConBol||cateShow'>
					<li class='bg-primary' v-for='(item,index) in category' :key='index'  @mouseenter='listIndex=index;fIndex=index' @click='checkGoods(index,item.category_id)'>
						<dl :class='{"check-unit":listIndex===index&&listConBol}'>
							<dt>
								<img :src="item.selected_icon" v-show='listConBol&listIndex===index'>
								<img :src="item.icon" v-show='!(listConBol&listIndex===index)'>
							</dt>
							<dd>{{item.name}}</dd>
						</dl>
					</li>
				</ul>
				<div class="type-list" v-show='listBol' v-if='category.length' @mouseleave='listBol=false;listConBol=false' @mouseenter='listBol=true;listConBol=true'>
					<div class="detail-list">
						<el-row v-for='(item2,index2) in category[fIndex].child_category' :key='item2.category_id' v-if='item2.child_category.length'>
							<el-col :span='4'>
							    <span v-text='item2.name' @click='checkGoods(`${fIndex},${index2}`,item2.category_id)'></span>
							    <em>></em>
							</el-col>
							<el-col :span='16' :offset="1">
								<span v-for='(item3,index3) in category[fIndex].child_category[index2].child_category' :key='item3.category_id' v-text='item3.name' @click='checkGoods(`${fIndex},${index2},${index3}`,item3.category_id)'></span>
							</el-col>
						</el-row>
					</div>
				</div>
			</dt>
			<dd class='nav-list' v-for='item in navs'>
				<a :href="item.link" v-text='item.name'></a>
			</dd>
		</dl>
	</div>
</template>
<script type="text/javascript">
	import {postReq} from '../assets/js/api';
	export default{
		data(){
			return{
				category: [],
				listBol: false,
				listConBol: false,
				fIndex: 0,
				listIndex: ''
			}
		},
		props:{
			navs: {
				type: Array
			},
			cateShow:{
				type: Boolean,
				default: false
			}
		},
		methods:{
			getCate(){
				postReq('/category/getCategory',{}).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.category = content.category;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getCate();
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.nav-box{
		height: 40px;
		line-height: 40px;
		cursor: pointer;
		color: #fff;
		.cate-list,.nav-list{
			float: left;
			width: 150px;
			text-align: center;
		}
		.cate-list{
			position: relative;
		}
		.nav-list{
			a{
				color: #fff;
			}
		}
	}
	.con-list{
		position: absolute;
		left: 0px;
		z-index: 99;
		width: 150px;
		dl{
			height: 100px;
			padding: 20px;
			text-align: center;
			border-top: 1px solid #fff;
		}
		dt{
			height: 40px;
			img{
				height: 100%;
			}
		}
		dd{
			line-height: 30px;
		}
	}
	.type-list{
		position: absolute;
		top: 40px;
		left: 150px;
		width: 850px;
		height: 500px;
		font-size: 12px;
		font-weight: 400;
		overflow: hidden;
		background-color: #fff;
		z-index: 99;
		color: #000;
	}
	.check-unit{
		color: #ffa4a3;
		background-color: #fff;
	}
	.detail-list{
		width: 600px;
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
		padding-left: 20px;
		padding-top: 28px;
		float: left;
		.el-row{
			margin-bottom: 22px;
		}
		.el-col-4{
			font-weight: 600;
			span{
				display: inline-block;
				width: 72px;
				text-align-last: justify;
				cursor: pointer;
			}
			em{
				margin-left: 6px;
			}
			
		}
		.el-col-16{
			overflow: hidden;
			padding-left: 6px;
			padding-bottom: 10px;
			border-bottom:  1px dashed #dcdcdc;
			span{
				float: left;
				margin-right: 16px;
				margin-bottom: 20px;
				cursor: pointer;
			}
		}
	}
</style>