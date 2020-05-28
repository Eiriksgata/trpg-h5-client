(function () {

    let roomLoad = {};

    //从内部加载用户的基础数据
    //根据用户进入的房间进行角色卡的数据加载
    //加载房间内用到的角色卡数据和用户信息
    roomLoad.loadRoomData = function () {
        parent.DBOpenRequest.result.transaction(["allRelation"], "readonly")
            .objectStore("allRelation")
            .openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                parent.RequestData.getRoleCard(cursor.value.roleCardId, true);
                parent.RequestData.getUserInfo(cursor.value.userId, true);
            }
        };
    };


    window.roomLoad = roomLoad;

})();