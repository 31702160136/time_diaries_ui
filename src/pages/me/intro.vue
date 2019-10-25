<template>
	<div>
		<el-row class="header" type="flex" align="middle">
			<el-col :span="6" class="header-left">
				<div class="grid-content bg-purple-dark"><img style="width: 30px; height: 30px;" @click="toBack()" src="../../static/images/back.png"/></div>
			</el-col>
		</el-row>
		<div class="main">
			<el-row>
				<el-col class="cover" :span="24">
					<img v-if="info.cover!=''" :src="info.cover" @click="coverBig(info.cover)">
					<img v-if="info.cover==''" src="../../static/images/touxiang2.png" @click="coverBig(require('@/static/images/touxiang2.png'))"/>
					<el-row>
						<el-col :span="24" class="name">
							{{info.name}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="11" class="left">
							关注：{{info.attention}}
						</el-col>
						<el-col :span="2" class="center">
							|
						</el-col>
						<el-col :span="11" class="right">
							粉丝：{{info.fans}}
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<ul
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="0">
				<li v-for="(item,index) of formData" :key="index">
					<el-row type="flex" class="panel">
							<div class="cover">
								<img v-if="item.cover!=''" :src="item.cover" />
								<img v-if="item.cover==''" src="../../static/images/touxiang2.png" />
							</div>
							<el-col :span="20" class="infos">
								<el-row>
									<el-col :span="18" class="name" style="margin-bottom: 10px;color: #E6A23C;">
										{{item.name}}
									</el-col>
									<el-col :span="6" style="text-align: right;color: red;">
										<el-button type="warning" plain @click="delDiaries();delId=item.id" size="mini">删除</el-button>
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
									<el-col :span="12" style="text-align: left; color: #B4BCCC; font-size: 12px;">
										{{item.create_time}}
									</el-col>
									<el-col :span="12" style="text-align: right; color: #B4BCCC; font-size: 12px;">
										{{item.type}}
									</el-col>
								</el-row>
								<el-row class="more" type="flex" align="middle">
									<el-col :span="6" style="text-align: right;" class="xin">
										<img v-if="item.is_praise" src="@/static/images/xin2.png" @click="praiseDiaries(index)">
										<img v-else src="@/static/images/xin1.png" @click="praiseDiaries(index)">
									</el-col>
									<el-col :span="6" style="text-align: left; border-right: 1px solid #DCDCDC;" class="zan">
										&nbsp {{item.praise}}
									</el-col>
									<el-col :span="6" style="text-align: right;" class="xiaoxi">
										<img src="@/static/images/xiaoxi.png" @click="doComment(index)">
									</el-col>
									<el-col :span="6" style="text-align: left;">
										&nbsp {{item.comment}}
									</el-col>
								</el-row>
							</el-col>
					</el-row>
				</li>
			</ul>
			<wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="closeBigImg()" style="z-index: 9;"></wimg>
			<el-row>
				<el-col :span="24" style="text-align: center; color: #DCDCDC;">
					{{bottomCaption}}
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import wimg from 'w-previewimg'
	export default {
		data() {
			return {
				delId:0,
				dialogVisible: false,
				diary_type:0,
				isShowBigImg: false,
				current: '',
				height1:100,
				isLoading:false,
				bottomCaption:"加载中...",
				info:{
					name:'',
					cover:'',
					attention:0,
					fans:0,
					is_attention:false
				},
				imgs:[],
				formData:[],
				data:{
					page:1,
					size:20,
					type:3
				}
			};
		},
		created(){
			this.init(this.data)
		},
		computed: {
			height2(){
				return this.height1;
			}
		},
		methods:{
			loadMore() {
				if(this.formData.length==0||this.isLoading||this.bottomCaption=="没有了"){
					return
				}
				this.isLoading=true
				this.data.page+=1
				this.init(this.data)
			},
			tes(){
			},
			init(data){
				Indicator.open('加载中...');
				this.$http().QueryDiaries(data).then(res => {
					var status = res.data.status;
					if (status) {
						this.info.name=res.data.data.user_info.name
						this.info.cover=res.data.data.user_info.cover
						this.info.attention=res.data.data.total_attention
						this.info.fans=res.data.data.total_fans
						this.info.is_attention=res.data.data.is_attention
						if(res.data.data.data.length==0){
							this.bottomCaption="没有了"
							Indicator.close()
							return
						}
						for(var i=0;i<res.data.data.data.length;i++){
							var text=res.data.data.data[i].diaries.content.replace(/\n/g, '<br>');
							var is_praise=false;
							if(res.data.data.data[i].diaries.is_praise>0){
								is_praise=true;
							}
							var type=""
							if(res.data.data.data[i].diaries.type==1){
								type="公开"
							}else{
								type="私密"
							}
							this.formData.push({
								id:res.data.data.data[i].diaries.id,
								name:res.data.data.data[i].diaries.name,
								cover:res.data.data.data[i].diaries.cover,
								content:text,
								type:type,
								create_time:this.$tools().noopsycheTime(res.data.data.data[i].diaries.create_time),
								praise:parseInt(res.data.data.data[i].diaries.praise),
								comment:res.data.data.data[i].diaries.comment,
								is_praise:is_praise,
								url:res.data.data.data[i].url
							})
						}
						var that=this
						setTimeout(function(){
							for(var i=0;i<that.$refs.img.length;i++){
								that.$refs.img[i].style='display:inline-block;width:100%;height:'+that.$refs.img[0].clientWidth+'px;'
							}
						},10)
					} else {
						Toast(res.data.msg)
					}
					Indicator.close();
					this.isLoading=false
					if(this.formData.length<=2){
						this.bottomCaption="没有了"
					}
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
			delDiaries(){
				MessageBox.confirm('确定删除日记？').then(action => {
					var data={
						id:this.delId
					}
					this.$http().delDiaries(data).then(res => {
						var status = res.data.status;
						if (status) {
							Toast("删除成功")
							for(var i=0;i<this.formData.length;i++){
								if(data.id==this.formData[i].id){
									this.formData.splice(i,1)
									break
								}
							}
						} else {
							Toast("删除成功")
						}
					})
				},error=>{
					
				})
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
			coverBig (img) {
				this.imgs.push(img)
				this.current=img
				this.isShowBigImg = true
			},
			closeBigImg(){
				this.current=''
				this.isShowBigImg = false
			},
			doComment(index){
				this.$router.push("/comment?id="+this.formData[index].id);
			},
			toBack(){
				this.$router.go(-1)
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
	.header {
		padding: 5px;
	}

	.header-left {
		text-align: left;
		font-size: 23px;
	}
	
	.main{
		position: absolute;
		left: 0;
		right: 0;
		top: 45px;
		bottom: 10px;
		overflow-y: auto;
	}

	.cover {
		text-align: center;
		height: 130px;
	}
	.cover img{
		width: 60px;
		height: 60px;
		margin-bottom: 10px;
	}
	.name{
		margin-bottom: 10px;
	}
	.left{
		text-align: right;
		
	}
	.right{
		text-align: left;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 15px;
		background: #F5F5F5;
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
	.time{
		padding: 8px;
	}
</style>
