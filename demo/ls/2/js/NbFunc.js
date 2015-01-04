/// <reference path="../cagoe_js/Cmn.js" />

    // if (!Cmn.Func.IsMobile()) {
    //     location.href = "http://www.newbalance.com.cn/classic/pc/index.html?source=pc";
    // } else if (!Cmn.Func.IsWeiXin() && Cmn.Func.Cookie.Get("hq") == "") {
    //     location.href = "NoUpPage.html";
    // } else {

    // }
 


NbFunc = {
    WeiXinShare: function (callback) {
         
 
        //上面分享女生
        if (location.href.indexOf("sex") != -1 && location.href.indexOf("home.aspx") == -1 && location.href.indexOf("SexSelection.html") == -1) {
 
            var _num = NbFunc["GetRandomNum"](0, 3);
            SetWechatShare(WeiXinNvArr[_num], WeiXinNvArr[_num], Url1[_num] + "&sl=" + Cmn.Func.Cookie.Get("sl"), "/classic/img/Share.jpg", function () {
                CmnAjax.PostData("/classic/itf.aspx?Method=UpdateShareCount", "", function (data) {
                    ga('send', 'event',"share" , 'share'+Cmn.Func.Cookie.Get("sl"));
                    ga('nb1.send', 'event', "share", 'share' + Cmn.Func.Cookie.Get("sl"));
                    ga('nb2.send', 'event', "share", 'share' + Cmn.Func.Cookie.Get("sl"));
                    Cmn.DebugLog("进入分享" + Cmn.Func.Cookie.Get("sl"));
                    if (callback) {
                        callback();
                    }
                });
            });
            return;
        } else {
 
        //下面分享男生
            var _num = NbFunc["GetRandomNum"](0, 12);
            SetWechatShare(WeiXinArr[_num], WeiXinArr[_num], Url[_num] + "&sl=" + Cmn.Func.Cookie.Get("sl"), "/classic/img/Share.jpg", function () {
                CmnAjax.PostData("/classic/itf.aspx?Method=UpdateShareCount", "", function (data) {
                    ga('send', 'event', "share", 'share' + Cmn.Func.Cookie.Get("sl"));
                    ga('nb1.send', 'event', "share", 'share' + Cmn.Func.Cookie.Get("sl"));
                    ga('nb2.send', 'event', "share", 'share' + Cmn.Func.Cookie.Get("sl"));
                    Cmn.DebugLog("进入分享" + Cmn.Func.Cookie.Get("sl"));
                    if (callback) {
                        callback();
                    }
                });
            });
        }

},
    GetRandomNum: function (Min, Max) {
            var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
},
    Rotate: function (dom, angle, direction, callback) { //旋转方法 dom结构 旋转值 中心点 回调事件
        $(dom).css({
            "-webkit-transform": "rotate(" + angle + "deg)",
            "transform": "rotate(" + angle + "deg)",
            "-ms-transform": "rotate(" + angle + "deg)",
            "-moz-transform": "rotate(" + angle + "deg)",
            "-webkit-transform": "rotate(" + angle + "deg)",
            "-o-transform": "rotate(" + angle + "deg)",
            "transform-origin": direction,
            "-ms-transform-origin": direction,
            "-moz-transform-origin": direction,
            "-webkit-transform-origin": direction,
            "-o-transform-origin": direction
});
        callback && callback();
}
}


    WeiXinArr = ["型男明星为何都穿NB复古鞋，猛戳了解详情",
                "史上最准潮人型格测试，没有之一！准确率99%",
                "全网最“型”，不信测一测便知",
                "参与型格测试，潮流单品一网打尽",
                "11种不得不知的型男绝招，你造吗？",
                "型男大盘点，有种你就来对号入座！",
                "型男明星为何都穿NB复古鞋，猛戳了解详情",
                "一个高富帅才能来点的测试",
                "对不起，我这么潮范儿你造吗？",
                "3秒看你到底有多“型”！",
                "11双鞋让你了解型男",
                "屌丝3秒变型男",
                "穿过很多双鞋，终于能做一个安静的美型男"
    ];

WeiXinNvArr = [
            "你了解你的男闺蜜吗？",
            "发现男朋友隐藏的一面",
            "11种让男朋友变潮的方法",
            "别人家的男闺蜜是这样的，你知道吗？"
];

Url = [
        "http://www.newbalance.com.cn/classic/?source=wechatshare1",
        "http://www.newbalance.com.cn/classic/?source=wechatshare2",
        "http://www.newbalance.com.cn/classic/?source=wechatshare3",
        "http://www.newbalance.com.cn/classic/?source=wechatshare4",
        "http://www.newbalance.com.cn/classic/?source=wechatshare5",
        "http://www.newbalance.com.cn/classic/?source=wechatshare6",
        "http://www.newbalance.com.cn/classic/?source=wechatshare7",
        "http://www.newbalance.com.cn/classic/?source=wechatshare8",
        "http://www.newbalance.com.cn/classic/?source=wechatshare9",
        "http://www.newbalance.com.cn/classic/?source=wechatshare10",
        "http://www.newbalance.com.cn/classic/?source=wechatshare11",
        "http://www.newbalance.com.cn/classic/?source=wechatshare12",
        "http://www.newbalance.com.cn/classic/?source=wechatshare13",
];

Url1 = [ 
        "http://www.newbalance.com.cn/classic/?source=wechatshare14",
        "http://www.newbalance.com.cn/classic/?source=wechatshare15",
        "http://www.newbalance.com.cn/classic/?source=wechatshare16",
        "http://www.newbalance.com.cn/classic/?source=wechatshare17",
];

$(document).ready(function () {
        NbFunc.WeiXinShare();

    


    $("body").on("touchmove", function (e) {
        e.preventDefault();
    });
   
});

function Share() {
    window.open('http://s.jiathis.com/?webid=tsina&title=' + (WeiXinArr[NbFunc["GetRandomNum"](0, 12)] + "http://www.newbalance.com.cn/classic/home.aspx") + '&pic=http://www.newbalance.com.cn/classic/img/Share.jpg');
}
