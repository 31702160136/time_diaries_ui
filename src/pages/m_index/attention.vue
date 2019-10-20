<template>
	<div class="attention">
		<div class="header">
			<el-row type="flex" align="middle">
				<el-col :span="4" style="text-align: left;">
					关注
				</el-col>
				<el-col :span="13" class="input">
					<input type="text" v-model="content"/>
				</el-col>
				<el-col :span="4" class="search">
					<img src="../../static/images/search.png" style="width: 30px;height: 30px;" @click="search(content)"/>
				</el-col>
				<el-col :span="3" style="text-align: right;font-size: 20px;">
					<img src="../../static/images/add.png" @click="toAdd()" style="width: 25px;" />
				</el-col>
			</el-row>
		</div>
		<div class="main">
			<div v-if="!(my_search.length>0)" class="list" v-for="(item,index) of listData" :key="index">
				<el-row class="list-item">
					<div @click="toIntro(item.be_user_id)">
						<el-col :span="18" style="text-align: left;">
							<img v-if="item.cover!=''" :src="item.cover" style="width: 55px;height: 55px; border-radius: 5px;"/>
							<img v-if="item.cover==''" src="../../static/images/touxiang2.png" style="width: 55px;height: 55px; border-radius: 5px;" />
							<a style="position: relative; top: -20px; left: 10px;">{{item.name}}</a>
						</el-col>
					</div>
					<el-col :span="6" style="text-align: right;">
						<a style="position: relative; top: 15px; right: 20px;color: #E6A23C;" @click="Attention(item.be_user_id)">取消关注</a>
					</el-col>
				</el-row>
			</div>
			<div v-if="my_search.length>0" class="list" v-for="(item,index) of my_search" :key="index">
				<div @click="toIntro(item.be_user_id)">
					<el-row class="list-item">
						<el-col :span="18" style="text-align: left;">
							<img v-if="item.cover!=''" :src="item.cover" style="width: 55px;height: 55px; border-radius: 5px;"/>
							<img v-if="item.cover==''" src="../../static/images/touxiang2.png" style="width: 55px;height: 55px; border-radius: 5px;" />
							<a style="position: relative; top: -20px; left: 10px;">{{item.name}}</a>
						</el-col>
						<el-col :span="6" style="text-align: right;">
							<a style="position: relative; top: 15px; right: 20px;color: #E6A23C;" @click="Attention(item.be_user_id)">取消关注</a>
						</el-col>
					</el-row>
				</div>
			</div>
			<el-row>
				<el-col :span="24" style="text-align: center; color: #DCDCDC;" class="end">
					没有了
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				content:'',
				listData:[],
				my_search:[]
			};
		},
		created(){
			this.init()
		},
		methods: {
			init() {
				Indicator.open('加载中...');
				this.$http().AttentionUserList().then(res => {
					var status = res.data.status;
					if (status) {
						this.listData=res.data.data;
					} else {
						this.$store.state.index=0;
						this.$router.push("/login");
					}
					Indicator.close()
				});
			},
			toSearch() {
				this.$router.push("/search");
			},
			toAdd() {
				this.$router.push("/add");
			},
			Attention(user_id){
				var data={
					be_user_id:parseInt(user_id)
				}
				this.$http().Attention(data).then(res => {
					var status = res.data.status;
					if (status) {
						this.init()
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			search(content){
				var arr=[]
				for(var i=0;i<this.listData.length;i++){
					if(this.listData[i].name.indexOf(content)>=0){
						arr.push(this.listData[i])
					}
				}
				this.my_search=arr;
			},
			toIntro(user_id){
				this.$router.push("/intro?user_id="+user_id);
			}
		},
	}
</script>

<style scoped="scoped">
.attention{
	background: white;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.header{
	padding: 10px;
	overflow-y: hidden;
	background: white;
	border-bottom: 1px solid #E6E6E6;
}
.main{
	padding: 10px 10px 10px 15px;
	position: absolute;
	left: 0;
	right: 0;
	top: 54px;
	bottom: 60px;
	overflow-y: auto;
	background: white;
}
.list-item{
	border-bottom: #DCDCDC 1px solid;
	padding-top: 7px;
	padding-bottom: 7px;
}
.input input{
	border-radius: 5px;
	height: 30px;
	width: 100%;
	border: none;
	font-size: 20px;
	border: #F0F0F0 solid 1px;
}
.end{
	margin-top: 10px;
}
</style>
