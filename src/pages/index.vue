<template>
	<div>
		<home v-if="index==0"></home>
		<message v-if="index==1"></message>
		<attention v-if="index==3"></attention>
		<me v-if="index==4"></me>
		<div class="bottom">
			<el-row>
				<div @click="toPage(0)">
					<el-col :span="5" :class="index==0? 'nav-1 navs pitch':'nav-1 navs'">
						日记
					</el-col>
				</div>
				<div @click="$message('请期待')">
					<el-col :span="5" :class="index==1? 'nav-2 navs pitch':'nav-2 navs'">
						消息
					</el-col>
				</div>
				<div @click="toSendDiary()">
					<el-col :span="4" class="nav-3 navs">
						<img src="../static/images/add.png" width="50%" />
					</el-col>
				</div>
				<div @click="toPage(3)">
					<el-col :span="5" :class="index==3? 'nav-4 navs pitch':'nav-4 navs'">
						关注
					</el-col>
				</div>
				<div @click="toPage(4)">
					<el-col :span="5" :class="index==4? 'nav-5 navs pitch':'nav-5 navs'">
						我的
					</el-col>
				</div>
			</el-row>
		</div>
	</div>
</template>

<script>
	import attention from "@/pages/m_index/attention.vue"
	import home from "@/pages/m_index/home.vue"
	import message from "@/pages/m_index/message.vue"
	import me from "@/pages/m_index/me.vue"
	import send_diary from "@/pages/m_index/send_diary.vue"
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toSendDiary(){
				this.$router.push("/send_diary")
			},
			toPage(i){
				this.$store.state.index=i;
			}
		},
		computed:{
			index(){
				return this.$store.state.index;
			}
		},
		components:{
			attention,
			home,
			message,
			me,
			send_diary
		}
	}
</script>

<style>
.bottom{
	background: white;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 15px 20px 10px 20px;
	font-weight: bold;
}
.pitch{
	color: #E6A23C;
}
.navs{
	height: 30px;
}
.nav-3{
	border-radius: 5px;
	position: relative;
	top: -5px;
}
</style>
