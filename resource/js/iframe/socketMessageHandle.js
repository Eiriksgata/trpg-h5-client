(function (w) {


    let messageHandler = function (socketData) {
        //进行自定义消息创建判定,并且转换为特殊的文本格式
        if (socketData.content != null || socketData.content !== undefined) {
            socketData.content = MessageAnalysis.richTextConvert(socketData.content);
        }

        switch (socketData.messageType) {
            case ChatMessageCode.SYSTEM:
                dataInit();
                return;
            case ChatMessageCode.FORWARD:
                chatMessageRecord(socketData);
                window.frames["pageFrame"].contentWindow.MessageBox.getChatMessageBoxHtml(socketData);
                return;
            case ChatMessageCode.DICEMESSAGE:
                window.frames["pageFrame"].contentWindow.MessageBox.getDiceMessageBoxHtml(socketData);
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



        // if (allChatMessageRecord[data.roomId] == null || allChatMessageRecord === undefined) {
        //     allChatMessageRecord[data.roomId] = {
        //         roomId: data.roomId,
        //         newMessageCount: 0,
        //         messageList: [{
        //             data
        //         }]
        //     }
        // } else {
        //     allChatMessageRecord[data.roomId].newMessageCount++;
        //     allChatMessageRecord[data.roomId].messageList.push(data);
        // }
        // console.log(allChatMessageRecord);
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

    w.messageHandler = messageHandler;

})(window);