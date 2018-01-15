<template>
	<ul v-if='commentList'>
				 		<li v-for='(item,index) in commentList.content' class="eval-box">
				 			<dl>
				 				<dt>
				 					<div class="avatar">
				 						<img :src="item.image">
				 					</div>
				 					<div v-text='item.nickname' class="name"></div>
				 				</dt>
				 				<dd>
				 					<p v-text='item.content' class="eval-container"></p>
				 					<ul class="eval-img-list">
				 						<li v-for='(imgItem,imgIndex) in item.images' @click='item.current_img=imgItem;item.currentIndex=imgIndex;' :class='{"eval-img-checked":item.currentIndex===imgIndex}'>
				 							<img :src="imgItem">
				 						</li>
				 					</ul>
				 					<div class="eval-big-img" v-show='item.current_img'>
				 						<img :src="item.current_img">
				 					</div>
				 					<div class="eval-msg">
				 						<div class="time">
				 							<span>
					 							{{item.date|dateStyleCh}}&nbsp;{{item.date|timeStyle}}
					 						</span>
					 						<strong>
					 							规格：{{item.option_name}}
					 						</strong>
					 					</div>
					 					<!-- 已经登录显示状态 -->
					 					<div class="more" v-if='hasLogin'>
					 						<button :class="item.is_useful==='0'?'is-userful':'canscel-userful'" @click='isUseful(item.id)'>{{item.is_useful==='0'?'有用':'取消有用'}}（{{item.useful}}）</button>
					 						<button @click='replyInfo.replyId=item.id;replyInfo.replyBol=true;replyInfo.replyIndex=index;'>回复（{{item.reply_count}}）</button>
					 						<button @click='getAddReply(item.id,index)'>{{replyList[index].bol?'收起':'展开'}}<img src="../../../static/detailImg/replayOpen.png" height="11" width="10" v-show='!replyList[index].bol'><img src="../../../static/detailImg/replayClose.png" v-show='replyList[index].bol'></button>
					 					</div>
					 					<!-- 没有登录显示状态 -->
					 					<div class="more" v-else>
					 						<button>有用（{{item.useful}}）</button>
					 						<button>回复（{{item.reply_count}}）</button>
					 						<button @click='getAddReply(item.id,index)'>{{replyList[index].bol?'收起':'展开'}}<img src="../../../static/detailImg/replayOpen.png" height="11" width="10" v-show='!replyList[index].bol'><img src="../../../static/detailImg/replayClose.png" v-show='replyList[index].bol'></button>
					 					</div>
					 					<!-- 回复组件 -->
					 					<reply :reply-info='replyInfo' @reply-success='refresh'></reply>
				 					</div>
				 					<!-- 追加评论列表 -->
				 					<div class="add-eval" v-show='replyList[index].bol'>
				 						<ul v-if='replyList[index].replyList'>
				 							<li v-if='replyList[index].replyList.seller_reply.reply_content'>
				 								<p class="add-con seller-reply">【店家回复】{{replyList[index].replyList.seller_reply.reply_content}}</p>
				 								<div class="add-time">
				 									{{(replyList[index].replyList.seller_reply.date_content-0)*1000|dateStyleCh}}&nbsp;{{(replyList[index].replyList.seller_reply.date_content-0)|timeStyle}}
				 								</div>
				 							</li> 
					 						<li v-for='replyItem in replyList[index].replyList.reply'>
					 							<p class="add-con">
					 								<span>{{replyItem.nickname}}：</span>{{replyItem.content}}
					 							</p>
					 							<div class="add-time">
					 								<span>{{(replyItem.reply_date-0)|dateStyleCh}}&nbsp;{{(replyItem.reply_date-0)|timeStyle}}</span>
					 							</div>
					 						</li>
					 					</ul>
					 					<div class="pack-up">
						 					<span @click='replyList[index].bol=false'>
						 						收起<img src="../../../static/detailImg/replayClose.png" height="11" width="10" alt="">
						 					</span>
					 						
					 					</div>
				 					</div>
				 					
				 				</dd>
				 			</dl>
				 		</li>
				 	</ul>
</template>