(function (w) {


    let messageHandler = function (socketData) {

        if (socketData.messageType === ChatMessageCode.SYSTEM) {
            dataInit();
            return;
        }

        /**
         * 检查是否是来自本地的消息载入，如果是则跳过计数，只对新消息进行计数
         */
        if ((socketData.isLocal == null || socketData === undefined) && (socketData.messageType === ChatMessageCode.FORWARD)) {
            try {
                window.frames["pageFrame"].contentWindow.MessageCount.addCount(socketData.region);
            } catch (e) {
                console.log("当前尚未处于聊天室内或其他原因导致的错误:" + e);
            }
            MessageRecord.chatMessageRecord(socketData);
        }

        //进行自定义消息创建判定,并且转换为特殊的文本格式
        if (socketData.content != null) {
            socketData.content = Rich.analysis(socketData.content);
        }

        /**
         * 检测玩家是否处于消息所在的房间
         */
        if (parseInt(socketData.roomId) !== parseInt(window.frames["pageFrame"].contentWindow.currentRoomId)) {
            return;
        }


        switch (socketData.messageType) {
            case ChatMessageCode.FORWARD:
                try {
                    window.frames["pageFrame"].contentWindow.MessageBox.getChatMessageBoxHtml(socketData);
                } catch (e) {
                    console.log("对当前用户尚未在房间内的消息进行处理");
                }
                return;
            case ChatMessageCode.DICEMESSAGE:
                try {
                    window.frames["pageFrame"].contentWindow.MessageBox.getDiceMessageBoxHtml(socketData);
                } catch (e) {
                    console.log("对当前用户尚未在房间内的消息进行处理");
                }
                return;
            case ChatMessageCode.UPDATELOADROOMDATA:
                window.frames["pageFrame"].contentWindow.window.allRoomDataUpdate();
                return;
            case ChatMessageCode.ROOMMUSIC:
                let musicMessage = JSON.parse(socketData.content);
                window.frames["pageFrame"].contentWindow.RoomMusicPlay.addMusic(musicMessage.url, musicMessage.musicName, socketData.senderNike);
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