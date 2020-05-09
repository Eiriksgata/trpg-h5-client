(function () {
    let InitLoad = {};

    InitLoad.getMyUserInfo = function () {
        $("#loadTipsMessageBox").html("载入用户信息");

        if (layui.data("appData").myUserInfo == null) {
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
                    let myUserInfo = result.data;

                    //存储到本地的浏览器中
                    layui.data("appData", {
                        key: "myUserInfo",
                        value: myUserInfo
                    });

                    let allMemberInfoMap = layui.data("appData").allMemberInfo;
                    if (allMemberInfoMap == null){
                        allMemberInfoMap = {};
                    }

                    allMemberInfoMap[myUserInfo.id] = myUserInfo;
                    layui.data("appData", {
                        key: "allMemberInfo",
                        value: allMemberInfoMap
                    })


                }
            });
        } else {
            window.myUserInfo = layui.data("appData").myUserInfo;
            console.log("本地加载MyUserInfo数据");
        }
    };

    InitLoad.getMyJoinRoomInfo = function () {
        $("#loadTipsMessageBox").html("载入房间信息");
        if (layui.data("appData").allRoomInfo == null) {
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
                    //let allRoomInfoMap = {};

                    let allRoomInfoMap = {};
                    for (let i = 0; i < data.length; i++) {
                        allRoomInfoMap[data[i].roomId] = data[i];
                    }

                    //建立数据表结构
                    layui.data("appData", {
                        key: "allRoomInfo",
                        value: allRoomInfoMap
                    });


                    //console.log(JSON.stringify(allRoomInfoMap));
                }
            });
        } else {
            //window.myUserInfo = layui.data("frame").allRoomInfoMap;

            console.log("本地加载AllRoomInfoMap数据");
        }

    };

    InitLoad.getMyRelationship = function () {
        $("#loadTipsMessageBox").html("载入关联");

        if (layui.data("appData").allRelation == null) {
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
                    let allRelation = relationDataHandle(data);
                    layui.data("appData", {
                        key: "allRelation",
                        value: allRelation
                    })
                    //console.log(JSON.stringify(allRelaiton));
                }
            });

        } else {
            console.log("本地加载allRelation数据");

        }

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


    window.InitLoad = InitLoad;
})();