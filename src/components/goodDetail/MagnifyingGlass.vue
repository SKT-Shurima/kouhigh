<template>
<div id="wrap">
	<!--原图-->
		<div id="small" @mousemove='move($event)' @mouseenter='bol=true' @mouseleave='bol=false'>
			<img :src="currentImg"/>
			<span class='color-9 collection'>
				<i class="icon icon-col" v-show='col' @click='colGood'></i>
				<i class="icon icon-no-col" v-show='!col'></i>
				收藏
			</span>
			<!--放大镜-->
			<div id="slider" v-show='bol' :style='{left:sliderLeft+"px",top:sliderTop+"px"}'></div>
		</div>
		<!--放大镜区域-->
		<div id="big" v-show='bol'>
			<img :src="currentImg" :style='{left:bigLeft+"px",top:bigTop+"px"}'/>
		</div>
</div>
	
</template>
<script type="text/javascript">
export default {
	data() {
		return{
			bigLeft: 0,
			bigTop: 0 ,
			sliderLeft: 0,
			sliderTop: 0,
			bol: false
		}
	},
	props: {
		currentImg:{
			type: String,
			required: true 
		},
		col: {
			type: Boolean,
			default: false
		}
	},
	methods:{
		move(e){
			var wrap  =document.getElementById('wrap');
			var small = document.getElementById("small") ;
			var big = document.getElementById("big") ;
			var slider = document.getElementById("slider") ;
			var bigImg = document.getElementsByTagName("img")[1] ;
			var even = e || event;
			var x = even.clientX - wrap.offsetLeft - slider.offsetWidth/2 ;
			var y = even.clientY - wrap.offsetTop + window.pageYOffset - slider.offsetHeight/2 ;
			//水平方向最大临界值
			var maxX = small.clientWidth - slider.clientWidth ;
			//竖直方向最大的临界值
			var maxY = small.clientHeight - slider.clientHeight ;
			//对超出临界点做处理
			if (x < 0) {
				x = 0 ;
			}
			if ( x > maxX) {
				x = maxX ;
			}
			if (y < 0 ) {
				y = 0 ;
			}
			if (y > maxY) {
				y = maxY ;
			}
			this.sliderLeft = x;
			this.sliderTop = y;
			this.bigTop = -y/260*260 ;
			this.bigLeft = -x/260*260 ;
		},
		colGood(){
			let params = ''
		}
	}
}

</script>
<style lang='scss' scoped>
	#wrap{
		position: relative;
	}
	#small{
		width: 420px;
		height: 420px;
		position: relative;
	}
	#small>img{
		width:100%;
		height: 100%;
	}
	.collection{
		position: absolute;
		right: 30px;
		bottom: 30px;
	}
	.icon-col,.icon-no-col{
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	.icon-col{
		background-image: url('../../../static/img/goodDetail/col.png');
	}
	.icon-no-col{
		background-image: url('../../../static/img/goodDetail/no-col.png');
	}
	#slider{
		width: 160px;
		height: 160px;
		background: rgba(255,255,0,0.3);
		position: absolute;
		top: 0;
	}
	#big{
		width: 420px;
		height: 420px;
		position: absolute;
		top: 0;
		left: 450px ;
		z-index: 10;
		overflow: hidden;
		img{
			width: 640px;
			height: 640px;
			position: absolute;
		}
	}
</style>