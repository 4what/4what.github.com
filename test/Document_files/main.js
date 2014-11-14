var index = 0;
$(function(){
    $('.go-next,.s-go').click(function(){
        $(this).parent().next().slideDown().siblings().slideUp();
        index++
    });


    $('.s-3-go').click(function(){
        $(this).parent().next().slideDown().siblings().slideUp();
        index++;

    });

    $('.report').click(function(){
        $('.section-5').slideDown('fast').siblings().slideUp();
        index = index + 2;


    });

    $('.s-5-close').click(function(){
        $('.section-3').slideDown('fast').siblings().slideUp();
        index = index - 2;
    });

    $('.pdt-image-4 img').click(function(){
        $(this).hide();

    });

    function onBridgeReady() {
        var sharetpic = typeof(sharepic) == 'undefined' ? '' : sharepic;
        var appId  = '',
            imgUrl = "http://www.inspur.com/server/201411TS860/image/200x200.jpg",
            link   = "http://www.inspur.com/server/201411TS860/index.html",
            title  = "揭秘浪潮八路服务器的三大事实",
            desc   = "揭秘浪潮八路服务器的三大事实",
            fakeid = "";
        desc   = desc || title;

        if( "1" == "0" ){
            WeixinJSBridge.call("hideOptionMenu");
        }

        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function(argv){

            WeixinJSBridge.invoke('sendAppMessage',{
                "appid"      : appId,
                "img_url"    : imgUrl,
                //"img_width"  : "640",
                //"img_height" : "640",
                "link"       : link,
                "desc"       : desc,
                "title"      : title
            }, function(res) {
                report(link, fakeid, 1);
            });
        });

        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url"    : imgUrl,
                //"img_width"  : "640",
                //"img_height" : "640",
                "link"       : link,
                "desc"       : desc,
                "title"      : title
            }, function(res) {
                report(link, fakeid, 2);
            });
        });

        var nettype_map = {
            "network_type:fail" : "fail",
            "network_type:edge": "2g",
            "network_type:wwan": "3g",
            "network_type:wifi": "wifi"
        };
        if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke){
            WeixinJSBridge.invoke('getNetworkType',{
            }, function(res) {
                networkType = nettype_map[res.err_msg];
                initpicReport();
            });
        }
    }

    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady();
    }


})


function load (){
    document.addEventListener('touchstart',start, false);
    document.addEventListener('touchend',end, false);
    var starty = 0,
        endy = 0,
        dsty = 0;
    function start (event){
        var event = event || window.event;
            if(event.type === 'touchstart'){
                starty = event.touches[0].clientY;
            }
    }
    function end (event){
        var event = event || window.event;
        if(event.type === 'touchend'){
            endy = event.changedTouches[0].clientY;
        }

            if(endy !== 0){
                slide(starty,endy)
            }

    }
    function slide(starty,endy){
        if((starty-endy) > 100){
            if(index < 4){
                index++;
                $('.sec').eq(index).slideDown('normal').siblings().slideUp();
                console.log(index)
            }
        }
        if((starty-endy) < -100){
            if(index > 0) {
                index--;
                $('.sec').eq(index).slideDown('normal').siblings().slideUp();
                console.log(index)
            }
        }
    }
}
window.addEventListener('load',load, false);