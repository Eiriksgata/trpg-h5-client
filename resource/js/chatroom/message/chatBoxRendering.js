
(function(w){

    let chatBox = {};

    chatBox.plotBoxAddMessage = function(message){


    };

    let addPlotBoxMessage = function(chatMessage){
        let userId = window.myUserInfo.id;
        let roleId = window.allRelaiton[currentRoomId][userId].roleCardId;
        console.log(userId+","+roleId);
        //$("#plotChatBox").append(chatMessage.content,);

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


})(window);