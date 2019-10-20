<template>
	<div class="msg">
		<el-row class="header">
			<el-col :span="24">
				<div @click="send()">消息</div>
			</el-col>
		</el-row>
		<div class="main">
			<div v-for="(item,index) of list" :key="index" @click="toChat(item)">
				<el-row type="flex" class="list" align="middle">
					<div v-if="item.newTotal>0&&item.newTotal<=99" class="hint">{{item.newTotal}}</div>
					<div v-if="item.newTotal>99" class="hint">99+</div>
					<el-col :span="3" class="logo">
						<img v-if="item.cover!=''" :src="item.cover" class="cover"/>
						<img v-if="item.cover==''" src="../../static/images/touxiang2.png" class="cover"/>
					</el-col>
					<div class="time">
						{{$tools().noopsycheTime(item.time)}}
					</div>
					<el-col :span="21" class="info" type="flex">
						<el-row>
							<el-col :span="12" class="left">
								{{item.name}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="18" class="des">
								<a class="des-in">{{item.newMsg}}</a>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		computed:{
			list(){
				var t=this
				t.$store.state.hint=0
				for(var i=0;i<this.$store.state.dialogueList.length;i++){
					t.$store.state.hint+=t.$store.state.dialogueList[i].newTotal
				}
				return this.$store.state.dialogueList
			}
		},
		methods:{
			toChat(info){
				this.$router.push("/chat?user_id="+info.user_id+"&cover="+info.cover+"&name="+info.name)
			}
		}
		
	}
</script>

<style scoped="scoped">
	
	.header {
		padding: 10px;
		overflow-y: hidden;
		border-bottom: solid 1px #E6E6E6;
		z-index: 9;
	}
	ul,li{
		list-style: none;
	}
	.list-item{
		padding: 10px;
		
	}
	.main{
		position: absolute;
		left: 0;
		right: 0;
		top: 45px;
		bottom: 54px;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.list{
		padding-left: 10px;
	}
	.logo{
		min-width: 60px;
	}
	.logo img{
		width: 60px;
		height: 60px;
	}
	.cover{
		width: 100%;
		background: #E6A23C;
		border-radius: 6px;
		width: 60px;
		height: 60px;
	}
	.info{
		border-bottom: 1px solid #E6E6E6;
		padding-top: 10px;
		padding-bottom: 10px;
		margin-left: 15px;
	}
	.info .left{
		text-align: left;
		font-size: 20px;
	}
	.des{
		margin-top: 5px;
		text-align: left;
		color: #C0C4CC;
		font-size: 14px;
	}
	.des .des-in{
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
	}
	.time{
		font-size: 15px;
		color: #C0C4CC;
		padding-right: 15px;
		position: absolute;
		right: 0;
		top:10px;
	}
	.hint{
		display:block;
		background:#f00;
		top:0px;
		position:absolute;
		left: 60px;
		font-size: 10px;
		color: white;
		min-width: 15px;
		min-height: 15px;
		padding: 2px;
		border-radius:50px;
		z-index: 2;
	}
</style>
