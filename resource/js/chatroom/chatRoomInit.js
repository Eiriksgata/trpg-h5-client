(function () {

    //载入渲染需要用到的代码片段
    $("#importCode").load("chatRoomImportCode.html");

    //设置当前页面的房间ID
    window.currentRoomId = window.location.search.substring(8);

    //判断自己是否属于房主


    //载入房间所需要的信息
    window.roomLoad.loadRoomData();

    //用户列表渲染
    memberListBoxInit();

})();