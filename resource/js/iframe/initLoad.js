(function (w) {
    let InitLoad = {};

    InitLoad.getMyUserInfo = function () {
        $("#loadTipsMessageBox").html("载入用户信息");
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/my/user/info",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                if (result.code !== 0) {
                    layer.msg(result.message);
                    return;
                }
                window.myUserInfo = result.data;
                allMemberInfoMap[myUserInfo.id] = myUserInfo;
                console.log(JSON.stringify(result));
            }
        });
    };

    InitLoad.getMyJoinRoomInfo = function () {
        $("#loadTipsMessageBox").html("载入已加入的房间信息");
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/my/join/roomInfoList",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                if (result.code !== 0) {
                    layer.msg(result.message);
                    return;
                }
                let data = result.data;
                for (let i = 0; i < data.length; i++) {
                    window.allRoomInfoMap[data[i].roomId] = data[i];
                }
                console.log(JSON.stringify(allRoomInfoMap));
            }
        });
    };

    InitLoad.getMyRelationship = function () {
        $("#loadTipsMessageBox").html("载入关联");
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/my/allRoomRelationship",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                if (result.code !== 0) {
                    layer.msg(result.message);
                    return;
                }
                let data = result.data;
                window.allRelaiton = relationDataHandle(data);
                console.log(JSON.stringify(allRelaiton));
            }
        });
    };


    function relationDataHandle(data) {
        let result = {};
        data.map(function (room) {
            room.map(function (relation) {
                let value = {};
                value[relation.userId] = relation;
                result[relation.roomId] = value;
            })
        });
        return result;
    }


    jQuery.cookie = function (name, value, options) {
        if (typeof value !== 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            let expires = '';
            if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
                let date;
                if (typeof options.expires === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            let path = options.path ? '; path=' + (options.path) : '';
            let domain = options.domain ? '; domain=' + (options.domain) : '';
            let secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };


    w.InitLoad = InitLoad;
})(window);