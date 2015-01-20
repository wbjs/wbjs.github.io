window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if(window.requestAnimationFrame==undefined){
    window.requestAnimationFrame=window.setTimeout;
}
var gameTime=0;
var gameTimeValue=0;
var d=document;
var b=document.body;
var wb2d={
	timeLine:0,
	fps:5,
	lastT:0,
	loop:false,
	fpsruns:new Array(),
	timeLineRuns:new Array(),
	loopOn:function(){
		wb2d.loop=true;
		return wb2d;

	},
	loopOff:function(){
		wb2d.loop=false;
		return wb2d;
	},
	setFps:function(f){
		wb2d.fps=f;
		return wb2d;
	},
	addTimeLine:function(f,t,x){
		wb2d.timeLineRuns.push({
			from:f,
			to:t,
			run:function(){
				x();
			}
		});
		return wb2d;
	},
	addFpsRun:function(value,x){
		wb2d.fpsruns.push({
			value:0,
			maxValue:value,
			run:function(){
				x();
			}
		});
		return wb2d;
	},
	ani:function(){
		if(wb2d.loop){
			var t=new Date().getTime();
			if(t-wb2d.fps>wb2d.lastT){
				wb2d.lastT=t;
				wb2d.timeLine++;
				c.clearRect(0, 0,c_w,c_h);
				//
				var fpsruns=wb2d.fpsruns;
				for (var i = fpsruns.length - 1; i >= 0; i--) {
		    		fpsruns[i].value++;
		    		if(fpsruns[i].value==fpsruns[i].maxValue){
		    			fpsruns[i].value=0;
		    			fpsruns[i].run();
		    		}
		    	};
				//
				var timeLineRuns=wb2d.timeLineRuns;
				for (var i = timeLineRuns.length - 1; i >= 0; i--) {
					var f=timeLineRuns[i].from;
					var t=timeLineRuns[i].to;
					if(wb2d.timeLine>f && wb2d.timeLine<t){
						timeLineRuns[i].run();
					}
				};
				wb2d.run();
			}
			window.requestAnimationFrame(wb2d.ani);
		}

	},
	run:function(){

	},
	looping:function(x){
		wb2d.run=x;
		return wb2d;
	},
	init:function(id,w,h){
		wb2d.timeLine=0;
		var canvas_box=document.querySelector("#"+id);
    	var canvas=document.createElement("canvas");
	    c_w=w;
	    c_h=h;
	    canvas.width=c_w;
	    canvas.height=c_h;
	    canvas.top = 0;
	    canvas.left = 0;
	    c = canvas.getContext('2d');
	    canvas_box.innerHTML="";
	    canvas_box.appendChild(canvas);
	    c.clearRect(0, 0,c_w,c_h);
	    return wb2d;
	},
	arc:function(x,y,r){
		c.beginPath();
	    c.moveTo(x,y);
	    c.arc(x,y,r,0,2 * Math.PI, false);
	    c.fill();
	    return wb2d;
	},
	rgb:function(r,g,b){
		c.fillStyle='rgba('+r+','+g+','+b+',1)';
		return wb2d;
	}
}
