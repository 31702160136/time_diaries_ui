let tools=()=>{
	return{
		getTimeStamp(time){//设置cookie
			var t=new Date(time).valueOf().toString();
			t=t.substring(0,t.length-3);
			return t;
		},
		getDate(timestamp){
			// 时间戳转换日期格式
			let date = new Date(parseInt(timestamp) * 1000) // 时间戳为10位需乘1000，为13位则不用
			
			let Y = date.getFullYear() // 年
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
			let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
			
			let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
			let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
			let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
			
			// 一个函数只能有一个return，以下仅做示例
			return Y + '-' + M + '-' + D // yyyy-mm-dd
// 			return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + 's' // yyyy-mm-dd hh:mm:ss
// 			
// 			return Y + '/' + M + '/' + D // yyyy/mm/dd
// 			return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + 's' // yyyy/mm/dd hh:mm:ss
		},
		getTime(timestamp){
					// 时间戳转换日期格式
					let date = new Date(parseInt(timestamp) * 1000) // 时间戳为10位需乘1000，为13位则不用
					
					let Y = date.getFullYear() // 年
					let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
					let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
					
					let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
					let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
					let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
					
					// 一个函数只能有一个return，以下仅做示例
		//			return Y + '-' + M + '-' + D // yyyy-mm-dd
					return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s // yyyy-mm-dd hh:mm:ss
		// 			
		// 			return Y + '/' + M + '/' + D // yyyy/mm/dd
		// 			return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + 's' // yyyy/mm/dd hh:mm:ss
				}
	}
}
export{
	tools
};