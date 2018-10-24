var _at = {
    storage_pre: "local_storage_haiwaiuni_at_data",
    storage_uuid_pre: "local_storage_haiwaiuni_at_uuid",
    uuid:'',
    last_url:'',
    _check_path : function(type){
        if(!type){
            console.error("_at type not exist!");
            return false;
        }
        type = type.toLowerCase();
        switch (type) {
            case "path":
            case "event":
                break;
            default:
                console.error("_at type not exist!");
                return false;
        }

        return type;
    },
    __uuid_s4:function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    getUUID:function(){
        return this.uuid;
    },
    detectUUID:function(){
        var uuid = localStorage.getItem(this.storage_uuid_pre) || '';
        if(-1 === uuid.indexOf("-")){
            uuid = false;
        }

        if(uuid){
            this.uuid = uuid;
            return true;
        }

        uuid = this.__uuid_s4() + this.__uuid_s4() + "-" + this.__uuid_s4() + "-" + this.__uuid_s4();
        localStorage.setItem(this.storage_uuid_pre,uuid);
        this.uuid = uuid;
    },
    push: function (type, value) {
        if (undefined === typeof localStorage) {
            console.error("localStorage not exist!");
            return false;
        }
        type = this._check_path(type);
        if(!type){
            return false;
        }
        try{
            var _data = localStorage.getItem(this.storage_pre);
            if(!_data){
                _data = [];
            }
            _data = JSON.parse(_data);
        }catch (e) {
            _data = [];
        }
        value.topic = type;
        _data.push(value);
        localStorage.setItem(this.storage_pre, JSON.stringify(_data));
    },
    loadStorage: function () {
        if (undefined === typeof localStorage) {
            console.error("localStorage not exist!");
            return false;
        }
    },
    init: function () {
        this.loadStorage();
    },
    popAll: function () {
        try{
            var _data = localStorage.getItem(this.storage_pre);
            if(!_data){
                _data = [];
            }
            _data = JSON.parse(_data);
        }catch (e) {
            _data = [];
        }
        localStorage.setItem(this.storage_pre,JSON.stringify([]));
        return _data;
    }
};

_at.init();

