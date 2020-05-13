(function () {

    let roomLoad = {};

    //从内部加载用户的基础数据
    //根据用户进入的房间进行角色卡的数据加载
    //加载房间内用到的角色卡数据和用户信息
    roomLoad.loadRoomData = function () {
        let allRelation = layui.data("appData").allRelation;
        if (allRelation == null) {
            parent.InitLoad.getMyRelationship();
            allRelation = layui.data("appData").allRelation;
        }
        $.each(allRelation[currentRoomId], function (key, values) {
            if (values.roleCardId == null) {
                return;
            }

            //重新强制更新角色卡的信息
            parent.RequestData.getRoleCard(values.roleCardId, true);

            //加载所用到的用户数据
            parent.RequestData.getUserInfo(values.userId, true);

        });
    };


    window.roomLoad = roomLoad;

})();