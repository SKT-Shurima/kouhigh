<template>
    <div id="app">
        <v-head-slider :user-info='userInfo'></v-head-slider>
        <v-search></v-search>
        <v-navs :navs='navs'></v-navs>
        <div class="center-box container">
            <div class='content-box'>
                <v-goods></v-goods>
            </div>
            <div class='slider-box'>
            </div>  
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import vHeadSlider from '../../common/HeadSlider';
    import vSearch from '../../common/Search';
    import vNavs from '../../common/Nav';
    import vGoods from '../../components/relatedGoods/Goods';
    import vFooter from  '../../common/Footer';
    import {postReq} from '../../assets/js/api';
    import {errorInfo} from '../../assets/js/check';
    import userMixin from '../../assets/js/userMixin';
    export default {
        data(){
            return{
                navs: [{
                    link: 'index.html',
                    name: '返回首页'
                }],
                page: 0,
                query: {}
            }
        },
        components:{
            vHeadSlider,vSearch,vNavs,vGoods,vFooter
        },
        mixins: [userMixin]
    }
</script>
<style type="text/css" lang='scss' scoped>
  .container{
    margin-top: 32px;
    overflow: hidden;
  }
  .slider-box{
    float: left; 
    width: 250px;
  }
  /*内容区域*/
  .content-box{
    width: 1000px;
    float: left;
    overflow: hidden;
  }
</style>
