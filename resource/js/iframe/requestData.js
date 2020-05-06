(function () {
    let RequestData = {};

    //动态的处理用户的信息数据，如果列表中没有数据，那么会请求服务器获取并且存储，如果有则直接取出
    RequestData.getUserInfo = function (userId) {
        if (allMemberInfoMap[userId] == null || allMemberInfoMap[userId] === undefined) {
            $.ajax({
                type: "get",
                url: REQUESTHEAD + "/user/info?id=" + userId,
                xhrFields: {
                    withCredentials: true
                },
                async: false,
                crossDomain: true,
                success: function (result) {
                    if (result.code !== 0) {
                        if (result.data != null || result.data.id !== undefined) {
                            allMemberInfoMap[result.data.id] = result.data;
                            return allMemberInfoMap[result.data.id];
                        } else {
                            return null;
                        }
                    }
                }
            });
        } else {
            return allMemberInfoMap[userId];
        }
    };

    //动态的向服务器请求获取一个角色卡数据，如果本地有数据那么将不会向服务器请求
    RequestData.getRoleCard = function (roleCardId) {
        if (allRoleCardInfoMap[roleCardId] == null) {
            layer.msg("正在向服务器请求数据，请稍等...");
            let roleCardData;
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

    window.RequestData = RequestData;
})();