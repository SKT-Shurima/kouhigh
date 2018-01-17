import Vue from 'vue'
import App from './App.vue'
import "babel-polyfill"
import {Button,Row,Col,Carousel,CarouselItem,Pagination,Tabs,TabPane} from  'element-ui'; 


Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
new Vue({
  el:'#app',
  template:'<App/>',
  components:{
    App
  }
})
