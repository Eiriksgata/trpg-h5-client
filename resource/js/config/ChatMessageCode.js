(function () {

    let ChatMessageCode = {};
    //系统消息
    ChatMessageCode.SYSTEM = 0;
    //房间的转发消息
    ChatMessageCode.FORWARD = 2;
    //返回骰子的消息结果
    ChatMessageCode.DICEMESSAGE = 8;
    //房间播放器推送设置
    ChatMessageCode.ROOMMUSIC = 9;
    //用户的房间私聊消息
    ChatMessageCode.ROOMPRIVATE = 10;
    ChatMessageCode.MAPS = 12;
    ChatMessageCode.UPDATELOADROOMDATA = 17;

    window.ChatMessageCode = ChatMessageCode;

})();