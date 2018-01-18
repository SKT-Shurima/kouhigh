<template>
    <div id="app">
        <v-head-slider :user-info='userInfo'></v-head-slider>
        <v-search :cart-goods='cartGoods' :cart-total='cartTotal'></v-search>
        <v-navs :navs='navs'></v-navs>
        <div class="center-box container">
            <div class='content-box'>
                <v-goods></v-goods>
            </div>
            <div class='slider-box'>
                <v-good-recommen></v-good-recommen>
            </div> 
            <v-guess-like></v-guess-like> 
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import vHeadSlider from '../../common/HeadSlider';
    import vSearch from '../../common/Search';
    import vNavs from '../../common/Nav';
    import vGoods from '../../components/relatedGoods/Goods';
    import vGuessLike from '../../common/GuessLike';
    import vGoodRecommen from '../../common/GoodRecommen';
    import vFooter from  '../../common/Footer';
    import {postReq} from '../../assets/js/api';
    import {errorInfo} from '../../assets/js/check';
    import userMixin from '../../assets/js/userMixin';
    import shopMixin from '../../assets/js/shopMixin';
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
            vHeadSlider,vSearch,vNavs,vGoods,vGuessLike,vGoodRecommen,vFooter
        },
        mixins: [userMixin,shopMixin]
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
    padding-left: 10px;
  }
  /*内容区域*/
  .content-box{
    width: 1000px;
    float: left;
    overflow: hidden;
  }
</style>
