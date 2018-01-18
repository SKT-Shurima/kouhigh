<template>
	<div class="page-wrap">
	    <div class="page-box">
	     	<div style="margin-top: 6px;">
		    	 <button class="bg-f5 color-6 page-btn" @click='changePage(0)' :class='{"page-btn-disable":currentPage===totalPage}' :disabled='currentPage===totalPage'>
			    	下一页<i style="margin-left:6px;">&gt;</i>
		    	</button>
		    </div>
		    <div class='color-6'>
		    	<el-pagination
				    @current-change="handleCurrentChange"
				   	:current-page="currentPage"
				    :page-count='totalPage'
				    layout="pager">
			    </el-pagination>
		    </div>
		   	<div style="margin-top: 6px;">
	    		<button class="bg-f5 page-btn" :class='{"page-btn-disable":currentPage===1}'  @click='changePage(1)' :disabled='currentPage===1'>
					<i style="margin-right: 6px;">&lt;</i>上一页
				</button>
	    	</div>
	    </div>
	</div>
</template>
<script>
	export default {
		data() {
	      	return {
	        	currentPage: 1
	      	}
	    },
	    props: {
	    	totalPage: {
	    		type: Number,
	    		require: true
	    	}
	    },
	    watch: {
	    	currentPage(newVal,oldVal){
	    		if(newVal!==oldVal){
	    			this.$emit('changePage',newVal)
	    		}
	    	}
	    },
		methods: {
	      	handleCurrentChange(val) {
	        	this.currentPage = val;
	      	},
	      	changePage(mask){
	      		if (mask) {
	      			this.currentPage--;
	      			if (this.currentPage<1) {
	      				this.currentPage = 1
	      			} 
		      	}else {
		      		this.currentPage++;
		      		if(this.currentPage>this.totalPage){
		      			this.currentPage = this.totalPage ;
		      		}
		      	}
	      	}
	    }
	}
</script>
<style lang='scss'>
.page-wrap {
    padding: 30px 0 80px;
    overflow: hidden;
    text-align: right;
    .page-box>div{
		float: right;
    }
    .page-box{
    	overflow: hidden;
    	.el-pagination {
		    margin-left: 6px;
		    margin-top: 4px;
		    font-weight: 400;
		}
		.el-pager li {
	    	width: 36px;
	    	height: 36px;
	    	line-height: 36px;
	    	text-align: center;
		    margin: 0 6px;
		    background-color: #fff;
		    border: 1px solid #ddd;
		}
		.el-pager li.active {
		    background-color: transparent;
		    border-color: transparent;
		}
    }
    .page-btn{
		width: 82px;
		height: 36px;
		border: 1px solid #ddd;
    }
    .page-btn-disable{
		background-color: #f6f6f6;
		color: #ddd;
		cursor: not-allowed;
    }
}
.el-pager{
	.number{
		color: #666;
	}
}
</style>