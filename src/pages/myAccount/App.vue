<template>
    <div id="app">
		<v-head-slider :user-info='userInfo'></v-head-slider>
		<v-person-center-nav :user-info='userInfo'></v-person-center-nav>
		<div class="center-box container">
			<router-view :user-info="userInfo"></router-view>
		</div>
		<v-footer></v-footer>
  	</div>
</template>
<script>
	import vHeadSlider from '../../common/HeadSlider';
	import vPersonCenterNav from '../../common/PersonCenterNav';
	import vFooter from  '../../common/Footer';
	import userMixin from '../../assets/js/userMixin';
    export default {
    	components:{
    		vHeadSlider,vPersonCenterNav,vFooter
    	},
    	mixins: [userMixin],
    	created(){
    		this.$nextTick(()=>{
    			let token = getCookie('token');
    			if (!token) {
    				MessageBox.alert('请先登录', '提示', {
			            confirmButtonText: '确定',
			            callback: action => {
			                window.location.href = 'login.html';
			            }
			        });
    			}
    		})
    	}
    }
</script>
<style type="text/css" lang='scss' scoped>
	.container{
		margin-top: 30px;
	}
</style>
