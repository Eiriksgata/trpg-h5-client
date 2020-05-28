(function () {
    let RequestData = {};

    //动态的处理用户的信息数据，如果列表中没有数据，那么会请求服务器获取并且存储，如果有则直接取出
    RequestData.getUserInfo = async function (userId) {
        let isNoLocal = arguments[1] ? arguments[1] : false;
        //检查本地的数据
        let userInfo;
        await database.findByIndexName("allMemberInfo", "id", userId).then(function (requestResult) {
            userInfo = requestResult;
        });
        if (isNoLocal || userInfo == null || userInfo === undefined) {

            $.ajax({
                type: "get",
                url: REQUESTHEAD + "/user/info?id=" + userId,
                xhrFields: {
                    withCredentials: true
                },
                async: false,
                crossDomain: true,
                success: function (result) {
                    if (result.code === 0) {
                        if (result.data != null && result.data.id !== undefined) {
                            database.addMemberInfo(result.data);
                            userInfo = result.data;
                        } else {
                            return null;
                        }
                    }
                }
            });
        }
        return userInfo;
    };

    //动态的向服务器请求获取一个角色卡数据，如果本地有数据那么将不会向服务器请求
    RequestData.getRoleCard = async function (roleCardId) {
        let isNoLocal = arguments[1] ? arguments[1] : false;
        let roleCard = null;
        await database.findByIndexName("allRoleCard", "id", roleCardId).then(function (resultData) {
            roleCard = roleCardId;
        });

        if (isNoLocal || roleCard == null || roleCard === undefined) {
            //layer.msg("正在向服务器请求数据，请稍等...");
            $.ajax({
                type: "get",
                url: REQUESTHEAD + "/role/getRoleCard?roleCardId=" + roleCardId,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                async: false,
                success: function (result) {
                    if (result.code === 0) {
                        database.addRoleCard(result.data);
                        roleCard = result.data;
                    } else {
                        layer.msg(result.message);
                    }
                }
            });

        }
        return roleCard;
    };


    RequestData.getUserState = function (userIdList) {
        if (userIdList.length <= 0) return null;
        let dataStr = "?";
        $.each(userIdList, function (key, value) {
            dataStr += "id=" + value + "&&";
        });
        let userStateList = null;
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/user/state" + dataStr,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                if (result.code === 0) {
                    userStateList = result.data;
                } else {
                    layer.msg(result.message);
                }
            }
        });
        return userStateList;
    };

    RequestData.getRoomRelation = function (roomId) {
        let relation = null;
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/findRoomRelationship?roomId=" + roomId,
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
                $.each(data, function (key, value) {
                    database.addRelation(value);
                });
                relation = data;
            }
        });
        return relation;

    };


    window.RequestData = RequestData;
})();