import {postReq} from './api'
import {errorInfo} from './check';
export default {
	data(){
		return{
			userInfo: {},
			orderInfo: {}
		}
	},
	created(){
		this.$nextTick(()=>{
			let token = getCookie('token');
			if (token) {
				let params = {
					token: token
				}
				postReq('/customer/getCustomerInfo',params).then(res=>{
					let {errcode,message,content} = res ;
					if(errcode == 0){
						this.userInfo = content.customer;
						this.orderInfo = content.order;
					}else {
						errorInfo(errcode,message);
					}
				})
			}
		})
	}
}