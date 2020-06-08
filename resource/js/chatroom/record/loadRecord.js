(function () {

    let loadRecord = {};
    loadRecord.loadPublicMessage = function () {
        //加载公共的聊天消息记录
        let loadRecordNumberMax = 10;
        let recordIndex = 0;
        parent.database.findByIndexName("allPublicRecord", "roomId", parseInt(currentRoomId))
            .then(function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data.length > loadRecordNumberMax) {
                        recordIndex = data.length - loadRecordNumberMax + i;
                    } else {
                        recordIndex = i;
                    }
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
                }
            });
    };

    window.loadRecord = loadRecord;
})();