(function () {

    //载入渲染需要用到的代码片段
    $("#importCode").load("chatRoomImportCode.html");

    //设置当前页面的房间ID
    window.currentRoomId = window.location.search.substring(8);

    //判断自己是否属于房主


    //载入房间所需要的信息
    window.roomLoad.loadRoomData();

    //用户数据初始加载
    allRoomDataUpdate();

    //巡检房间数据
    dataUpdateTimerInit();

    //加载控件事件
    MessageBox.sendMessageBtnEvent();

    //加载剪切功能监听事件
    Shear.addEvent();

})();