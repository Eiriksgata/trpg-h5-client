(function () {

    let dataUpdateTimer;

    let dataUpdateTimerInit = function () {
        clearInterval(dataUpdateTimer);
        dataUpdateTimer = setInterval(function () {
            allRoomDataUpdate();
        }, 50000);

    };

    let allRoomDataUpdate = function () {

        //重新加载房间关系
        loadRoomRelation();

        //用户列表渲染
        memberListBoxInit();

        //角色卡渲染
        loadMyRoleCardBox();

    };


    window.allRoomDataUpdate = allRoomDataUpdate;
    window.dataUpdateTimer = dataUpdateTimer;
    window.dataUpdateTimerInit = dataUpdateTimerInit;
})();