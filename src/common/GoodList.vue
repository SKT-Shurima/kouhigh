<template>
	<li class="info-list border-rb" :style="{width:col==5?'248px':'208px'}">
		<dl :class="{'hover-border':hover}" @click='goodDetail'>
			<dt>
				<img :src="good.cover">
			</dt>
			<dd>
				<div class="ellipsis-2 sell-info" v-text='good.name'></div>
				<div class="price-info">
					<span class='color-primary'>
						${{good.price}}
					</span>
					<em class='color-9'>
						{{good.sale_count}}人付款
					</em>
				</div>
			</dd>
		</dl>
	</li>
</template>
<script type="text/javascript">
	export default {
		props:{
			good:{
				type: Object
			},
			col:{
				type: Number,
				default: 5
			},
			hover:{
				type: Boolean,
				default: true
			}
		},
		methods: {
			goodDetail(){
				let id = this.good.goods_id;
				window.open(`goodDetail.html?goods_id=${id}`) ;
			}
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	.info-list{
		cursor: pointer;
		dl{
			padding: 14px;
			cursor: pointer;
			border: 2px solid transparent;
		}
		dt{
			img{
				width: 100%;
				height: 100%;
			}
		}
		dd{
			width: 100%;
			overflow: hidden;
		}
		.sell-info{
			height: 36px;
		    line-height: 18px;
		    margin-top: 10px;
		}
		/*价格信息*/
		.price-info{
			margin-top: 6px;
			span{
				font-size: 18px;
			}
			em{
				margin-top: 4px;
				float: right;
			}
		}
	}
	.hover-border:hover{
		border-color: #ffa4a3;
	}
</style>