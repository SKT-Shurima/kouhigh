import Vue from 'vue'
import App from './App.vue'
import "babel-polyfill"

import {Button,Row,Col} from  'element-ui'; 


Vue.use(Button)
Vue.use(Row)
Vue.use(Col)


new Vue({
  el:'#app',
  template:'<App/>',
  components:{
    App
  }
})
