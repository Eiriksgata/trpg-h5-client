(function () {

    let timer = null;

    //动态事件监听
    $("body").on("touchstart", "message", function () {

        timer = setTimeout(function () {
            //console.log($(this).attr("id"));

            layer.tips(chatMessageMenuHtml.innerHTML, "#" + $(this).attr("id"), {
                tips: [1, '#000000'] //还可配置颜色
            });


        }, 1000);

    }).on("touchend", "message", function () {

        clearTimeout(timer);

    }).on("mousedown", "message", function () {
        let control = $(this);

        timer = setTimeout(function () {
            $(control).attr("id", "menuTemp");
            //console.log($(this).attr("id"));

            let recordId = $(control).attr("recordId");
            let data = {
                "recordId": recordId,

            };


            layui.use('laytpl', function (laytpl) {
                laytpl(chatMessageMenuHtml.innerHTML).render(data, function (html) {
                    layer.tips(html, "#menuTemp", {
                        tips: [3, '#000000'] //还可配置颜色
                    });
                });
            });


            $(control).attr("id", "");

        }, 1000);

    }).on("mouseup", "message", function () {

        clearTimeout(timer);

    });


    let deleteChatMessageBox = function (recordId) {
        $("div[recordId='" + recordId + "']").remove();
    };


    let withdraw = function (recordId) {

    };

    window.deleteChatMessageBox = deleteChatMessageBox;


})();