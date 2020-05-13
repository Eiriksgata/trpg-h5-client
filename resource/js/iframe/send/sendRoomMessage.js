(function () {

    let sendChatMessage = function (chatMessageVo) {
        socket.send(JSON.stringify(chatMessageVo));
    };


    window.sendChatMessage = sendChatMessage;

})();