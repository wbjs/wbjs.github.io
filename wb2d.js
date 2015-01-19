window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if(window.requestAnimationFrame==undefined){
    window.requestAnimationFrame=window.setTimeout;
}
var gameTime=0;
var gameTimeValue=0;
var d=document;
var b=document.body;
var wb2d={
	fps:5,
	lastT:0,
	loop:false,
	fpsruns:new Array(),
	loopOn:function(){
		wb2d.loop=true;
	},
	loopOff:function(){
		wb2d.loop=false;
	},
	setFps:function(f){
		wb2d.fps=f;
	},
	addFpsRun:function(value,x){
		wb2d.fpsruns.push({
			value:0,
			maxValue:value,
			run:function(){
				x();
			}
		});
	},
	ani:function(){
		if(wb2d.loop){
			var t=new Date().getTime();
			if(t-wb2d.fps>wb2d.lastT){
				wb2d.lastT=t;
				c.clearRect(0, 0,c_w,c_h);
				//
				fpsruns=wb2d.fpsruns;
				for (var i = fpsruns.length - 1; i >= 0; i--) {
		    		fpsruns[i].value++;
		    		if(fpsruns[i].value==fpsruns[i].maxValue){
		    			fpsruns[i].value=0;
		    			fpsruns[i].run();
		    		}
		    	};
				//
				wb2d.run();
			}
			window.requestAnimationFrame(wb2d.ani);
		}

	},
	run:function(){

	},
	looping:function(x){
		this.run=x;
	},
	init:function(id,w,h){
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
	},
	arc:function(x,y,r){
		c.beginPath();
	    c.moveTo(x,y);
	    c.arc(x,y,r,0,2 * Math.PI, false);
	    c.fill();
	    return this;
	},
	rgb:function(r,g,b){
		c.fillStyle='rgba('+r+','+g+','+b+',1)';
		return this;
	}
}
