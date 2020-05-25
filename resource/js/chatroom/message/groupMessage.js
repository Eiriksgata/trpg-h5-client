(function () {


    let groupListInit = function () {
        let roomRelation = layui.data("appData").allRelation[currentRoomId];
        let allMemberInfo = layui.data("appData").allMemberInfo;



        let data = {};
        roomRelation.map(function (key, value) {
            if (parent.RequestData.getUserInfo(key) != null) {
                let roleCard = parent.RequestData.getRoleCard(value.roleCardId);
                data.name = roleCard.name;
            }
        })
    }
})();