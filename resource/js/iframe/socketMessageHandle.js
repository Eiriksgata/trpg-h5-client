(function (w) {


    let messageHandler = function (socketData) {
        console.log(socketData.roomId + "," + window.frames["pageFrame"].contentWindow.currentRoomId);

        //进行自定义消息创建判定,并且转换为特殊的文本格式
        if (socketData.content != null) {
            socketData.content = MessageAnalysis.richTextConvert(socketData.content);
        }

        /**
         * 检查是否是来自本地的消息载入，如果是则跳过计数，只对新消息进行计数
         */
        if (socketData.isLocal == null || socketData === undefined) {
            try {
                window.frames["pageFrame"].contentWindow.MessageCount.addCount(socketData.region);
            } catch (e) {
                console.log("当前尚未处于聊天室内或其他原因导致的错误:" + e);
            }
        }

        /**
         * 先检测消息是否具有区域的属性
         */
        if (socketData.region != null || socketData.region !== undefined) {
            /**
             * 检测并添加新的区域，方便用于判断使用,存储于本地之中
             */
            let region = layui.data("appData").recordRegion;
            if (region == null || region === undefined) {
                region = [];
            }
            let addNewRegionCount = 0;
            $.each(region, function (key, value) {
                if (socketData.region === value) {
                    addNewRegionCount++;
                }
            });

            if (addNewRegionCount === 0) {
                region.push(socketData.region);
                layui.data("appData", {
                    key: "recordRegion",
                    value: region
                });
                //添加新的点击框
                window.frames["pageFrame"].contentWindow.GroupMessage.addGroupClickBox(socketData.region, socketData.receiverId);
            }

        }


        switch (socketData.messageType) {
            case ChatMessageCode.SYSTEM:
                dataInit();
                return;
            case ChatMessageCode.FORWARD:
                MessageRecord.chatMessageRecord(socketData);
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
            case ChatMessageCode.ROOMPRIVATE:
                //讨论组消息处理

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