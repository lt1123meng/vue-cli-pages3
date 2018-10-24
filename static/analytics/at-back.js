(function() {
    _at.detectUUID();

    //angular模块统计
    var at_ag_analytics_last_url= document.referrer;
    //当URL包含下列部分,纪录整个的url
    var uniModule = [
        'welife_familyshop',
        '/app/index.php',
        'forShare.html'
    ];
    var isAgModule = true;
    var hmPathName = window.location.pathname;
    for (var i = 0; i < uniModule.length; i++) {
        if (hmPathName.indexOf(uniModule[i]) >= 0) {
            isAgModule = false;
            break;
        }
    }

    function at_ag_analytics_push() {
        var start_time = localStorage.getItem('local_storage_haiwaiuni_at_data_start_time');
        var end_time = new Date().getTime();
        var hmAgModule = window.location.hash.split('#/')[1];
        var hmPathUrl = hmPathName + window.location.hash;
        var hmDataStr = hmAgModule ? hmPathUrl : hmPathName;
        hmDataStr = window.location.origin + hmDataStr.replace('//','/');
        _at.push('path', {
            'url':hmDataStr,
            'referrer':at_ag_analytics_last_url,
            'online_time':end_time - start_time
        });
        at_ag_analytics_last_url = hmDataStr;
        _at.last_url = hmDataStr;
        localStorage.setItem('local_storage_haiwaiuni_at_data_start_time',new Date().getTime());

    }

    //非angular模块统计
    function at_not_ag_analytics_push() {
        var start_time = localStorage.getItem('local_storage_haiwaiuni_at_data_start_time');
        var end_time = new Date().getTime();
        var hmDataStr = hmPathName + window.location.search + window.location.hash;
        hmDataStr = window.location.origin + hmDataStr.replace('//','/');
        _at.push('path', {
            'url':hmDataStr,
            'referrer':document.referrer,
            'online_time':end_time - start_time
        });
        _at.last_url = hmDataStr;
        localStorage.setItem('local_storage_haiwaiuni_at_data_start_time',new Date().getTime());
    }

    if(isAgModule){
        at_ag_analytics_push();
        window.onhashchange = at_ag_analytics_push;
    }else{
        at_not_ag_analytics_push();
    }

})();
