<template>
	<div class="me">
		<el-row class="header">
			<el-col :span="24">
				我的
			</el-col>
		</el-row>
		<div class="main">
			<el-row>
				<el-col :span="18" class="info">
					<img v-if="info.cover!=''" :src="info.cover" @click="coverBig(info.cover)"/>
					<img v-if="info.cover==''" src="../../static/images/touxiang2.png" @click="coverBig(info.cover)"/>
					<wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="isShowBigImg=false" style="z-index: 9;"></wimg>
					<el-row style="position: absolute;">
						<el-col>
							<a style="">{{info.name}}</a>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<a style="font-size: 14px;color: #999999">账号: {{info.username}}</a>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="6" class="info" style="position: relative; top: 15px;">
					粉丝：{{info.fans}}
				</el-col>
			</el-row>
		</div>
		<div>
			<div v-if="info.user_id>0">
				<el-row class="b">
					<div @click="toIntro()">
						<el-col :span="3" class="set">
							<img src="../../static/images/diaries.png" />
						</el-col>
						<el-col :span="18" class="left">
							我的日记
						</el-col>
						<el-col :span="3" class="right">
							<i class="el-icon-arrow-right"></i>
						</el-col>
					</div>
				</el-row>
				<el-row class="b">
					<div @click="toInfo()">
						<el-col :span="3" class="set">
							<img src="../../static/images/info.png" />
						</el-col>
						<el-col :span="18" class="left">
							<div>我的信息</div>
						</el-col>
						<el-col :span="3" class="right">
							<i class="el-icon-arrow-right"></i>
						</el-col>
					</div>
				</el-row>
				<el-row class="b">
					<div @click="doEditPassword()">
						<el-col :span="3" class="set">
							<img src="../../static/images/edit.png" />
						</el-col>
						<el-col :span="18" class="left">
							<div>修改密码</div>
						</el-col>
						<el-col :span="3" class="right">
							<i class="el-icon-arrow-right"></i>
						</el-col>
					</div>
				</el-row>
			</div>
			<div v-if="!(info.user_id>0)">
				<el-row class="b">
					<el-col :span="24">
						<div @click="doLogin()">登陆</div>
					</el-col>
				</el-row>
			</div>
			<div v-if="info.user_id>0">
				<el-row class="b">
					<el-col :span="24">
						<div @click="outLogin()" style="color: red;">注销</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import wimg from 'w-previewimg'
	export default {
		data() {
			return {
				imgs:[],
				current:'',
				isShowBigImg:false
			};
		},
		created() {
			this.init();
		},
		computed:{
			info(){
				return this.$store.state.me;
			}
		},
		methods:{
			init() {
				const loading = this.$loading({
					lock: true,
					text: '请稍后',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$http().getUserInfo().then(res => {
					var status = res.data.status;
					if (status) {
						this.$store.commit("setMe",res.data.data);
					} else {
						var data={
							name:"游客",
							username:"0",
							cover:require("@/static/images/touxiang2.png"),
							fans:0
						}
						this.$store.commit("setMeYouke",data);
					}
					loading.close()
				});
			},
			doEditPassword(){
				this.$router.push("/edit_password");
			},
			doLogin(){
				this.$router.push("/login");
			},
			outLogin(){
				const loading = this.$loading({
					lock: true,
					text: '正在注销当前用户',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$http().outLogin().then(res => {
					var status = res.data.status;
					if (status) {
						this.$router.go(0);
					} else {
						this.$message.error(res.data.msg);
					}
					loading.close()
				});
			},
			coverBig (img) {
				this.imgs.push(img)
				this.current=img
				this.isShowBigImg = true
			},
			toInfo(){
				this.$router.push("/info");
			},
			toIntro(){
				this.$router.push("/me_intro");
			}
		},
		components: {
			wimg
		},
	}
</script>

<style scoped="scoped">
.me{
	background: ghostwhite;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.header{
	background: white;
	padding: 15px;
}
.main{
	background: white;
	padding: 20px;
}
.info{
	text-align: left;
}
.info img{
	width: 50px;
	height: 50px;
	border-radius: 5px;
	margin-right: 15px;
}
.info div{
	display: inline-block;
}
.b{
	margin-top: 10px;
	background: white;
	padding: 10px;
}
.b .left{
	padding-top: 5px;
	text-align: left;
}
.b .right{
	text-align: right;
	padding-top: 8px;
	padding-right: 10px;
}
.set{
}
.set img{
	width: 30px;
	height: 30px;
}
</style>
