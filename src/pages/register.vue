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
					<el-row class="name">
						<el-col :span="3">
							<img class="user-icon" src="../static/images/name.png" />
						</el-col>
						<el-col :span="21">
							<input placeholder="名称" v-model="ruleForm.name" />
						</el-col>
					</el-row>
					<el-row class="username">
						<el-col :span="3">
							<img class="user-icon" src="../static/images/ren.png" />
						</el-col>
						<el-col :span="21">
							<input placeholder="用户名/手机号" v-model="ruleForm.username" />
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
						<el-button type="warning" class="submit" @click="doRegister(ruleForm)">注册</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import {
		http
	} from "../api/shop.js"
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
					re_password: '',
					name:''
				}
			};
		},
		methods: {
			doRegister(formName) {
				if (formName.password != formName.re_password) {
					Toast("两次密码不一致");
					return;
				}
				if(formName.name.trim()==""){
					Toast("请输入名称");
					return
				}
				if(formName.username.trim()==""){
					Toast("请输入账号");
					return
				}
				Indicator.open("注册中...")
				this.$http().register(formName).then(res => {
					var status = res.data.status;
					if (status) {
						Toast(res.data.msg)
						this.$router.go(-1);
					} else {
						Toast(res.data.msg)
					}
					Indicator.close()
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
