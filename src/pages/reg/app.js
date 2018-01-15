import Vue from 'vue'
import App from './App.vue'
import "babel-polyfill";
import {Form,FormItem,Button,Input} from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)

new Vue({
  el:'#app',
  template:'<App/>',
  components:{
    App
  }
})
