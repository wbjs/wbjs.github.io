/*
                <|
 wb.2d.js       |\
 v1.01	       /|.\
 2015	      / || \
            .'  |'  \
         .-'.-==|/_--'
         `--'-------'
 __---__---___--___---___--___
 _____---__---___--___---___--___-__
 */
 window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if(window.requestAnimationFrame==undefined){
    window.requestAnimationFrame=window.setTimeout;
}
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
    window.requestAnimationFrame(_.animate );
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
Screen.prototype={
    add:function(obj){
        if(obj.type=="player"){
            this.player=obj;
            return false;
        }
        this.objs.push(obj);
    }
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
                    if(player==undefined){
                        _.clear_canvas();
                        for(i=0;i<objs.length;i++){
                            objs[i].update();
                        }
                    }else{
                        if(player.life==0){
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
                        if (Math.abs(player.x - objs[i].x)<player.w/2 && Math.abs(player.y - objs[i].y)<player.h/2) {
                            /* 如果是敌人 */
                            if(objs[i].type=="enemy"){
                                player.life--;
                                objs[i].onDie();
                                objs.splice(i,1);
                            }else if(objs[i].type=="food"){
                                objs[i].onDie();
                                objs.splice(i,1);
                            }
                            /* 如果是障碍物 */
                            /* 如果是炸弹：清除全部敌人 */

                        }
                    }
                    }

                    _.gameLoop();
                }
            }
            window.requestAnimationFrame(function(){
                loop(player,objs,fps);
            });
        }
        loop(this.screen.player,this.screen.objs,this.fps);
    }
}
Render.prototype={
    render:function(screen,fps){
        this.screen=screen;
        var this_time=new Date().getTime();
        this.fps=fps;
        this.animate();
    }
}
/* Text */
var Text=function(id,x,y){
    this.id=id;
    this.x=x;
    this.y=y;
    this.live=1;
    this.color="#fff";
    this.text=id;
}
Text.prototype={
    setSize:function(size){
        this.size=size;
        return this;
    },
    update:function(){
        this.updateExec();
        _.c.font=this.size+"px Georgia";
        _.c.fillStyle=this.color;
        _.c.fillText(this.getText(),this.x,this.y);
        return this;
    },
    setColor:function(color){
        this.color=color;
        return this;
    },
    setText:function(text){
        this.text=text;
        return this;
    },
    getText:function(){
        return this.text;
    },
    updateExec:function(){

    },
    setUpdate:function(x){
        this.updateExec=x;
        return this;
    }
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
    this.shifts=new Array();//偏移
    this.img_index=0;//渲染的img
    this.shift_index=0;//偏移的序列
    var img=new Image();
    if(src==undefined){
    }else{
        img.src=src;
        function a(x,img){
            img.onload=function(){
                //_.c.clearRect(0, 0, _.canvas_w, _.canvas_h);
                //_.c.drawImage(this,0,0,w,h);
                //var data=_.c.getImageData(0,0,this.width,this.height).data;
                //var data=_.c.getImageData(0,0,w,h).data;
                // _.c.clearRect(0, 0, _.canvas_w, _.canvas_h);
                //console.log(data);
                //x.data.push(data);
                x.imgs.push(img);
                x.shifts.push({"shift_length":0,"shift_value":img.width});
           }
        }
        a(this,img);
    }
    return this;
}
Sprite.prototype={
    addImage:function(src,shift_length,shift_value){
        var img=new Image();
        img.src=src;
        this.imgs.push(img);

        this.shifts.push({"shift_length":shift_length-1,"shift_value":shift_value});

        return this;
    },
    setLife:function(life){
        this.life=life;
        return this;
    },
    initData:function(){

    },
    setData:function(data){
        this.data=data;
        return this;
    },
    update:function(){
        this.updateExec();
        if(this.imgs==null){
        }else{
            this.timer++;
            if(this.timer==this.timerfps){

                if(this.shift_index<this.shifts[this.img_index].shift_length){
                    this.shift_index++;
                }else{
                    this.shift_index=0;
                }
                this.timer=0;
            }
            var from_x=this.shift_index*this.shifts[this.img_index].shift_value;
            var to_x=this.shifts[this.img_index].shift_value;
            _.log(this.shift_index);
            _.c.drawImage(this.imgs[this.img_index],from_x,0,to_x,this.imgs[this.img_index].height,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
        }
    },
    updateExec:function(){
    },
    setUpdate:function(x){
        this.updateExec=x;
        return this;
    },
    setTimerfps:function(fps){
        this.timerfps=fps;
        return this;
    },
    onDie:function(){

    },
    setDie:function(x){
        this.onDie=x;
        return this;
    },
    setType:function(type){
        this.type=type;
        return this;
    },
    setOver:function(x){
        this.onOver=x;
        return this;
    }
}
