//网络
import Vue from 'Vue';
import axios from 'axios';
import {cookie} from '@/utils/Cookie.js'
import qs from "qs"

//Get用法
// let getGreens = () => {
// 	return axios.get(url,{
// 		params:{
// 			type: "get",
// 			method: "getGreens",
// 			table: "green",
// 			where: "1"
// 		}
// 	});
// };

//Post用法
// let getGreens = () => {
// 	return axios({
// 		method:"post",
// 		url:p_url,
// 		data: qs.stringify({
// 			type: "post",
// 			method: "getGreens",
// 			table: "green",
// 			where: "1"
// 		})
// 	});
// };
//上传图片路径

var host="http://www.yulemofang.cn/api/"
var socket="www.yulemofang.cn/api/"
// var host="http://127.0.0.1:8082/api/"
var upload_url=host+"v1/user/upload_image"
var user="v1/user/"
var diaries="v1/diaries/"
var msg="v1/msg/"

let http = () => {
	axios.defaults.headers.common['Token'] = cookie().getCookie("token");
	axios.defaults.headers.common['Content-Type'] = "application/json; charset=utf-8"
	return {
		//登陆
		login(data) {
			return axios({
				method: "post",
				url: host + "login",
				data: data
			});
		},
		//注销登陆
		outLogin() {
			return axios({
				method: "post",
				url: host + user +"out_login"
			});
		},
		//注册
		register(data) {
			return axios({
				method: "post",
				url: host + user + "register",
				data:qs.stringify(data)
			});
		},
		//修改密码
		editPassword(data) {
			return axios({
				method: "post",
				url: host + user + "change_password",
				data:data
			})
		},
		//保存用户信息
		saveUserInfo(data) {
			return axios({
				method: "post",
				url: host + user + "save_info",
				data:qs.stringify(data)
			})
		},
		//查询用户信息
		getUserInfo(data) {
			return axios({
				method: "get",
				url: host + user + "user_info",
				data:data
			})
		},
		//发表日记
		sendDiaries(data) {
			var params = new URLSearchParams();
			params.append("content",data.content);
			params.append("type",data.type);
			for(var i=0;i<data.url.length;i++){
				params.append("url",data.url[i]);
			}
			return axios({
				method: "post",
				url:host + diaries + "send_diaries",
				data:params
			});
		},
		//查询推荐日记
		QueryDiaries(data) {
			return axios({
				method: "get",
				url: host + diaries + "query_diaries",
				params:data
			})
		},
		//查询日记圈
		QueryDiariesCircle(data) {
			return axios({
				method: "get",
				url: host + diaries + "query_diaries",
				params:data
			})
		},
		//为日记点赞
		PraiseDiaries(data) {
			return axios({
				method: "post",
				url: host + diaries + "praise_diaries",
				data:qs.stringify(data)
			})
		},
		//查询日记详情
		DiariesDetails(data) {
			return axios({
				method: "get",
				url: host + diaries + "diaries_details",
				params:data
			})
		},
		//评论日记
		Comment(data) {
			return axios({
				method: "post",
				url: host + diaries + "comment",
				data:qs.stringify(data)
			})
		},
		//关注
		Attention(data) {
			return axios({
				method: "post",
				url: host + user + "attention_user",
				data:qs.stringify(data)
			})
		},
		//查询当前关注的用户
		AttentionUserList() {
			return axios({
				method: "get",
				url: host + user + "user_attention_list"
			})
		},
		//搜索用户
		findInfoList(data) {
			return axios({
				method: "get",
				url: host + user + "find_info_list",
				params:data
			})
		},
		//删除日记
		delDiaries(data) {
			return axios({
				method: "post",
				url: host + diaries + "del_diaries",
				data:qs.stringify(data)
			})
		},
		//发送消息
		sendMsg(data) {
			return axios({
				method: "post",
				url: host + msg + "send",
				data:qs.stringify(data)
			})
		},

	}
}
	


export {
	http,
	upload_url,
	socket
};
