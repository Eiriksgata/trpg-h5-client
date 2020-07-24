(function () {

    let SwitchRoom = {};

    $("#roomListButton").on("click", function () {
        $("#switchRoomListBox").css("height", $(window).height() - 50).html("");
        $("#selectRoomList").animate({left: "0px"});
        $("#selectRoomList").css("box-shadow", "darkgrey 1px 1px 10px 1px");
        SwitchRoom.loadRoomData();

    });

    $("#quitSelectRoomButton").on("click", function () {
        $("#selectRoomList").animate({left: "-300px"});
        $("#selectRoomList").css("box-shadow", "none");
    });


    SwitchRoom.loadRoomData = function () {
        parent.database.findAll("allRoomInfo").onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                let data = {
                    id: cursor.value.id,
                    ioc: cursor.value.ioc,
                    name: cursor.value.name
                };

                layui.use("laytpl", function () {
                    let laytpl = layui.laytpl;
                    let getTpl = switchRoomListHtml.innerHTML;
                    laytpl(getTpl).render(data, function (html) {
                        $("#switchRoomListBox").append(html);
                    });
                });
                cursor.continue();
            }
        };
    };

    SwitchRoom.switch = function (roomId) {
        $("div[region='plot']").html("");
        $("div[region='square']").html("");
        MessageCount.clearCount("square");
        MessageCount.clearCount("plot");

        window.currentRoomId = roomId;
        window.ChatRoomSystem.LoadInit();

    };

    window.SwitchRoom = SwitchRoom;

})();