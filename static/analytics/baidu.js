var _hmt = _hmt || [];
//埋点
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?2221f01871c4b9f880063a398ef24483";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

//因为如果不是单页则会刷新headder否则监听可以异步请求
window.addEventListener("hashchange", function(){
    var uniModule = ['welife_durian','welife_mine','welife_business', 'welife_carDriver', 'welife_carRent', 'welife_center', 'welife_cms', 'welife_market', 'welife_qa', 'welife_rent', 'welife_second', 'welife_seller', 'welife_take', 'welife_travel'];

    if (window.location.href.indexOf('haiwaiuni') > 0) {
        var hmData = window.location.href.split('#/')[1];
        var hmDataOne = window.location.href.split('#/')[0];
        for (var i = 0; i < uniModule.length; i++) {
            if (hmDataOne.indexOf(uniModule[i]) > 0) {
                hmDataOne = uniModule[i];
                i = uniModule.length;
            }
        }
        var hmDataStr = hmData ? '/addons/' + hmDataOne + '/#' + hmData : hmDataOne;
        _hmt.push(['_trackPageview', hmDataStr]);
        console.log(hmDataOne,hmDataStr);
    }
}, false);


(function () {
    //单页应用---center||seller||business||travel||carRent||carDriver||market||take||durian||mine
    var uniModule = ['welife_durian','welife_mine','welife_business', 'welife_carDriver', 'welife_carRent', 'welife_center', 'welife_cms', 'welife_market', 'welife_qa', 'welife_rent', 'welife_second', 'welife_seller', 'welife_take', 'welife_travel'];
    //进行埋点操作,(请求一次header则会进行一次统计,当进行单页面跳转的时候,触发异步请求统计)
    var _hmt = _hmt || [];
    if (window.location.href.indexOf('haiwaiuni') > 0) {
        if (sessionStorage.getItem('preHref') && window.location.href != sessionStorage.getItem('preHref')) {
            sessionStorage.setItem('preHref', window.location.href);
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?2221f01871c4b9f880063a398ef24483";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
            //判断是否为分享,
            if (window.location.href.indexOf('#/') > 0) {
                var hmData = window.location.href.split('#/')[1];
                var hmDataOne = window.location.href.split('#/')[0];
                for (var i = 0; i < uniModule.length; i++) {
                    if (hmDataOne.indexOf(uniModule[i]) > 0) {
                        hmDataOne = uniModule[i];
                        i = uniModule.length;
                    }
                }
                var hmDataStr = hmData ? '/' + hmDataOne + '/' + hmData : hmDataOne;
                _hmt.push(['_trackPageview', hmDataStr]);
            }
        } else {
            _hmt.push(['_trackPageview', window.location.href]);
        }

    }
})();
