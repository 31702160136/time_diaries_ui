let cookie=()=>{
	return{
		setCookie(ckey,cvalue){//设置cookie
			window.localStorage.setItem(ckey, cvalue);
		},
		getCookie(name){//获取cookie
			return window.localStorage.getItem(name);
		}
	}
}
export{
	cookie
};