/*
			<|
	wb.2d.js	 |\
	v1.01		/|.\
	2015	       / || \
	             .'  |'  \
		  .-'.-==|/_--'
		  `--'-------'
	__---__---___--___---___--___
 _____---__---___--___---___--___-__
 
*/
_.clear_canvas=function(){
    _.c.clearRect(0, 0, _.canvas_w, _.canvas_h);
}
_.set_looping=function(x){
    _.looping=x;
}
_.setAniTime=function(t){
    _.anitime=t;
}
_.loop=false;
_.lastT=0;
_.animate=function() {
    var t=new Date().getTime();
    if(t- _.anitime> _.lastT){
        _.lastT=t;
        _.looping();
    }
    requestAnimationFrame(_.animate );
    //console.log(t- _.anitime)

}

_.screen=function(){

}
_.gameLoop=function(){

}
/* Engine */

var Engine=function(){

}
Engine.prototype.create_screen=function(){
    return new Screen();
}
Engine.prototype.create_text=function(id,x,y,z){
    return new Text(id,x,y,z);
}
Engine.prototype.create_sprite=function(name,x,y,w,h,src){
    return new Sprite(name,x,y,w,h,src);
}
Engine.prototype.create_render=function(){
    return new Render();
}
Engine.prototype.initCanvas=function(id,w,h){
    var canvas_box=document.querySelector("#"+id);
    var canvas=document.createElement("canvas");
    //
    _.canvas_w=w;
    _.canvas_h=h;
    canvas.width=_.canvas_w;
    canvas.height=_.canvas_h;
    canvas.top = 0;
    canvas.left = 0;
    _.c = canvas.getContext('2d');
    canvas_box.innerHTML="";
    canvas_box.appendChild(canvas);
    //
}
Engine.prototype.setGameLoop=function(x){
    _.gameLoop=x;
}
var engine=new Engine();
_.engine=engine;


_.init=function(){
    var engine=new Engine();
    _.engine=engine;
}

/* Screen */
var Screen=function(){
    this.objs=new Array();
}
Screen.prototype.add=function(obj){
    if(obj.type=="player"){
        this.player=obj;
        return false;
    }
    this.objs.push(obj);
}

_.timer=0;
_.life_timer=0;
/* Render */
var Render=function(){
    this.animate=function(){
        var loop=function(player,objs,fps) {
            if(_.loop){
                var t=new Date().getTime();
                if(t-fps> _.lastT){
                    _.lastT=t;
                    _.timer++;
                    _.life_timer++;
                    if(player.life==-1){
                        player.onDie();
                        player.onOver();
                        return false;
                    }
                    _.clear_canvas();

                    player.update();

                    for(i=0;i<objs.length;i++){
                        objs[i].update();
                        if(objs[i].life==0){
                            objs[i].onDie();
                            objs.splice(i,1);
                        }
                        if (Math.abs(player.x - objs[i].x)<player.w/1.5 && Math.abs(player.y - objs[i].y)<player.h/1.5) {
                            /* 如果是敌人 */
                            if(objs[i].type=="enemy"){
                                player.life--;
                                objs[i].onDie();
                                objs.splice(i,1);
                            }else if(objs[i].type=="life"){
                                /* 如果能加生命值 */
                                player.life++;
                                objs[i].onDie();
                                objs.splice(i,1);
                            }
                            /* 如果是障碍物 */
                            /* 如果是炸弹：清除全部敌人 */

                        }
                        //
                        //console.log(objs[i])
                    }
                    _.gameLoop();
                }
            }
            requestAnimationFrame(function(){
                loop(player,objs,fps);
            });
        }
        loop(this.screen.player,this.screen.objs,this.fps);
    }
}
Render.prototype.render=function(screen,fps){
    this.screen=screen;
    var this_time=new Date().getTime();
    this.fps=fps;
    this.animate();

}
/* Text */
var Text=function(id,x,y){
    this.id=id;
    this.x=x;
    this.y=y;
    this.live=1;
    this.color="#fff";
}
Text.prototype.setSize=function(size){
    this.size=size;
}
Text.prototype.update=function(){
    this.updateExec();
    _.c.font=this.size+"px Georgia";
    _.c.fillStyle=this.color;
    _.c.fillText(this.getText(),this.x,this.y);
}
Text.prototype.setColor=function(color){
    this.color=color;
}
Text.prototype.setText=function(text){
    this.text=text;
}
Text.prototype.getText=function(){
    return this.text;
}
Text.prototype.updateExec=function(){

}
Text.prototype.setUpdate=function(x){
    this.updateExec=x;
}
/* Sprite */
var Sprite=function(name,x,y,w,h,src){
    this.timer=0;
    this.name=name;
    this.live=1;
    this.life=1;
    this.timerfps=20;
    this.type="enemy";
    this.data=new Array();
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.imgs=new Array();
    var img=new Image();
    if(src==undefined){
        return false;
    }
    this.img_index=0;//渲染的img
    img.src=src;
    function a(x,img,w,h){
        img.onload=function(){
            //_.c.clearRect(0, 0, _.canvas_w, _.canvas_h);
            //_.c.drawImage(this,0,0,w,h);
            //var data=_.c.getImageData(0,0,this.width,this.height).data;
            //var data=_.c.getImageData(0,0,w,h).data;
           // _.c.clearRect(0, 0, _.canvas_w, _.canvas_h);
            //console.log(data);
            //x.data.push(data);
        }
    }
    //a(this,img,w,h);
    this.imgs.push(img);
    return this;
}
Sprite.prototype.addImage=function(src){
    var img=new Image();
    img.src=src;
    this.imgs.push(img);
    return this;
}
Sprite.prototype.setLife=function(life){
    this.life=life;
    return this;
}
Sprite.prototype.initData=function(){

}
Sprite.prototype.setData=function(data){
    this.data=data;
    return this;
}
Sprite.prototype.update=function(){
    this.updateExec();
    //console.log(this.data);
    if(this.imgs==null){
        return false;
    }
    this.timer++;
    _.c.drawImage(this.imgs[this.img_index],this.x-this.w/2,this.y-this.h/2,this.w,this.h);

    if(this.timer==20){
        this.timer=0;
        this.img_index++;
    }



    if(this.img_index==this.imgs.length){
        this.img_index=0;
    }
}
Sprite.prototype.updateExec=function(){
}
Sprite.prototype.setUpdate=function(x){
    this.updateExec=x;
    return this;
}
Sprite.prototype.setTimerfps=function(fps){
    this.timerfps=fps;
    return this;
}
Sprite.prototype.onDie=function(){

}
Sprite.prototype.setDie=function(x){
    this.onDie=x;
    return this;
}
Sprite.prototype.setType=function(type){
    this.type=type;
    return this;
}
Sprite.prototype.onOver=function(){

}
Sprite.prototype.setOver=function(x){
    this.onOver=x;
    return this;
}
