/**
 * Created by g on 2015/1/10.
 */
function wb(){
    this.x=0;
    this.y=0;
    this.color="#f00";
    this.painterWidth=2;
}
wb.prototype.jumpTo=function(x,y){
    this.x=x;
    this.y=y;
    return this;
}
wb.prototype.goto=function(x,y){
    /*
    this.c.lineWidth =this.painterWidth;
    this.c.beginPath();
    this.c.moveTo(this.x,this.y);
    //
    this.c.lineTo(x,y);
    this.c.strokeStyle =this.color;
    this.c.stroke();
    this.x=x;
    this.y=y;
    */
    function d(o){
        if(o.x==x&& o.y==y){

        }else{
            o.c.lineWidth =o.painterWidth;
            o.c.beginPath();

            o.c.moveTo(o.x, o.y);
            if(o.x<x){
                ++o.x;
            }

            if(o.x>x){
                --o.x;
            }
//
            //
            o.c.lineTo(o.x, o.y);
            o.c.strokeStyle =o.color;
            o.c.stroke();

            o.c.beginPath();
            //
            if(o.y<y){
                ++o.y;
            }

            if(o.y>y){
                --o.y;
            }
            //
            o.c.lineTo(o.x, o.y);
            o.c.strokeStyle =o.color;
            o.c.stroke();
            //o.x=x;
            //o.y=y;
        }
        setTimeout(function(){
            d(o);
        },5);
    }
    d(this);

    //return this;
}
wb.prototype.setCanvas=function(id){
    var canvas=document.getElementById(id);
    this.maxWidth=canvas.width;
    this.maxHeight=canvas.height;
    this.c=canvas.getContext('2d');
    return this;
}
wb.prototype.goHome=function(){
    this.x=this.maxWidth/2;
    this.y=this.maxHeight/2;
    return this;
}
wb.prototype.setColor=function(color){
    this.color=color;
    return this;
}
wb.prototype.clear=function(){
    this.c.clearRect(0, 0,this.maxWidth,this.maxHeight);
    return this;
}
var wb=new wb();
window.addEventListener("load",function(){
    wb.setCanvas("box");
    wb.jumpTo(10,10).goto(310,10).goto(310,310).goto(10,310).goto(10,20);
},false);