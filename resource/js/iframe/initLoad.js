(function () {
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
                let myUserInfo = result.data;

                //存储到本地的浏览器中
                layui.data("appData", {
                    key: "myUserInfo",
                    value: myUserInfo
                });

                //将信息存到数据中
                database.addMemberInfo(myUserInfo);
            }
        });

    };

    InitLoad.getMyJoinRoomInfo = function () {
        $("#loadTipsMessageBox").html("载入房间信息");
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
                $.each(data, function (key, roomInfo) {
                    database.addRoomInfo(roomInfo);
                });

            }
        });
    };

    InitLoad.getMyRelationship = function () {
        $("#loadTipsMessageBox").html("载入关联");
        database.findAll("allRoomInfo").onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                //根据已加入的房间进行房间关系的载入
                //系统每次载入都会重新更新一下数据的信息
                RequestData.getRoomRelation(cursor.value.id);
                cursor.continue();
            }
        };
    };

    window.InitLoad = InitLoad;
})();