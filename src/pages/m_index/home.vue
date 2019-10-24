<template>
	<div class="home">
		<div class="header">
			<el-row type="flex">
				<el-col :span="6" class="happy-right">
				</el-col>
				<el-col :span="6" class="happy-time">
					<div @click="diary_type=0;recommend()" :style="diary_type==1? 'color: #DCDCDC':''">
						推荐
						<div class="happy-time-bottom" v-show="diary_type==0"></div>
					</div>
				</el-col>
				<el-col :span="6" class="diary-circle">
					<div @click="diary_type=1;diariesCircle()" :style="diary_type==1? 'color:#000000':''">
						日记圈
						<div class="happy-time-bottom" v-show="diary_type==1"></div>
					</div>
				</el-col>
				<el-col :span="6" class="happy-right">
				</el-col>
			</el-row>
		</div>
		<div class="main">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<ul
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="0">
				<li v-for="(item,index) of formData" :key="index">
					<el-row type="flex" class="panel">
							<div class="cover" @click="toIntro(index)">
								<img v-if="item.cover!=''" :src="item.cover" />
								<img v-if="item.cover==''" src="../../static/images/touxiang2.png" />
							</div>
							<el-col :span="20" class="infos">
								<el-row>
									<el-col :span="24" class="name" style="margin-bottom: 10px;color: #E6A23C;">
										{{item.name}}
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="22" class="content">
										<div v-html="item.content"></div>
									</el-col>
								</el-row>
								<el-row class="image-list" v-if="formData.length!=0">
									<div v-for="i in item.url">
										<el-col :span="7" class="image-item">
											<img alt="" ref="img" :src="i" :style="'display:inline-block;width:100%;height:'+height2+'px;'" @click="showBigImg(item.id,i)">
										</el-col>
									</div>
								</el-row>
								<el-row class="time">
									<el-col :span="24" style="text-align: left; color: #B4BCCC; font-size: 12px;">
										{{item.create_time}}
									</el-col>
								</el-row>
								<el-row class="more" type="flex" align="middle">
									<el-col :span="6" style="text-align: right;" class="xin">
										<img v-if="item.is_praise" src="@/static/images/xin2.png" @click="praiseDiaries(index)">
										<img v-else src="@/static/images/xin1.png" @click="praiseDiaries(index)">
									</el-col>
									<el-col :span="6" style="text-align: left; border-right: 1px solid #DCDCDC;" class="zan">
										{{item.praise}}
									</el-col>
									<el-col :span="6" style="text-align: right;" class="xiaoxi">
										<img src="@/static/images/xiaoxi.png" @click="toComment(index)">
									</el-col>
									<el-col :span="6" style="text-align: left;" class="comment">
										{{item.comment}}
									</el-col>
								</el-row>
							</el-col>
					</el-row>
				</li>
			</ul>
			</mt-loadmore>
			<wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="closeBigImg()" style="z-index: 9;"></wimg>
			<el-row>
				<el-col :span="24" style="text-align: center; color: #DCDCDC;">
					{{this.bottomCaption}}
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import wimg from 'w-previewimg'
	import { InfiniteScroll } from 'mint-ui'
	export default {
		data() {
			return {
				t:'a<br>s',
				diary_type:0,
				isShowBigImg: false,
				current: '',
				height1:100,
				formData:[],
				imgs:[],
				isLoading:false,
				bottomCaption:"加载中...",
				data:{
					page:1,
					size:20,
					type:0
				}
			};
		},
		created(){
			this.recommend()
		},
		computed: {
			height2(){
				return this.height1;
			}
		},
		methods:{
			loadTop() {
				this.isLoading=true
				this.bottomCaption="加载中..."
				if(this.diary_type==0){
					this.recommend(1)
				}else{
					this.diariesCircle(1)
				}
			},
			loadMore() {
				if(this.formData.length==0||this.isLoading||this.bottomCaption=="没有了"){
					return
				}
				this.isLoading=true
				if(this.diary_type==0){
					this.recommend(this.data.page+1)
				}else{
					this.diariesCircle(this.data.page+1)
				}
			},
			diariesCircle(page=1){
				if(page==1){
					this.formData=[]
				}
				this.data.page=page
				this.data.type=2
				this.init(this.data);
			},
			recommend(page=1){
				if(page==1){
					this.formData=[]
				}
				this.data.page=page
				this.data.type=0
				this.init(this.data);
			},
			init(data){
				Indicator.open('加载中...');
				this.$http().QueryDiaries(data).then(res => {
					var status = res.data.status;
					if (status) {
						if(res.data.data.length==0){
							this.bottomCaption="没有了"
							Indicator.close()
							return
						}
						for(var i=0;i<res.data.data.length;i++){
							var text=res.data.data[i].diaries.content.replace(/\n/g, '<br>');
							var is_praise=false;
							if(res.data.data[i].diaries.is_praise>0){
								is_praise=true;
							}
							this.formData.push({
								id:res.data.data[i].diaries.id,
								name:res.data.data[i].diaries.name,
								user_id:res.data.data[i].diaries.user_id,
								cover:res.data.data[i].diaries.cover,
								content:text,
								create_time:this.$tools().noopsycheTime(res.data.data[i].diaries.create_time),
								praise:parseInt(res.data.data[i].diaries.praise),
								comment:res.data.data[i].diaries.comment,
								is_praise:is_praise,
								url:res.data.data[i].url
							})
						}
						var that=this
						setTimeout(function(){
							for(var i=0;i<that.$refs.img.length;i++){
								that.$refs.img[i].style='display:inline-block;width:100%;height:'+that.$refs.img[0].clientWidth+'px;'
							}
						},10)
					} else {
						this.$router.push("/login");
					}
					if(this.formData.length<=2){
						this.bottomCaption="没有了"
					}
					this.isLoading=false
					this.$refs.loadmore.onTopLoaded();
					Indicator.close()
				});
			},
			praiseDiaries(index){
				var data={
					diaries_id:this.formData[index].id
				}
				this.$http().PraiseDiaries(data).then(res => {
					var status = res.data.status;
					if (status) {
						if(this.formData[index].is_praise){
							this.formData[index].is_praise=false;
							this.formData[index].praise-=1;
						}else{
							this.formData[index].is_praise=true;
							this.formData[index].praise+=1;
						}
					} else {
						this.$router.push("/login");
					}
				});
			},
			showBigImg (id,img) {
				for(var i=0;i<this.formData.length;i++){
					if(id==this.formData[i].id){
						this.imgs=this.formData[i].url
						break
					}
				}
				this.current=img
				this.isShowBigImg = true
			},
			closeBigImg(){
				this.current=''
				this.isShowBigImg = false
			},
			toComment(index){
				this.$router.push("/comment?id="+this.formData[index].id);
			},
			toIntro(index){
				this.$router.push("/intro?user_id="+this.formData[index].user_id);
			}
		},
		components: {
			wimg
		},
	}
</script>

<style scoped="scoped">
ul,li{
	list-style: none;
	margin: 0;
	padding: 0;
}
.home{
	background: white;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.header{
	background: white;
	padding: 10px 10px 0 10px;
	font-weight:500;
	overflow-y: hidden;
	border-bottom: #DCDCDC solid 1px;
}
.diary-circle{
	color: #DCDCDC;
}

.happy-time-bottom{
	width: 24px;
	height: 3px;
	border-bottom: 3px solid #E6A23C;
	border-radius: 1px;
	margin: 0 auto;
	padding: 2px;
	margin-bottom: 3px;
}
.main{
	position: absolute;
	left: 0;
	right: 0;
	top: 46px;
	bottom: 56px;
	overflow-y: auto;
}
.main .panel{
	background: white;
	padding: 15px;
}
.main .cover img{
	width: 60px;
	height: 60px;
	margin-right: 10px;
	border-radius: 5px;
}
.content{
	overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: ellipsis;
}
.main .infos{
	text-align: left;
}
.image-list{
	margin-top: 10px;
	margin-bottom: 10px;
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
}
.touch-img{
	transform: scale(1);
	transition: all ease 0.5s;
}
.zan{
	position: relative;
	left: 10px;
	top: -2px;
}
.comment{
	position: relative;
	left: 10px;
	top: -2px;	
}
</style>
