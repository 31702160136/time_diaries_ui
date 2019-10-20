<template>
	<div class="info">
		<el-row class="header" type="flex" align="middle">
			<el-col :span="6" class="header-left">
				<div class="grid-content bg-purple-dark"><img style="width: 30px; height: 30px;" @click="doBack()" src="../../static/images/back.png"/></div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-dark" style="padding-top: 3px;">个人信息</div>
			</el-col>
			<el-col :span="6" class="header-right">
				<a @click="saveInfo(ruleForm)">保存</a>
			</el-col>
		</el-row>
		<div class="main">
			<el-form :model="ruleForm">
				<el-row type="flex" class="info-item" align="middle">
					<el-col :span="12" class="left">
						头像
					</el-col>
					<el-col :span="12" class="right" style="text-align: right;">
						<el-upload class="avatar-uploader" :headers="header" name="image" :action="upload_url" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-col>
				</el-row>
				<el-row type="flex" class="info-item" align="middle">
					<el-col :span="12" class="left">
						昵称
					</el-col>
					<el-col :span="12" class="right">
						<input v-model="ruleForm.name" />
					</el-col>
				</el-row>
				<el-row type="flex" class="info-item" align="middle">
					<el-col :span="12" class="left">
						性别
					</el-col>
					<el-col :span="12" class="right">
						<el-select v-model="ruleForm.sex" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row type="flex" class="info-item" align="middle">
					<el-col :span="12" class="left">
						手机号码
					</el-col>
					<el-col :span="12" class="right">
						<input v-model="ruleForm.phone" />
					</el-col>
				</el-row>
				<el-row type="flex" class="info-item" align="middle">
					<el-col :span="12" class="left">
						生日
					</el-col>
					<el-col :span="12" class="right">
						<input v-model="ruleForm.birthday" type="date" style="direction: rtl;" />
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import {
		http,
		upload_url
	} from "@/api/shop.js"
	export default {
		data() {
			return {
				options: [{
					value: 1,
					label: '男'
				}, {
					value: 2,
					label: '女'
				}],
				header: {
					Token: this.$cookie().getCookie("token")
				},
				upload_url: upload_url,
				ruleForm: {
					cover: '',
					name: '',
					sex: '',
					phone: '',
					birthday: ''
				},
			};
		},
		created() {
			this.init();
		},
		computed:{
		},
		methods: {
			init() {
				this.ruleForm.cover = this.$store.state.me.cover;
				this.ruleForm.name = this.$store.state.me.name;
				this.ruleForm.sex = this.$store.state.me.sex;
				this.ruleForm.phone = this.$store.state.me.phone;
				this.ruleForm.birthday = this.$tools().getDate(this.$store.state.me.birthday);
			},
			handleAvatarSuccess(res, file) {
				this.ruleForm.cover = res.data.url;
			},
			beforeAvatarUpload(file) {

			},
			saveInfo(formName) {
				formName.age = this.$tools().getTimeStamp(formName.age);
				formName.birthday = this.$tools().getTimeStamp(formName.birthday);
				this.$http().saveUserInfo(formName).then(res => {
					var status = res.data.status;
					if (status) {
						this.$router.go(-1);
						Toast(res.data.msg)
					} else {
						Toast(res.data.msg)
					}
				});
			},
			doBack() {
				this.$router.go(-1);
			}
		},
	}
</script>

<style scoped="scoped">
	.avatar-uploader{
		width: 100px;
		height: 100px;
		line-height: 50px;
		position: relative;
		left: 30%;
	}
	.info {
		background: white;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.header {
		padding: 10px;
	}

	.header-left {
		text-align: left;
		font-size: 23px;
	}

	.header-right {
		text-align: right;
		line-height: 23px;
		color: #E6A23C;
		padding-right: 10px;
	}

	.main {}

	.avatar {
		width: 100%;
		height: 100%;
		background: #000000;
		border-radius: 5px;
	}

	.main .left {
		text-align: left;
		padding: 15px;
	}

	.main .right {
		text-align: right;
		padding: 15px;
	}

	.info-item {
		border-bottom: solid 1px #DCDCDC;
		position: relative;
	}

	.info-item input {
		border: none;
		font-size: 20px;
		width: 100%;
		direction: rtl;
	}

	.info-item input:focus {
		outline: none;
	}
</style>
