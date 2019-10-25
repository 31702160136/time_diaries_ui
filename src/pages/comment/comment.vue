<template>
	<div class="comment">
		<el-row class="header" type="flex" align="middle">
			<el-col :span="6" class="header-left">
				<div class="grid-content bg-purple-dark"><img style="width: 30px; height: 30px;" @click="toBack()" src="../../static/images/back.png"/></div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-dark" style="padding-top: 3px;">评论</div>
			</el-col>
		</el-row>
		<div class="main">
			<div @click="blur()">
				<el-row type="flex" class="panel">
						<div class="cover">
							<img v-if="resData.diaries.cover!=''" :src="resData.diaries.cover" />
							<img v-if="resData.diaries.cover==''" src="../../static/images/touxiang2.png" />
						</div>
						<el-col :span="20" class="infos">
							<el-row>
								<el-col :span="24" class="name" style="margin-bottom: 10px;color: #E6A23C;">
									{{resData.diaries.name}}
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="22" class="content">
									<div v-html="resData.diaries.content"></div>
								</el-col>
							</el-row>
							<el-row class="image-list">
								<div v-for="i in resData.url">
									<el-col :span="7" class="image-item">
										<img alt="" ref="img" :src="i" :style="'display:inline-block;width:100%;height:'+height2+'px;'" @click="showBigImg(i)">
									</el-col>
								</div>
							</el-row>
							<el-row class="time">
								<el-col :span="24" style="text-align: left; color: #B4BCCC; font-size: 12px;padding:10px 0 0 0;">
									{{resData.diaries.create_time}}
								</el-col>
							</el-row>
							<el-row class="more" type="flex" align="middle">
								<el-col :span="6" style="text-align: right;" class="xin">
									<img v-if="resData.diaries.is_praise" src="@/static/images/xin2.png" @click="praiseDiaries()">
									<img v-else src="@/static/images/xin1.png" @click="praiseDiaries()">
								</el-col>
								<el-col :span="6" style="text-align: left; border-right: 1px solid #DCDCDC;" class="zan">
									{{resData.diaries.praise}}
								</el-col>
								<el-col :span="6" style="text-align: right;" class="xiaoxi">
									<img src="../../static/images/comment.png">
								</el-col>
								<el-col :span="6" style="text-align: left;color: #f85a09;" class="replys">
									{{resData.diaries.comment}}
								</el-col>
							</el-row>
						</el-col>
				</el-row>
			</div>
			<div class="reply">
				<div v-for="(item,index) of resData.comment" :key="index" class="back">
					<div @click="reply(index,item)">
						<el-row style="padding: 5px;">
							<div class="reply-cover">
								<img v-if="item.cover!=''" :src="item.cover" />
								<img v-if="item.cover==''" src="../../static/images/touxiang2.png" />
							</div>
							<el-col :span="19" style="text-align: left;">
								<el-row type="flex" align="middle">
									<el-col :span="12">
										<a style="color: #E6A23C;">{{item.name}}</a>
									</el-col>
									<el-col :span="12" style="text-align: right;color: #909399;font-size: 12px;">
										{{$tools().noopsycheTime(item.create_time)}}
									</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="24" class="content">
										<span v-if="item.reply_user_id>0">回复<a style="color: #E6A23C;">{{item.be_re_name}}: </a></span>{{item.content}}
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
		<wimg :show="isShowBigImg" :imgs="resData.url" :currentImg="current" @close="closeBigImg()" style="z-index: 9;"></wimg>
		<div class="foot">
			<el-row>
				<el-col :span="24">
					<input type="text" v-model="formData.content" :placeholder="reply_user_name" ref="input"/>
					<el-button type="warning" size='mini' style="border: none;" @click="doComment(formData)">发送</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import wimg from 'w-previewimg'
	export default {
		data() {
			return {
				isShowBigImg: false,
				current: '',
				resData:{
					diaries:{
						comment: '',
						content: '',
						cover: '',
						create_time: 0,
						id: 0,
						is_praise: 0,
						name: '',
						page_views: 0,
						praise: '',
						type: 0,
						user_id: 0
					},
					url:[],
					comment:[]
				},
				reply_name:'',
				formData:{
					diaries_id:parseInt(this.$route.query.id),
					content:'',
					reply_user_id:0,
				}
			};
		},
		created(){
			this.init();
		},
		mounted() {
			window.addEventListener('scroll', this.blur, true);  // 监听（绑定）滚轮滚动事件
		},
		beforeDestroy () {
			window.removeEventListener("scroll", this.blur,true);
		},
		computed: {
			height2(){
				return this.height1;
			},
			reply_user_name(){
				return this.reply_name;
			}
		},
		methods: {
			init(){
				var data={
					id:parseInt(this.$route.query.id)
				}
				Indicator.open('加载中...');
				this.$http().DiariesDetails(data).then(res => {
					var status = res.data.status;
					if (status) {
						var text=res.data.data.diaries.content.replace(/\n/g, '<br>');
						var is_praise=false;
						if(res.data.data.diaries.is_praise>0){
							is_praise=true;
						}
						this.resData.diaries={
							comment: parseInt(res.data.data.diaries.comment),
							content: text,
							cover: res.data.data.diaries.cover,
							create_time: this.$tools().noopsycheTime(res.data.data.diaries.create_time),
							id: res.data.data.diaries.id,
							is_praise: is_praise,
							name: res.data.data.diaries.name,
							page_views: res.data.data.diaries.page_views,
							praise: parseInt(res.data.data.diaries.praise),
							type: res.data.data.diaries.type,
							user_id: res.data.data.diaries.user_id
						}
						this.resData.url=res.data.data.url;
						this.resData.comment=res.data.data.comment;
						var that=this
						setTimeout(function(){
							if(that.$refs.img==undefined){
								return
							}
							for(var i=0;i<that.$refs.img.length;i++){
								that.$refs.img[i].style='display:inline-block;width:100%;height:'+that.$refs.img[0].clientWidth+'px;'
							}
						},10)
					} else {
						Toast(res.data.msg);
					}
					Indicator.close()
				});
			},
			praiseDiaries(){
				var data={
					diaries_id:this.resData.diaries.id
				}
				this.$http().PraiseDiaries(data).then(res => {
					var status = res.data.status;
					if (status) {
						if(this.resData.diaries.is_praise){
							this.resData.diaries.is_praise=false;
							this.resData.diaries.praise-=1;
						}else{
							this.resData.diaries.is_praise=true;
							this.resData.diaries.praise+=1;
						}
					} else {
						this.$router.push("/login");
					}
				});
			},
			delComment(index,id){
				var data={
					id:id
				}
				this.$http().delComment(data).then(res => {
					var status = res.data.status;
					if (status) {
						Toast("删除评论成功");
						this.resData.comment.splice(index,1)
					} else {
						Toast("删除评论失败");
					}
				});
			},
			showBigImg (img) {
				this.current=img
				this.isShowBigImg = true
			},
			closeBigImg(){
				this.current=''
				this.isShowBigImg = false
			},
			toBack(){
				this.$router.go(-1);
			},
			doComment(data){
				Indicator.open('加载中...');
				this.$http().Comment(data).then(res => {
					var status = res.data.status;
					if (status) {
						this.formData.content=''
						this.init()
						Toast(res.data.msg);
					} else {
						this.$router.push("/login");
					}
					Indicator.close()
				});
			},
			reply(index,item){
				if(item.user_id==this.$store.state.me.user_id){
					MessageBox.confirm('确定删除此评论？').then(action => {
						this.delComment(index,item.id)
					},error=>{
					
					});
				}else{
					this.reply_name="回复"+this.resData.comment[index].name+"：";
					this.formData.reply_user_id=this.resData.comment[index].user_id;
					this.$refs.input.focus()
				}
			},
			blur(){
				this.reply_name=''
				this.formData.reply_user_id=0
				this.$refs.input.blur()
			}
		},
		components: {
			wimg
		},
	}
</script>

<style scoped="scoped">
	.comment {
		background: white;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow-y: hidden;
	}

	.header {
		padding: 5px;
	}

	.header-left {
		text-align: left;
		font-size: 23px;
	}
	.content{
		overflow: hidden;
		white-space: normal;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
	}
	.main{
		position: absolute;
		top: 44px;
		right: 0;
		left: 0;
		bottom: 58px;
		overflow-y: auto;
		overflow-x: hidden;
		padding-bottom: 10px;
	}
	.main .panel{
		background: white;
		padding: 15px;
		border-top: #DCDCDC solid 1px;
	}
	.main .cover img{
		width: 50px;
		height: 50px;
		margin-right: 10px;
		border-radius: 5px;
	}
	.main .infos{
		text-align: left;
	}
	.image-list{
		margin-top: 10px;
	}
	.image-item{
		margin-right: 4px;
	}
	.image-item img{
		width: 100%;
		height: 100%;
		background: #000000;
	}
	.time .left{
		color: #909399;
		margin-top: 5px;
	}
	.more{
		margin-top: 10px;
		margin-bottom: -10px;
		margin-left: -10%;
	}
	.touch-img{
		transform: scale(1);
		transition: all ease 0.5s;
	}
	.comment-bottom{
		width: 100%;
		height: 2px;
		background: #E6A23C;
	}
	.reply{
		width: 95%;
		margin: 0 auto;
		text-align: left;
		overflow: auto;
		font-size: 13px;
		border-radius: 7px;
	}
	.back{
		background: #F5F5F5;
	}
	.reply img{
		width: 30px;
		height: 30px;
		border-radius: 5px;
		margin-right: 10px;
	}
	.reply-cover{
		float: left;
	}
	.foot{
		background: #F5F5F5;
		padding: 8px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.foot input{
		width: 70%;
		border: none;
		border-radius: 5px;
		height: 40px;
		margin-right: 10px;
	}
	.foot button{
		width: 20%;
		height: 40px;
	}
	.zan{
		position: relative;
		left: 10px;
		top: -2px;
	}
	.replys{
		position: relative;
		left: 10px;
		top: -2px;
	}
</style>
