$(function(){
    //公告列表
    $(".noticeBox").scrollText({ line: 1, speed: 500 });
    //阻止插入广告
    if(window.top.location !==window.location ){
        top.location.href=self.location.href;
    }
});
(function ($) {
	var isUp = true, isDown = false;
    $.fn.extend({
        scrollText: function (opt, callback) {
            if (!opt) var opt = {};
            var _btnUp = $("#" + opt.up); 
            var _btnDown = $("#" + opt.down);
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").height();
            var line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10);
            var speed = opt.speed ? parseInt(opt.speed, 10) : 600;
            var m = line;
            var count = _this.find("li").length;
            var upHeight = line * lineH;

            function scrollUp() {
                if (!_this.is(":animated")) {
                    if (m < count) {
                        m += line;
                        _this.animate({ marginTop: "-=" + upHeight + "px" }, speed);
                    }
                }

                return m < count;
            }

            function scrollDown() {
                if (!_this.is(":animated")) {
                    if (m > line) {
                        m -= line;
                        _this.animate({ top: "+=" + upHeight + "px" }, speed);
                    }
                }

                return m > line;
            }
            
            setInterval(function () {
                if (isUp) {
                    isUp = scrollUp();
                    if (!isUp) {
                        isDown = true;
                    }
                }
                if (isDown) {
                    isDown = scrollDown();
                    if (!isDown) {
                        isUp = true;
                        isDown = false;
                    }
                }
            }, 4000);
        }
    });
})(jQuery);





var base = {
    setCookie:function(name,value,iDay){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+value+';expires='+oDate+';path=/';
    },
    getCookie:function(name){
        var arr=document.cookie.split('; ');
        for(var i=0; i<arr.length; i++){
            var arr2=arr[i].split('=');
            if(arr2[0]==name){
                return arr2[1]; 
            }
        }
        return '';
    },
    delCookie:function(name){
        base.setCookie(name,'',-1);
    },
    getUrlParam:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    currentTime:function(){
        var timeStamp = new Date().getTime();
        return timeStamp;
    },
    //时间戳转换为带分秒的时间格式
    formatDate:function(now){
        var   time=new Date(now);
        var   year=time.getFullYear();
        var   month=time.getMonth()+1;
        var   date=time.getDate();
        var   hour=time.getHours();
        var   minute=time.getMinutes();
        var   second=time.getSeconds();
        return   year+"-"+this.toDou(month)+"-"+this.toDou(date)+"  "+this.toDou(hour)+":"+this.toDou(minute)+":"+this.toDou(second);
    },
    //时间戳转换为只带日期的时间格式
    formatDates:function(now){
        var   time=new Date(now);
        var   year=time.getFullYear();
        var   month=time.getMonth()+1;
        var   date=time.getDate();
        return   year+"-"+this.toDou(month)+"-"+this.toDou(date);
    },
    //具体时间转换为时间戳
    transdata:function(stringTime){
        var timestamp = parseInt(Date.parse(stringTime.replace(/-/g, "/"))) / 1000; //转换时间戳
        return timestamp;
    },
    //倒计时
    countDown:function(second){
        //console.log(s)
        //var second = parseInt(s/1000);
        var date, hour, minute;
        date = parseInt(second / 86400);
        second %= 86400; //求天数之后的余数
        hour = parseInt(second / 3600);
        second %= 3600; //求小时之后的余数
        minute = parseInt(second / 60);
        second %= 60; //求分钟之后的余数，就是最后的秒数
        return this.toDou(date) + '天' + this.toDou(hour) + '时' + this.toDou(minute) + '分' + this.toDou(second) + '秒';
    },
    toDou:function(n){
        if(n<10){
            return '0'+n;
        }else{
            return n;
        }
    },
    parse_url:function(_url){//可以获取src里面的参数
        var pattern = /(\w+)=(\w+)/ig;//定义正则表达式
        var parames = {};
        _url.replace(pattern, function(a, b, c){parames[b] = c;});
        return parames;
    },
    getRequest:function(){//可以获取地址栏参数
        var url = window.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    floatCeil:function(num){//保留两位小数，两位小数后的值抹掉
        var bb = num+"";
        var dian = bb.indexOf('.');
        var result = "";
        if(dian == -1){
            result =  parseFloat(num).toFixed(2);
        }else{
            var cc = bb.substring(dian+1,bb.length);
            if(cc.length >=3){
                result =  (Number(num.toString().match(/^\d+(?:\.\d{0,2})?/))+0.00)*100000000000/100000000000;//js小数计算小数点后显示多位小数
            }else{
                result =  parseFloat(num).toFixed(2);
            }
        }
        return result;
    },
    floatCeils:function(num){//保留两位小数，两位小数后的值抹掉
        var result = '';
        result = (Math.floor(num * 10)) /10;
        return result;
    },
    floatUpward:function(num){//保留两位小数，两位小数后的值向上取整
        var bb = num+"";
        var dian = bb.indexOf('.');
        var result = "";
        if(dian == -1){
            result =  parseFloat(num).toFixed(2);
        }else{
            var cc = bb.substring(dian+1,bb.length);
            if(cc.length >=3){
                result =  (Number(num.toString().match(/^\d+(?:\.\d{0,2})?/))+0.01)*100000000000/100000000000;//js小数计算小数点后显示多位小数
            }else{
                result =  parseFloat(num).toFixed(2);
            }
        }
        return result;
    },
    detectOS:function(){
        var sUserAgent = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
            var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1;
            if(isWin10) return "Win10";
        }
        if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('Linux') > -1) {
            return "Android";
        } else if (sUserAgent.indexOf('iPhone') > -1) {
            return "iPhpne";
        } else if (sUserAgent.indexOf('Windows Phone') > -1) {
            return "winphone";
        }
        return "other";
    },
    bindEvent:function(obj,type,fn){
        if ( obj.attachEvent ) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
            obj.attachEvent( 'on'+type, obj[type+fn] );
        } else{
            obj.addEventListener( type, fn, false );
        }
    },
    // 替换字符串中间位置
    replaceHide:function(str,xxx,start,end) {
        var newStr = str.substr(0, start) + xxx + str.substr(end);
        return newStr;
    },
    //去除空格 is_global="g"表示去除中间空格
    trim:function(str,is_global)
    {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g")
        {
            result = result.replace(/\s/g,"");
        }
        return result;
    },
    checknull:function (str){
        if (str != '' && str != null && typeof (str) != 'undefined'){
            return true;
        } else {
            return false;
        }
    },
    islogin:function(callback){
        // 需要传入一个回调函数，在登录请求之后执行
        var login_url = '../user/login-z.html'
        var url = '/user/detail';
        var params = {
            token:$.cookie('token'),
            currentTime:base.currentTime()
        };
        method.PostAjax(url, params ,function (data){
            if(data.resCode != '00000'){
                window.location.href=login_url;
            } else {
                if(data.data){
                    $(".loginB-unlogin").hide();
                    $(".loginB-login").show();
                    $(".login_username em").text(data.data.mobile);
                    callback(data.data);
                } else {
                    $(".loginB-unlogin").show();
                    $(".loginB-login").hide();
                }
            }
        },function(){
            window.location.href=login_url;
        });
    },islogin_disredirect:function(callback){
        // 需要传入一个回调函数，在登录请求之后执行
        var login_url = '../user/login-z.html'
        var url = '/user/detail';
        var params = {
            token:$.cookie('token'),
            currentTime:base.currentTime()
        };
        method.PostAjax(url, params ,function (data){
            if(data.resCode == '00000'){
                if(data.data){
                    $(".loginB-unlogin").hide();
                    $(".loginB-login").show();
                    $(".login_username em").text(data.data.mobile);
                    callback(data.data);
                } else {
                    $(".loginB-unlogin").show();
                    $(".loginB-login").hide();
                    callback(null);
                }
            } else {
                $(".loginB-unlogin").show();
                $(".loginB-login").hide();
                callback(null);
            }
        },function(){
            // console.log(data)
        });
    },
    logout:function(){
        var url = '/user/logout';
        var params = {
            token:$.cookie('token'),
            currentTime:base.currentTime()
        };
        method.PostAjax(url, params ,function (data){
            // console.log(data);
            userData = null;
            if(data.resCode == '00000'){
                window.location.reload();
            }
        },function(){
            console.log("退出接口，访问失败!");
        });
    },
    currentTimeCn:function(){
        var hour = new Date().getHours();
        if(hour < 6){
            return ("凌晨好！");
        } else if (hour < 9){
            return ("早上好！");
        } else if (hour < 12){
            return ("上午好！");
        } else if (hour < 14){
            return ("中午好！");
        } else if (hour < 17){
            return ("下午好！");
        } else if (hour < 19){
            return ("傍晚好！");
        } else if (hour < 22){
            return ("晚上好！");
        } else {
            return ("夜里好！");
        }
    },
    singleInvest :function(callback){
        var url = '/v2/project/projectSingle';
        var params = {
            token:$.cookie('token'),
            specifictag:3
        };
        method.PostAjax(url,params,function(data){
            if(data.resCode == '00000'){
                callback(data.data[0]);
            }
        },function(){

        })


    }
}


function getCookieVal(a){
    var b=document.cookie.indexOf(";",a);
    if(b==-1)b=document.cookie.length;
    return unescape(document.cookie.substring(a,b))
}