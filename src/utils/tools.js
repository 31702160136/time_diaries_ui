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
		},
		noopsycheTime(timestamp){
			// 时间戳转换日期格式
			let date = new Date(parseInt(timestamp) * 1000) // 时间戳为10位需乘1000，为13位则不用
			
			let Y = date.getFullYear() // 年
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
			let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日
			
			let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
			let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
			let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
			
			var nowData=new Date()
			var is_toYear=true
			if(Y!=nowData.getFullYear()){
				is_toYear=false
			}
			
			var chinese=["周日","周一","周二","周三","周四","周五","周六"]
			var tmp = Date.parse( new Date() ).toString();
			tmp = parseInt(tmp.substr(0,10));
			var time=tmp-timestamp
			var day=new Date(parseInt(timestamp)*1000).getDay()
			if(time<86400){
				return h + ':' + m 
			}else if(time>=86400 && time<(86400*2)){
				return '昨天 '+ h + ':' + m
			}else if(time>=(86400*2)&&time<=(86400*3)){
				return '前天 '+ h + ':' + m
			}else if(time>=(86400*3)&&time<=(86400*7)){
				return chinese[day] +' '+ h + ':' + m
			}else if(is_toYear){
				return M + '月' + D + '日' + ' ' + h + ':' + m
			}else if(!is_toYear){
				return Y + '年' + M + '月' + D + '日' + ' ' + + h + ':' + m
			}
			// 一个函数只能有一个return，以下仅做示例
//			return Y + '-' + M + '-' + D // yyyy-mm-dd
			return Y + '-' + M + '-' + D + ' ' + h + ':' + m // yyyy-mm-dd hh:mm:ss
// 			
// 			return Y + '/' + M + '/' + D // yyyy/mm/dd
// 			return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + 's' // yyyy/mm/dd hh:mm:ss
		}
	}
}
export{
	tools
};