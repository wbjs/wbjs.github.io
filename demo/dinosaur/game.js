/**
 * Created by g on 2015/1/5.
 */
_.ready(function () {
    /**/
    function init() {
        _.init();
        var i = 0;
        var m=0;
        _.bg_left=0;
        var dieCount = 0;
        /*初始化2d游戏引擎*/
        _.engine.initCanvas("canvas_box", 320, 320);
        /*新建一个场景*/
        var screen = _.engine.create_screen();
        /*新建一个时间文本
         var time_text=_.engine.create_text("time",100,100);
         time_text.setText(0);
         time_text.setSize(50);
         time_text.setColor("#f00");
         time_text.setUpdate(function(){
         this.setText(this.getText()+1);
         })
         */
        /*向场景添加时间文本*/
        //screen.add(time_text);
        /*新建一个玩家精灵*/
        var player = _.engine.create_sprite("player", 50, 290, 50, 50);
        player.addImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABWCAYAAABIBJ0pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjRGMzdBQTc5NjQ0MTFFNDg5NkNDNjRERjA3Q0VGNDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjRGMzdBQTg5NjQ0MTFFNDg5NkNDNjRERjA3Q0VGNDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNEYzN0FBNTk2NDQxMUU0ODk2Q0M2NERGMDdDRUY0MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNEYzN0FBNjk2NDQxMUU0ODk2Q0M2NERGMDdDRUY0MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpaHm1YAAAGeSURBVHja7NzBdYQwDAVAyKNDKJMevTmTA4+wIMmeqQDEj6w1wXNrbapk27bQC973fZ4Ky1a/nwkCCSACyLjm7DNg9MxSfSbMXj8dkFBL9Rv47UDHv3hPtVD9dEAswQggmAH/+SvPUyxcPx0QAUQAQQARQBBABBAEEAEEAUQA4RHLaDdc/au23uqnA2IJRgDBDPiGq1+JmRmfrZ8OiCUYAYQQ87quLdPM8+0v+Z++n+P1qp8OiCUYBJACwvYBs5/alF0v9dMBEUAEEEL82Qc8ursP1PsJp2f3p346IJZgEEASOt0HvPquM9vMcrzet69P/XRALMEggCR0ug9Y3dv/D6h+OiCWYBBABBAEEAEEASShJfpdaXXqpwNSuQP23pHIXT8dkFwd0ExjJtQBEUAQQLo3t3ZtRMn+zUJ26qcDYgkGAaTiDBg90/T2pmP0+umACCACCDVnwLszzbfOSullNrx73uDT5xXqgFiCQQAxA/Ywg4w2E5oBQQARQJhe+CrOzKd+OiACCALIeDNg9n2o0WR7HjoglmAEEEJ8BBgA48/AnI7ryGoAAAAASUVORK5CYII=",2,80).setLife(10).setUpdate(function () {
            if (this.toY < this.y) {
                this.y -= 4;
            } else {
                this.y+=4;
                this.toY = this.y;
            }
            if (this.y > 290) {

                this.y = 290;
            }
            /*
             _.c.fillStyle = "#F00";
             _.c.beginPath();
             _.c.arc(this.x, this.y, 15, 0, Math.PI * 2, 1);
             _.c.closePath();
             _.c.fill();
             */
        }).setDie(function () {
            this.y = 50;
        }).setType("player").setTimerfps(10).setOver(function () {
            //
            //gameover
            gameover();
            //
        }).setTimerfps(10);
        /*添加玩家精灵到场景*/
        player.toY = 300;
        screen.add(player);
        /*
         var life_text=_.engine.create_text("life",10,20);
         life_text.setColor("#f00");
         life_text.setSize(20);
         life_text.setText("life:"+player.life);
         screen.add(life_text);
         */
        /* 设置游戏逻辑 */
        _.engine.setGameLoop(function () {
            //game code here
            /* 显示玩家精灵生命值 */
            _("#player_life").text(parseInt(player.life/10*100)+"%");
            _("#m").text(parseInt(m++)+"km");
            _("#player_life").css("width",player.life/10*100+"px");
            /*添加敌人精灵到场景*/
            if (_.timer >= 100) {
                _.timer = 0;
                //screen.add(_.engine.create_sprite("blue",320,320,48,48).addImage("plans.png",1,51).setUpdate(function(){
                screen.add(_.engine.create_sprite("blue", 320, 320-26,25,50, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABkCAYAAAArKghlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzRDMjY3NjE5NjM5MTFFNDkxQzFFN0UzMDA0MDA3NDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzRDMjY3NjI5NjM5MTFFNDkxQzFFN0UzMDA0MDA3NDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNEMyNjc1Rjk2MzkxMUU0OTFDMUU3RTMwMDQwMDc0MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEMyNjc2MDk2MzkxMUU0OTFDMUU3RTMwMDQwMDc0MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvjJmEIAAAFVSURBVHja7NxNDoMgEIZhbFx4SI/nHXFH64KEkKIgP+LwzqZp2jR9/KhVGJ2MMapk7fse9YHLskyqcE1gThDruka9f9u24qiPElTZyaQmUjMhUcmAAQMGDBgwYMCAAQPmqubev2DoNPzf+Q/JtEwkdAb7O0M1fkKyk0kZo08kYsu+7iYkM5k7Y5T/mZrJ5IzR3vZ+HM6AAQMGDBgwYMCAAQMGDBgwYMCAKVS3VwFi2xdbfp6sTkCtdVYn31PldxCKm9Gc3/aFz3o6ZXbP5nbBPpmI7GT8/X0vCaX0PY/Rcd4qIbvlQ5WyQjfWtQCxx0xcC9D6COBqi5U+eiYZMGDAgAEDBgwYMGDAgAEDBgyYHuqY9Umd+Rlz5cxuJXcNsVYix+Odq0LGnGt2tpRyn+dWaK7ZHwnD/Wai7whU+zdTYhVgTEyDvVY2irto1Ujo1cOsBuYrwAB1N+gYAATHHwAAAABJRU5ErkJggg==").setUpdate(function () {
                    this.x-=3;
                    //this.y++;
                    if (this.x < 0 - this.w) {
                        this.life = 0;
                        //_.log("die")
                    }
                }).setDie(function () {
                    dieCount++;
                    //ok_text.setText("ok:"+dieCount);
                }).setTimerfps(200000));
            }
            _.bg_left-=3;
            //_("#canvas_box").css("backgroundPosition", _.bg_left+"px bottom");
            document.getElementById("canvas_box").style.backgroundPositionX= _.bg_left+"px";
            /* 添加生命值精灵320,Math.floor(Math.random()* _.canvas_h)*/
             if(_.life_timer>=1000){
             _.life_timer=0;
             screen.add(_.engine.create_sprite("heart",50,50,48,48,"data:image/png;base64,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").setUpdate(function(){
             //this.x++;
             this.y++;
             if(this.y>= _.canvas_h){
             this.life=0;
             }}).setType("food").setDie(function(){
                 if(player.life+1>10){
                     player.life=9;
                 }
                 player.life++;
             }));
             }
        })
        /*新建一个渲染器*/
        var render = _.engine.create_render();
        /*渲染场景，以1000/16秒一帧的速度。*/
        render.render(screen, 5);
        document.onkeydown = function (e) {
            k = e.which;
            if ((k == 39) && (player.x < 300)) {
                player.x += 5;
            }
            if ((k == 37) && (20 < player.x)) {
                player.x -= 5;
            }
        }
        _("#canvas_box").click(function () {
            player.toY = player.y - 90;
        });
        function gameover() {
            _("#game_over").show();
            _("#game_start").hide();
        }
        function start() {
            _.loop = true;
        }
        _("#game_over").hide();
        _("#game_start").show();
        _("#start_button").click(function () {
            _("#game_start").hide();
            _("#game_over").hide();
            start();
        });
        _("#restart_button").click(function () {
            init();
            start();
            _("#game_start").hide();
            _("#game_over").hide();
        });
    }
    init();
});
