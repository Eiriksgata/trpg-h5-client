(function () {
    let RequestData = {};

    /**
     * 动态的处理用户的信息数据，如果列表中没有数据，那么会请求服务器获取并且存储，如果有则直接取出
     * @param userId
     * @returns {Promise<*>}
     */
    RequestData.getUserInfo = async function (userId) {
        let isNoLocal = arguments[1] ? arguments[1] : false;
        if (userId == null || userId === undefined) {
            return null;
        }
        //检查本地的数据
        let userInfo = null;
        await database.findByIndexName("allMemberInfo", "id", parseInt(userId)).then(function (requestResult) {
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

    /**
     * 向服务器请求获取一个角色卡数据，如果本地有数据那么将不会向服务器请求
     * @param roleCardId
     * @returns {Promise<*>}
     */
    RequestData.getRoleCard = async function (roleCardId) {
        let isNoLocal = arguments[1] ? arguments[1] : false;
        let roleCard = null;
        if (roleCardId == null || roleCardId === undefined) {
            return null;
        }
        await database.findByIndexName("allRoleCardInfo", "id", parseInt(roleCardId)).then(function (resultData) {
            roleCard = resultData;
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

    /**
     * 将近期的房间消息同步载入到本地数据库
     * @param roomId
     */
    RequestData.getRoomRecord = function (roomId) {
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/getRoomRecord?roomId=" + roomId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                if (result.code === 0) {
                    let resultRecord = result.data;
                    //将数据载入到数据库当中
                    $.each(resultRecord, function (key, value) {
                        database.addPublicRecord(value);
                    });

                } else {
                    layer.msg(result.message);
                }
            }
        });
    };


    /**
     * 获得房间消息所有的同步载入到本地数据库
     * @param roomId
     */
    RequestData.getAllRoomRecord = function (roomId) {
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/getAllRoomRecord?roomId=" + roomId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                if (result.code === 0) {
                    let resultRecord = result.data;
                    //将数据载入到数据库当中
                    $.each(resultRecord, function (key, value) {
                        database.addPublicRecord(value);
                    });

                } else {
                    layer.msg(result.message);
                }
            }
        });
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
                    //将没加入的房间信息移除
                    database.delete("allRoomInfo", "id", roomId);
                    //layer.msg(result.message);
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

    RequestData.getMyEmoticon = function () {
        let data;
        $.ajax({
            type: "get",
            url: REQUESTHEAD + "/emoticon/getEmoticon",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                data = result.data;
            }
        });
        return data;
    };

    RequestData.deleteEmoticon = function (emoticonId) {
        $.ajax({
            type: "delete",
            url: REQUESTHEAD + "/emoticon/deleteEmoticon?emoticonId=" + emoticonId,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (result) {
                layer.msg(result.message);
            }
        });
    };

    RequestData.addEmoticon = function (url) {
        let urlList = [];
        urlList[0] = url;
        let jsonData = {
            "urlList": urlList
        };
        $.ajax({
            type: "put",
            url: REQUESTHEAD + "/emoticon/addEmoticon",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            contentType: "application/json;charset=UTF-8",
            async: false,
            success: function (result) {
                layer.msg(result.message);
            }
        });
    };

    window.RequestData = RequestData;
})();