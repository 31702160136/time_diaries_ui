<template>
	<div class="login">
		<el-row class="header" type="flex">
			<el-col :span="12" class="header-left">
				<div class="grid-content bg-purple-dark"><img style="width: 30px; height: 30px;" @click="doBack()" src="../static/images/back.png"/></div>
			</el-col>
		</el-row>
		<div class="main">
			<el-row>
				<el-col :span="24">
					<img class="logo" src="../static/images/uugai.com_1568963617246.png" />
				</el-col>
			</el-row>
			<el-form label-width="80px" class="form" :model="ruleForm" status-icon ref="ruleForm2">
				<div class="form-inputs">
					<el-row class="username">
						<el-col :span="3">
							<img class="user-icon" src="../static/images/suo.png" />
						</el-col>
						<el-col :span="21">
							<input placeholder="原密码" type="password" v-model="ruleForm.old_password" />
						</el-col>
					</el-row>
					<el-row class="password">
						<el-col :span="3">
							<img class="user-icon" src="../static/images/suo.png" />
						</el-col>
						<el-col :span="21">
							<input placeholder="密码" type="password" v-model="ruleForm.password" />
						</el-col>
					</el-row>
					<el-row class="password">
						<el-col :span="3">
							<img class="user-icon" src="../static/images/suo.png" />
						</el-col>
						<el-col :span="21">
							<input placeholder="确认密码" type="password" v-model="ruleForm.re_password" />
						</el-col>
					</el-row>
				</div>
				<el-row>
					<el-col :span="24">
						<el-button type="warning" class="submit" @click="doEditPassword(ruleForm)">修改密码</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		http
	} from "../api/shop.js"
	export default {
		data() {
			return {
				ruleForm: {
					old_password: '',
					password: '',
					re_password: ''
				}
			};
		},
		methods: {
			doEditPassword(formName) {
				const loading = this.$loading({
					lock: true,
					text: '请稍后',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$http().editPassword(formName).then(res => {
					var status = res.data.status;
					if (status) {
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
						this.$router.replace("/index")
					} else {
						this.$message.error(res.data.msg);
					}
					loading.close()
				});
			},
			doBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped="scoped">
	.login {
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

	.main {
		margin: 30px;
	}

	.main .logo {
		width: 200px;
		height: 65px;
	}

	.form {}

	.form-inputs {
		border: #E6A23C 1px solid;
		border-radius: 5px;
		padding: 7px;
	}

	.form-inputs input {
		border: none;
		width: 100%;
		height: 30px;
	}

	.form-inputs input:focus {
		outline: none;
	}

	.user-icon {
		width: 18px;
		height: 20px;
		margin-top: 5px;
	}

	.username {
		border-bottom: solid #DCDCDC 1px;
		padding-bottom: 7px;
	}

	.password {
		padding-top: 7px;
	}

	.submit {
		width: 100%;
		margin-top: 20px;
	}

	.forget {
		text-align: right;
		color: #8CC5FF;
		font-size: 12px;
		margin-top: 10px;
	}

	.bottom {
		margin: 30px;
	}

	.bottom-title {
		color: #909399;
		font-size: 15px;
		margin-top: 50px;
	}

	.wx-login {
		margin-top: 10px;
		border: #E4E7ED solid 1px;
		color: #67C23A;
		padding: 7px 7px 5px 7px;
	}

	.wx-login img {
		width: 20px;
		height: 20px;
	}
</style>
