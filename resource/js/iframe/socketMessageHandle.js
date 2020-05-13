(function (w) {

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

    let messageHandler = function (socketData) {
        //进行自定义消息创建判定,并且转换为特殊的文本格式
        if (socketData.message != null || socketData.message !== undefined) {
            socketData.message = MessageAnalysis.richTextConvert(socketData.message);
        }

        switch (socketData.messageType) {
            case ChatMessageCode.SYSTEM:
                dataInit();
                return;
            case ChatMessageCode.FORWARD:
                chatMessageRecord(socketData);
                return;
            case ChatMessageCode.UPDATELOADROOMDATA:
                window.frames["pageFrame"].contentWindow.allRoomDataUpdate();
                return;

        }

    };

    let dataInit = function () {
        InitLoad.getMyUserInfo();
        InitLoad.getMyJoinRoomInfo();
        InitLoad.getMyRelationship();
        $("#loadTipsMessageBox").remove();
        $("#pageFrame").attr("src", "index.html");

    };


    /**
     * 调用子框架下的函数,接受到消息时候的处理
     */
    let acceptChatMessageHandle = function (data) {

        //检测当前是否进入相关的房间
        let roomId = window.frames["pageFrame"].contentWindow.currentRoomId;
        if (roomId == null || roomId === undefined) {
            return;
        }

        //调用房间的消息渲染方法


    };


    /**
     * 记录房间聊天数据
     */
    let chatMessageRecord = function (data) {

        

        if (allChatMessageRecord[data.roomId] == null || allChatMessageRecord === undefined) {
            allChatMessageRecord[data.roomId] = {
                roomId: data.roomId,
                newMessageCount: 0,
                messageList: [{
                    data
                }]
            }
        } else {
            allChatMessageRecord[data.roomId].newMessageCount++;
            allChatMessageRecord[data.roomId].messageList.push(data);
        }
        console.log(allChatMessageRecord);
    };

    $(window).ready(function () {
        getRoomId();
    });


    /**
     * 测试方法
     */
    let getRoomId = function () {


    };

    w.getRoomId = getRoomId;
    w.ChatMessageCode = ChatMessageCode;
    w.messageHandler = messageHandler;

})(window);