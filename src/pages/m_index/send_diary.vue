<template>
	<div class="send">
		<el-row class="header" type="flex" align="middle">
			<el-col :span="12" class="left">
				<div><img style="width: 30px; height: 30px;" @click="toBack()" src="../../static/images/back.png"/></div>
			</el-col>
			<el-col :span="12" class="right">
				<el-button type="warning" @click="sendDiaries(formData)" size="mini">发表</el-button>
			</el-col>
		</el-row>
		<div class="main">
			<el-row>
				<el-col :span="24">
					<textarea v-model="formData.content" placeholder="请输入您的想法..." class="text"></textarea>
				</el-col>
			</el-row>
			<el-row class="list">
				<div v-for="(item,index) of formData.url" :key="index">
					<el-col :span="7" class="list-item">
						<img @click="showBigImg(item)" :src="item" class="avatar" :style="'height:'+height1+'px;'+'width:'+height1+'px;'">
						<img class="del" @click="doDel(index)" src="../../static/images/del.png" />
					</el-col>
				</div>
				<el-col :span="7" class="list-item" v-if="formData.url.length<9">
					<el-upload :headers="header" name="image" class="avatar-uploader" :action="upload_url" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<div class="add" ref="img">
							<img v-if="true" src="../../static/images/add.png">
						</div>
					</el-upload>
				</el-col>
			</el-row>
		</div>
		<div class="bottom">
			<el-row class="item">
				<el-col :span="24">
					<label>谁可以看</label>
					<el-select v-model="formData.type" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
		<wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="closeBigImg()" style="z-index: 9;"></wimg>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import wimg from 'w-previewimg'
	import {
		http,
		upload_url
	} from "@/api/shop.js"
	export default {
		data() {
			return {
				imgs:[],
				current:'',
				isShowBigImg: false,
				upload_url: upload_url,
				header: {
					Token: this.$cookie().getCookie("token")
				},
				imageUrl: require("@/static/images/wx.png"),
				options: [{
					value: 1,
					label: '公开'
				}, {
					value: 2,
					label: '私密'
				}],
				formData:{
					content:'',
					type: 1,
					url: [],
				}
			};
		},
		computed: {
			height1() {
				return this.$refs.img.clientWidth;
			}
		},
		methods: {
			showBigImg (img) {
				this.imgs=this.formData.url
				this.current=img
				this.isShowBigImg = true
			},
			closeBigImg(){
				this.current=''
				this.isShowBigImg = false
			},
			doDel(index) {
				this.formData.url.splice(index, 1);
			},
			toBack() {
				this.$router.go(-1);
			},
			handleAvatarSuccess(res, file) {
				if(res.status){
					Toast(res.msg);
					this.formData.url.push(res.data.url);
				}else{
					Toast(res.msg);
				}
				Indicator.close()
			},
			beforeAvatarUpload(file) {
				Indicator.open('上传中...');
			},
			sendDiaries(formName) {
				if(formName.type!=1&&formName.type!=2){
					Toast("请选择日记公开或私密");
					return
				}
				this.$http().sendDiaries(formName).then(res => {
					var status = res.data.status;
					if (status) {
						this.$router.go(-1);
						Toast(res.data.msg);
					} else {
						Toast(res.data.msg);
					}
				});
			}
		},
		components:{
			wimg
		}
	}
</script>

<style scoped="scoped">
	.send {
		background: white;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.header {
		padding: 8px;
	}

	.header .left {
		text-align: left;
		padding-left: 5px;
		font-size: 25px;
	}

	.header .right {
		text-align: right;
	}

	.header .right div {
		background: #E6A23C;
	}

	.main {
		margin-top: 10px;
		padding: 10px 10px 10px 25px;
		position: absolute;
		left: 0;
		right: 0;
		top: 38px;
		bottom: 0;
	}

	.text {
		width: 100%;
		height: 100px;
		outline: none;
		border: none;
		font-size: 20px;
	}

	.list {
		margin-top: 10px;
		overflow: hidden;
	}

	.list-item {
		margin-left: 4px;
		text-align: center;
		position: relative;
	}

	.ic {
		width: 100%;
		border: #D9D9D9 dotted 1px;
	}

	.list-item .del {
		width: 30%;
		border-radius: 20px;
		font-size: 14px;
		color: white;
		position: absolute;
		top: 5%;
		right: 5%;
	}

	.avatar {
		margin-top: 4px;
		display: block;
		background: #000000;
		border-radius: 5px;
	}

	.add {
		top: 4px;
		z-index: 9;
		border: #B4BCCC dashed 2px;
		border-radius: 5px;
		padding: 20px;
		margin-top: 5px;
	}

	.add img {
		width: 100%;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		background: white;
	}

	.bottom .item {
		padding: 10px;
	}
</style>
