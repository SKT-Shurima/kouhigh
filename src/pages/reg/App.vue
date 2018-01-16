<template>
	<div>
		<v-head-slider :user-nav='false' :user-info='userInfo'></v-head-slider>
		<div class='logo-wrap'>
			<div class='center-box'>
				<div id='logo' onclick='_back()'></div>
			</div>
		</div>
		<div class="reg-wrap bg-f7">
			<div class="reg-box">
				<component :is='currentview'></component>
			</div>
		</div>
		<v-pro-mask></v-pro-mask>
		<v-base-footer></v-base-footer>
	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vRegInfo from '../../components/reg/RegInfo';
	import vProMask from '../../components/reg/ProMask';
	import vRegSuccess from '../../components/reg/RegSuccess';
	import vBaseFooter from '../../common/BaseFooter';
	import userMixin from '../../assets/js/userMixin';
	export default {
		data(){
			return {
				currentview: 'vRegInfo'
			}
		},
		components: {
			vHeadSlider,vBaseFooter,vRegInfo,vRegSuccess,vProMask
		},
		mixins: [userMixin]
	}
</script>
<style lang='scss' scoped>
	.logo-wrap{
		height: 130px;
		background-color: #fff;
	}
	.title{
		font-size: 20px;
		text-align: center;
		font-weight: 600;
		margin-bottom: 30px;
	}
   	.reg-wrap{
   		padding-top: 20px;
   	}
   	.reg-box{
   		width: 900px;
		height: 540px;
		margin: 0px auto;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 1px 1px 4px 4px #eee;
   	}
</style>