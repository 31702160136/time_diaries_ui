<template>
	<div class="add">
		<div class="header">
			<el-row type="flex" align="middle">
				<el-col :span="4" style="text-align: left;">
					<img style="width: 30px; height: 30px;" @click="doBack()" src="../../static/images/back.png"/>
				</el-col>
				<el-col :span="20">
					<input type="text" v-model="content" placeholder="请输入名称" />
					<el-button type="warning" size='mini' style="border: none;" @click="doSearch()">搜索</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="main">
			<div class="list" v-for="(item,index) of listData" :key="index">
				<div @click="toIntro(item.user_id)">
					<el-row class="list-item">
						<el-col :span="24" style="text-align: left;">
							<img :src="item.cover" style="width: 55px;height: 55px; border-radius: 5px;" />
							<a style="position: relative; top: -20px; left: 10px;">{{item.name}}</a>
						</el-col>
					</el-row>
				</div>
			</div>
			<el-row>
				<el-col :span="24" style="text-align: center; color: #DCDCDC;" class="xin">
					没有了
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				listData:[]
			};
		},
		methods: {
			doSearch() {
				var data={
					name:this.content
				}
				this.$http().findInfoList(data).then(res => {
					var status = res.data.status;
					if (status) {
						this.listData=res.data.data;
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			doBack(){
				this.$router.go(-1);
			},
			toIntro(user_id){
				this.$router.push("/intro?user_id="+user_id);
			}
		},
	}
</script>

<style scoped="scoped">
	.add {
		background: white;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.header {
		padding: 10px;
		overflow-y: hidden;
	}

	.header {
		background: #F5F5F5;
	}

	.header input {
		width: 70%;
		border: none;
		border-radius: 5px;
		height: 30px;
		margin-right: 10px;
		
	}

	.header button {
		width: 20%;
		height: 30px;
	}

	.main {
		padding: 10px 10px 10px 15px;
		position: absolute;
		left: 0;
		right: 0;
		top: 65px;
		bottom: 0;
		overflow-y: auto;
	}

	.list-item {
		border-bottom: #DCDCDC 1px solid;
		padding-top: 7px;
		padding-bottom: 7px;
	}
</style>
