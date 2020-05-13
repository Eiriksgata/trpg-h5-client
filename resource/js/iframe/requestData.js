(function () {
    let RequestData = {};

    //动态的处理用户的信息数据，如果列表中没有数据，那么会请求服务器获取并且存储，如果有则直接取出
    RequestData.getUserInfo = function (userId) {
        let isNoLocal = arguments[1] ? arguments[1] : false;

        //检查本地的数据
        let allMemberInfoMap = layui.data("appData").allMemberInfo;
        if (allMemberInfoMap == null) {
            allMemberInfoMap = {};
        }
        if (isNoLocal || allMemberInfoMap[userId] == null || allMemberInfoMap[userId] === undefined) {
            let memberInfo = null;

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
                            allMemberInfoMap[result.data.id] = result.data;
                            layui.data("appData", {
                                key: "allMemberInfo",
                                value: allMemberInfoMap
                            });
                            memberInfo = allMemberInfoMap[result.data.id];
                        } else {
                            return null;
                        }
                    }
                }
            });
            return memberInfo;
        } else {
            return allMemberInfoMap[userId];
        }
    };

    //动态的向服务器请求获取一个角色卡数据，如果本地有数据那么将不会向服务器请求
    RequestData.getRoleCard = function (roleCardId) {
        let isNoLocal = arguments[1] ? arguments[1] : false;
        let allRoleCardInfoMap = layui.data("appData").allRoleCardInfo;
        if (allRoleCardInfoMap == null) {
            allRoleCardInfoMap = {};
        }
        if (isNoLocal || allRoleCardInfoMap[roleCardId] == null) {
            layer.msg("正在向服务器请求数据，请稍等...");
            let roleCardData = null;
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
                        allRoleCardInfoMap[result.data.id] = result.data;
                        roleCardData = result.data;
                        layui.data("appData", {
                            key: "allRoleCardInfo",
                            value: allRoleCardInfoMap
                        })

                    } else {
                        layer.msg(result.message);
                    }
                }
            });
            return roleCardData;
        } else {
            return allRoleCardInfoMap[roleCardId];
        }
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
                let allRelation = layui.data("appData").allRelation;
                if (allRelation == null) {
                    allRelation = {};
                }

                for (let i = 0; i < data.length; i++) {
                    if (allRelation[roomId] == null) {
                        allRelation[roomId] = {};
                    }
                    allRelation[roomId][data[i].userId] = data[i];
                }

                layui.data("appData", {
                    key: "allRelation",
                    value: allRelation
                })
            }
        });

    };


    window.RequestData = RequestData;
})();