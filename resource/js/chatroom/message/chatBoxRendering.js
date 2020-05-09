
(function(w){

    let chatBox = {};
    let regionCode = {};
    regionCode.PLOT = "剧情";
    regionCode.SQUARE = "广场";


    chatBox.plotBoxAddMessage = function(message){


    };

    let addPlotBoxMessage = function(chatMessage){
        let userId = window.myUserInfo.id;
        let roleId = window.allRelaiton[currentRoomId][userId].roleCardId;
        if (userId == null || roleId == null) return ;

        console.log(userId+","+roleId);
        //$("#plotChatBox").append(chatMessage.content,);

    };

    let addSUQARE = function(chatMessage){
        let userId = window.myUserInfo.id;

    };

    function getDiceMessageBoxHtml(message,roleName){
        return layuiRender(diceMessageBoxHtml.innerHTML,{
            "img":"../../resource/images/diceioc.jpg",
            "name":"骰子",
            "message":message,
            "roleName":roleName
        });
    }


    w.chatBox = chatBox;
    w.regionCode = regionCode;


})(window);