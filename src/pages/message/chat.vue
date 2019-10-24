<template>
	<div class="chat">
		<el-row class="header" type="flex" align="middle">
			<el-col :span="6" class="header-back">
				<img style="width: 30px; height: 30px;" @click="toBack()" src="../../static/images/back.png"/>
			</el-col>
			<el-col :span="12" class="header-name">
				{{name}}
			</el-col>
		</el-row>
		<div class="main" id="main">
			<el-row class="info" v-for="(item,index) of msg.msgArr" :key="index">
				<el-col class="time">
					<a>{{$tools().noopsycheTime(item.create_time)}}</a>
				</el-col>
				<el-col :span="24" class="left" v-if="item.send_id!=$store.state.me.user_id">
					<el-row type="flex">
						<el-col :span="3" class="logo">
							<img v-if="msg.cover!=''" :src="msg.cover" class="cover"/>
							<img v-if="msg.cover==''" src="../../static/images/touxiang2.png"  class="cover"/>
						</el-col>
						<el-col :span="13" class="body">
							<div class="jiao"></div>
							<div class="content" v-html="item.content.replace(/\r?\n/g, '<br />')">
								
							</div>
						</el-col>
						<el-col :span="8">
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="24" class="right" v-if="item.send_id==$store.state.me.user_id">
					<div>
						<el-row type="flex">
							<el-col :span="8">
							</el-col>
							<el-col :span="13" class="body">
								<div class="jiao"></div>
								<div class="content" v-html="item.content.replace(/\r?\n/g, '<br />')">
								</div>
							</el-col>
							<el-col :span="3" class="logo">
								<img v-if="info.cover!=''" :src="info.cover" class="cover"/>
								<img v-if="info.cover==''" src="../../static/images/touxiang2.png"  class="cover"/>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="foot">
			<el-row>
				<el-col :span="24">
					<textarea v-model="content"/>
					<el-button type="warning" size='mini' style="border: none;" @click="send()">发送</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				content:'',
				cover:this.$route.query.cover,
				name:this.$route.query.name,
				user_id:parseInt(this.$route.query.user_id),
				key:this.$store.state.me.user_id.toString()
			};
		},
		created() {
			// 核心代码
			// 滚动到底部
			this.$nextTick(() => {
				let msg = document.getElementById('main') // 获取对象
				msg.scrollTop = msg.scrollHeight // 滚动高度
			})
		},
		computed:{
			msg(){
				var user_id=this.user_id
				var index=null
				for(var i=0;i<this.$store.state.dialogueList.length;i++){
					if(this.$store.state.dialogueList[i].user_id==user_id){
						index=i
					}
				}
				if(index==null){
					return {
						user:'',
						message:[]
					}
				}
				this.toBottom(this)
				var key=this.$store.state.me.user_id
				var obj=JSON.parse(this.$cookie().getCookie(key))
				//此处用this会报错，用t代替
				var t=this
				if(obj!=null){
					for(var i=0;i<obj.list.length;i++){
						if(obj.list[i].user_id==user_id){
							t.$store.state.hint-=obj.list[i].newTotal
							obj.list[i].newTotal=0
							break
						}
					}
					this.$cookie().setCookie(key,JSON.stringify(obj))
					t.$store.state.dialogueList=obj.list
				}
				return this.$store.state.dialogueList[index]
			},
			info(){
				return this.$store.state.me
			}
		},
		methods:{
			send(){
				if(this.content.trim()==""){
					Toast("内容不能为空");
					return
				}
				this.key=this.$store.state.me.user_id.toString()
				var data={
						receive_id:this.user_id,
						content:this.content,
					}
				var that=this
				this.$http().sendMsg(data).then(res => {
					var status = res.data.status;
					if (status) {
						var msg={
							content: '',	//内容
							create_time: 0,	//发送时间
							id: 0,			
							receive_id: 0,	//接收者id
							send_id: 0,		//发送者id
						}
						var dialogue={
							newMsg:'',	//最新一条消息内容
							newTotal:0,	//新消息的数量	
							time:0,
							key:'',		//key
							cover:'',	//对方头像
							name:'',	//对方名称
							user_id:'',	//对方id
							msgArr:[]	//消息列表
						}
						var obj=JSON.parse(this.$cookie().getCookie(this.key))
						if(obj==null){
							obj={
								list:[]
							}
						}
						var myDialogueList=obj.list
						if(!(myDialogueList instanceof Array) || myDialogueList.length==0){
							myDialogueList=[]
							dialogue.newMsg=that.content
							dialogue.time=res.data.time
							dialogue.name=that.name
							dialogue.cover=that.cover
							dialogue.user_id=that.user_id
							
							msg.content=that.content
							msg.create_time=res.data.time
							msg.send_id=this.$store.state.me.user_id
							msg.receive_id=that.user_id
							
							dialogue.msgArr.push(msg)
							myDialogueList.push(dialogue)
						}else{
							var length=myDialogueList.length
							var isAdd=false
							for(var i=0;i<length;i++){
								if(myDialogueList[i].user_id==this.user_id){
									msg.content=that.content
									msg.create_time=res.data.time
									msg.send_id=this.$store.state.me.user_id
									msg.receive_id=that.user_id
									
									myDialogueList[i].newMsg=that.content
									myDialogueList[i].time=res.data.time
									
									myDialogueList[i].msgArr.push(msg)
									isAdd=true
									break
								}
							}
							if(!isAdd){
								dialogue.newMsg=that.content
								dialogue.time=res.data.time
								dialogue.name=that.name
								dialogue.cover=that.cover
								dialogue.user_id=that.user_id
								
								msg.content=that.content
								msg.create_time=res.data.time
								msg.send_id=this.$store.state.me.user_id
								msg.receive_id=that.user_id
								
								dialogue.msgArr.push(msg)
								myDialogueList.push(dialogue)
							}
						}
						var obj={
							list:myDialogueList
						}
						this.$cookie().setCookie(this.key,JSON.stringify(obj))
						this.$store.state.dialogueList=myDialogueList
						this.content=''
						this.toBottom(that)
					} else {
						Toast(res.data.msg);
					}
				});
			},
			toBottom(that){
				setTimeout(function(){
					// 核心代码
					// 滚动到底部
					that.$nextTick(() => {
						let msg = document.getElementById('main') // 获取对象
						msg.scrollTop = msg.scrollHeight // 滚动高度
					})
				},200)
			},
			toBack(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped="scoped">
	.chat{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #F5F5F5;
	}
	.header-back{
		text-align: left;
	}
	.header-name{
		text-align: center;
	}
	.header{
		background: #F5F5F5;
		color: #2C3E50;
		padding: 5px;
		border-bottom: 1px solid #E6E6E6;
	}
	.main{
		position: absolute;
		left: 0;
		right: 0;
		top: 46px;
		bottom: 72px;
		overflow-y: auto;
		background:#F5F5F5;
	}
	.info{
		padding: 0 10px 10px 10px;
	}
	.left .logo{
		min-width: 54px;
		min-height: 54px;
	}
	.left .cover{
		background: #A0CFFF;
		border-radius: 6px;
		width: 54px;
		height: 54px;
	}
	.info .left .body{
		text-align: left;
		margin-left: 15px;
		position: relative;
		margin-top: 4px;
	}
	.left .jiao{
		position: absolute;
		left: -5px;
		top: 18px;
		width: 0px;
		height: 0px;
		border-width: 0 10px 10px 0px;
		border-style: solid;
		border-color: transparent transparent white;
		transform:rotate(45deg);
	}
	.content{
		overflow: hidden;
		white-space: normal;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
	}
	.left .content{
		float: left;
		background: white;
		padding: 13px;
		border-radius: 5px;
	}
	.right{
		text-align: right;
	}
	.right .logo{
		text-align: right;
		min-width: 54px;
		min-height: 54px;
	}
	.right .cover{
		background: #A0CFFF;
		border-radius: 6px;
		width: 54px;
		height: 54px;
	}
	.right .body{
		text-align: left;
		margin-right: 15px;
		position: relative;
		margin-top: 4px;
	}
	.right .jiao{
		position: absolute;
		right: -4px;
		top: 18px;
		width: 0px;
		height: 0px;
		border-width: 0 10px 10px 0px;
		border-style: solid;
		border-color: transparent transparent orange;
		transform:rotate(225deg);
	}
	.right .content{
		float: right;
		background: orange;
		padding: 13px;
		border-radius: 5px;
	}
	.time{
		padding-bottom: 5px;
	}
	.time a{
		color: #82848A;
		padding: 2px;
		border-radius: 2px;
	}
	.foot{
		border-top: 1px solid #E6E6E6;
		background:	#F8F8FF;
		padding: 5px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.foot textarea{
		font-size: 20px;
		width: 70%;
		border: none;
		border-radius: 5px;
		height: 40px;
		margin-right: 10px;
		position: relative;
		top: 8px;
		resize:none;
		line-height:40px;
		background: white;
	}
	.foot button{
		width: 20%;
		height: 40px;
		position: relative;
		top: -10px;
	}
</style>
