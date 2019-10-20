import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import index from "@/pages/index.vue"
import send_diary from "@/pages/m_index/send_diary.vue"
import register from "@/pages/register.vue"
import edit_password from "@/pages/edit_password.vue"
import info from "@/pages/me/info.vue"
import comment from "@/pages/comment/comment.vue"
import add from "@/pages/search/add.vue"
import intro from "@/pages/intro.vue"
import me_intro from "@/pages/me/intro.vue"
import message from "@/pages/m_index/message.vue"
import chat from "@/pages/message/chat.vue"

Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
		  name: 'index',
		  component: index
		},
		{
			path: '/index',
			name: 'index',
			component: index
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/send_diary',
			name: 'send_diary',
			component: send_diary
		},
		{
			path: '/register',
			name: 'register',
			component: register
		},
		{
			path: '/edit_password',
			name: 'edit_password',
			component: edit_password
		},
		{
			path: '/info',
			name: 'info',
			component: info
		},
		{
			path: '/comment',
			name: 'comment',
			component: comment
		},
		{
			path: '/add',
			name: 'add',
			component: add
		},
		{
			path: '/intro',
			name: 'intro',
			component: intro
		},
		{
			path: '/me_intro',
			name: 'me_intro',
			component: me_intro
		},
		{
			path: '/message',
			name: 'message',
			component: message
		},
		{
			path: '/chat',
			name: 'chat',
			component: chat
		}
  ]
})
