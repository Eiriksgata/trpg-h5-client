(function () {

    let MessageRecord = {};

    MessageRecord.init = function () {

    };

    MessageRecord.addPublicRoomMessage = function (data) {
        let record = layui.data("roomPublicRecord")[data.roomId];
        if (roomRecord == null) {
            roomRecord = {};
        }

        //roomRecord[data.roomId] =





    };

    MessageRecord.deletePublicRoomMessage = function (data) {

    };


    MessageRecord.addPrivateRoomMessage = function (data) {
        let record = layui.data("roomPrivateRecord")[data.roomId];

    };


    window.MessageRecord = MessageRecord;

})();