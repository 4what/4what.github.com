Cmn_PostLogErrorCount = 0; var Cmn = {
    Cfg: { FillDataClassPrefix: "dat-", Paging: { First: ".pagFirst", Pre: ".pagPre", Next: ".pagNext", Last: ".pagLast", Num: ".pagNum", More: ".pagMore" }, LineSplitFotTemplate: "#s#", LogWriteUrl: "/CmnAjax/CmnAjax.aspx/WriteLog", IsWebMethod: 'Auto' }, FillHtmlCache: {}, GetFillHtml: function (containerSelector) {
        var _html = ""; _html = Cmn.FillHtmlCache[containerSelector]; if (_html == null || _html == undefined) {
            _html = ""; $(containerSelector).each(function () {
                var _tmpHtml = Cmn.Func.GetOuterHtml($(this)); if (_tmpHtml != "") {
                    if (_html != "") { _html += Cmn.Cfg.LineSplitFotTemplate; }
                    _html += _tmpHtml;
                }
                $(this).hide();
            }); Cmn.FillHtmlCache[containerSelector] = _html;
        }
        return _html;
    }, RemoveFillHtml: function (containerSelector) { Cmn.FillHtmlCache[containerSelector] = null; }, alert: function (msg) { alert(msg); }, Log: function (msg, isShowInPage) {
        try { console.log(msg); }
        catch (e) { }
        if (Cmn_PostLogErrorCount <= 3) {
            $.ajax({
                type: "Post", url: this.Cfg.LogWriteUrl, data: "{msg:\"" + msg.replace(new RegExp("\"", "g"), "\\\"") + "\"}", contentType: (Cmn.Func.IsWebMethod(this.Cfg.LogWriteUrl) ? "application/json;charset=uft-8" : "application/x-www-form-urlencoded"), dataType: "text", success: function (retData) {
                    var _tmpVal = ""; try { _tmpVal = eval("(" + retData + ")").d; if (!_tmpVal) { _tmpVal = retData; } }
                    catch (err) { _tmpVal = retData; }
                    if (_tmpVal == "success") { Cmn_PostLogErrorCount = 0; }
                    return true;
                }, error: function (httpRequest) { Cmn_PostLogErrorCount = Cmn_PostLogErrorCount + 1; return false; }
            });
        }
    }, IsDebuging: null, DebugLogCache: "", DebugLog: function (msg) {
        if (Cmn.IsDebuging === false) { return; }
        if (Cmn.IsDebuging === null) {
            if (Cmn.Func.GetParamFromUrl("ShowDebugLog") == "1") { Cmn.IsDebuging = true; }
            else { Cmn.IsDebuging = false; }
        }
        if (Cmn.IsDebuging == true) {
            var _date = new Date(); msg = "[" + _date.getHours() + ":" + _date.getMinutes() + ":" + _date.getSeconds() + "] " + msg; try { console.log(msg); } catch (e) { }
            if ($("body .DebugLog").length <= 0) {
                $("body").append("<div class='DebugLog' style='position:fixed;right:4px;bottom:4px;font-size:12px;" + "z-index:10001;color:#ffffff;padding:2px;padding-left:6px;padding-right:6px; " + "background:rgba(33, 33, 33, 0.4) none repeat scroll 0 0 !important;filter:Alpha(opacity=40);" + "background:#333333;'> <span style='position:relative;font-size:16px;' class='LogText'> Debuging... </span></div>"); $("body .DebugLog").off("click").on("click", function () {
                    var _sefl = $(this); if (_sefl.hasClass("hide")) { _sefl.width(640).removeClass("hide"); }
                    else { _sefl.width(50).addClass("hide"); }
                })
            }
            var _msgLst = Cmn.DebugLogCache.split("<br/>"); var _msg = msg; for (var _i = 0; _i < _msgLst.length && _i < 9; _i++) { _msg += "<br/>" + _msgLst[_i]; }
            Cmn.DebugLogCache = _msg; $("body .DebugLog .LogText").html(_msg); var _bodyWidth = $("body").width(); $("body .DebugLog .LogText").css("font-size", (14 + (_bodyWidth - 600) / 10 / 5) + "px");
        }
    }, FillDataByClass: function (containerSelector, dataJson) {
        if (!Cmn.Func.IsArray(dataJson)) { var _tmpDataJson = dataJson; dataJson = new Array(); dataJson[0] = _tmpDataJson; }
        if (dataJson.length > 0) { for (var _key in dataJson[0]) { $(containerSelector + " ." + Cmn.Cfg.FillDataClassPrefix + _key).html(dataJson[0][_key]); } }
        return 1;
    }, FillData: function (containerSelector, dataJson, isAppend, isAutoAssignByHeight) {
        if (typeof (isAppend) == "undefined") { isAppend = false; }
        if (!Cmn.Func.IsArray(dataJson)) { var _tmpDataJson = dataJson; dataJson = new Array(); dataJson[0] = _tmpDataJson; }
        if (Cmn.Func.IsArray(containerSelector)) {
            var _htmlArray = new Array(containerSelector.length); for (var _i = 0; _i < _htmlArray.length; _i++) { _htmlArray[_i] = Cmn.GetFillHtml(containerSelector[_i]).split(Cmn.Cfg.LineSplitFotTemplate); }
            var _retVal = new Array(containerSelector.length); var _tmpStr = ""; var _htmlArrayLoc = 0; var _htmlArrayListloc = -1; if (typeof (isAutoAssignByHeight) == "undefined") { isAutoAssignByHeight = false; }
            else if (isAutoAssignByHeight && isAppend) { _htmlArrayListloc = 100000; }
            for (var _i = 0; _i < _retVal.length; _i++) { _retVal[_i] = ""; }
            for (var _i = 0; _i < dataJson.length; _i++) {
                _htmlArrayListloc = _htmlArrayListloc + 1; if (_htmlArrayListloc >= _htmlArray[_htmlArrayLoc].length) {
                    _htmlArrayListloc = 0; if (isAutoAssignByHeight && isAppend) { var _minHeight = $(containerSelector[0]).parent().height(); var _tmpHeight = 0; _htmlArrayLoc = 0; for (var _k = 1; _k < containerSelector.length; _k++) { _tmpHeight = $(containerSelector[_k]).parent().height(); if (_tmpHeight < _minHeight) { _minHeight = _tmpHeight; _htmlArrayLoc = _k; } } }
                    else { _htmlArrayLoc = _htmlArrayLoc + 1; if (_htmlArrayLoc >= _htmlArray.length) { _htmlArrayLoc = 0; } }
                }
                _tmpStr = _htmlArray[_htmlArrayLoc][_htmlArrayListloc]; for (var _key in dataJson[_i]) {
                    if (dataJson[_i][_key] == null) { dataJson[_i][_key] = ""; }
                    _tmpStr = Cmn.Func.SetDataToHtmlStr(_tmpStr, "dat-" + _key, dataJson[_i][_key]); try { _tmpStr = _tmpStr.replace(new RegExp("{" + _key + "}", "g"), dataJson[_i][_key]); }
                    catch (err) { }
                }
                _retVal[_htmlArrayLoc] += _tmpStr; if (isAppend && isAutoAssignByHeight) { $(containerSelector[_htmlArrayLoc]).first().parent().append(_retVal[_htmlArrayLoc]); _retVal[_htmlArrayLoc] = ""; }
            }
            if (isAppend) { if (!isAutoAssignByHeight) { for (var _i = 0; _i < containerSelector.length; _i++) { $(containerSelector[_i]).first().parent().append(_retVal[_i]); } } }
            else {
                for (var _i = 0; _i < _retVal.length; _i++) {
                    if (_retVal[_i] == "") { $(containerSelector[_i]).hide(); }
                    else {
                        var _hasSetContent = false; $(containerSelector[_i]).each(function () {
                            if (_hasSetContent) { $(this).remove(); }
                            else { $(this).replaceWith(_retVal[_i]); _hasSetContent = true; }
                        });
                    }
                }
            }
        }
        else {
            var _html = Cmn.GetFillHtml(containerSelector); if (_html == null || _html == undefined) { $(containerSelector).hide(); return -1; }
            var _retVal = ""; var _tmpStr = ""; var _htmlList = _html.split(Cmn.Cfg.LineSplitFotTemplate); var _loc = 0; for (var _i = 0; _i < dataJson.length; _i++) {
                _tmpStr = _htmlList[_loc]; _loc = _loc + 1; if (_loc >= _htmlList.length) { _loc = 0; }
                for (var _key in dataJson[_i]) {
                    if (dataJson[_i][_key] == null) { dataJson[_i][_key] = ""; }
                    _tmpStr = Cmn.Func.SetDataToHtmlStr(_tmpStr, "dat-" + _key, dataJson[_i][_key]); try { _tmpStr = _tmpStr.replace(new RegExp("{" + _key + "}", "g"), dataJson[_i][_key]); }
                    catch (err) { }
                }
                _retVal += _tmpStr;
            }
            if (isAppend) { $(containerSelector).first().parent().append(_retVal); }
            else {
                if (dataJson.length < 1) { $(containerSelector).hide(); return -1; }
                var _hasSetContent = false; $(containerSelector).each(function () {
                    if (_hasSetContent) { $(this).remove(); }
                    else { $(this).replaceWith(_retVal); _hasSetContent = true; }
                });
            }
        }
        return 1;
    }, CmnPagingList: new Array(), Paging: function (containerSelector, recCount, pageSize, pagingFunction) {
        this.containerSelector = containerSelector; this.RecCount = parseInt(recCount); this.PageSize = parseInt(pageSize); this.PagingFunction = pagingFunction; this.ShowNumCount = 5; this.MoreHtml = ""; this.SmartHideButton = true; this.CycleNextPre = false; this.ActiveClass = ""; this.CurrPage = 1; Cmn.CmnPagingList[Cmn.CmnPagingList.length] = this; var pagingVarName = "Cmn.CmnPagingList[" + (Cmn.CmnPagingList.length - 1) + "]"; this.SetCycleNextPre = function (isCycle) {
            this.CycleNextPre = isCycle; if (isCycle === true) { this.SmartHideButton = false; }
            this.ToPage(1, false);
        }
        this.SetSmartHideButton = function (isSmartHideButton) { this.SmartHideButton = isSmartHideButton; this.ToPage(1, false); }
        this.GetPageCount = function () { return parseInt((this.RecCount + this.PageSize - 1) / this.PageSize); }
        this.ToPage = function (pageNo, isExecPagingFunction) {
            function SetPageNo(numHtml, pageNo) {
                if (numHtml.indexOf('onclick="onclick"') >= 0) { numHtml = numHtml.replace('onclick="onclick"', 'onclick="' + pagingVarName + '.ToPage(' + pageNo + ')"'); }
                else { numHtml = numHtml.replace('onclick=onclick', 'onclick="' + pagingVarName + '.ToPage(' + pageNo + ')"'); }
                numHtml = numHtml.replace("{num}", pageNo); return numHtml;
            }; var _container = $(containerSelector); var _PageCount = parseInt((this.RecCount + this.PageSize - 1) / this.PageSize); if (_PageCount == 0) { _PageCount = 1; }
            _container.find(Cmn.Cfg.Paging.First).unbind("click").bind("click", function () { eval(pagingVarName + ".ToPage(1)"); }); _container.find(Cmn.Cfg.Paging.Pre).unbind("click").bind("click", function () { eval(pagingVarName + ".ToPage(" + (pageNo - 1 < 1 ? (pagingVarName + ".CycleNextPre ?" + _PageCount + " : 1") : pageNo - 1) + ")"); }); _container.find(Cmn.Cfg.Paging.Next).unbind("click").bind("click", function () { eval(pagingVarName + ".ToPage(" + (pageNo + 1 > _PageCount ? (pagingVarName + ".CycleNextPre ?1:" + _PageCount) : pageNo + 1) + ")"); }); _container.find(Cmn.Cfg.Paging.Last).unbind("click").bind("click", function () { eval(pagingVarName + ".ToPage(" + _PageCount + ")"); }); _container.find(Cmn.Cfg.Paging.First).show(); _container.find(Cmn.Cfg.Paging.Pre).show(); _container.find(Cmn.Cfg.Paging.Next).show(); _container.find(Cmn.Cfg.Paging.Last).show(); if (this.SmartHideButton) {
                if (pageNo == 1) { _container.find(Cmn.Cfg.Paging.First).hide(); _container.find(Cmn.Cfg.Paging.Pre).hide(); }
                if (pageNo == _PageCount) { _container.find(Cmn.Cfg.Paging.Next).hide(); _container.find(Cmn.Cfg.Paging.Last).hide(); }
            }
            _container.find(Cmn.Cfg.Paging.Num).first().attr("onclick", "onclick"); _container.find(Cmn.Cfg.Paging.Num).first().text(_container.find(Cmn.Cfg.Paging.Num).first().text().replace(/\d+/, "{num}")); if (this.ActiveClass != "") { _container.find(Cmn.Cfg.Paging.Num).first().removeClass(this.ActiveClass); }
            var _numHtml = Cmn.Func.GetOuterHtml(_container.find(Cmn.Cfg.Paging.Num).first()); var _numHtmlActive = _numHtml; if (this.ActiveClass != "") { _container.find(Cmn.Cfg.Paging.Num).first().addClass(this.ActiveClass); _numHtmlActive = Cmn.Func.GetOuterHtml(_container.find(Cmn.Cfg.Paging.Num).first()); }
            _container.find(Cmn.Cfg.Paging.Num).first().attr("id", "pagNum_Temp"); _container.find(Cmn.Cfg.Paging.Num + "[id!=pagNum_Temp]").remove(); if (this.MoreHtml == "") { _container.find(Cmn.Cfg.Paging.More).first().attr("onclick", "onclick"); this.MoreHtml = Cmn.Func.GetOuterHtml(_container.find(Cmn.Cfg.Paging.More).first()); }
            _container.find(Cmn.Cfg.Paging.More).remove(); var _numLst = ""; var _pageNo = pageNo - parseInt((this.ShowNumCount - 1) / 2) -
            ((_PageCount - pageNo) >= parseInt((this.ShowNumCount - 1) / 2) ? 0 : parseInt((this.ShowNumCount - 1) / 2) - (_PageCount - pageNo)); if (_pageNo < 1) { _pageNo = 1; }
            if (_pageNo > 1) { _numLst += SetPageNo(this.MoreHtml, _pageNo - 1); }
            var _i; for (_i = _pageNo; _i < _pageNo + this.ShowNumCount && _i <= _PageCount; _i++) {
                if (_i == pageNo) { _numLst += SetPageNo(_numHtmlActive, _i); }
                else { _numLst += SetPageNo(_numHtml, _i); }
            }
            if (_i - 1 < _PageCount) { _numLst += SetPageNo(this.MoreHtml, _i); }
            _container.find("#pagNum_Temp").replaceWith(_numLst); if (isExecPagingFunction != false) { if (pagingFunction) { pagingFunction(pageNo); } }
            this.CurrPage = pageNo; if (this.SmartHideButton && _PageCount == 1) { _container.find(Cmn.Cfg.Paging.Num).hide(); }
            else { _container.find(Cmn.Cfg.Paging.Num).show(); }
        }
        this.ToPage(1, false);
    }, Func: {
        GetOuterHtml: function (obj) { return $('<div></div>').append(obj.clone()).html(); }, AddParamToAjaxData: function (ajaxData, key, value) {
            if (ajaxData == null || ajaxData == undefined || ajaxData == "") { ajaxData = "{}"; }
            if (ajaxData.replace(" ", "").length > 2) { return ajaxData.replace("}", ",'" + key + "':'" + value + "'}"); }
            else { return ajaxData.replace("}", "'" + key + "':'" + value + "'}"); }
        }, AddParamToUrl: function (url, param) {
            url = Cmn.Func.DelParamFromUrl(url, param.split("=")[0]); if (url.indexOf("?") >= 0) { url += "&" + param; }
            else { url += "?" + param; }
            return url;
        }, DelParamFromUrl: function (url, paramName) {
            var _retVal = ""; var _tmpStr; var _loc; if (!paramName) {
                _loc = url.indexOf("?"); if (_loc >= 0) { return url.substring(0, _loc); }
                else { return url; }
            }
            _loc = url.indexOf(paramName + "="); if (_loc < 0) { _loc = url.indexOf(paramName + " "); if (_loc < 0) { return url; } }
            _retVal = url.substring(0, _loc).replace(/(^\s*)|(\s*$)/g, ''); _tmpStr = url.substring(_loc); if (_tmpStr.indexOf("&") >= 0) { _retVal += _tmpStr.substring(_tmpStr.indexOf("&") + 1); }
            else { if (_retVal.length > 0) { if (_retVal.charAt(_retVal.length - 1) == '?' || _retVal.charAt(_retVal.length - 1) == '&') { _retVal = _retVal.substring(0, _retVal.length - 1); } } }
            return _retVal;
        }, GetParamFromUrl: function (paramName, url) {
            if (url == null || url == "" || typeof (url) == "undefind") { url = window.location.href; }
            var _retVal = ""; var _regExp = new RegExp("[\\?\\s&]" + paramName + "\\s*=([^&#]*)"); var _matchRes = url.match(_regExp); if (_matchRes != null) { _retVal = _matchRes[1]; }
            return Cmn.Func.Trim(_retVal);
        }, Trim: function (str) { return str.replace(/(^\s*)|(\s*$)/g, ''); }, FormatJsonData: function (str) {
            if (str == null) { return ""; }
            var _newstr = ""; for (var _i = 0; _i < str.length; _i++) { var _c = str.charAt(_i); switch (_c) { case '\"': _newstr += "\\\""; break; case '\'': _newstr += "\\\'"; break; case '\\': _newstr += "\\\\"; break; case '/': _newstr += "\\/"; break; case '\b': _newstr += "\\b"; break; case '\f': _newstr += "\\f"; break; case '\n': _newstr += "\\n"; break; case '\r': _newstr += "\\r"; break; case '\t': _newstr += "\\t"; break; default: _newstr += _c; } }
            return _newstr;
        }, JsonToStr: function (json) {
            if (Cmn.Func.IsString(json)) { return json; }
            if (typeof JSON == "undefined") { CmnAjax.Func.LoadJs(Cmn.Func.GetRoot() + "Js/Json2.js"); }
            return JSON.stringify(json);
        }, IsWebMethod: function (methodName) {
            if (Cmn.Cfg.IsWebMethod == "Auto") {
                var _url = Cmn.Func.DelParamFromUrl(methodName); var _loc = _url.lastIndexOf("/"); if (_loc >= 0) { _url = _url.substring(_loc + 1); }
                if (_url.indexOf(".") >= 0) { return false; }
                else { return true; }
            }
            else { return Cmn.Cfg.IsWebMethod; }
        }, IsIphone4: function () {
            if (Cmn.Func.IsIOS()) { var _width = window.screen.width; var _height = window.screen.height; var _scale = _width / _height; if (_scale > 0.6 && _scale < 0.7) { return true; } }
            return false;
        }, IsArray: function (variable) { return Object.prototype.toString.apply(variable) === '[object Array]'; }, ShowPoupWin: function (poupWinSelector) {
            var _obj = $(poupWinSelector); var _x = 50; var _y = 50; var _init = function () {
                _x = ($(window).width() - _obj.width()) / 2;; _y = ($(window).height() - _obj.height()) / 2;; if (_x - 20 > 0) { _x = _x - 20; }
                if (_y - 20 > 0) { _y = _y - 20; }
                _obj.css('top', _y + $(window).scrollTop() + 'px'); _obj.css('left', _x + $(window).scrollLeft() + 'px');
            }
            _init(); _obj.show(); $(window).scroll(function () {
                if (_obj.is(":visible")) {
                    if (_y) { _obj.css('top', _y + $(window).scrollTop() + 'px'); }
                    if (_x) { _obj.css('left', _x + $(window).scrollLeft() + 'px'); }
                }
            }); $(window).resize(function () { if (_obj.is(":visible")) { _init(); } });
        }, IsAndroid: function () { return navigator.userAgent.match(/Android/i) ? true : false; }, IsIOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; }, IsIPad: function () { return navigator.userAgent.match(/iPad/i) ? true : false; }, IsIEMobile: function () { return navigator.userAgent.match(/IEMobile/i) ? true : false; }, IsIE: function () { return navigator.userAgent.match("MSIE") ? true : false; }, BrowserVersion: function () { var ua = navigator.userAgent.toLowerCase(); var s; (s = ua.match(/msie ([\d.]+)/)) ? s = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? s = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? s = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? s = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? s = s[1] : 0; return s; }, IsBlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) ? true : false; }, IsMobile: function () { return (Cmn.Func.IsAndroid() || Cmn.Func.IsIOS() || Cmn.Func.IsIEMobile() || Cmn.Func.IsBlackBerry()); }, IsWeiXin: function () { return navigator.userAgent.match(/MicroMessenger/i) ? true : false; }, SetDataToHtmlStr: function (htmlStr, className, data) {
            var _tmpStr = ""; for (var _startLoc = 0; ;) {
                var _loc = htmlStr.indexOf(className, _startLoc); if (_loc < 0) { break; }
                if (htmlStr.charAt(_loc + className.length) == '-') {
                    _tmpStr = htmlStr.substring(_loc + className.length + 1); htmlStr = htmlStr.substring(0, _loc + className.length + 1); var _tmpRegexp = "^\\S*?(?=[\\x22\\x27\\s]+?)"; var _attrName = _tmpStr.match(_tmpRegexp)[0]; var _tmpLoc = htmlStr.lastIndexOf("<"); var _curDom = htmlStr.substring(_tmpLoc); htmlStr = htmlStr.substring(0, _tmpLoc); _tmpLoc = _tmpStr.indexOf(">"); _curDom += _tmpStr.substring(0, _tmpLoc); _tmpStr = _tmpStr.substring(_tmpLoc); _tmpLoc = _attrName.indexOf("["); var _bracketsContent = ""; if (_tmpLoc >= 0) { _bracketsContent = _attrName.substring(_tmpLoc + 1); _bracketsContent = _bracketsContent.substring(0, _bracketsContent.indexOf("]")); _attrName = _attrName.substring(0, _tmpLoc); }
                    var _attrHtml = _curDom.match(new RegExp(_attrName + "\\s*=\\s*\\x22[\\s\\S]*?\\x22")); var _attrContent = ""; if (_attrHtml == null) {
                        _attrHtml = _curDom.match(new RegExp(_attrName + "\\s*=\\s*\\x27[\\s\\S]*?\\x27")); if (_attrHtml == null) { _attrHtml = _curDom.match(new RegExp(_attrName + "\\s*=\\S*?\\s")); if (_attrHtml != null) { _attrContent = _attrHtml[0].replace(/\s*=/, "").replace(/\s/g, ""); } }
                        else {
                            _attrContent = _attrHtml[0].match(new RegExp("\\x27[\\s\\S]*?\\x27")); if (_attrContent != null) { _attrContent = _attrContent[0].replace(/'/g, ""); }
                            else { _attrContent = ""; }
                        }
                    }
                    else {
                        _attrContent = _attrHtml[0].match(new RegExp("\\x22[\\s\\S]*?\\x22")); if (_attrContent != null) { _attrContent = _attrContent[0].replace(/"/g, ""); }
                        else { _attrContent = ""; }
                    }
                    if (_attrHtml != null) { _curDom = _curDom.replace(_attrHtml[0], ""); }
                    if (_attrName.toLowerCase() == "style" || _attrName.toLowerCase() == "class") {
                        if (_attrName.toLowerCase() == "style" && _bracketsContent != "") { _curDom += " " + _attrName + "='" + _attrContent + _bracketsContent + ":" + data + "'"; }
                        else { _curDom += " " + _attrName + "='" + _attrContent + " " + data + "'"; }
                    }
                    else { _curDom += " " + _attrName + "='" + data + "'"; }
                    _startLoc = htmlStr.length + _curDom.indexOf(className + "-" + _attrName) + (className + "-" + _attrName).length; htmlStr = htmlStr + _curDom + _tmpStr;
                }
                else if (htmlStr.charAt(_loc + className.length) == ' ' || htmlStr.charAt(_loc + className.length) == String.fromCharCode(34) || htmlStr.charAt(_loc + className.length) == String.fromCharCode(39) || htmlStr.charAt(_loc + className.length) == '>') { _tmpStr = htmlStr.substring(_loc + className.length); htmlStr = htmlStr.substring(0, _loc + className.length); _startLoc = _loc + className.length + _tmpStr.indexOf("<") + data.length; _tmpStr = _tmpStr.replace(/>[\s\S]*?</, ">" + data + "<"); htmlStr = htmlStr + _tmpStr; }
                else { _startLoc = _loc + className.length; }
            }
            return htmlStr;
        }, IsString: function (variable) {
            if (typeof variable == "undefined") { return false; }
            if (typeof variable == "string" || variable.constructor == String) { return true; }
            else { return false; }
        }, SiteRoot: "/", GetRoot: function () { return Cmn.Func.SiteRoot; }, SetRoot: function (siteRoot) { Cmn.Func.SiteRoot = siteRoot; }, GetAbsoluteUrl: function (url) {
            if (url.indexOf("http:") >= 0) { return url; }
            var _a = document.createElement('A'); _a.href = url; url = _a.href; return url;
        }, GetMainDomain: function (url) {
            if (url == undefined || url.indexOf("http:") < 0) { url = window.location.href; }
            url = url.replace("http://", ""); var _loc = url.indexOf("/"); if (_loc >= 0) { url = url.substring(0, _loc); }
            return Cmn.Func.Trim(url);
        }, GetJsPath: function (jsFileName) {
            var _scripts = document.getElementsByTagName('script'); var _script = null; for (var i = 0; i < _scripts.length; i++) { if (_scripts[i].src.indexOf(jsFileName) != -1) { _script = _scripts[i]; break; } }
            if (_script != null) { var _src = _script.src; return _src.replace(jsFileName, ""); }
            return "";
        }, IsSameMainDomain: function (url1, url2) {
            if (url2 == undefined || url2 == null || url2 == "") { url2 = window.location.href; }
            url1 = Cmn.Func.GetMainDomain(url1); url2 = Cmn.Func.GetMainDomain(url2); if (url1.toLowerCase() == url2.toLowerCase()) { return true; }
            else { return false; }
        }, HtmlEncode: function (html) { return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML; }, HtmlDecode: function (str) { var _a = document.createElement('a'); _a.innerHTML = str; return _a.textContent; }, Cookie: {
            Set: function (name, value, time, path, domain, secure) {
                var now = new Date(); now.setDate(now.getDate() + time); var curcookie = name + "=" + encodeURI(value)
                + ((now) ? ";expires=" + now.toGMTString() : "")
                + ((path) ? ";path=" + path : "")
                + ((domain) ? ";domain=" + domain : "")
                + ((secure) ? ";secure" : ""); document.cookie = curcookie;
            }, Get: function (name) {
                if (document.cookie.length > 0) {
                    var start = document.cookie.indexOf(name + "="); if (start != -1) {
                        start = start + name.length + 1; var end = document.cookie.indexOf(";", start); if (end == -1) { end = document.cookie.length; }
                        return decodeURI(document.cookie.substring(start, end));
                    }
                }
                return "";
            }
        }
    }, NewCheckInfo: function (regular, errMsg, requiredErrMsg) { return { 'Regular': regular, 'ErrMsg': errMsg, 'RequiredErrMsg': requiredErrMsg }; }, CheckValid: function (checkInfo, inputTxt) {
        if (checkInfo.RequiredErrMsg && checkInfo.RequiredErrMsg != "") { if (Cmn.Func.Trim(inputTxt) == "") { return checkInfo.RequiredErrMsg; } }
        var _reg = new RegExp(checkInfo.Regular.Regular); if (!_reg.test(inputTxt)) {
            if (checkInfo.ErrMsg && checkInfo.ErrMsg != "") { return checkInfo.ErrMsg; }
            else { return checkInfo.Regular.ErrMsg; }
        }
        return true;
    }, Regular: { "Email": { Regular: "^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$", ErrMsg: "请输入正确的Email地址！" }, "MobilePhone": { Regular: "^1[0-9]{10}$", ErrMsg: "请输入正确的手机号码！" } }
}; Cmn.Object = {
    Inherit: function (sub, parent, args) {
        var _subMethodName = null, _subConstructorPrototype = sub.constructor.prototype, _methodList = {}; if (sub.constructor.name == "Object") { Cmn.Log("如果使用继承的话 最好使用 'XX.prototype.xxx=function(){}' 方式定义函数. " + "不要用这种'XX.prototype={xxx:function(){}}'. 后者将有可能导致prototype上面一些定义的函数丢失."); }
        for (_subMethodName in _subConstructorPrototype) { _methodList[_subMethodName] = 1; }
        for (_subMethodName in parent.prototype) { if (!_methodList[_subMethodName]) { _subConstructorPrototype[_subMethodName] = parent.prototype[_subMethodName]; } }
        parent.apply(sub, args);
    }
}