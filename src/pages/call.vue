<template>
	<div></div>
</template>

<script>
	import {socket} from "@/api/shop.js"
	export default {
		data(){
			return{
				key:"0",
				is_init:false
			}
		},
		created() {
			this.init()
		},
		methods:{
			init() {
				this.$http().getUserInfo().then(res => {
					var status = res.data.status;
					if (status) {
						this.$store.commit("setMe",res.data.data);
						this.key=this.$store.state.me.user_id.toString();
						this.$store.state.refresh=true
						var put=JSON.parse(this.$cookie().getCookie(this.key))
						if(put==null){
							put={
								list:[]
							}
						}
						this.$store.state.dialogueList=put.list
						this.is_init=true
					} else {
						var data={
							name:"游客",
							username:"0",
							cover:require("@/static/images/touxiang2.png"),
							fans:0,
							user_id:0
						}
						this.$store.commit("setMeYouke",data);
						this.$store.state.refresh=false
					}
					this.scokte()
				});
			},
			saveToCache(data){
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
				var newMsgs=data.data
				if(!(myDialogueList instanceof Array) || myDialogueList.length==0){
					myDialogueList=[]
					var length=newMsgs.length
					for(var i=0;i<length;i++){
						var item=this.$tools().copy(dialogue)
						var msg_len=newMsgs[i].message.length
						item.newMsg=newMsgs[i].message[msg_len-1].content
						item.time=newMsgs[i].message[msg_len-1].create_time
						item.newTotal=msg_len
						item.cover=newMsgs[i].user.cover
						item.name=newMsgs[i].user.name
						item.user_id=newMsgs[i].user.user_id
						item.msgArr=item.msgArr.concat(newMsgs[i].message)
						myDialogueList.push(item)
					}
				}else{
					var length=myDialogueList.length
					//检测新消息是否存在会话，如果没有会话则创建一个新会话，并把消息写入到此会话中
					for(var i=0;i<newMsgs.length;i++){
						for(var j=0;j<length;j++){
							if(newMsgs[i].user.user_id==myDialogueList[j].user_id){
								break
							}
							if(j==length-1){
								var item=this.$tools().copy(dialogue)
								var msg_len=newMsgs[i].message.length
								item.newMsg=newMsgs[i].message[msg_len-1].content
								item.time=newMsgs[i].message[msg_len-1].create_time
								item.newTotal=msg_len
								item.cover=newMsgs[i].user.cover
								item.name=newMsgs[i].user.name
								item.user_id=newMsgs[i].user.user_id
								item.msgArr=item.msgArr.concat(newMsgs[i].message)
								myDialogueList.unshift(item)
							}
						}
					}
					length=myDialogueList.length
					//新信息存入会话里
					for(var i=0;i<length;i++){
						for(var j=0;j<newMsgs.length;j++){
							if(myDialogueList[i].user_id==newMsgs[j].user.user_id){
								var msg_len=newMsgs[j].message.length
								myDialogueList[i].newMsg=newMsgs[j].message[msg_len-1].content
								myDialogueList[i].time=newMsgs[j].message[msg_len-1].create_time
								myDialogueList[i].cover=newMsgs[j].user.cover
								myDialogueList[i].name=newMsgs[j].user.name
								myDialogueList[i].newTotal+=newMsgs[j].message.length
								myDialogueList[i].msgArr=myDialogueList[i].msgArr.concat(newMsgs[j].message)
								var dialogue=myDialogueList[i]
								myDialogueList.splice(i,1)
								myDialogueList.unshift(dialogue)
								newMsgs.splice(j,1)
							}
						}
					}
				}
				var obj={
					list:myDialogueList
				}
				this.$cookie().setCookie(this.key,JSON.stringify(obj))
				this.$store.state.dialogueList=myDialogueList
				
			},
			scokte(){
				this.ws = new WebSocket('ws://'+socket+'v1/msg/ping?token='+this.$cookie().getCookie("token"))
				// 连接打开时触发
				this.ws.onopen = () => {
					console.log("Connection open ...")
					this.$store.state.ws=this.ws
				}
				// 接收到消息时触发  
				this.ws.onmessage = (res) => {
					var data=JSON.parse(res.data)
					switch(data.type){
						case 0:
							this.ws.send("pong")
							break
						case 1:
							this.saveToCache(data)
							break
						case 2:
							break
					}
				}
				var that=this
				this.ws.onclose = () => {
					console.log('Connection close !!!')
					if(that.$store.state.me.user_id!=0){
						//如果关闭则重新连接
						setTimeout(function(){
							that.scokte()
						},2000)
					}
				}
			}
		},
		mounted() {
			
		},
		// 关闭连接 
		beforeDestroy() {
			this.ws.close()
		},
	}
</script>

<style>

</style>
