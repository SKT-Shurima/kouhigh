import {postReq} from './api'
import {errorInfo} from './check';
export default {
	data(){
		return{
			cartGoods: [],
			cartTotal: 0
		}
	},
	methods:{
		getCart(){
			let params = {
				token: getCookie('token')
			}
			postReq('/cart/getCarts',params).then(res=>{
				let {errcode,message,content} = res ;
				if(errcode == 0){
					let cart = content.cart,goods=[],cartTotal=0;
					for(let i = 0;i<cart.length;i++){
						let goodsItem = cart[i].goods,price=0;
						goods = goods.concat(cart[i].goods);
						for(let j = 0; j< goodsItem.length;j++){
							cartTotal += goodsItem[j].price * goodsItem[j].quantity;
						}
					}
					this.cartGoods = goods;
					this.cartTotal = cartTotal;
				}else {
					errorInfo(errcode,message);
				}
			})
		}
	},
	created(){
		this.$nextTick(()=>{
			let token = getCookie('token');
			if (token) {
				this.getCart();
			}
		})
	}
}