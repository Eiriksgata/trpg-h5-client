(function () {

    let loadRecord = {};
    loadRecord.loadPublicMessage = function () {

        //同步远程读取消息
        parent.RequestData.getRoomRecord(currentRoomId);

        //加载公共的聊天消息记录
        let loadRecordNumberMax = 50;

        parent.database.getAllByIndex("allPublicRecord", "roomId", parseInt(currentRoomId)).then(function (data) {
            //因为消息处理涉及到了异步的操作，因此需要借用一下计时器添加历史记录消息
            let count = 0;
            let recordIndex = 0;
            if (data.length > loadRecordNumberMax) {
                recordIndex = data.length - loadRecordNumberMax;
            }

            let loadRecordTimer = setInterval(function () {
                if (count > loadRecordNumberMax || count > data.length || data == null || data.length === 0) {
                    clearInterval(loadRecordTimer);
                }

                try {
                    parent.messageHandler({
                        "content": data[recordIndex].message,
                        "messageType": data[recordIndex].messageType,
                        "recordId": data[recordIndex].id,
                        "region": data[recordIndex].region,
                        "roomId": data[recordIndex].roomId,
                        "sendTime": data[recordIndex].sendTime,
                        "senderId": data[recordIndex].senderId,
                        "senderNike": data[recordIndex].nike,
                        "isLocal": true
                    });
                } catch (e) {
                    console.log("读取某条消息中出现了错误,可能原因。1.房间没有存在任何消息。2.错误的消息存储结构类型。3.读取到的消息为空。");
                }

                recordIndex++;
                count++;


            }, 10);
        });


    };

    window.loadRecord = loadRecord;
})();