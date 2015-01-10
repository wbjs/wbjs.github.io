_.ready(function(){
    var player_pause=false;
    //暂停不成立
    _.getJSON("data.json",function(x){//取得json数据
        //循环数据中的每一个内容
        /*
        i：数组的序列
        b：数组的总长度
         */
        function loop(i,b){
            //如果序列是1 则让code为空。用于重新播放。
            if(i==0){
                code="";
            }
            if(player_pause){
                index=i;//如果暂停，把当前的序列 给 index，重新播放时直接从index这里开始
            }else{
                // 数据里第0个序列为1 代表增加 为0 代表删除
                if(x[i][0]==1){
                    //增加内容
                    code=code+str(x[i][1]);
                }
                if(x[i][0]==0){
                    //删除内容
                    code=code.replace(str(x[i][1]),"");
                }
                _("#code").text(code);//实时更新#code里的内容

                if(i<b-1){//如果数据的当前序列小于 整个序列
                    setTimeout(function(){
                        loop(++i,b);
                    },100);
                }else{
                    //否则显示播放完毕。
                    _("#play").show();
                    _("#pause").hide();
                    index=0;
                }
                //_.log(i);
            }
        }
        var code="";
        function str(s){//用来把<和>转义
            if(s=="<"){
                return "&lt;";
            }else if(s==">"){
                return "&gt;";
            }else{
                return s;
            }
        }
        var index=0;//设置
        _("#play").click(function(){
            player_pause=false;
            loop(index,x.length);
            _("#play").hide();
            _("#pause").show();

        });
        _("#pause").click(function(){
            player_pause=true;
            _("#play").show();
            _("#pause").hide();
        });
        _("#stop").click(function(){
            player_pause=true;
        });
    });
});
