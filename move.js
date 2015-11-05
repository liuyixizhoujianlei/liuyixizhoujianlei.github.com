function getStyle(obj,name){
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	}
function move(obj,json,options){
	options = options || {};
	options.duration = options.duration || 1000;
	options.easing = options.easing || 'ease-out';
	var count = Math.floor(options.duration/30);
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));			
		if (isNaN(start[name])) {
			switch(name){
				case 'left':
				start[name] = obj.offsetLeft;
				break;				
				case 'right':
				start[name] = obj.offsetRight;
				break;
				case 'top':
				start[name] = obj.offsetTop;
				break;
				case 'bottom':
				start[name] = obj.offsetBottom;
				break;
				case 'opacity':
				start[name] = 1;
				break;
			}
		}
		dis[name] = parseFloat(json[name]) - start[name];
	}
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'easing':
				var a = n/count;
				var cur = dis[name]*a;
				break;
				case 'ease-in':
				var a=n/count;
				var cur=start[name]+dis[name]*Math.pow(a,3);
				break;
				case 'ease-out':
				var a=1-n/count;
				var cur=start[name]+dis[name]*(1-a*a*a);
				break;
			}
			if (name=='opacity') {
				obj.style[name] = cur;
			}else{
				obj.style[name] = cur +'px';
			}				
		}			
		if (n == count) {
			clearInterval(obj.timer);
			options.complete && options.complete.call(obj);
		}

	},30)
}