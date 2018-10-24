if(typeof $ !== undefined){
    $.oldAjax = $.ajax;

    $.ajax = function ($obj) {
        $obj.data.__at_data = _at.popAll();
        if($obj.data.__at_data){
            $obj.data.__at_uuid = _at.getUUID();
        }
        if(window.user && window.user.unionid){
            $obj.data.__at_unionid = window.user.unionid;
        }

        var sendData = {
            url:$obj.url,
            type:$obj.type,
            data:$obj.data,
            dataType:$obj.dataType,
            success:$obj.success,
            error:$obj.error,
            complete:$obj.complete
        };
        $.oldAjax(sendData);
    }
}



