
(function(w){

    let chatBox = {};

    chatBox.plotBoxAddMessage = function(message){


    };


    function addPlotBoxMessage(chatMessage){

        //let roleId = window.allRelaiton[currentRoomId][];

        $("#plotChatBox").append(chatMessage.content,);

    }

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