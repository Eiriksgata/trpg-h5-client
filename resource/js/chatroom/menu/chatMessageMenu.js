(function () {

    let timer = null;

    /**
     * 动态事件监听
     * 捕捉消息内容长按事件
     */
    $("body").on("touchstart", "message", function () {
        let control = $(this);
        timer = setTimeout(function () {
            messageMenuShow(control);
        }, 1000);

    }).on("touchend", "message", function () {

        clearTimeout(timer);

    }).on("mousedown", "message", function () {
        let control = $(this);
        console.log(control);
        /**
         * 长按计时
         * @type {number}
         */
        timer = setTimeout(function () {
            messageMenuShow(control);
        }, 1000);

    }).on("mouseup", "message", function () {

        clearTimeout(timer);

    });


    /**
     * 弹出消息的长按菜单
     */
    let messageMenuShow = function (control) {
        $(control).attr("id", "menuTemp");
        let recordId = $(control).attr("recordId");
        let data = {
            "recordId": recordId,
        };


        layui.use('laytpl', function (laytpl) {
            laytpl(chatMessageMenuHtml.innerHTML).render(data, function (html) {
                layer.tips(html, "#menuTemp", {
                    tips: [3, '#000000'], //还可配置颜色
                    time: 2000
                });
            });
        });

        $(control).attr("id", "");
    };


    /**
     * 删除当前聊天框的消息内容
     * @param recordId
     */
    let deleteChatMessageBox = function (recordId) {
        $("div[recordId='" + recordId + "']").remove();
    };


    /**
     * 撤回
     * @param recordId
     */
    let withdraw = function (recordId) {

    };

    window.deleteChatMessageBox = deleteChatMessageBox;


})();