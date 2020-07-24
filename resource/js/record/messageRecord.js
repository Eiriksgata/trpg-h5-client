(function () {

    let MessageRecord = {};

    MessageRecord.init = function () {

    };

    MessageRecord.addPublicRoomMessage = function (data) {
        database.addPublicRecord({
            "message": data.content,
            "messageType": data.messageType,
            "id": data.recordId,
            "region": data.region,
            "roomId": data.roomId,
            "sendTime": data.sendTime,
            "senderId": data.senderId,
            "nike": data.senderNike
        });
    };

    MessageRecord.deletePublicRoomMessage = function (data) {


    };


    MessageRecord.addPrivateRoomMessage = function (data) {
        /**
         * 这里的接收人昵称，只会显示他自己的，接收人ID是包含在这一条消息中的所有接收人的ID
         */
        database.addPrivateRecord({
            "receiverId": data.receiverId,
            "region": data.region,
            "message": data.content,
            "senderId": data.senderId,
            "senderNike": data.senderNike,
            "receiverNike": data.receiverNike,
            "sendTime": data.sendTime,
            "messageType": data.messageType,
            "roomId": data.roomId
        });

    };


    /**
     * 记录房间聊天数据
     */
    MessageRecord.chatMessageRecord = function (data) {
        if (data.region === "square" || data.region === "plot") {
            MessageRecord.addPublicRoomMessage(data);
        } else {
           // MessageRecord.addPrivateRoomMessage(data);
        }
    };

    /**
     * 消息记录读取 异步方法
     * 说明如下
     */
    MessageRecord.getAllPublicRecordByRoomId = async function (roomId) {
        return await database.findByIndexName("allPublicRecord","roomId",parseInt(roomId));
    };

    /**
     * 消息记录读取
     * 单条 按消息记录ID来读取
     * 异步的方法，需要用异步的回调等同步形式处理
     */
    MessageRecord.getPublicRecordById = async function (recordId) {
        return await database.findByIndexName("allPublicRecord", "id", recordId);
    };


    window.MessageRecord = MessageRecord;

})();