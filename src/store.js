import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		index:0,
		hint:0,
		me:{
			cover: '',
			name: '',
			sex: '',
			phone: '',
			birthday: '',
			username:'',
			fans:'',
			user_id:0
		},
		wx:null,
		dialogueList:[],
		refresh:true,
		isReceive:false
	},
	mutations:{
		setMe(state,data){
			state.me.cover=data.user_info.cover;
			state.me.name=data.user_info.name;
			state.me.sex=data.user_info.sex;
			state.me.phone=data.user_info.phone;
			state.me.birthday=data.user_info.birthday;
			state.me.username=data.username;
			state.me.fans=data.total;
			state.me.user_id=parseInt(data.user_info.user_id)
		},
		setList(state,data){
			state.dialogueList=data
		},
		setMeYouke(state,data){
			state.me.cover=data.cover;
			state.me.name=data.name;
			state.me.username=data.username;
			state.me.fans=data.fans;
		},
		setIsLogin(state,data){
			state.is_login=data;
		}
	}
})