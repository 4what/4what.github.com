
/*
 
 * 工具类
 
 */


function startTools()
{
}

startTools.prototype = {

	Event : function()
	{				
		var sUserAgent= navigator.userAgent.toLowerCase(); 
		var bIsIpad= sUserAgent.match(/ipad/i) == "ipad"; 
		var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os"; 
		var bIsMidp= sUserAgent.match(/midp/i) == "midp"; 
		var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 
		var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb"; 
		var bIsAndroid= sUserAgent.match(/android/i) == "android"; 
		var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce"; 
		var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile"; 
			
		if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)
		{ 
			return {'down' : 'touchstart', 'move' : 'touchmove', 'up' : 'touchend'};
			
		} else
		{ 
			return {'down' : 'mousedown', 'move' : 'mousemove', 'up' : 'mouseup'};
		} 
	},
	
	onTouch : function(e, _callback)
	{
		var onEvent = this.Event();
		var mouse_down = {'x' : 0, 'y' : 0};
		var mouse_move = {'x' : 0, 'y' : 0};
		
		//鼠标点击位置
		mouse_move.x = mouse_down.x = e.clientX || e.touches[0].pageX;
		mouse_move.y = mouse_down.y = e.clientY || e.touches[0].pageY;
			
		//添加滑过事件
		document.addEventListener(onEvent.move, touchMove, true);		
			
		//添加离开事件
		document.addEventListener(onEvent.up, touchEnd, true);		
		
		function touchMove(e)
		{
			e.preventDefault();
			mouse_move.x = e.clientX || e.touches[0].pageX;
			mouse_move.y = e.clientY || e.touches[0].pageY;
		}		
		
		function touchEnd(e)
		{
			document.removeEventListener(onEvent.move, touchMove, true);
			document.removeEventListener(onEvent.up, touchEnd, true);
			
			//卸载事件
			if(Math.abs(mouse_down.x - mouse_move.x) < 3 && Math.abs(mouse_down.y - mouse_move.y) < 3)
			{
				//执行回调
				_callback();
			}			
		}
	},
	
	getURL : function(val)
	{
		//判断url是否有带参数
		var strs, str = location.search.substr(1);
			
		if (location.search.indexOf("?") != -1)
		{
			strs = str.split("&");
			
			for (var i = 0; i < strs.length; i++)
			{		
				if(strs[i].split("=")[0] == val)
				{
					return (strs[i].split("=")[0] = unescape(strs[i].split("=")[1]));
				}
			}
		}
	},
	
	getDOM : function(id)
	{
		return document.getElementById(id);
	},
	
	getRandomArr : function(Arr)
	{
		var len = Arr.length;
		
		while(len--)
		{
			var k = Math.round ( Math.random() * len );
			Arr[len] = [Arr[k], Arr[k] = Arr[len]][0];
		}
		
		return Arr;
	}
}