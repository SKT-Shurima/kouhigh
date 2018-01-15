import Vue from 'vue'
import App from './App.vue'
import "babel-polyfill";
import {Button,Checkbox} from 'element-ui'
Vue.use(Button)
Vue.use(Checkbox)

new Vue({
  el:'#app',
  template:'<App/>',
  components:{
    App
  }
})
