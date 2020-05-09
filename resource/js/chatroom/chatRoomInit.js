(function(){

    $("#importCode").load("chatRoomImportCode.html");

    window.currentRoomId = window.location.search.substring(8);

    //window.parent.getRoomId(currentRoomId);
    //console.log(currentRoomId);

})();