/**
 * Created by g on 2014/12/26.
 * http://www.github.com/wbjs
 */
var Wb=function(s){
    this.objs=document.querySelectorAll(s);
};
Wb.prototype={
    /* display */
    hide:function(){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].style.display="none";
        }
        return this;
    },
    show:function(){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].style.display="block";
        }
        return this;
    },
    /* innerHTML */
    text:function(t){
        if(t==undefined){
            var arr=new Array();
            for(i=0;i<this.objs.length;i++){
                var value=this.objs[i].innerHTML;
                arr.push(value);
            }
            if(arr.length>1){
                return arr;
            }else{
                return arr[0];
            }
        }else{
            for(i=0;i<this.objs.length;i++){
                this.objs[i].innerHTML=t;
            }
            return this;
        }
    },
    /* random Array */
    randomArray:function(){
        console.log(this.objs);
        this.objs=this.objs.sort(function(){
            return Math.random() > 0.5 ? -1 : 1;
        });
        return this;
    },
    /* onload */
    ready:function(x){
        window.onload=x;
    },/* pc mouse over and out */
    hover:function(x){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].onmouseover=x;
        }
        return this;
    },
    out:function(x){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].onmouseout=x;
        }
        return this;
    },
    /* onclick */
    click:function(x){
        for(i=0;i<this.objs.length;i++){
            if(/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase())){
                this.objs[i].addEventListener("touchstart",x,false);
            }else{
                this.objs[i].onclick=x;
            }
        }
        return this;
    },
    clearClass:function(){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].removeAttribute("class");
        }
        return this;
    },
    clearAttr:function(a){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].removeAttribute(a);
        }
        return this;
    },
    attr:function(a,b){
    /* 2014 12 30 */
        if(b==undefined){
            var arr=new Array();
            for(i=0;i<this.objs.length;i++){
                var value=this.objs[i].getAttribute(a);
                arr.push(value);
            }
            if(arr.length>1){
                return arr;
            }else{
                return arr[0];
            }
        }else{
            for(i=0;i<this.objs.length;i++){
                this.objs[i].setAttribute(a,b);
                console.log(b)
            }
            return this;
        }
    },
    /* setAttribute：value from myself */
    attrSelf:function(a,b){
        for(i=0;i<this.objs.length;i++){
            eval("this.objs[i].setAttribute(a,this.objs[i]."+b+")");
        }
        return this;
    },
    /* from 1 to end+1  */
    initIndex:function(){
        for(i=0;i<this.objs.length;i++){
            this.objs[i].setAttribute("data-index",(i+1));
        }
        return this;
    },
    count:function(a){
        a["count"]=this.objs.length;
        return this;
    },
    /* style 2014 12 30 */
    style:function(a,b){
        /* 2014 12 30 */
        if(b==undefined){
            var arr=new Array();
            for(i=0;i<this.objs.length;i++){
                var cmd="var value=this.objs[i].style."+a;
                eval(cmd);
                arr.push(value);
            }
            if(arr.length>1){
                return arr;
            }else{
                return arr[0];
            }
        }else{
            for(i=0;i<this.objs.length;i++){
                var cmd="this.objs[i].style."+a+"='"+b+"'";
                //console.log(cmd)
                eval(cmd);
            }
            return this;
        }
    },
    selectIndex:function(i){
        i=i-1;
        var arr=new Array();
        arr[0]=this.objs[i];
        this.objs=arr;
        return this;
    },select:function(obj){
        var arr=new Array();
        for(i=0;i<this.objs.length;i++){
            if(this.objs[i]==obj){
                arr[0]=this.objs[i];
            }
        }
        this.objs=arr;
        return this;
    }
}
Wb.prototype.css=Wb.prototype.style;/* like jq */

/*
 * plus
 * */
/* is array */
_.isArray=function(o){
    return Object.prototype.toString.call(o) === '[object Array]';
}
_.randomArray=function(arr){
    arr=arr.sort(function(){
        return Math.random() > 0.5 ? -1 : 1;
    });
    return arr;
}
_.isTEL=function(number){
    ///^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test
    return /^(((13[0-9]{1})|159|153|185)+\d{8})$/.test(number);
    //
}
_.printCode=function(html){
    html=html.replace(/</g,"&lt;");
    html=html.replace(/>/g,"&gt;");
    return html;
}
_.randomPass=function(len){
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
_.ready=function(x){
    //window.onload=x;
    window.addEventListener("load",x,false);
}
_.log=function(a){
    console.log(a);
}
_.getJSON=function(url,fun){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (req.readyState == 4) { // Complete
            if (req.status == 200) {  // OK response
                var json = JSON.parse(req.responseText);
                fun(json);
            }
        }
    };
    try {
        req.open("GET",url,true);
    }catch (e) {
        alert(e);
    }
    req.send(null);
}
_.get=function (name){
     var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
     if(result == null || result.length < 1){
         return "";
     }
     return result[1];
     /*
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r!=null) return unescape(r[2]); return null;
     */
}
function _(s){
    return new Wb(s);
}
